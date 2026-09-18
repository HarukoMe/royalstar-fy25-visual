import { loadCurriculum, sectionAsUnit } from "../curriculum/compile";
import {
  applyExposure,
  applyRetrieval,
  createLearner,
  emptyState,
  examReadinessFor,
  recomputeMastery,
} from "./learner";
import { nextNewSection, scheduleAfterRetrieval, scheduleWhy } from "./scheduler";
import type {
  ActivityKind,
  AttentionSignal,
  BookSection,
  ChapterId,
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
      section: BookSection;
      shortened: boolean;
      speech: SpeechAct[];
      kernel: BookSection["reading"][number];
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
  preferredChapter?: ChapterId;
  /** True when the learner picked a chapter pill — do not send them back to chapter 1. */
  chapterPinned?: boolean;
  forceSectionId?: string;
  /** Learner asked for a check on the lesson they just read. */
  wantCheck?: boolean;
  ownWords: boolean;
};

export function startSession(
  learner: LearnerModel | null,
  now = Date.now(),
  opts?: { chapter?: ChapterId }
): EngineState {
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
    preferredChapter: opts?.chapter,
    chapterPinned: Boolean(opts?.chapter),
    ownWords: false,
  };
}

function conceptChapter(conceptId: string): ChapterId | undefined {
  return loadCurriculum().concepts.find((c) => c.id === conceptId)?.chapter;
}

function itemChapter(item: PracticeItem): ChapterId | undefined {
  return item.chapter ?? conceptChapter(item.conceptIds[0] ?? "");
}

function nextLesson(state: EngineState) {
  const ch = state.preferredChapter;
  if (!ch) return nextNewSection(state.learner);
  const here = nextNewSection(state.learner, ch);
  if (here || state.chapterPinned) return here;
  return nextNewSectionForward(state.learner, ch);
}

function nextNewSectionForward(learner: LearnerModel, from: ChapterId) {
  for (const ch of [1, 2, 3, 4, 5, 6] as const) {
    if (ch <= from) continue;
    const found = nextNewSection(learner, ch);
    if (found) return found;
  }
  return null;
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

  if (state.forceSectionId) {
    const jumped = curr.sections.find((s) => s.id === state.forceSectionId);
    state.forceSectionId = undefined;
    if (jumped) {
      decide(state, now, "Opened a chosen book section", [`ch.${jumped.chapter} ${jumped.title}`], "read");
      return readAct(jumped, false);
    }
  }

  const lastIntro = state.lastConceptIds.find((id) => !state.preferredChapter || conceptChapter(id) === state.preferredChapter);
  if (state.wantCheck) {
    state.wantCheck = false;
    const cid = lastIntro ?? lastReadFacts(state)[0];
    const conceptId =
      cid && loadCurriculum().factById[cid] ? loadCurriculum().factById[cid]!.conceptId : lastIntro ?? curr.concepts[0].id;
    const item = pickItem(curr, conceptId, state, { preferMcq: true, avoidId: state.lastItemId, factIds: lastReadFacts(state) });
    decide(state, now, "Check on the lesson just read, because the learner asked", [conceptId], "retrieve");
    return retrieveAct(item, "encode", state);
  }

  const section = nextLesson(state);
  if (section) {
    const unseen = section.factIds.filter((id) => !(state.learner.seenFacts?.[id] > 0));
    if (unseen.length) {
      decide(state, now, "Read the next book section", [`ch.${section.chapter} ${section.title}`], "read");
      return readAct(section, false);
    }
    decide(state, now, "Re-read this heading — no quiz until asked", [`ch.${section.chapter} ${section.title}`], "read");
    return readAct(section, false);
  }

  // All introduced: cumulative mixed retrieval
  const weak = Object.values(state.learner.concepts)
    .filter((c) => {
      if (c.exposures === 0) return false;
      const cc = conceptChapter(c.conceptId);
      if (state.preferredChapter && cc && cc < state.preferredChapter) return false;
      return true;
    })
    .sort((a, b) => a.estimatedMastery - b.estimatedMastery)[0];
  if (weak && state.retrieveCount > 0) {
    const item = pickItem(curr, weak.conceptId, state, { preferMcq: true, avoidId: state.lastItemId });
    decide(state, now, "Curriculum exhausted for new sections — successive relearning of weakest", [weak.conceptId], "retrieve");
    return retrieveAct(item, "cumulative", state);
  }

  const report = buildDebrief(state, now);
  return { kind: "debrief", report, speech: debriefSpeech(report) };
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
    const stay =
      nextLesson(state) ??
      curr.sections.find((s) => s.chapter === state.preferredChapter) ??
      curr.sections[0];
    decide(state, now, "Stay on the book — no quiz until asked", [signal], "read");
    return readAct(stay, false);
  }
  if (signal === "rapid-answer" || signal === "guessing" || signal === "rapid-click") {
    const cid = state.lastConceptIds[0];
    const item = cid
      ? pickItem(curr, cid, state, { preferMcq: true, typeBias: ["mcq"] })
      : pickItem(curr, loadCurriculum().concepts[0].id, state, { preferMcq: true });
    decide(state, now, "Guessing pattern → lock a slower MCQ", [signal], "retrieve");
    return retrieveAct(item, "attention-switch", state);
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
      return retrieveAct(item, "misconception", state);
    }
    const section =
      curr.sections.find((s) => s.conceptIds.includes(cid ?? "") && (!state.preferredChapter || s.chapter === state.preferredChapter)) ??
      nextLesson(state) ??
      curr.sections.find((s) => s.chapter === state.preferredChapter) ??
      curr.sections[0];
    decide(state, now, "Repeated error → shortened re-reading of this section", [signal], "read");
    return readAct(section, true);
  }
  if (signal === "confidence-mismatch") {
    const tenMinAgo = now - 10 * 60 * 1000;
    const earlier = [...state.lastConceptIds].reverse().find((id) => {
      if (state.preferredChapter && conceptChapter(id) !== state.preferredChapter) return false;
      const st = state.learner.concepts[id];
      return st?.lastSeenAt && st.lastSeenAt < tenMinAgo;
    }) ?? state.lastConceptIds.find((id) => !state.preferredChapter || conceptChapter(id) === state.preferredChapter);
    if (earlier) {
      const item = pickItem(curr, earlier, state, { preferMcq: true });
      decide(state, now, "Calibration issue → MCQ on an earlier concept", [signal, earlier], "retrieve");
      return retrieveAct(item, "cumulative", state);
    }
  }
  if (signal === "reveal-repeat") {
    const cid = state.lastConceptIds[0] ?? curr.concepts[0].id;
    const item = pickItem(curr, cid, state, { preferMcq: true });
    decide(state, now, "Reveal loop → another MCQ without a peek", [signal], "retrieve");
    return retrieveAct(item, "encode", state);
  }

  const section = nextLesson(state) ?? curr.sections.find((s) => s.chapter === state.preferredChapter) ?? curr.sections[0];
  return readAct(section, true);
}

