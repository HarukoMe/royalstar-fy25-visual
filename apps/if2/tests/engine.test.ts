import { describe, expect, it } from "vitest";
import { COMPANION } from "../src/curriculum/companion";
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
import {
  applyKokoroFromSearch,
  chunkForKokoro,
  DEFAULT_KOKORO,
  normalizeBaseUrl,
  parseVoiceIds,
  speechTexts,
} from "../src/engine/kokoro";
import {
  beginGrade,
  commitGrade,
  endSession,
  grade,
  markRead,
  nextActivity,
  openChapter,
  openSection,
  requestCheck,
  signal,
  startSession,
} from "../src/engine/session";
import { tutorExplain } from "../src/engine/tutor";
import { finishExam, startExam } from "../src/engine/exam";
import { shuffleMcq } from "../src/engine/shuffle";

describe("study book", () => {
  it("covers all 13 chapters and is long enough to read", () => {
    expect(COMPANION.map((c) => c.chapter)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]);
    const words = COMPANION.flatMap((c) => c.blocks.flatMap((b) => [b.hold ?? "", ...b.paras])).join(" ").split(/\s+/).filter(Boolean);
    expect(words.length).toBeGreaterThan(2200);
    const { sections } = loadCurriculum();
    expect(sections.length).toBeGreaterThan(80);
    const sourced = sections.reduce((n, s) => n + s.reading.map((r) => r.body).join(" ").length, 0);
    expect(sourced).toBeGreaterThan(40_000);
  });
});

