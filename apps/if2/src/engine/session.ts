import { loadCurriculum } from "../curriculum/compile";
import {
  applyExposure,
  applyRetrieval,
  createLearner,
  emptyState,
  examReadinessFor,
  recomputeMastery,
} from "./learner";
import { dueConceptIds, nextNewUnitId, scheduleAfterRetrieval, scheduleWhy } from "./scheduler";
import { conceptNeedsMoreEncoding } from "./coverage";
import type {
  ActivityKind,
  AttentionSignal,
  ErrorClass,
  LearningUnit,
  LearnerModel,
  PedagogicalDecision,
  PracticeItem,
  SessionLog,
  SpeechAct,
} from "./types";

export type FocusActivity =
  | {
      kind: "predict";
      unit: LearningUnit;
      item: PracticeItem;
      speech: SpeechAct[];
    }
  | {
      kind: "read";
      unit: LearningUnit;
      shortened: boolean;
      speech: SpeechAct[];
    }
  | {
      kind: "retrieve";
      item: PracticeItem;
      unit?: LearningUnit;
      speech: SpeechAct[];
      mode: "due-review" | "encode" | "attention-switch" | "cumulative" | "misconception";
    }
  | {
      kind: "calibrate";
      pending: PendingGrade;
      speech: SpeechAct[];
    }
  | {
      kind: "debrief";
      report: DebriefReport;
      speech: SpeechAct[];
    };

export type PendingGrade = {
  item: PracticeItem;
  response: string;
  auto: GradeResult;
  latencyMs: number;
  revealed: boolean;
};

export type GradeResult = {
  success: boolean;
  partial: boolean;
  score: number;
  matched: string[];
  missing: string[];
  note: string;
};

export type DebriefReport = {
  understood: { id: string; title: string }[];
  uncertain: { id: string; title: string; why: string }[];
  misconceptions: { id: string; title: string }[];
  confidentErrors: { id: string; title: string }[];
  deferred: { id: string; title: string; when: string }[];
  reviews: { id: string; title: string; why: string }[];
  outcomes: string[];
  nextFocus: string;
  examReadiness: number;
  masteryVsExam: string;
  coverageRemaining: number;
};

const sessionMinutesDefault = 25;

export type EngineState = {
  learner: LearnerModel;
  log: SessionLog;
  queueHint: AttentionSignal | null;
  lastConceptIds: string[];
  introducedThisSession: string[];
  retrieveCount: number;
  startedAt: number;
  targetMs: number;
  pending?: PendingGrade;
  lastItemId?: string;
  rereadOnUnit?: string;
};

export function startSession(learner: LearnerModel | null, now = Date.now()): EngineState {
  const model = learner ?? createLearner();
  return {
    learner: { ...model, sessionCount: model.sessionCount + 1 },
    log: { id: `ses-${now}`, startedAt: now, events: [], decisions: [], adaptations: [] },
    queueHint: null,
    lastConceptIds: [],
    introducedThisSession: [],
    retrieveCount: 0,
    startedAt: now,
    targetMs: sessionMinutesDefault * 60 * 1000,
  };
}

