import type { AuthoredFact, Concept, ConceptState, CoverageFlags, LearnerModel } from "./types";
import { emptyState, recomputeMastery } from "./learner";

const DAY = 86_400_000;

export function coverageOf(state: ConceptState, now = Date.now()): CoverageFlags {
  const encountered = state.exposures > 0 || Boolean(state.firstSeenAt);
  const introduced = encountered;
  const explained = Boolean(state.explainedAt) || state.exposures > 0;
  const retrieved = state.successfulRetrievals + state.failedRetrievals > 0;
  const applied = state.applicationAttempts > 0;
  const revisitedAfterDelay =
    Boolean(state.firstSuccessAt) &&
    Boolean(state.lastSuccessAt) &&
    state.lastSuccessAt! - state.firstSuccessAt! >= 12 * 3600_000 &&
    state.delayedSuccesses > 0;
  const recognized = state.mcqCorrect > 0 || state.recognitionSuccesses > 0;
  const explainedInOwnWords = state.recallCorrect > 0 || state.productionSuccesses > 0;
  const mcqReady = state.mcqCorrect >= 2 && state.successiveCriterionHits >= 1;
  return {
    encountered,
    introduced,
    explained,
    retrieved,
    applied,
    revisitedAfterDelay,
    recognized,
    explainedInOwnWords,
    mcqReady,
  };
}

export function coverageLabel(flags: CoverageFlags): string {
  if (flags.revisitedAfterDelay && flags.mcqReady) return "Holds after a gap";
  if (flags.applied && flags.recognized) return "Can apply";
  if (flags.explainedInOwnWords) return "Can explain";
  if (flags.recognized) return "Can recognise";
  if (flags.retrieved) return "Attempted retrieval";
  if (flags.explained) return "Seen / explained";
  if (flags.encountered) return "Encountered";
  return "Not yet in the journey";
}

export function conceptNeedsMoreEncoding(state: ConceptState): boolean {
  const flags = coverageOf(state);
  if (!flags.explained) return true;
  if (!flags.retrieved) return true;
  if (state.mcqAttempts < 1) return true;
  if ((state.itemsAttempted?.length ?? 0) < 2) return true;
  if (state.successfulRetrievals < 1) return true;
  return false;
}

export function auditCurriculum(
  concepts: Concept[],
  facts: AuthoredFact[],
  items: { conceptIds: string[]; type: string }[],
  model: LearnerModel,
  now = Date.now()
) {
  const factsByConcept = new Map<string, number>();
  for (const f of facts) factsByConcept.set(f.conceptId, (factsByConcept.get(f.conceptId) ?? 0) + 1);
  const mcqByConcept = new Map<string, number>();
  for (const i of items) {
    if (i.type !== "mcq") continue;
    for (const id of i.conceptIds) mcqByConcept.set(id, (mcqByConcept.get(id) ?? 0) + 1);
  }
  const rows = concepts.map((c) => {
    const st = recomputeMastery(model.concepts[c.id] ?? emptyState(c.id), now);
    const flags = coverageOf(st, now);
    return {
      id: c.id,
      title: c.title,
      chapter: c.chapter,
      factCount: factsByConcept.get(c.id) ?? 0,
      mcqCount: mcqByConcept.get(c.id) ?? 0,
      flags,
      label: coverageLabel(flags),
      mastery: st.estimatedMastery,
      nextDueAt: st.nextDueAt,
    };
  });
  const missingMcq = rows.filter((r) => r.mcqCount < 2);
  const unfinished = rows.filter((r) => !r.flags.revisitedAfterDelay);
  return {
    conceptCount: rows.length,
    missingMcq,
    unfinishedCount: unfinished.length,
    journeyHoursEstimate: Math.round(rows.length * 0.35),
    rows,
  };
}

export function forgettingRisk(state: ConceptState, now: number): number {
  if (!state.lastSuccessAt) return state.exposures ? 0.7 : 1;
  const days = (now - state.lastSuccessAt) / DAY;
  const due = state.nextDueAt ? Math.max(0, (now - state.nextDueAt) / DAY) : 0;
  return Math.min(1, 0.2 * days + 0.4 * due + 0.25 * state.confidentErrors + (1 - state.estimatedMastery) * 0.3);
}
