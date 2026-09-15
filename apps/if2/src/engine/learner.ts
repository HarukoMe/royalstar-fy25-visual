import type { ConceptState, LearnerModel, PracticeItem } from "./types";
import { loadCurriculum } from "../curriculum/compile";

export function emptyState(conceptId: string): ConceptState {
  return {
    conceptId,
    exposures: 0,
    successfulRetrievals: 0,
    failedRetrievals: 0,
    productionSuccesses: 0,
    recognitionSuccesses: 0,
    mcqAttempts: 0,
    mcqCorrect: 0,
    recallAttempts: 0,
    recallCorrect: 0,
    applicationAttempts: 0,
    applicationCorrect: 0,
    itemsAttempted: [],
    firstSeenAt: null,
    firstSuccessAt: null,
    explainedAt: null,
    partialFlags: 0,
    confidentErrors: 0,
    lastConfidence: null,
    lastOutcome: null,
    lastSeenAt: null,
    lastSuccessAt: null,
    lastFailAt: null,
    latenciesMs: [],
    confusedWithHits: {},
    estimatedMastery: 0,
    accessibility: 0,
    nextDueAt: null,
    intervalDays: 0,
    successiveCriterionHits: 0,
    delayedSuccesses: 0,
  };
}

function hydrate(raw: Partial<ConceptState> | undefined, id: string): ConceptState {
  return { ...emptyState(id), ...raw, conceptId: id, itemsAttempted: raw?.itemsAttempted ?? [] };
}

export function createLearner(): LearnerModel {
  const concepts: Record<string, ConceptState> = {};
  for (const c of loadCurriculum().concepts) concepts[c.id] = emptyState(c.id);
  return {
    version: 2,
    createdAt: Date.now(),
    concepts,
    sessionCount: 0,
    recentAccuracy: [],
    revealCountByFact: {},
    examReadiness: { "1.1": 0 },
    questionStats: {},
    examAttempts: [],
  };
}

export function decayAccessibility(state: ConceptState, now: number): number {
  if (!state.lastSuccessAt) return 0;
  const hours = (now - state.lastSuccessAt) / 3_600_000;
  return state.accessibility * Math.exp(-hours / 18);
}

export function recomputeMastery(state: ConceptState, now: number): ConceptState {
  const acc = decayAccessibility(state, now);
  const prod = state.productionSuccesses;
  const rec = state.recognitionSuccesses;
  const mcq = state.mcqCorrect;
  const fails = state.failedRetrievals;
  const confErr = state.confidentErrors;
  const criterion = state.successiveCriterionHits;
  const delayed = state.delayedSuccesses;
  const evidence =
    0.28 * Math.min(1, prod / 4) +
    0.16 * Math.min(1, rec / 6) +
    0.18 * Math.min(1, mcq / 4) +
    0.18 * Math.min(1, criterion / 3) +
    0.12 * Math.min(1, delayed / 2) +
    0.08 * acc;
  const penalties = Math.min(0.7, fails * 0.05 + confErr * 0.14 + state.partialFlags * 0.03);
  const estimatedMastery = clamp(evidence - penalties, 0, 1);
  return { ...state, accessibility: acc, estimatedMastery };
}