export function nextActivity(state: EngineState, now = Date.now()): FocusActivity {
  const curr = loadCurriculum();
  if (now - state.startedAt > state.targetMs && state.retrieveCount >= 4) {
    const report = buildDebrief(state, now);
    return { kind: "debrief", report, speech: debriefSpeech(report) };
  }

  if (state.queueHint) {
    const act = adapt(state, state.queueHint, now, curr);
    return act;
  }

  const lastIntro = state.lastConceptIds[0];
  if (lastIntro) {
    const st = state.learner.concepts[lastIntro];
    const justRead = state.log.events.some((e) => e.type === "read" && e.conceptIds?.includes(lastIntro));
    const noRetrieval = (st?.successfulRetrievals ?? 0) + (st?.failedRetrievals ?? 0) === 0;
    if (justRead && noRetrieval) {
      const item = pickItem(curr, lastIntro, state, { preferMcq: true, avoidId: state.lastItemId });
      decide(state, now, "Immediate retrieval after encoding", ["testing effect", lastIntro], "retrieve");
      return retrieveAct(item, "encode");
    }
  }

  const due = dueConceptIds(state.learner, now).filter((id) => shouldReviewNow(state, id, now));
  const mixReviews = due.length > 0 && (state.retrieveCount % 3 === 2 || state.introducedThisSession.length >= 1);

  if (lastIntro && conceptNeedsMoreEncoding(state.learner.concepts[lastIntro] ?? emptyState(lastIntro))) {
    const st = state.learner.concepts[lastIntro];
    const tried = (st?.successfulRetrievals ?? 0) + (st?.failedRetrievals ?? 0) > 0;
    if (tried) {
    const item = pickItem(curr, lastIntro, state, { preferMcq: true, avoidId: state.lastItemId });
    decide(state, now, "Stay on concept until retrieved, MCQ’d and attempted on more than one item", [lastIntro], "retrieve");
    return retrieveAct(item, "encode");
    }
  }

  if (mixReviews && due[0]) {
    const item = pickItem(curr, due[0], state, { preferMcq: true, avoidId: state.lastItemId });
    decide(state, now, "Due / at-risk concept interleaved", [`concept ${due[0]} due or at forgetting risk`], "retrieval");
    return retrieveAct(item, "due-review");
  }

  const newUnitId = nextNewUnitId(state.learner);
  if (newUnitId) {
    const unit = curr.units.find((u) => u.id === newUnitId)!;
    const cid = unit.conceptIds[0];
    const exposed = (state.learner.concepts[cid]?.exposures ?? 0) > 0;
    const predicted = state.log.events.some((e) => e.type === "predicted" && e.conceptIds?.includes(cid));
    if (unit.prediction && !predicted && !exposed) {
      const item = curr.items.find((i) => i.type === "prediction" && i.conceptIds.includes(cid)) ?? syntheticPredict(unit);
      decide(state, now, "Generation before explanation", ["new unit has a prediction prompt"], "predict");
      return {
        kind: "predict",
        unit,
        item,
        speech: [{ kind: "ask", text: item.prompt, interruptible: true }],
      };
    }
    const alreadyRead = state.log.events.some((e) => e.type === "read" && e.conceptIds?.includes(cid));
    if (!alreadyRead) {
      decide(state, now, "Focused reading of one concept boundary", [`unit ${unit.title}`], "read");
      return {
        kind: "read",
        unit,
        shortened: false,
        speech: readSpeech(unit, false),
      };
    }
    const item = pickItem(curr, cid, state, { preferMcq: true, avoidId: state.lastItemId });
    decide(state, now, "Immediate retrieval after encoding", ["testing effect"], "retrieve");
    return retrieveAct(item, "encode");
  }

  // All introduced: cumulative mixed retrieval
  const weak = Object.values(state.learner.concepts)
    .filter((c) => c.exposures > 0)
    .sort((a, b) => a.estimatedMastery - b.estimatedMastery)[0];
  if (weak) {
    const item = pickItem(curr, weak.conceptId, state, { preferMcq: true, avoidId: state.lastItemId });
    decide(state, now, "Curriculum exhausted for new units — successive relearning of weakest", [weak.conceptId], "retrieve");
    return retrieveAct(item, "cumulative");
  }

  const report = buildDebrief(state, now);
  return { kind: "debrief", report, speech: debriefSpeech(report) };
}

function shouldReviewNow(state: EngineState, conceptId: string, now: number) {
  const last = state.log.events.filter((e) => e.conceptIds?.includes(conceptId) && e.type === "graded").at(-1);
  if (!last) return true;
  return now - last.at > 8 * 60 * 1000 || (state.learner.concepts[conceptId]?.successiveCriterionHits ?? 0) < 2;
}

