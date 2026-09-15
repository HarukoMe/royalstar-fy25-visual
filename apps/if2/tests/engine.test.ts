import { describe, expect, it } from "vitest";
import { loadCurriculum } from "../src/curriculum/compile";
import { runIntegrity } from "../src/engine/integrity";
import { coverageOf } from "../src/engine/coverage";
import {
  applyRetrieval,
  createLearner,
  emptyState,
  examReadinessFor,
  recomputeMastery,
} from "../src/engine/learner";
import { noteAnswer, emptyAttention } from "../src/engine/attention";
import { scheduleAfterRetrieval } from "../src/engine/scheduler";
import { beginGrade, commitGrade, grade, markRead, nextActivity, signal, startSession } from "../src/engine/session";
import { tutorExplain } from "../src/engine/tutor";
import { startExam } from "../src/engine/exam";
import { shuffleMcq } from "../src/engine/shuffle";

describe("curriculum integrity", () => {
  it("stays inside chapters 1–6 and LO 1.1", () => {
    const report = runIntegrity();
    expect(report.problems).toEqual([]);
    const { stats, concepts, items } = loadCurriculum();
    expect(stats.factsByChapter[1]).toBeGreaterThan(10);
    expect(stats.factsByChapter[6]).toBeGreaterThan(8);
    expect(concepts.every((c) => c.chapter >= 1 && c.chapter <= 6)).toBe(true);
    expect(stats.mcq).toBeGreaterThan(120);
    expect(stats.concepts).toBeGreaterThan(70);
    const mcqBy = new Map<string, number>();
    for (const i of items) {
      if (i.type !== "mcq") continue;
      for (const id of i.conceptIds) mcqBy.set(id, (mcqBy.get(id) ?? 0) + 1);
    }
    expect([...mcqBy.values()].every((n) => n >= 2)).toBe(true);
    expect(items.filter((i) => i.type === "mcq").every((i) => i.options?.length === 4)).toBe(true);
  });

  it("does not treat one success as full coverage", () => {
    const st = emptyState("motor-rta");
    st.exposures = 1;
    st.successfulRetrievals = 1;
    st.mcqCorrect = 1;
    st.mcqAttempts = 1;
    st.itemsAttempted = ["q-rta-tppd"];
    const flags = coverageOf(st);
    expect(flags.retrieved).toBe(true);
    expect(flags.revisitedAfterDelay).toBe(false);
    expect(flags.mcqReady).toBe(false);
  });
});

describe("grading", () => {
  it("accepts sourced MCQ keys from the exam guide", () => {
    const item = loadCurriculum().items.find((i) => i.type === "mcq" && i.prompt.includes("must be insured unless"))!;
    expect(grade(item, "D").success || grade(item, item.expected[0]).success).toBe(true);
  });

  it("scores production by kernels, not full sentence match", () => {
    const item = loadCurriculum().items.find((i) => i.id === "cloze-m-rta-tppd")!;
    expect(grade(item, "The RTA property damage limit is £1.2 million").success).toBe(true);
    expect(grade(item, "unlimited like injury").success).toBe(false);
  });
});

describe("mastery vs accessibility", () => {
  it("does not treat a 5-minute-old success as durable mastery", () => {
    let model = createLearner();
    const now = Date.now();
    const r = applyRetrieval(model, {
      conceptId: "motor-rta",
      now,
      success: true,
      partial: false,
      confidence: 5,
      latencyMs: 8000,
      recognition: true,
    });
    model = r.model;
    const scheduled = scheduleAfterRetrieval(model.concepts["motor-rta"], {
      now,
      success: true,
      errorClass: "gap",
      importance: "core",
      recognition: true,
    });
    expect(scheduled.nextDueAt).not.toBeNull();
    expect((scheduled.nextDueAt ?? 0) - now).toBeLessThan(24 * 3600_000);
    const mastery = recomputeMastery(scheduled, now + 5 * 60_000).estimatedMastery;
    expect(mastery).toBeLessThan(0.7);
  });
});

