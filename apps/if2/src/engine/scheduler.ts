import { loadCurriculum } from "../curriculum/compile";
import { emptyState, recomputeMastery } from "./learner";
import type { BookSection, ChapterId, ConceptState, LearnerModel } from "./types";

const DAY = 86_400_000;

export function scheduleAfterRetrieval(
  state: ConceptState,
  args: {
    now: number;
    success: boolean;
    errorClass: import("./types").ErrorClass;
    importance: "core" | "supporting" | "detail";
    recognition: boolean;
  }
): ConceptState {
  const next = { ...state };
  if (!args.success) {
    if (args.errorClass === "confident-error" || args.errorClass === "misconception") {
      next.intervalDays = 0.04; // ~1 hour — return same day / next session soon
      next.nextDueAt = args.now + 40 * 60 * 1000;
    } else if (args.errorClass === "slip") {
      next.intervalDays = 0.3;
      next.nextDueAt = args.now + 6 * 60 * 60 * 1000;
    } else {
      next.intervalDays = 0.08;
      next.nextDueAt = args.now + 2 * 60 * 60 * 1000;
    }
    return next;
  }

  // Success within working memory is not mastery.
  const minutesSincePrev = state.lastSuccessAt ? (args.now - state.lastSuccessAt) / 60000 : 999;
  const stillHot = minutesSincePrev < 12;
  const criterion = next.successiveCriterionHits;
  const importanceBoost = args.importance === "core" ? 0.85 : args.importance === "supporting" ? 1 : 1.15;
  const recognitionPenalty = args.recognition ? 0.55 : 1;

  if (stillHot && criterion < 2) {
    next.intervalDays = 0.01; // ~15 minutes intra-session reappearance, then tomorrow
    next.nextDueAt = args.now + 12 * 60 * 1000;
    return next;
  }

  let days = 0.8;
  if (criterion >= 2) days = 2;
  if (criterion >= 3) days = 6;
  if (next.estimatedMastery > 0.7 && criterion >= 3) days = 10;
  days *= importanceBoost * recognitionPenalty;
  if (next.confidentErrors > 0) days *= 0.5;
  next.intervalDays = days;
  next.nextDueAt = args.now + days * DAY;
  return next;
}

export function dueConceptIds(model: LearnerModel, now: number): string[] {
  const curr = loadCurriculum();
  const scored: { id: string; score: number }[] = [];
  for (const c of curr.concepts) {
    const st = recomputeMastery(model.concepts[c.id] ?? emptyState(c.id), now);
    if (st.exposures === 0) continue;
    const due = st.nextDueAt !== null && st.nextDueAt <= now;
    const forgotten = st.estimatedMastery > 0.2 && st.accessibility < 0.15 && st.lastSuccessAt && now - st.lastSuccessAt > DAY;
    if (due || forgotten || st.confidentErrors > 0 && (st.nextDueAt ?? 0) <= now) {
      const exam = c.importance === "core" ? 3 : 1;
      const risk = 1 - st.estimatedMastery + (st.confidentErrors ? 0.4 : 0);
      scored.push({ id: c.id, score: exam * risk });
    }
  }
  return scored.sort((a, b) => b.score - a.score).map((s) => s.id);
}

export function nextNewUnitId(model: LearnerModel): string | null {
  return nextNewSection(model)?.id ?? null;
}

export function nextNewSection(model: LearnerModel, chapter?: ChapterId): BookSection | null {
  const { sections, concepts, factById } = loadCurriculum();
  const conceptById = Object.fromEntries(concepts.map((c) => [c.id, c]));
  const seenFact = (id: string) => (model.seenFacts?.[id] ?? 0) > 0;
  const masteredEnough = (id: string) =>
    (model.concepts[id]?.estimatedMastery ?? 0) >= 0.25 || (model.concepts[id]?.exposures ?? 0) >= 1;

  const pickFrom = (ch: ChapterId, ignorePrereq: boolean): BookSection | null => {
    for (const s of sections.filter((sec) => sec.chapter === ch)) {
      const unseenFacts = s.factIds.filter((id) => !seenFact(id));
      if (!unseenFacts.length) continue;
      if (ignorePrereq) return s;
      const prereqOk = unseenFacts.every((fid) => {
        const cid = factById[fid]?.conceptId;
        return (conceptById[cid ?? ""]?.prerequisites ?? []).every(masteredEnough);
      });
      if (prereqOk) return s;
    }
    return null;
  };

  if (chapter) {
    return pickFrom(chapter, true) ?? sections.find((s) => s.chapter === chapter) ?? nextNewSection(model);
  }
  for (const ch of [1, 2, 3, 4, 5, 6] as const) {
    const found = pickFrom(ch, false);
    if (found) return found;
  }
  return null;
}

export function scheduleWhy(state: ConceptState, now: number): string {
  if (!state.nextDueAt) return "Not yet scheduled — still being encoded.";
  const hours = Math.round((state.nextDueAt - now) / 3_600_000);
  if (state.successiveCriterionHits < 2) {
    return `Returns soon (${hours}h): only short-term accessibility so far, not successive relearning.`;
  }
  if (state.confidentErrors) {
    return `Returns on a short leash because of a confident error — those traces are sticky if left.`;
  }
  return `Next retrieval in about ${hours} hours, scaled by demonstrated production success.`;
}