export function applyRetrieval(
  model: LearnerModel,
  args: {
    conceptId: string;
    now: number;
    success: boolean;
    partial: boolean;
    confidence: number;
    latencyMs: number;
    recognition: boolean;
    confusedWith?: string;
    item?: PracticeItem;
  }
): { model: LearnerModel; errorClass: import("./types").ErrorClass } {
  const prev = recomputeMastery(hydrate(model.concepts[args.conceptId], args.conceptId), args.now);
  const next = { ...prev };
  next.lastSeenAt = args.now;
  next.lastConfidence = args.confidence;
  next.latenciesMs = [...next.latenciesMs.slice(-20), args.latencyMs];
  next.exposures += 1;
  if (!next.firstSeenAt) next.firstSeenAt = args.now;
  if (args.item && !next.itemsAttempted.includes(args.item.id)) {
    next.itemsAttempted = [...next.itemsAttempted, args.item.id].slice(-40);
  }

  const item = args.item;
  const isMcq = item?.type === "mcq" || item?.type === "classify";
  const isApply = item?.cognitive === "application" || item?.type === "scenario" || item?.questionKind === "scenario";
  const isRecall =
    item?.type === "free-recall" || item?.type === "teach-back" || item?.type === "cloze" || item?.type === "summary";

  if (isMcq) next.mcqAttempts += 1;
  if (isRecall) next.recallAttempts += 1;
  if (isApply) next.applicationAttempts += 1;

  const highConf = args.confidence >= 4;
  const lowConf = args.confidence <= 2;
  let errorClass: import("./types").ErrorClass = "gap";

  if (args.success) {
    next.lastOutcome = args.partial ? "partial" : "success";
    next.successfulRetrievals += 1;
    next.lastSuccessAt = args.now;
    if (!next.firstSuccessAt) next.firstSuccessAt = args.now;
    else if (args.now - next.firstSuccessAt >= 12 * 3600_000) next.delayedSuccesses += 1;
    if (args.recognition) next.recognitionSuccesses += 1;
    else next.productionSuccesses += 1;
    if (isMcq) next.mcqCorrect += 1;
    if (isRecall && args.success) next.recallCorrect += 1;
    if (isApply) next.applicationCorrect += 1;
    next.accessibility = Math.min(1, 0.55 + (args.recognition ? 0.15 : 0.35));
    if (!args.recognition && !args.partial) next.successiveCriterionHits += 1;
    if (isMcq && !args.partial) next.successiveCriterionHits += 0; // MCQ success is recognition, not production criterion
    if (args.partial) next.partialFlags += 1;
    if (lowConf) errorClass = "low-confidence-error";
  } else {
    next.lastOutcome = "fail";
    next.failedRetrievals += 1;
    next.lastFailAt = args.now;
    next.successiveCriterionHits = 0;
    next.accessibility = Math.max(0, next.accessibility * 0.4);
    if (args.confusedWith) {
      next.confusedWithHits[args.confusedWith] = (next.confusedWithHits[args.confusedWith] ?? 0) + 1;
    }
    const previouslyStrong = prev.estimatedMastery > 0.55 && args.latencyMs < 4000 && !highConf;
    if (highConf) {
      errorClass = "confident-error";
      next.confidentErrors += 1;
    } else if (previouslyStrong) errorClass = "slip";
    else if (args.confusedWith || item?.misconception) errorClass = "misconception";
    else errorClass = lowConf ? "low-confidence-error" : "gap";
  }

  let questionStats = model.questionStats ?? {};
  if (item) {
    const prevQ = questionStats[item.id] ?? { seen: 0, correct: 0, lastAt: 0, lastCorrect: false };
    questionStats = {
      ...questionStats,
      [item.id]: {
        seen: prevQ.seen + 1,
        correct: prevQ.correct + (args.success ? 1 : 0),
        lastAt: args.now,
        lastCorrect: args.success,
      },
    };
  }

  const concepts = { ...model.concepts, [args.conceptId]: recomputeMastery(next, args.now) };
  const recent = [...model.recentAccuracy, args.success ? 1 : 0].slice(-12);
  return {
    model: { ...model, concepts, recentAccuracy: recent, questionStats },
    errorClass,
  };
}

export function applyExposure(model: LearnerModel, conceptId: string, now: number): LearnerModel {
  const prev = hydrate(model.concepts[conceptId], conceptId);
  const next = {
    ...prev,
    exposures: prev.exposures + 1,
    lastSeenAt: now,
    firstSeenAt: prev.firstSeenAt ?? now,
    explainedAt: prev.explainedAt ?? now,
  };
  return { ...model, concepts: { ...model.concepts, [conceptId]: next } };
}

export function examReadinessFor(model: LearnerModel): number {
  const curr = loadCurriculum();
  const cores = curr.concepts.filter((c) => c.importance === "core");
  if (!cores.length) return 0;
  let w = 0;
  let s = 0;
  for (const c of cores) {
    const st = recomputeMastery(hydrate(model.concepts[c.id], c.id), Date.now());
    const mcq = Math.min(1, st.mcqCorrect / 3);
    const delayed = Math.min(1, st.delayedSuccesses / 2);
    const examish = 0.55 * mcq + 0.25 * st.estimatedMastery + 0.2 * delayed;
    s += examish;
    w += 1;
  }
  return w ? s / w : 0;
}

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

export function hydrateLearner(raw: LearnerModel): LearnerModel {
  const fresh = createLearner();
  const concepts: Record<string, ConceptState> = { ...fresh.concepts };
  for (const [id, st] of Object.entries(raw.concepts ?? {})) {
    concepts[id] = hydrate(st, id);
  }
  return {
    ...fresh,
    ...raw,
    version: 2,
    concepts,
    questionStats: raw.questionStats ?? {},
    examAttempts: raw.examAttempts ?? [],
  };
}