function adapt(
  state: EngineState,
  signal: AttentionSignal,
  now: number,
  curr: ReturnType<typeof loadCurriculum>
): FocusActivity {
  state.log.adaptations.push({ at: now, signal, action: describeAdapt(signal) });
  state.queueHint = null;

  if (signal === "inactivity" || signal === "reread-loop" || signal === "slow-latency") {
    const cid = state.lastConceptIds[0] ?? dueConceptIds(state.learner, now)[0];
    if (cid) {
      const item = pickItem(curr, cid, state, { preferProduction: true, typeBias: ["teach-back", "summary", "free-recall"] });
      decide(state, now, "Attention lapse → retrieval, not a break toast", [signal], "retrieve");
      return retrieveAct(item, "attention-switch");
    }
  }
  if (signal === "rapid-answer" || signal === "guessing" || signal === "rapid-click") {
    const cid = state.lastConceptIds[0];
    const item = cid
      ? pickItem(curr, cid, state, { preferProduction: true, typeBias: ["why-wrong", "teach-back", "error-correction"] })
      : pickItem(curr, loadCurriculum().concepts[0].id, state, {});
    decide(state, now, "Guessing pattern → slower production / why-wrong", [signal], "retrieve");
    return retrieveAct(item, "attention-switch");
  }
  if (signal === "repeated-error" || signal === "accuracy-drop") {
    const cid = state.lastConceptIds[0];
    const concept = curr.concepts.find((c) => c.id === cid);
    const other = concept?.confusedWith[0];
    if (other) {
      const item =
        curr.items.find((i) => (i.type === "mcq" || i.type === "distinction") && i.conceptIds.includes(cid!) && i.misconception) ||
        pickItem(curr, cid!, state, { preferMcq: true });
      decide(state, now, "Repeated error → distinction / misconception protocol", [signal, other], "retrieve");
      return retrieveAct(item, "misconception");
    }
    const unit = curr.units.find((u) => u.conceptIds[0] === cid);
    if (unit) {
      decide(state, now, "Repeated error → shortened re-exposition", [signal], "read");
      return { kind: "read", unit, shortened: true, speech: readSpeech(unit, true) };
    }
  }
  if (signal === "confidence-mismatch") {
    const tenMinAgo = now - 10 * 60 * 1000;
    const earlier = [...state.lastConceptIds].reverse().find((id) => {
      const st = state.learner.concepts[id];
      return st?.lastSeenAt && st.lastSeenAt < tenMinAgo;
    }) ?? state.lastConceptIds[1] ?? state.lastConceptIds[0];
    if (earlier) {
      const item = pickItem(curr, earlier, state, { preferProduction: true });
      decide(state, now, "Calibration issue → retrieve an earlier concept", [signal, earlier], "retrieve");
      return retrieveAct(item, "cumulative");
    }
  }
  if (signal === "reveal-repeat") {
    const cid = state.lastConceptIds[0] ?? curr.concepts[0].id;
    const item = pickItem(curr, cid, state, { typeBias: ["cloze", "free-recall"] });
    decide(state, now, "Reveal loop → force reconstruction", [signal], "retrieve");
    return retrieveAct(item, "encode");
  }

  const unitId = nextNewUnitId(state.learner);
  const unit = curr.units.find((u) => u.id === unitId) ?? curr.units[0];
  return { kind: "read", unit, shortened: true, speech: readSpeech(unit, true) };
}

function describeAdapt(s: AttentionSignal): string {
  switch (s) {
    case "inactivity":
      return "Switch from reading to retrieval of the live concept";
    case "reread-loop":
      return "Stop restudy; ask for a one-sentence explanation";
    case "rapid-answer":
    case "guessing":
    case "rapid-click":
      return "Slow the format: production / why-wrong instead of tap-MCQ";
    case "repeated-error":
    case "accuracy-drop":
      return "Shorten exposition or force a distinction";
    case "confidence-mismatch":
      return "Retrieve something encoded earlier in the session";
    case "reveal-repeat":
      return "Cloze reconstruction without a peek";
    case "slow-latency":
      return "Concrete scenario, smaller unit";
  }
}

function retrieveAct(item: PracticeItem, mode: Extract<FocusActivity, { kind: "retrieve" }>["mode"]): FocusActivity {
  return {
    kind: "retrieve",
    item,
    speech: [{ kind: "ask", text: item.prompt + (item.options ? " Choose A to D." : " Answer in your own words."), interruptible: true }],
    mode,
  };
}

function pickItem(
  curr: ReturnType<typeof loadCurriculum>,
  conceptId: string,
  state: EngineState,
  opts: { preferProduction?: boolean; preferMcq?: boolean; avoidId?: string; typeBias?: PracticeItem["type"][] }
): PracticeItem {
  let pool = curr.items.filter((i) => i.conceptIds.includes(conceptId));
  if (opts.typeBias?.length) {
    const biased = pool.filter((i) => opts.typeBias!.includes(i.type));
    if (biased.length) pool = biased;
  }
  if (opts.preferProduction) {
    const prod = pool.filter((i) => !i.recognition);
    if (prod.length) pool = prod;
  } else if (opts.preferMcq) {
    const useProduction = state.retrieveCount > 0 && state.retrieveCount % 6 === 5;
    const mcq = pool.filter((i) => i.type === "mcq" || i.type === "classify");
    if (!useProduction && mcq.length) pool = mcq;
  }
  pool = pool.filter((i) => i.id !== opts.avoidId && i.id !== state.lastItemId);
  const stats = state.learner.questionStats ?? {};
  const unseen = pool.filter((i) => !stats[i.id] || stats[i.id].seen === 0);
  if (unseen.length) pool = unseen;
  else {
    const failed = pool.filter((i) => stats[i.id] && !stats[i.id].lastCorrect);
    if (failed.length) pool = failed;
  }
  if (!pool.length) pool = curr.items.filter((i) => i.conceptIds.includes(conceptId) && i.type === "mcq");
  if (!pool.length) pool = curr.items.filter((i) => i.conceptIds.includes(conceptId));
  const lastType = curr.items.find((i) => i.id === state.lastItemId)?.type;
  const varied = pool.filter((i) => i.type !== lastType);
  const chosen = (varied.length ? varied : pool)[state.retrieveCount % Math.max(1, varied.length ? varied.length : pool.length)];
  return chosen ?? curr.items[0];
}

