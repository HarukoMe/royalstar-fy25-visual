import type { AttentionSignal, SessionEvent } from "./types";

export type AttentionSnapshot = {
  idleMs: number;
  lastAnswerMs: number | null;
  rapidStreak: number;
  failStreak: number;
  revealStreak: number;
  rereadCount: number;
  accuracyWindow: number[];
  clickBurst: number;
};

export function emptyAttention(): AttentionSnapshot {
  return {
    idleMs: 0,
    lastAnswerMs: null,
    rapidStreak: 0,
    failStreak: 0,
    revealStreak: 0,
    rereadCount: 0,
    accuracyWindow: [],
    clickBurst: 0,
  };
}

export function noteAnswer(
  att: AttentionSnapshot,
  latencyMs: number,
  correct: boolean,
  revealed: boolean
): { att: AttentionSnapshot; signals: AttentionSignal[] } {
  const signals: AttentionSignal[] = [];
  const next = { ...att, accuracyWindow: [...att.accuracyWindow, correct ? 1 : 0].slice(-8) };
  next.lastAnswerMs = latencyMs;
  if (latencyMs < 1100) {
    next.rapidStreak += 1;
    if (next.rapidStreak >= 2) signals.push("rapid-answer");
    if (next.rapidStreak >= 3 && next.accuracyWindow.slice(-3).some((x) => x === 0)) signals.push("guessing");
  } else next.rapidStreak = 0;
  if (!correct) {
    next.failStreak += 1;
    if (next.failStreak >= 2) signals.push("repeated-error");
  } else next.failStreak = 0;
  if (revealed) {
    next.revealStreak += 1;
    if (next.revealStreak >= 2) signals.push("reveal-repeat");
  } else next.revealStreak = 0;
  const win = next.accuracyWindow;
  if (win.length >= 6) {
    const first = win.slice(0, 3).reduce((a, b) => a + b, 0);
    const last = win.slice(-3).reduce((a, b) => a + b, 0);
    if (first >= 2 && last === 0) signals.push("accuracy-drop");
  }
  if (latencyMs > 90_000) signals.push("slow-latency");
  return { att: next, signals };
}

export function noteIdle(att: AttentionSnapshot, idleMs: number): { att: AttentionSnapshot; signals: AttentionSignal[] } {
  const signals: AttentionSignal[] = [];
  if (idleMs > 45_000) signals.push("inactivity");
  return { att: { ...att, idleMs }, signals };
}

export function noteReread(att: AttentionSnapshot): { att: AttentionSnapshot; signals: AttentionSignal[] } {
  const rereadCount = att.rereadCount + 1;
  const signals: AttentionSignal[] = rereadCount >= 3 ? ["reread-loop"] : [];
  return { att: { ...att, rereadCount }, signals };
}

export function noteClicks(att: AttentionSnapshot, clicksIn2s: number): { att: AttentionSnapshot; signals: AttentionSignal[] } {
  const signals: AttentionSignal[] = clicksIn2s >= 6 ? ["rapid-click"] : [];
  return { att: { ...att, clickBurst: clicksIn2s }, signals };
}

export function confidenceMismatch(confidence: number, correct: boolean): AttentionSignal | null {
  if (correct && confidence <= 2) return "confidence-mismatch";
  if (!correct && confidence >= 4) return "confidence-mismatch";
  return null;
}

export function summariseSignals(events: SessionEvent[]): AttentionSignal[] {
  return events.filter((e) => e.type === "signal").map((e) => e.payload?.signal as AttentionSignal);
}
