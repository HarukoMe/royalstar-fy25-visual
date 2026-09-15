import type { LearnerModel, SessionLog } from "./engine/types";
import { createLearner } from "./engine/learner";

const LKEY = "if2-conduct-learner-v1";
const SKEY = "if2-conduct-sessions-v1";

export function loadLearner(): LearnerModel {
  try {
    const raw = localStorage.getItem(LKEY);
    if (!raw) return createLearner();
    const parsed = JSON.parse(raw) as LearnerModel;
    const fresh = createLearner();
    return {
      ...fresh,
      ...parsed,
      concepts: { ...fresh.concepts, ...parsed.concepts },
    };
  } catch {
    return createLearner();
  }
}

export function saveLearner(model: LearnerModel) {
  localStorage.setItem(LKEY, JSON.stringify(model));
}

export function loadSessions(): SessionLog[] {
  try {
    return JSON.parse(localStorage.getItem(SKEY) || "[]");
  } catch {
    return [];
  }
}

export function saveSession(log: SessionLog) {
  const all = loadSessions().filter((s) => s.id !== log.id);
  all.push(log);
  localStorage.setItem(SKEY, JSON.stringify(all.slice(-40)));
}

export function resetLearner() {
  localStorage.removeItem(LKEY);
  localStorage.removeItem(SKEY);
}