function syntheticPredict(unit: LearningUnit): PracticeItem {
  return {
    id: `pred-${unit.id}`,
    type: "prediction",
    conceptIds: unit.conceptIds,
    factIds: unit.factIds,
    skill: "know",
    recognition: false,
    prompt: unit.prediction ?? `What do you already believe about ${unit.title}?`,
    expected: [],
    rubric: unit.reading.map((r) => r.body).join(" "),
    sources: unit.reading.flatMap((r) => r.sources),
  };
}

function readSpeech(unit: LearningUnit, shortened: boolean): SpeechAct[] {
  const bodies = shortened ? unit.reading.slice(0, 1) : unit.reading;
  const hostA = bodies[0]?.body ?? unit.title;
  return [
    { kind: "narrate", text: `This unit is ${unit.title}. Stay with one idea.`, interruptible: true },
    { kind: "narrate", text: hostA.slice(0, shortened ? 400 : 900), interruptible: true },
  ];
}

function debriefSpeech(r: DebriefReport): SpeechAct[] {
  return [
    {
      kind: "narrate",
      text: `Session closed. Demonstrated: ${r.understood.map((u) => u.title).join(", ") || "nothing firmly yet"}. Next: ${r.nextFocus}`,
      interruptible: true,
    },
  ];
}

export function markRead(state: EngineState, unit: LearningUnit, now = Date.now()): EngineState {
  let learner = state.learner;
  for (const id of unit.conceptIds) learner = applyExposure(learner, id, now);
  state.log.events.push({ at: now, type: "read", conceptIds: unit.conceptIds, factIds: unit.factIds });
  return {
    ...state,
    learner,
    lastConceptIds: unique([unit.conceptIds[0], ...state.lastConceptIds]),
    introducedThisSession: unique([...state.introducedThisSession, ...unit.conceptIds]),
  };
}

export function beginGrade(
  state: EngineState,
  item: PracticeItem,
  response: string,
  latencyMs: number,
  revealed: boolean,
  now = Date.now()
): EngineState {
  const auto = grade(item, response);
  const pending: PendingGrade = { item, response, auto, latencyMs, revealed };
  state.log.events.push({
    at: now,
    type: item.type === "prediction" ? "predicted" : "answered",
    conceptIds: item.conceptIds,
    factIds: item.factIds,
    itemId: item.id,
    payload: { response, latencyMs, revealed },
  });
  return { ...state, pending, lastItemId: item.id };
}

export function endSession(state: EngineState, confidence = 3, now = Date.now()): EngineState {
  let next = state;
  if (next.pending) next = commitGrade(next, confidence, now);
  return { ...next, log: { ...next.log, endedAt: now } };
}

