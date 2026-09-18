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

export type ProgressBundle = {
  v: 1;
  exportedAt: number;
  learner: LearnerModel;
  sessions: SessionLog[];
};

export function exportProgress(): ProgressBundle {
  return {
    v: 1,
    exportedAt: Date.now(),
    learner: loadLearner(),
    sessions: loadSessions(),
  };
}

export function importProgress(raw: unknown): { ok: true } | { ok: false; error: string } {
  try {
    const data = raw as ProgressBundle;
    if (!data || data.v !== 1 || !data.learner) return { ok: false, error: "Not an IF2 Conduct backup." };
    saveLearner(hydrateLearner(data.learner));
    const sessions = Array.isArray(data.sessions) ? data.sessions : [];
    localStorage.setItem(SKEY, JSON.stringify(sessions.slice(-40)));
    return { ok: true };
  } catch {
    return { ok: false, error: "Could not read that file." };
  }
}

export function downloadProgress() {
  const blob = new Blob([JSON.stringify(exportProgress(), null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `if2-conduct-progress-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}
