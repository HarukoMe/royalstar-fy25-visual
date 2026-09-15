import { describe, expect, it } from "vitest";
import { loadCurriculum } from "../src/curriculum/compile";
import { runIntegrity } from "../src/engine/integrity";
import {
  applyRetrieval,
  createLearner,
  examReadinessFor,
  recomputeMastery,
} from "../src/engine/learner";
import { noteAnswer } from "../src/engine/attention";
import { emptyAttention } from "../src/engine/attention";
import { scheduleAfterRetrieval } from "../src/engine/scheduler";
import { beginGrade, commitGrade, grade, markRead, nextActivity, signal, startSession } from "../src/engine/session";
import { tutorExplain } from "../src/engine/tutor";

describe("curriculum integrity", () => {
  it("stays inside chapters 1–6 and LO 1.1", () => {
    const report = runIntegrity();
    expect(report.problems).toEqual([]);
    const { stats, concepts } = loadCurriculum();
    expect(stats.factsByChapter[1]).toBeGreaterThan(10);
    expect(stats.factsByChapter[6]).toBeGreaterThan(8);
    expect(concepts.every((c) => c.chapter >= 1 && c.chapter <= 6)).toBe(true);
    expect(concepts.some((c) => /non-insurance/i.test(c.title))).toBe(false);
  });
});

describe("grading", () => {
  it("accepts sourced MCQ keys from the exam guide", () => {
    const item = loadCurriculum().items.find((i) => i.id === "mcq-m-sorn-exam")!;
    expect(grade(item, "D").success).toBe(true);
    expect(grade(item, "A").success).toBe(false);
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
});