export function commitGrade(state: EngineState, confidence: number, now = Date.now()): EngineState {
  const pending = state.pending;
  if (!pending) return state;
  const { item, auto, latencyMs, revealed } = pending;
  if (item.type === "prediction") {
    state.log.events.push({
      at: now,
      type: "graded",
      conceptIds: item.conceptIds,
      factIds: item.factIds,
      itemId: item.id,
      payload: { confidence, prediction: true, score: auto.score },
    });
    return { ...state, pending: undefined, lastItemId: item.id, lastConceptIds: unique([...item.conceptIds, ...state.lastConceptIds]) };
  }
  let learner = state.learner;
  let errorClass: ErrorClass = "gap";
  const confused = !auto.success ? guessConfusion(item, pending.response) : undefined;
  for (const cid of item.conceptIds) {
    const res = applyRetrieval(learner, {
      conceptId: cid,
      now,
      success: auto.success,
      partial: auto.partial,
      confidence,
      latencyMs,
      recognition: item.recognition,
      confusedWith: confused ?? item.misconception,
      item,
    });
    learner = res.model;
    errorClass = res.errorClass;
    const concept = loadCurriculum().concepts.find((c) => c.id === cid);
    const scheduled = scheduleAfterRetrieval(learner.concepts[cid], {
      now,
      success: auto.success,
      errorClass,
      importance: concept?.importance ?? "supporting",
      recognition: item.recognition,
    });
    learner = { ...learner, concepts: { ...learner.concepts, [cid]: scheduled } };
  }
  if (revealed) {
    const reveal = { ...learner.revealCountByFact };
    for (const f of item.factIds) reveal[f] = (reveal[f] ?? 0) + 1;
    learner = { ...learner, revealCountByFact: reveal };
  }
  learner = { ...learner, examReadiness: { "1.1": examReadinessFor(learner) } };
  state.log.events.push({
    at: now,
    type: "graded",
    conceptIds: item.conceptIds,
    factIds: item.factIds,
    itemId: item.id,
    payload: { confidence, success: auto.success, errorClass, score: auto.score },
  });
  return {
    ...state,
    learner,
    pending: undefined,
    retrieveCount: state.retrieveCount + 1,
    lastConceptIds: unique([...item.conceptIds, ...state.lastConceptIds]),
  };
}

function guessConfusion(item: PracticeItem, response: string): string | undefined {
  const curr = loadCurriculum();
  const text = response.toLowerCase();
  for (const cid of item.conceptIds) {
    const c = curr.concepts.find((x) => x.id === cid);
    for (const other of c?.confusedWith ?? []) {
      const title = curr.concepts.find((x) => x.id === other)?.title ?? other;
      if (text.includes(other.replace(/-/g, " ")) || text.includes(title.toLowerCase().slice(0, 12))) return other;
    }
  }
  return undefined;
}

export function grade(item: PracticeItem, response: string): GradeResult {
  const text = normalise(response);
  if (item.options && item.correctIndex != null) {
    const finalIdx = matchMcqOption(item.options, text);
    const success = finalIdx === item.correctIndex;
    return {
      success,
      partial: false,
      score: success ? 1 : 0,
      matched: success ? [item.expected[0]] : [],
      missing: success ? [] : [item.expected[0]],
      note: success ? "Recognition match." : item.whyWrong?.[finalIdx] ?? "Not the sourced key.",
    };
  }
  const expected = item.expected.map(normalise).filter(Boolean);
  if (!expected.length) {
    const longEnough = text.split(/\s+/).length >= 8;
    return {
      success: longEnough,
      partial: !longEnough && text.length > 12,
      score: longEnough ? 0.6 : 0.2,
      matched: [],
      missing: [],
      note: "Prediction captured — compare with the sourced reading next. This is encoding, not mastery.",
    };
  }
  const matched = expected.filter((k) => containsKernel(text, k));
  const missing = expected.filter((k) => !containsKernel(text, k));
  const ratio = matched.length / expected.length;
  const success = ratio >= 0.6;
  const partial = !success && ratio >= 0.3;
  return {
    success,
    partial,
    score: ratio,
    matched: item.expected.filter((_, i) => containsKernel(text, expected[i])),
    missing: item.expected.filter((_, i) => !containsKernel(text, expected[i])),
    note: success
      ? "Production overlapped the sourced kernels."
      : `Missing: ${missing.slice(0, 3).join("; ") || "the sourced point"}.`,
  };
}

function containsKernel(text: string, kernel: string): boolean {
  const k = normalise(kernel);
  if (k.length < 4) return text.includes(k);
  const parts = k.split(/[^a-z0-9£.]+/).filter((p) => p.length > 2);
  const hits = parts.filter((p) => text.includes(p)).length;
  return text.includes(k) || (parts.length > 0 && hits / parts.length >= 0.6);
}

/** Letter keys only when the whole response is A–D / 1–4 — never the first letter of option prose. */
function matchMcqOption(options: string[], text: string): number {
  const exact = options.findIndex((o) => normalise(o) === text);
  if (exact >= 0) return exact;
  const compact = text.replace(/[.)\s]/g, "");
  if (/^[a-d]$/.test(compact)) return compact.charCodeAt(0) - 97;
  if (/^[1-4]$/.test(compact)) return Number(compact) - 1;
  if (/^[0-3]$/.test(compact)) return Number(compact);
  if (text.length > 8) {
    const partial = options.findIndex((o) => normalise(o).includes(text) || text.includes(normalise(o)));
    if (partial >= 0) return partial;
  }
  return -1;
}