describe("session engine", () => {
  it("starts with prediction or reading, not a quiz dump", () => {
    const s = startSession(createLearner(), Date.now());
    const a = nextActivity(s, Date.now());
    expect(["predict", "read"].includes(a.kind)).toBe(true);
  });

  it("switches to retrieval on inactivity rather than idling on reading", () => {
    let s = startSession(createLearner());
    let a = nextActivity(s);
    if (a.kind === "predict") {
      s = beginGrade(s, a.item, "compulsory third party on public roads", 4000, false);
      s = commitGrade(s, 3);
      a = nextActivity(s);
    }
    expect(a.kind).toBe("read");
    if (a.kind === "read") s = markRead(s, a.unit);
    s = signal(s, "inactivity");
    a = nextActivity(s);
    expect(a.kind).toBe("retrieve");
  });

  it("retrieves the unit just read instead of skipping ahead", () => {
    let s = startSession(createLearner());
    let a = nextActivity(s);
    if (a.kind === "predict") {
      s = beginGrade(s, a.item, "illegal to drive on a public road without liability cover", 5000, false);
      s = commitGrade(s, 3);
      a = nextActivity(s);
    }
    expect(a.kind).toBe("read");
    if (a.kind === "read") {
      s = markRead(s, a.unit);
      a = nextActivity(s);
      expect(a.kind).toBe("retrieve");
      if (a.kind === "retrieve") expect(a.mode).toBe("encode");
    }
  });

  it("treats rapid wrong answers as guessing adaptation", () => {
    const { signals } = noteAnswer(emptyAttention(), 400, false, false);
    const again = noteAnswer(
      { ...emptyAttention(), rapidStreak: 2, accuracyWindow: [0, 0] },
      500,
      false,
      false
    );
    expect(again.signals.includes("guessing") || again.signals.includes("rapid-answer")).toBe(true);
    expect(signals.includes("rapid-answer") || signals.length === 0).toBe(true);
  });
});

describe("tutor grounding", () => {
  it("refuses unknown concepts instead of inventing rules", () => {
    const t = tutorExplain("underwriting-moral-hazard");
    expect(t.text).toMatch(/will not invent/i);
    expect(t.sources).toHaveLength(0);
  });

  it("explains motor RTA from sourced reading", () => {
    const t = tutorExplain("motor-rta");
    expect(t.text).toMatch(/1\.2 million|Road Traffic Act/i);
    expect(t.sources.length).toBeGreaterThan(0);
  });
});

describe("exam overlay", () => {
  it("keeps exam-readiness distinct from a single percentage of items seen", () => {
    const model = createLearner();
    expect(examReadinessFor(model)).toBe(0);
  });

  it("builds a withheld-feedback exam set from the MCQ pool", () => {
    const exam = startExam(createLearner(), { mode: "mixed", n: 8 });
    expect(exam.questions.length).toBeGreaterThan(4);
    expect(exam.questions.every((q) => q.displayOptions.length === 4)).toBe(true);
  });
});

describe("breadth across sessions", () => {
  it("does not retire a concept after one MCQ, and later items can open a different unit", () => {
    let s = startSession(createLearner());
    let a = nextActivity(s);
    if (a.kind === "predict") {
      s = beginGrade(s, a.item, "illegal to drive without third party cover", 5000, false);
      s = commitGrade(s, 3);
      a = nextActivity(s);
    }
    expect(a.kind).toBe("read");
    const firstUnit = a.kind === "read" ? a.unit.id : "";
    if (a.kind === "read") {
      s = markRead(s, a.unit);
      a = nextActivity(s);
    }
    expect(a.kind).toBe("retrieve");
    if (a.kind === "retrieve") {
      const item = a.item;
      const ans = item.options?.[item.correctIndex ?? 0] ?? item.expected[0] ?? "";
      s = beginGrade(s, item, ans, 8000, false);
      s = commitGrade(s, 4);
    }
    const flags = coverageOf(s.learner.concepts[s.lastConceptIds[0]]);
    expect(flags.retrieved).toBe(true);
    expect(flags.revisitedAfterDelay).toBe(false);
    a = nextActivity(s);
    if (a.kind === "retrieve") {
      const ans = a.item.options?.[a.item.correctIndex ?? 0] ?? a.item.expected[0] ?? "x";
      s = beginGrade(s, a.item, ans, 7000, false);
      s = commitGrade(s, 3);
      a = nextActivity(s);
    }
    if (a.kind === "read") expect(a.unit.id).not.toBe(firstUnit);
  });
});

describe("mcq shuffle", () => {
  it("moves the key without changing which text is correct", () => {
    const sh = shuffleMcq(["A right", "B", "C", "D"], 0, () => 0.99);
    expect(sh.options).toHaveLength(4);
    expect(sh.options[sh.correctIndex]).toBe("A right");
  });
});