function describeAdapt(s: AttentionSignal): string {
  switch (s) {
    case "inactivity":
      return "Stay on the book — no quiz until asked";
    case "reread-loop":
      return "Stay on the same heading; no quiz until asked";
    case "rapid-answer":
    case "guessing":
    case "rapid-click":
      return "Slow the format: lock an MCQ rather than rapid tapping";
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

function followChapter(prev: ChapterId | undefined, next?: ChapterId): ChapterId | undefined {
  if (!next) return prev;
  if (!prev) return next;
  return next >= prev ? next : prev;
}

function lastReadFacts(state: EngineState): string[] {
  return [...state.log.events].reverse().find((e) => e.type === "read")?.factIds ?? [];
}

function lessonBlocks(section: BookSection, shortened: boolean): BookSection["reading"] {
  return shortened ? section.reading.slice(0, 1) : section.reading;
}

function lessonUnit(section: BookSection, blocks: BookSection["reading"], shortened: boolean): LearningUnit {
  const base = sectionAsUnit(section);
  const factIds = unique(blocks.map((b) => b.factId).filter((id): id is string => Boolean(id)));
  const curr = loadCurriculum();
  const conceptIds = unique(
    factIds.map((id) => curr.factById[id]?.conceptId).filter((id): id is string => Boolean(id))
  );
  return {
    ...base,
    conceptIds: conceptIds.length ? conceptIds : section.conceptIds,
    factIds: factIds.length ? factIds : section.factIds,
    load: shortened ? 1 : base.load,
    reading: blocks.map((r) => ({
      heading: r.heading || section.title,
      body: r.body,
      sources: r.sources,
      factId: r.factId,
      hold: r.hold,
    })),
    comparisonTable: undefined,
  };
}

function readAct(section: BookSection, shortened: boolean): FocusActivity {
  const blocks = lessonBlocks(section, shortened);
  const kernel = blocks.find((b) => b.hold) ?? blocks[0];
  return {
    kind: "read",
    unit: lessonUnit(section, blocks, shortened),
    section,
    shortened,
    kernel,
    speech: readSpeech(section, blocks, kernel),
  };
}

function retrieveAct(
  item: PracticeItem,
  mode: Extract<FocusActivity, { kind: "retrieve" }>["mode"],
  _state: EngineState
): FocusActivity {
  return {
    kind: "retrieve",
    item,
    speech: [{ kind: "ask", text: item.prompt, interruptible: true }],
    mode,
  };
}

function pickItem(
  curr: ReturnType<typeof loadCurriculum>,
  conceptId: string,
  state: EngineState,
  opts: {
    preferProduction?: boolean;
    preferMcq?: boolean;
    avoidId?: string;
    typeBias?: PracticeItem["type"][];
    factIds?: string[];
  }
): PracticeItem {
  let pool = curr.items.filter((i) => i.conceptIds.includes(conceptId));
  if (state.preferredChapter) {
    const same = pool.filter((i) => itemChapter(i) === state.preferredChapter);
    if (same.length) pool = same;
  }
  if (opts.factIds?.length) {
    const hit = pool.filter((i) => i.factIds.some((id) => opts.factIds!.includes(id)));
    const mcqHit = hit.filter((i) => i.type === "mcq" && i.options?.length === 4);
    if (mcqHit.length) pool = mcqHit;
    else if (hit.length && !opts.preferMcq) pool = hit;
  }
  if (opts.typeBias?.length) {
    const biased = pool.filter((i) => opts.typeBias!.includes(i.type));
    if (biased.length) pool = biased;
  }
  if (state.ownWords && opts.preferProduction) {
    const prod = pool.filter((i) => !i.recognition);
    if (prod.length) pool = prod;
  } else {
    const mcq = pool.filter((i) => i.type === "mcq" && i.options?.length === 4);
    if (mcq.length) pool = mcq;
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

function readSpeech(
  section: BookSection,
  blocks: BookSection["reading"],
  kernel: BookSection["reading"][number]
): SpeechAct[] {
  const hold = kernel.hold || section.lede || "";
  const acts: SpeechAct[] = [];
  if (hold) acts.push({ kind: "narrate", text: hold, interruptible: true });
  for (const block of blocks) {
    for (const para of block.body.split(/\n\n+/)) {
      const text = para.trim();
      if (text) acts.push({ kind: "narrate", text, interruptible: true });
    }
  }
  return acts;
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
  const seenFacts = { ...learner.seenFacts };
  for (const id of unit.factIds) seenFacts[id] = now;
  learner = { ...learner, seenFacts };
  for (const id of unit.conceptIds) {
    learner = applyExposure(learner, id, now);
    const st = learner.concepts[id];
    if (st && st.nextDueAt == null) {
      learner = {
        ...learner,
        concepts: { ...learner.concepts, [id]: { ...st, nextDueAt: now + 12 * 60 * 1000 } },
      };
    }
  }
  state.log.events.push({
    at: now,
    type: "read",
    conceptIds: unit.conceptIds,
    factIds: unit.factIds,
    payload: { sectionId: unit.id },
  });
  return {
    ...state,
    learner,
    preferredChapter: followChapter(state.preferredChapter, unit.chapter),
    lastConceptIds: unique([...unit.conceptIds, ...state.lastConceptIds]),
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
    preferredChapter: followChapter(state.preferredChapter, itemChapter(item)),
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

export function requestCheck(state: EngineState): EngineState {
  return { ...state, wantCheck: true };
}

export function openChapter(state: EngineState, chapter: ChapterId): EngineState {
  return {
    ...state,
    preferredChapter: chapter,
    chapterPinned: true,
    forceSectionId: undefined,
    lastConceptIds: [],
    queueHint: null,
    pending: undefined,
    wantCheck: false,
  };
}

export function openSection(state: EngineState, sectionId: string): EngineState {
  const section = loadCurriculum().sections.find((s) => s.id === sectionId);
  return {
    ...state,
    preferredChapter: section?.chapter ?? state.preferredChapter,
    chapterPinned: true,
    forceSectionId: sectionId,
    lastConceptIds: [],
    queueHint: null,
    pending: undefined,
  };
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

  const nextSection = nextNewSection(state.learner);
  const nextTitle = nextSection ? `Chapter ${nextSection.chapter} · ${nextSection.title}` : undefined;
  const weakest = uncertain[0]?.title;
  const nextFocus = nextTitle
    ? `Read the next section: ${nextTitle}.`
    : weakest
      ? `Questions are optional — Check this when you want one on ${weakest}.`
      : "Keep reading Chapters 1–6. Check this only when you want a question.";

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
