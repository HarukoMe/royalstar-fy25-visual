import { loadCurriculum } from "../curriculum/compile";
import { applyRetrieval, emptyState, examReadinessFor, recomputeMastery } from "./learner";
import type { ChapterId, ExamAttempt, LearnerModel, PracticeItem } from "./types";
import { shuffleMcq } from "./shuffle";

export type ExamMode = "drill" | "chapter" | "mixed" | "full";

export type ExamQuestion = {
  item: PracticeItem;
  displayOptions: string[];
  displayCorrect: number;
};

export type ExamState = {
  mode: ExamMode;
  chapter?: ChapterId;
  questions: ExamQuestion[];
  answers: (number | null)[];
  current: number;
  startedAt: number;
  finished: boolean;
};

export function selectExamQuestions(
  learner: LearnerModel,
  opts: { mode: ExamMode; chapter?: ChapterId; n?: number },
  now = Date.now()
): ExamQuestion[] {
  const curr = loadCurriculum();
  let pool = curr.items.filter((i) => i.type === "mcq" && i.options?.length === 4 && i.correctIndex != null);
  if (opts.mode === "chapter" && opts.chapter) pool = pool.filter((i) => i.chapter === opts.chapter);
  if (opts.mode === "drill") {
    const weak = Object.values(learner.concepts)
      .filter((c) => (c.mcqAttempts ?? 0) > 0 && c.mcqCorrect / Math.max(1, c.mcqAttempts) < 0.7)
      .map((c) => c.conceptId);
    const weakPool = pool.filter((i) => i.conceptIds.some((id) => weak.includes(id)));
    if (weakPool.length >= 4) pool = weakPool;
  }
  const stats = learner.questionStats ?? {};
  pool = [...pool].sort((a, b) => {
    const sa = stats[a.id];
    const sb = stats[b.id];
    const wa = sa ? sa.correct / sa.seen : 0.5;
    const wb = sb ? sb.correct / sb.seen : 0.5;
    const da = a.difficulty ?? 2;
    const db = b.difficulty ?? 2;
    return da - db || wa - wb;
  });
  const n = opts.n ?? (opts.mode === "full" ? 36 : opts.mode === "mixed" ? 12 : opts.mode === "chapter" ? 10 : 6);
  const seenStems = new Set<string>();
  const picked: PracticeItem[] = [];
  const mixMastered = pool.filter((i) => (stats[i.id]?.correct ?? 0) > 0);
  const mixWeak = pool.filter((i) => !stats[i.id] || stats[i.id].lastCorrect === false);
  const interleaved = [];
  const max = Math.max(mixMastered.length, mixWeak.length, pool.length);
  for (let i = 0; i < max; i++) {
    if (mixWeak[i]) interleaved.push(mixWeak[i]);
    if (opts.mode !== "drill" && mixMastered[i]) interleaved.push(mixMastered[i]);
  }
  const source = interleaved.length ? interleaved : pool;
  for (const item of source) {
    const stem = item.prompt.trim().toLowerCase();
    if (seenStems.has(stem)) continue;
    seenStems.add(stem);
    picked.push(item);
    if (picked.length >= n) break;
  }
  while (picked.length < Math.min(n, pool.length)) {
    const extra = pool.find((p) => !picked.includes(p));
    if (!extra) break;
    picked.push(extra);
  }
  return picked.map((item) => {
    const sh = shuffleMcq(item.options!, item.correctIndex!);
    return { item, displayOptions: sh.options, displayCorrect: sh.correctIndex };
  });
}

export function startExam(learner: LearnerModel, opts: { mode: ExamMode; chapter?: ChapterId; n?: number }): ExamState {
  const questions = selectExamQuestions(learner, opts);
  return {
    mode: opts.mode,
    chapter: opts.chapter,
    questions,
    answers: questions.map(() => null),
    current: 0,
    startedAt: Date.now(),
    finished: false,
  };
}

export function finishExam(learner: LearnerModel, exam: ExamState): { learner: LearnerModel; attempt: ExamAttempt; byConcept: Record<string, { n: number; correct: number }> } {
  const byConcept: Record<string, { n: number; correct: number }> = {};
  let correct = 0;
  const finishedAt = Date.now();
  let next = learner;
  exam.questions.forEach((q, i) => {
    const ok = exam.answers[i] === q.displayCorrect;
    if (ok) correct += 1;
    for (const cid of q.item.conceptIds) {
      const row = byConcept[cid] ?? { n: 0, correct: 0 };
      row.n += 1;
      if (ok) row.correct += 1;
      byConcept[cid] = row;
      const res = applyRetrieval(next, {
        conceptId: cid,
        now: finishedAt,
        success: ok,
        partial: false,
        confidence: 3,
        latencyMs: 0,
        recognition: true,
        item: q.item,
      });
      next = res.model;
    }
  });
  const attempt: ExamAttempt = {
    id: `exam-${exam.startedAt}`,
    at: finishedAt,
    mode: exam.mode,
    n: exam.questions.length,
    correct,
    chapter: exam.chapter,
    byConcept,
  };
  next = { ...next, examAttempts: [...(next.examAttempts ?? []), attempt] };
  next = { ...next, examReadiness: { "1.1": examReadinessFor(next) } };
  return { learner: next, attempt, byConcept };
}

export function chapterReadiness(learner: LearnerModel, chapter: ChapterId, now = Date.now()) {
  const curr = loadCurriculum();
  const concepts = curr.concepts.filter((c) => c.chapter === chapter);
  if (!concepts.length) return 0;
  let s = 0;
  for (const c of concepts) {
    const st = recomputeMastery(learner.concepts[c.id] ?? emptyState(c.id), now);
    s += 0.6 * Math.min(1, st.mcqCorrect / 2) + 0.4 * st.estimatedMastery;
  }
  return s / concepts.length;
}