function normalise(s: string): string {
  return s
    .toLowerCase()
    .replace(/[’']/g, "'")
    .replace(/£/g, "£")
    .replace(/,/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function unique(xs: string[]): string[] {
  return [...new Set(xs)];
}

function decide(state: EngineState, now: number, reason: string, evidence: string[], choice: string) {
  const d: PedagogicalDecision = { at: now, reason, evidence, choice, layer: "pedagogical-decision" };
  state.log.decisions.push(d);
  state.log.events.push({ at: now, type: "decision", payload: { reason, choice } });
}

export function signal(state: EngineState, s: AttentionSignal, now = Date.now()): EngineState {
  state.log.events.push({ at: now, type: "signal", payload: { signal: s } });
  return { ...state, queueHint: s };
}

export function buildDebrief(state: EngineState, now = Date.now()): DebriefReport {
  const curr = loadCurriculum();
  const understood: DebriefReport["understood"] = [];
  const uncertain: DebriefReport["uncertain"] = [];
  const misconceptions: DebriefReport["misconceptions"] = [];
  const confidentErrors: DebriefReport["confidentErrors"] = [];
  const deferred: DebriefReport["deferred"] = [];
  const reviews: DebriefReport["reviews"] = [];

  for (const e of state.log.events) {
    if (e.type === "graded" && e.payload?.errorClass === "confident-error") {
      const id = e.conceptIds?.[0];
      if (id && !confidentErrors.some((x) => x.id === id)) {
        const title = curr.concepts.find((c) => c.id === id)?.title ?? id;
        confidentErrors.push({ id, title });
      }
    }
  }
  for (const c of curr.concepts) {
    const st = recomputeMastery(state.learner.concepts[c.id] ?? emptyState(c.id), now);
    if (!st.exposures) continue;
    const title = c.title;
    if (st.confidentErrors && st.lastFailAt && now - st.lastFailAt < 24 * 3600_000) {
      if (!confidentErrors.some((x) => x.id === c.id)) confidentErrors.push({ id: c.id, title });
    }
    if (Object.keys(st.confusedWithHits).length) misconceptions.push({ id: c.id, title });
    if (st.estimatedMastery >= 0.45 && st.productionSuccesses > 0) understood.push({ id: c.id, title });
    else if (st.exposures) uncertain.push({ id: c.id, title, why: scheduleWhy(st, now) });
    if (st.nextDueAt) {
      reviews.push({ id: c.id, title, why: scheduleWhy(st, now) });
      deferred.push({ id: c.id, title, when: new Date(st.nextDueAt).toLocaleString() });
    }
  }

  const nextUnit = nextNewUnitId(state.learner);
  const nextTitle = curr.units.find((u) => u.id === nextUnit)?.title;
  const weakest = uncertain[0]?.title;
  const nextFocus = nextTitle
    ? `Open the next unencoded unit: ${nextTitle}` + (weakest ? `, after a retrieval of ${weakest}.` : ".")
    : weakest
      ? `Stay on successive relearning of ${weakest} — no new chapter until this holds after a gap.`
      : "Mixed retrieval across Chapters 1–6.";

  return {
    understood,
    uncertain,
    misconceptions,
    confidentErrors,
    deferred: deferred.slice(0, 12),
    reviews: reviews.slice(0, 12),
    outcomes: ["1.1 Describe basic features and typical cover of general insurance products (Chs 1–6)"],
    nextFocus,
    examReadiness: examReadinessFor(state.learner),
    masteryVsExam:
      "Mastery is delayed production plus repeated retrieval. Exam-readiness is a separate overlay: syllabus 1.1 is ~36/100 of IF2. Coverage stages (seen / recognised / explained / applied / held after a gap) are not collapsed into one percentage.",
    coverageRemaining: Object.values(state.learner.concepts).filter((c) => c.exposures === 0).length,
  };
}

export function activityKind(a: FocusActivity): ActivityKind {
  if (a.kind === "predict") return "predict";
  if (a.kind === "read") return "read";
  if (a.kind === "retrieve") return a.mode === "misconception" ? "distinguish" : "retrieve";
  if (a.kind === "calibrate") return "calibrate";
  return "explain";
}
