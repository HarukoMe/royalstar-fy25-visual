import type { LearnerModel, SessionLog } from "./engine/types";
import { createLearner, hydrateLearner } from "./engine/learner";

const LKEY = "if2-conduct-learner-v2";
const LKEY_OLD = "if2-conduct-learner-v1";
const SKEY = "if2-conduct-sessions-v1";

export function loadLearner(): LearnerModel {
  try {
    const raw = localStorage.getItem(LKEY) || localStorage.getItem(LKEY_OLD);
    if (!raw) return createLearner();
    return hydrateLearner(JSON.parse(raw) as LearnerModel);
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
  localStorage.removeItem(LKEY_OLD);
  localStorage.removeItem(SKEY);
}
