import type { ConceptState, LearnerModel } from "./types";
import { loadCurriculum } from "../curriculum/compile";

export function emptyState(conceptId: string): ConceptState {
  return {
    conceptId,
    exposures: 0,
    successfulRetrievals: 0,
    failedRetrievals: 0,
    productionSuccesses: 0,
    recognitionSuccesses: 0,
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
  };
}

export function createLearner(): LearnerModel {
  const concepts: Record<string, ConceptState> = {};
  for (const c of loadCurriculum().concepts) concepts[c.id] = emptyState(c.id);
  return {
    version: 1,
    createdAt: Date.now(),
    concepts,
    sessionCount: 0,
    recentAccuracy: [],
    revealCountByFact: {},
    examReadiness: { "1.1": 0 },
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
  const fails = state.failedRetrievals;
  const confErr = state.confidentErrors;
  const criterion = state.successiveCriterionHits;
  // Recognition is weaker evidence than production. Recency is accessibility, not mastery.
  const evidence =
    0.42 * Math.min(1, prod / 4) +
    0.18 * Math.min(1, rec / 6) +
    0.22 * Math.min(1, criterion / 3) +
    0.18 * acc;
  const penalties = Math.min(0.7, fails * 0.06 + confErr * 0.14 + state.partialFlags * 0.03);
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
  }
): { model: LearnerModel; errorClass: import("./types").ErrorClass } {
  const prev = recomputeMastery(model.concepts[args.conceptId] ?? emptyState(args.conceptId), args.now);
  const next = { ...prev };
  next.lastSeenAt = args.now;
  next.lastConfidence = args.confidence;
  next.latenciesMs = [...next.latenciesMs.slice(-20), args.latencyMs];
  next.exposures += 1;

  const highConf = args.confidence >= 4;
  const lowConf = args.confidence <= 2;
  let errorClass: import("./types").ErrorClass = "gap";

  if (args.success) {
    next.lastOutcome = args.partial ? "partial" : "success";
    next.successfulRetrievals += 1;
    next.lastSuccessAt = args.now;
    if (args.recognition) next.recognitionSuccesses += 1;
    else next.productionSuccesses += 1;
    next.accessibility = Math.min(1, 0.55 + (args.recognition ? 0.15 : 0.35));
    if (!args.recognition && !args.partial) next.successiveCriterionHits += 1;
    if (args.partial) next.partialFlags += 1;
    if (lowConf) errorClass = "low-confidence-error"; // labelled only as calibration note on success
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
    else if (args.confusedWith) errorClass = "misconception";
    else errorClass = lowConf ? "low-confidence-error" : "gap";
  }

  const concepts = { ...model.concepts, [args.conceptId]: recomputeMastery(next, args.now) };
  const recent = [...model.recentAccuracy, args.success ? 1 : 0].slice(-12);
  return { model: { ...model, concepts, recentAccuracy: recent }, errorClass };
}

export function applyExposure(model: LearnerModel, conceptId: string, now: number): LearnerModel {
  const prev = model.concepts[conceptId] ?? emptyState(conceptId);
  const next = { ...prev, exposures: prev.exposures + 1, lastSeenAt: now };
  return { ...model, concepts: { ...model.concepts, [conceptId]: next } };
}

export function examReadinessFor(model: LearnerModel): number {
  const curr = loadCurriculum();
  const cores = curr.concepts.filter((c) => c.importance === "core");
  if (!cores.length) return 0;
  let w = 0;
  let s = 0;
  for (const c of cores) {
    const st = recomputeMastery(model.concepts[c.id] ?? emptyState(c.id), Date.now());
    const examish = Math.min(st.estimatedMastery, st.recognitionSuccesses ? st.estimatedMastery : st.estimatedMastery * 0.7);
    s += examish;
    w += 1;
  }
  return w ? s / w : 0;
}

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}