describe("curriculum integrity", () => {
  it("stays inside chapters 1–6 and LO 1.1", () => {
    const report = runIntegrity();
    expect(report.problems).toEqual([]);
    const { stats, concepts, items } = loadCurriculum();
    expect(stats.factsByChapter[1]).toBeGreaterThan(10);
    expect(stats.factsByChapter[6]).toBeGreaterThan(20);
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
    expect(grade(item, "D").success).toBe(true);
    expect(grade(item, item.expected[0]).success).toBe(true);
  });

  it("grades Focus-style option text, not the first letter of the option", () => {
    const curr = loadCurriculum();
    const mcqs = curr.items.filter((i) => i.type === "mcq" && i.options && i.correctIndex != null);
    expect(mcqs.length).toBeGreaterThan(50);
    for (const item of mcqs) {
      const correctText = item.options![item.correctIndex!];
      expect(grade(item, correctText).success, item.id).toBe(true);
      const wrong = item.options!.find((_, i) => i !== item.correctIndex);
      if (wrong && wrong !== correctText) expect(grade(item, wrong).success, item.id).toBe(false);
    }
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
  it("starts with the book lesson, not a quiz on unread material", () => {
    const s = startSession(createLearner(), Date.now());
    const a = nextActivity(s, Date.now());
    expect(a.kind).toBe("read");
    if (a.kind === "read") {
      expect(a.section.chapter).toBe(1);
      expect(a.section.title).toMatch(/Private motor/i);
      expect(a.kernel.hold!.length).toBeGreaterThan(20);
      expect(a.unit.reading.length).toBeGreaterThan(1);
      const lesson = a.unit.reading.map((r) => [r.body, ...(r.bullets ?? [])].join(" ")).join(" ");
      expect(lesson).toMatch(/illegal to drive/i);
      expect(lesson).toMatch(/SORN|Statutory Off Road/i);
      expect(lesson.length).toBeGreaterThan(400);
      expect(a.speech.some((x) => /This unit is/.test(x.text))).toBe(false);
      const claim = loadCurriculum().facts[0]!.claim.replace(/\[\[|\]\]/g, "");
      expect(a.speech.some((x) => x.text.includes(claim.slice(0, 40)))).toBe(true);
      expect(a.speech.some((x) => x.text.includes(a.kernel.hold!))).toBe(true);
      const joined = a.speech.map((x) => x.text).join(" ");
      expect(joined.length).toBeGreaterThan(400);
      expect(joined).not.toMatch(/Comparison\.|Exam trap/);
    }
  });

  it("compiles every fact into a chapter/section and keeps MCQ breadth", () => {
    const { sections, facts, stats } = loadCurriculum();
    expect(sections.length).toBeGreaterThan(80);
    expect(facts.every((f) => sections.some((s) => s.factIds.includes(f.id)))).toBe(true);
    expect(sections.flatMap((s) => s.factIds).length).toBe(facts.length);
    expect(stats.sections).toBe(sections.length);
    expect(sections.every((s) => s.chapter >= 1 && s.chapter <= 6)).toBe(true);
    expect(sections.filter((s) => s.chapter === 6).length).toBeGreaterThan(8);
    expect(sections.some((s) => s.reading.some((r) => r.hold && r.hold.length > 20))).toBe(true);
    expect(sections.filter((s) => s.chapter === 6).some((s) => s.comparisonTable)).toBe(true);
    const rta = sections.find((s) => s.chapter === 1 && /Road Traffic Act only/i.test(s.title));
    expect(rta).toBeTruthy();
    const rtaText = rta!.reading.map((r) => [r.body, ...(r.bullets ?? [])].join(" ")).join(" ");
    expect(rtaText).toMatch(/£1\.2 million/);
    expect(rtaText).toMatch(/unlimited/i);
    expect(rtaText).toMatch(/emergency medical|Third EU Motor/i);
    expect(rta!.reading.some((r) => (r.bullets?.length ?? 0) >= 3)).toBe(true);
    expect(rtaText.length).toBeGreaterThan(500);
    expect(facts.some((f) => f.id === "l-el-min-limit" && f.claim.includes("£5 million"))).toBe(true);
    expect(DEFAULT_KOKORO.voice).toContain("af_heart");
    expect(DEFAULT_KOKORO.langCode).toBe("b");
  });

  it("keeps reading after Next — no quiz until Check this", () => {
    let s = startSession(createLearner());
    let a = nextActivity(s);
    expect(a.kind).toBe("read");
    const firstId = a.kind === "read" ? a.section.id : "";
    const ids: string[] = [];
    for (let i = 0; i < 8; i++) {
      expect(a.kind).toBe("read");
      if (a.kind !== "read") break;
      ids.push(a.section.id);
      s = markRead(s, a.unit);
      a = nextActivity(s);
    }
    expect(a.kind).toBe("read");
    expect(ids[0]).toBe(firstId);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("uses a four-option MCQ on the lesson just read when asked", () => {
    let s = startSession(createLearner());
    let a = nextActivity(s);
    expect(a.kind).toBe("read");
    const taught = a.kind === "read" ? a.unit.factIds : [];
    if (a.kind === "read") {
      s = markRead(s, a.unit);
      s = requestCheck(s);
      a = nextActivity(s);
    }
    expect(a.kind).toBe("retrieve");
    if (a.kind === "retrieve") {
      expect(a.item.type).toBe("mcq");
      expect(a.item.options).toHaveLength(4);
      expect(a.speech[0]?.text).toBe(a.item.prompt);
      expect(a.item.factIds.some((id) => taught.includes(id))).toBe(true);
    }
  });

  it("can open a later chapter without typing a prediction first", () => {
    const s = startSession(createLearner(), Date.now(), { chapter: 4 });
    const a = nextActivity(s);
    expect(a.kind).toBe("read");
    if (a.kind === "read") expect(a.section.chapter).toBe(4);
  });

  it("stays in chapter 2 after an answer even when chapter 1 is due", () => {
    const now = Date.now();
    let learner = createLearner();
    const ch1 = loadCurriculum().concepts.filter((c) => c.chapter === 1).slice(0, 8);
    for (const c of ch1) {
      learner.concepts[c.id] = {
        ...emptyState(c.id),
        exposures: 2,
        successfulRetrievals: 1,
        nextDueAt: now - 60_000,
        lastSeenAt: now - 86_400_000,
        lastSuccessAt: now - 86_400_000,
        estimatedMastery: 0.25,
      };
    }
    let s = startSession(learner, now);
    s = openChapter(s, 2);
    let a = nextActivity(s, now);
    expect(a.kind).toBe("read");
    if (a.kind === "read") {
      expect(a.section.chapter).toBe(2);
      s = markRead(s, a.unit, now);
      a = nextActivity(s, now);
    }
    expect(a.kind).toBe("read");
    if (a.kind === "read") expect(a.section.chapter).toBe(2);
    s = requestCheck(s);
    a = nextActivity(s, now);
    expect(a.kind).toBe("retrieve");
    if (a.kind === "retrieve") {
      const cid = a.item.conceptIds[0]!;
      expect(loadCurriculum().concepts.find((c) => c.id === cid)?.chapter).toBe(2);
      const ans = a.item.options?.[a.item.correctIndex ?? 0] ?? a.item.expected[0] ?? "";
      s = beginGrade(s, a.item, ans, 8000, false, now);
      s = commitGrade(s, 4, now);
      a = nextActivity(s, now + 1000);
    }
    if (a.kind === "read") expect(a.section.chapter).toBe(2);
    if (a.kind === "retrieve") {
      const cid = a.item.conceptIds[0]!;
      expect(loadCurriculum().concepts.find((c) => c.id === cid)?.chapter).toBe(2);
    }
  });

  it("opens chapter 6 on a who-was-hurt hold, not a table dump", () => {
    const s = startSession(createLearner(), Date.now(), { chapter: 6 });
    const a = nextActivity(s);
    expect(a.kind).toBe("read");
    if (a.kind === "read") {
      expect(a.section.chapter).toBe(6);
      expect(a.section.chapterTitle).toMatch(/Liability/i);
      expect(a.section.comparisonTable?.rows.length).toBeGreaterThan(3);
      expect(a.section.lede).toMatch(/who was hurt/i);
      expect(a.kernel.hold).toMatch(/who was hurt/i);
      const lesson = a.unit.reading.map((r) => [r.body, ...(r.bullets ?? [])].join(" ")).join(" ");
      expect(lesson).toMatch(/employers/i);
      expect(lesson.length).toBeGreaterThan(300);
      expect(a.unit.reading.length).toBeGreaterThan(0);
      const joined = a.speech.map((x) => x.text).join(" ");
      expect(joined).toMatch(/who was hurt|employers/i);
      expect(joined).not.toMatch(/Comparison\.|Exam trap/);
    }
  });

  it("jumps to a named section from the chapter TOC", () => {
    const curr = loadCurriculum();
    const target = curr.sections.find((s) => s.chapter === 6 && /extended/i.test(s.title));
    expect(target).toBeTruthy();
    let s = startSession(createLearner());
    s = openSection(s, target!.id);
    const a = nextActivity(s);
    expect(a.kind).toBe("read");
    if (a.kind === "read") expect(a.section.id).toBe(target!.id);
  });

  it("does not switch to a quiz on inactivity while reading", () => {
    let s = startSession(createLearner());
    let a = nextActivity(s);
    expect(a.kind).toBe("read");
    if (a.kind === "read") s = markRead(s, a.unit);
    s = signal(s, "inactivity");
    a = nextActivity(s);
    expect(a.kind).toBe("read");
  });

  it("retrieves the unit just read when Check this is asked", () => {
    let s = startSession(createLearner());
    let a = nextActivity(s);
    expect(a.kind).toBe("read");
    if (a.kind === "read") {
      s = markRead(s, a.unit);
      s = requestCheck(s);
      a = nextActivity(s);
      expect(a.kind).toBe("retrieve");
      if (a.kind === "retrieve") expect(a.mode).toBe("encode");
    }
  });

  it("moves to the next book heading after a lesson and its check", () => {
    const first = loadCurriculum().sections[0]!;
    expect(first.factIds.length).toBeGreaterThan(1);
    let s = startSession(createLearner());
    let a = nextActivity(s);
    expect(a.kind).toBe("read");
    if (a.kind === "read") {
      expect(a.unit.factIds).toEqual(first.factIds);
      s = markRead(s, a.unit);
      s = requestCheck(s);
      a = nextActivity(s);
    }
    expect(a.kind).toBe("retrieve");
    if (a.kind === "retrieve") {
      const ans = a.item.options?.[a.item.correctIndex ?? 0] ?? a.item.expected[0] ?? "";
      s = beginGrade(s, a.item, ans, 8000, false);
      s = commitGrade(s, 4);
      a = nextActivity(s);
    }
    expect(a.kind).toBe("read");
    if (a.kind === "read") {
      expect(a.section.id).not.toBe(first.id);
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

  it("writes exam answers into question stats and MCQ counters", () => {
    const exam = startExam(createLearner(), { mode: "mixed", n: 6 });
    exam.answers = exam.questions.map((q) => q.displayCorrect);
    const out = finishExam(createLearner(), exam);
    expect(out.attempt.correct).toBe(exam.questions.length);
    const first = exam.questions[0]!;
    expect(out.learner.questionStats[first.item.id]?.correct).toBeGreaterThan(0);
    const cid = first.item.conceptIds[0]!;
    expect(out.learner.concepts[cid]?.mcqCorrect).toBeGreaterThan(0);
    expect(out.learner.examReadiness["1.1"]).toBeGreaterThan(0);
  });
});

describe("session close", () => {
  it("commits a pending answer and stamps endedAt", () => {
    let s = startSession(createLearner());
    let a = nextActivity(s);
    if (a.kind === "read") {
      s = markRead(s, a.unit);
      s = requestCheck(s);
      a = nextActivity(s);
    }
    if (a.kind === "retrieve") {
      const ans = a.item.options?.[a.item.correctIndex ?? 0] ?? a.item.expected[0] ?? "x";
      s = beginGrade(s, a.item, ans, 4000, false);
    }
    expect(s.pending).toBeTruthy();
    const ended = endSession(s, 3);
    expect(ended.pending).toBeUndefined();
    expect(ended.log.endedAt).toBeTruthy();
  });
});

describe("breadth across sessions", () => {
  it("does not retire a concept after one MCQ, and later items can open a different unit", () => {
    let s = startSession(createLearner());
    let a = nextActivity(s);
    expect(a.kind).toBe("read");
    const firstFact = a.kind === "read" ? a.unit.factIds[0] : "";
    if (a.kind === "read") {
      s = markRead(s, a.unit);
      s = requestCheck(s);
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
    if (a.kind === "read") expect(a.unit.factIds[0]).not.toBe(firstFact);
  });
});

describe("mcq shuffle", () => {
  it("moves the key without changing which text is correct", () => {
    const sh = shuffleMcq(["A right", "B", "C", "D"], 0, () => 0.99);
    expect(sh.options).toHaveLength(4);
    expect(sh.options[sh.correctIndex]).toBe("A right");
  });
});

describe("progress backup", () => {
  it("round-trips a learner through export/import", async () => {
    const mem = new Map<string, string>();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (globalThis as any).localStorage = {
      getItem: (k: string) => mem.get(k) ?? null,
      setItem: (k: string, v: string) => {
        mem.set(k, v);
      },
      removeItem: (k: string) => {
        mem.delete(k);
      },
      clear: () => mem.clear(),
      key: () => null,
      length: 0,
    };
    const storage = await import("../src/storage");
    const model = createLearner();
    model.sessionCount = 3;
    storage.saveLearner(model);
    const bundle = storage.exportProgress();
    storage.resetLearner();
    expect(storage.loadLearner().sessionCount).toBe(0);
    const r = storage.importProgress(bundle);
    expect(r.ok).toBe(true);
    expect(storage.loadLearner().sessionCount).toBe(3);
  });
});

describe("kokoro speech", () => {
  it("chunks section prose without inventing words", () => {
    expect(normalizeBaseUrl("http://127.0.0.1:8880/")).toBe("http://127.0.0.1:8880");
    const texts = speechTexts([
      { kind: "narrate", text: "Chapter 1. Motor insurance.", interruptible: true },
      { kind: "wait", text: "", interruptible: true },
      { kind: "narrate", text: "It is illegal to drive on a public road without cover.", interruptible: true },
    ]);
    expect(texts.join(" ")).toContain("illegal to drive");
    expect(texts.join(" ")).not.toMatch(/This unit is/);
    const chunks = chunkForKokoro(["aaa", "bbb", "ccc"], 10);
    expect(chunks.join("|")).toBe("aaa\n\nbbb|ccc");
    expect(parseVoiceIds({ voices: [{ id: "bf_emma" }, { id: "af_bella" }] })).toEqual(["bf_emma", "af_bella"]);
  });

  it("reads a work-PC ?kokoro= tunnel from the query string", () => {
    const mem = new Map<string, string>();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (globalThis as any).localStorage = {
      getItem: (k: string) => mem.get(k) ?? null,
      setItem: (k: string, v: string) => mem.set(k, v),
      removeItem: (k: string) => mem.delete(k),
      clear: () => mem.clear(),
      key: () => null,
      length: 0,
    };
    const next = applyKokoroFromSearch("?kokoro=https://demo.trycloudflare.com&voice=bf_isabella");
    expect(next.baseUrl).toBe("https://demo.trycloudflare.com");
    expect(next.voice).toBe("bf_isabella");
    expect(next.langCode).toBe("b");
  });
});
