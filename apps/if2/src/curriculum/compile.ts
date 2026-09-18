import type { AuthoredFact, BookSection, Concept, LearningUnit, PracticeItem, Provenance } from "../engine/types";
import { FACTS, CHAPTER_META } from "./facts";
import { MORE_FACTS } from "./facts-more";
import { DEPTH_FACTS } from "./facts-depth";
import { QUESTIONS, type AuthoredQuestion } from "./questions";
import { QUESTIONS_MORE } from "./questions-more";
import type { ChapterId } from "../engine/types";
import { chapterHold, comparisonForSection, holdForFact, roleForFact, seedTraps, trapsForSection } from "./book-layer";

export const ALL_FACTS: AuthoredFact[] = [...FACTS, ...MORE_FACTS, ...DEPTH_FACTS];
export const ALL_QUESTIONS: AuthoredQuestion[] = [...QUESTIONS, ...QUESTIONS_MORE];

function kernels(claim: string): string[] {
  const out: string[] = [];
  const re = /\[\[(.+?)\]\]/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(claim))) out.push(m[1]);
  return out;
}

function firstSentence(text: string): string {
  const t = text.replace(/\s+/g, " ").trim();
  const m = t.match(/^(.+?[.!?])(?:\s|$)/);
  return m ? m[1] : t;
}

function plain(claim: string): string {
  return claim.replace(/\[\[(.+?)\]\]/g, "$1");
}

function clozePrompt(claim: string): { prompt: string; answers: string[] } {
  const answers = kernels(claim);
  let i = 0;
  const prompt = claim.replace(/\[\[(.+?)\]\]/g, () => {
    i += 1;
    return `[${i}]`;
  });
  return { prompt: prompt.replace(/\s+/g, " ").trim(), answers };
}

function readingFor(fact: AuthoredFact): string {
  return [plain(fact.claim), fact.extra].filter(Boolean).join("\n\n");
}

export function compileConcepts(): Concept[] {
  const map = new Map<string, Concept>();
  for (const f of ALL_FACTS) {
    const existing = map.get(f.conceptId);
    const sources = f.sources;
    if (!existing) {
      map.set(f.conceptId, {
        id: f.conceptId,
        title: f.title,
        chapter: f.chapter,
        section: f.section,
        syllabusOutcomes: ["1.1"],
        summary: plain(f.claim),
        importance: f.importance,
        prerequisites: f.prerequisites ?? [],
        confusedWith: f.confusedWith ?? [],
        factIds: [f.id],
        sources,
      });
    } else {
      existing.factIds.push(f.id);
      existing.confusedWith = [...new Set([...existing.confusedWith, ...(f.confusedWith ?? [])])];
      existing.prerequisites = [...new Set([...existing.prerequisites, ...(f.prerequisites ?? [])])];
      if (f.importance === "core") existing.importance = "core";
      existing.sources = mergeSources(existing.sources, sources);
    }
  }
  return [...map.values()];
}

function mergeSources(a: Provenance[], b: Provenance[]): Provenance[] {
  const seen = new Set(a.map((s) => s.locator));
  const out = [...a];
  for (const s of b) if (!seen.has(s.locator)) out.push(s);
  return out;
}

export function compileUnits(): LearningUnit[] {
  const concepts = compileConcepts();
  const byConcept = new Map<string, AuthoredFact[]>();
  for (const f of ALL_FACTS) {
    const arr = byConcept.get(f.conceptId) ?? [];
    arr.push(f);
    byConcept.set(f.conceptId, arr);
  }
  const units: LearningUnit[] = [];
  for (const c of concepts) {
    const facts = byConcept.get(c.id) ?? [];
    const load = (c.importance === "core" ? 3 : c.importance === "supporting" ? 2 : 1) as 1 | 2 | 3 | 4 | 5;
    units.push({
      id: `unit-${c.id}`,
      chapter: c.chapter,
      title: c.title,
      conceptIds: [c.id],
      factIds: facts.map((f) => f.id),
      load: Math.min(5, load + Math.min(2, facts.length - 1)) as 1 | 2 | 3 | 4 | 5,
      prerequisites: c.prerequisites.map((id) => `unit-${id}`),
      reading: facts.map((f) => ({
        heading: f.title,
        body: readingFor(f),
        sources: f.sources,
      })),
      prediction: facts.find((f) => f.prediction)?.prediction,
      comparisonTable: comparisonForSection(c.chapter, facts, 0),
    });
  }
  return units.sort((a, b) => {
    if (a.chapter !== b.chapter) return a.chapter - b.chapter;
    const fa = ALL_FACTS.findIndex((f) => f.conceptId === a.conceptIds[0]);
    const fb = ALL_FACTS.findIndex((f) => f.conceptId === b.conceptIds[0]);
    return fa - fb;
  });
}

function slugSection(chapter: ChapterId, title: string, used: Set<string>): string {
  const base = title
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  let id = `sec-${chapter}-${base || "section"}`;
  let n = 2;
  while (used.has(id)) {
    id = `sec-${chapter}-${base || "section"}-${n}`;
    n += 1;
  }
  used.add(id);
  return id;
}

/** Group sourced claims into Key Facts chapter → section order. */
export function compileSections(): BookSection[] {
  const buckets: { chapter: ChapterId; title: string; facts: AuthoredFact[] }[] = [];
  const index = new Map<string, number>();
  for (const f of ALL_FACTS) {
    const key = `${f.chapter}::${f.section}`;
    const existing = index.get(key);
    if (existing == null) {
      index.set(key, buckets.length);
      buckets.push({ chapter: f.chapter, title: f.section, facts: [f] });
    } else {
      buckets[existing].facts.push(f);
    }
  }
  const countByChapter: Record<ChapterId, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
  for (const b of buckets) countByChapter[b.chapter] += 1;
  const seenInChapter: Record<ChapterId, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
  const used = new Set<string>();
  const titleByConcept: Record<string, string> = {};
  for (const f of ALL_FACTS) {
    if (!titleByConcept[f.conceptId]) titleByConcept[f.conceptId] = f.title;
  }
  return buckets.map((b) => {
    seenInChapter[b.chapter] += 1;
    const conceptIds = [...new Set(b.facts.map((f) => f.conceptId))];
    const reading = b.facts.map((f, i) => ({
      body: firstSentence(plain(f.claim)),
      sources: f.sources,
      role: roleForFact(f, i),
      factId: f.id,
      hold: holdForFact(f, titleByConcept),
    }));
    return {
      id: slugSection(b.chapter, b.title, used),
      chapter: b.chapter,
      chapterTitle: CHAPTER_META[b.chapter].title,
      title: b.title,
      indexInChapter: seenInChapter[b.chapter],
      sectionCountInChapter: countByChapter[b.chapter],
      conceptIds,
      factIds: b.facts.map((f) => f.id),
      lede: seenInChapter[b.chapter] === 1 ? chapterHold(b.chapter) : undefined,
      traps: [...seedTraps(b.chapter, seenInChapter[b.chapter]), ...trapsForSection(b.facts, titleByConcept)].slice(0, 4),
      reading,
      comparisonTable: comparisonForSection(b.chapter, b.facts, seenInChapter[b.chapter]),
    };
  });
}

export function sectionAsUnit(section: BookSection): LearningUnit {
  return {
    id: section.id,
    chapter: section.chapter,
    title: section.title,
    conceptIds: section.conceptIds,
    factIds: section.factIds,
    load: Math.min(5, Math.max(1, section.conceptIds.length)) as 1 | 2 | 3 | 4 | 5,
    prerequisites: [],
    reading: section.reading.map((r) => ({
      heading: r.heading || section.title,
      body: r.body,
      sources: r.sources,
      factId: r.factId,
      hold: r.hold,
    })),
    comparisonTable: section.comparisonTable,
  };
}

function questionToItem(q: AuthoredQuestion): PracticeItem {
  return {
    id: q.id,
    type: "mcq",
    conceptIds: q.conceptIds,
    factIds: q.factIds,
    skill: q.cognitive === "application" ? "apply" : q.cognitive === "understanding" || q.cognitive === "distinction" ? "understand" : "know",
    recognition: true,
    prompt: q.stem,
    options: [...q.options],
    correctIndex: q.correct,
    expected: [q.options[q.correct]],
    rubric: q.whyCorrect,
    whyCorrect: q.whyCorrect,
    whyWrong: [...q.whyWrong],
    sources: q.sources,
    examStyle: q.examStyle,
    difficulty: q.difficulty,
    questionKind: q.kind,
    cognitive: q.cognitive,
    misconception: q.misconception,
    chapter: q.chapter,
    lo: q.lo,
    shuffle: true,
  };
}

export function compileItems(): PracticeItem[] {
  const items: PracticeItem[] = ALL_QUESTIONS.map(questionToItem);
  const stems = new Set(items.map((i) => i.prompt.trim().toLowerCase()));

  for (const f of ALL_FACTS) {
    const { prompt, answers } = clozePrompt(f.claim);
    if (answers.length) {
      items.push({
        id: `cloze-${f.id}`,
        type: "cloze",
        conceptIds: [f.conceptId],
        factIds: [f.id],
        skill: f.skill,
        recognition: false,
        prompt: `Reconstruct the missing IF2 point.\n\n${prompt}`,
        expected: answers,
        rubric: plain(f.claim),
        sources: f.sources,
        questionKind: "cloze",
        cognitive: "understanding",
        chapter: f.chapter,
        lo: "1.1",
      });
      items.push({
        id: `recall-${f.id}`,
        type: "free-recall",
        conceptIds: [f.conceptId],
        factIds: [f.id],
        skill: f.skill,
        recognition: false,
        prompt: `Without looking back: ${f.teachBackCue ?? `state the key rule for “${f.title}”.`}`,
        expected: answers,
        rubric: plain(f.claim),
        sources: f.sources,
        questionKind: "production",
        cognitive: "understanding",
        chapter: f.chapter,
        lo: "1.1",
      });
    }
    if (f.prediction) {
      items.push({
        id: `pred-${f.id}`,
        type: "prediction",
        conceptIds: [f.conceptId],
        factIds: [f.id],
        skill: f.skill,
        recognition: false,
        prompt: f.prediction,
        expected: answers.length ? answers : [plain(f.claim)],
        rubric: plain(f.claim),
        sources: f.sources,
        questionKind: "production",
        chapter: f.chapter,
        lo: "1.1",
      });
    }
    if (f.teachBackCue) {
      items.push({
        id: `teach-${f.id}`,
        type: "teach-back",
        conceptIds: [f.conceptId],
        factIds: [f.id],
        skill: "understand",
        recognition: false,
        prompt: f.teachBackCue,
        expected: answers.length ? answers : [plain(f.claim)],
        rubric: plain(f.claim),
        sources: f.sources,
        questionKind: "production",
        chapter: f.chapter,
        lo: "1.1",
      });
    }
    if (f.mcq) {
      const stem = f.mcq.stem.trim().toLowerCase();
      if (!stems.has(stem)) {
        stems.add(stem);
        items.push({
          id: `mcq-${f.id}`,
          type: "mcq",
          conceptIds: [f.conceptId],
          factIds: [f.id],
          skill: f.skill,
          recognition: true,
          prompt: f.mcq.stem,
          options: [...f.mcq.options],
          correctIndex: f.mcq.correct,
          expected: [f.mcq.options[f.mcq.correct]],
          rubric: f.mcq.whyWrong[f.mcq.correct],
          whyCorrect: f.mcq.whyWrong[f.mcq.correct],
          whyWrong: [...f.mcq.whyWrong],
          sources: f.sources,
          examStyle: f.sources.some((s) => s.kind === "exam-guide"),
          questionKind: "knowledge",
          cognitive: "recognition",
          chapter: f.chapter,
          lo: "1.1",
          shuffle: true,
        });
      }
      items.push({
        id: `why-${f.id}`,
        type: "why-wrong",
        conceptIds: [f.conceptId],
        factIds: [f.id],
        skill: "understand",
        recognition: false,
        prompt: `The question was: “${f.mcq.stem}”\nA wrong option is: “${f.mcq.options.find((_, i) => i !== f.mcq!.correct)}”.\nWhy is that option wrong?`,
        expected: f.mcq.whyWrong.filter((_, i) => i !== f.mcq!.correct),
        rubric: f.mcq.whyWrong.filter((_, i) => i !== f.mcq!.correct).join(" / "),
        sources: f.sources,
        questionKind: "production",
        chapter: f.chapter,
        lo: "1.1",
      });
    }
    if (f.scenario) {
      items.push({
        id: `scen-${f.id}`,
        type: "scenario",
        conceptIds: [f.conceptId],
        factIds: [f.id],
        skill: "apply",
        recognition: false,
        prompt: `${f.scenario.setup}\n\n${f.scenario.question}`,
        expected: [f.scenario.answer],
        rubric: f.scenario.answer,
        sources: f.sources,
        questionKind: "production",
        cognitive: "application",
        chapter: f.chapter,
        lo: "1.1",
      });
    }
    if (f.kind === "exclusion") {
      items.push({
        id: `err-${f.id}`,
        type: "error-correction",
        conceptIds: [f.conceptId],
        factIds: [f.id],
        skill: "understand",
        recognition: false,
        prompt: `A colleague says: “${invertClaim(plain(f.claim))}”\nCorrect them in one or two sentences, from IF2.`,
        expected: kernels(f.claim).length ? kernels(f.claim) : [plain(f.claim)],
        rubric: plain(f.claim),
        sources: f.sources,
        questionKind: "production",
        chapter: f.chapter,
        lo: "1.1",
      });
    }
  }

  items.push({
    id: "compare-rta-tpo",
    type: "compare",
    conceptIds: ["motor-rta", "motor-tpo"],
    factIds: ["m-rta-tppd", "m-tpo-extras"],
    skill: "understand",
    recognition: false,
    prompt:
      "Distinguish RTA only from third party only for a private car. Name at least two differences that IF2 treats as standard.",
    expected: ["£1.2 million", "£20 million", "off road", "territorial", "driving other"],
    rubric:
      "TPO usually adds off-road/territorial cover, £20m TPPD for private cars (vs £1.2m RTA), driving-other-cars (often), wider insured persons and defence costs.",
    sources: ALL_FACTS.find((f) => f.id === "m-tpo-extras")!.sources,
    questionKind: "production",
    cognitive: "distinction",
    chapter: 1,
    lo: "1.1",
  });
  items.push({
    id: "compare-tpft-comp",
    type: "compare",
    conceptIds: ["motor-tpft", "motor-comp"],
    factIds: ["m-tpft", "m-comp"],
    skill: "understand",
    recognition: false,
    prompt: "What is the main extra that comprehensive adds over TPFT?",
    expected: ["accidental", "malicious", "all risks"],
    rubric: "Accidental and malicious damage to the insured’s car, on an all-risks-of-own-damage basis with listed exclusions.",
    sources: ALL_FACTS.find((f) => f.id === "m-comp")!.sources,
    questionKind: "production",
    chapter: 1,
    lo: "1.1",
  });
  items.push({
    id: "compare-el-pl",
    type: "distinction",
    conceptIds: ["el-cover", "pl-cover"],
    factIds: ["l-el-injury-only", "l-pl"],
    skill: "understand",
    recognition: false,
    prompt: "A hotel chef burns a guest and, separately, a waiter. Which liability class responds to each, according to IF2?",
    expected: ["public liability", "employers’ liability", "employee"],
    rubric: "Guest: public liability. Waiter/employee: employers’ liability.",
    sources: ALL_FACTS.find((f) => f.id === "l-pl")!.sources,
    questionKind: "production",
    cognitive: "distinction",
    chapter: 6,
    lo: "1.1",
  });
  items.push({
    id: "classify-product-family",
    type: "classify",
    conceptIds: ["extended-warranty", "hh-contents", "products-cover"],
    factIds: ["l-ew"],
    skill: "apply",
    recognition: true,
    prompt:
      "A buyer’s TV fails 14 months after purchase. Which product is the claim considered under if they bought extra cover for defects after the guarantee?",
    options: ["All risks", "Extended warranty", "Legal expenses", "Products liability"],
    correctIndex: 1,
    expected: ["Extended warranty"],
    rubric: "Specimen Q36: extended warranty.",
    sources: ALL_FACTS.find((f) => f.id === "l-ew")!.sources,
    examStyle: true,
    questionKind: "scenario",
    cognitive: "application",
    chapter: 6,
    lo: "1.1",
    shuffle: true,
  });
  items.push({
    id: "summary-motor-levels",
    type: "summary",
    conceptIds: ["motor-cover-levels"],
    factIds: ["m-four-levels"],
    skill: "understand",
    recognition: false,
    prompt: "In one sentence, list the four private motor cover levels from narrowest to widest.",
    expected: ["RTA", "third party only", "TPFT", "comprehensive"],
    rubric: "RTA only, TPO, TPFT, comprehensive.",
    sources: ALL_FACTS.find((f) => f.id === "m-four-levels")!.sources,
    questionKind: "production",
    chapter: 1,
    lo: "1.1",
  });

  const withCoverage = ensureMcqCoverage(items, compileConcepts(), ALL_FACTS);
  return withCoverage;
}

function distractorsFor(c: Concept, facts: AuthoredFact[], correct: string): string[] {
  const ranked = [
    ...c.confusedWith.flatMap((id) => facts.filter((f) => f.conceptId === id)),
    ...facts.filter((f) => f.conceptId !== c.id && f.chapter === c.chapter),
    ...facts.filter((f) => f.conceptId !== c.id),
  ];
  const unique: string[] = [];
  for (const f of ranked) {
    const d = clip(plain(f.claim), 140);
    if (!d || d === correct || unique.includes(d)) continue;
    unique.push(d);
    if (unique.length === 3) break;
  }
  return unique;
}

function ensureMcqCoverage(items: PracticeItem[], concepts: Concept[], facts: AuthoredFact[]): PracticeItem[] {
  const extra: PracticeItem[] = [];
  const stems = new Set(items.map((i) => i.prompt.trim().toLowerCase()));
  for (const c of concepts) {
    const existing = items.filter((i) => i.type === "mcq" && i.conceptIds.includes(c.id)).length + extra.filter((i) => i.conceptIds.includes(c.id)).length;
    const conceptFacts = facts.filter((f) => f.conceptId === c.id);
    for (let n = existing; n < 2; n++) {
      const fact = conceptFacts[n % Math.max(1, conceptFacts.length)] ?? facts.find((f) => f.conceptId === c.id);
      if (!fact) continue;
      const correct = clip(plain(fact.claim), 140);
      const unique = distractorsFor(c, facts, correct);
      if (unique.length < 3) continue;
      const prompt =
        n === 0
          ? `Which statement about “${c.title}” is correct according to the IF2 materials?`
          : `According to IF2, which of the following is true of ${c.title}?`;
      const stemKey = prompt.trim().toLowerCase();
      const finalPrompt = stems.has(stemKey) ? `${prompt} (${fact.id})` : prompt;
      stems.add(finalPrompt.trim().toLowerCase());
      extra.push({
        id: `mcq-auto-${c.id}-${n}`,
        type: "mcq",
        conceptIds: [c.id],
        factIds: [fact.id],
        skill: fact.skill,
        recognition: true,
        prompt: finalPrompt,
        options: [correct, unique[0], unique[1], unique[2]],
        correctIndex: 0,
        expected: [correct],
        rubric: fact.sources[0]?.locator ?? correct,
        whyCorrect: `${correct} (${fact.sources.map((s) => s.locator).join("; ")})`,
        whyWrong: [
          "This is the sourced statement for this concept.",
          `A neighbouring IF2 claim (${unique[0].slice(0, 48)}…) — not this concept’s rule.`,
          `A neighbouring IF2 claim (${unique[1].slice(0, 48)}…) — not this concept’s rule.`,
          `A neighbouring IF2 claim (${unique[2].slice(0, 48)}…) — not this concept’s rule.`,
        ],
        sources: fact.sources,
        questionKind: "which-correct",
        cognitive: "understanding",
        chapter: c.chapter,
        lo: "1.1",
        shuffle: true,
        difficulty: 2,
      });
    }
  }
  return [...items, ...extra];
}

function clip(s: string, n: number) {
  const t = s.replace(/\s+/g, " ").trim();
  return t.length <= n ? t : t.slice(0, n - 1) + "…";
}

function invertClaim(text: string): string {
  return `This is never excluded and always paid in full: ${text.slice(0, 140)}`;
}

export function curriculumStats() {
  const concepts = compileConcepts();
  const units = compileUnits();
  const items = compileItems();
  const byCh = (n: ChapterId) => ALL_FACTS.filter((f) => f.chapter === n).length;
  const mcq = items.filter((i) => i.type === "mcq");
  return {
    facts: ALL_FACTS.length,
    concepts: concepts.length,
    units: units.length,
    sections: compileSections().length,
    items: items.length,
    mcq: mcq.length,
    examStyleMcq: mcq.filter((i) => i.examStyle).length,
    factsByChapter: {
      1: byCh(1),
      2: byCh(2),
      3: byCh(3),
      4: byCh(4),
      5: byCh(5),
      6: byCh(6),
    },
    conceptsByChapter: {
      1: concepts.filter((c) => c.chapter === 1).length,
      2: concepts.filter((c) => c.chapter === 2).length,
      3: concepts.filter((c) => c.chapter === 3).length,
      4: concepts.filter((c) => c.chapter === 4).length,
      5: concepts.filter((c) => c.chapter === 5).length,
      6: concepts.filter((c) => c.chapter === 6).length,
    },
    chapters: CHAPTER_META,
    syllabus: {
      outcome: "1.1",
      examQuestions: 36,
      flexibility: "±2",
      assessment: "100 MCQs, 2 hours, English law, 2026 syllabus",
      outOfScope: "Chapters 7–13 / LOs 1.2–7 are not modelled in this build",
    },
  };
}

export type Curriculum = {
  facts: AuthoredFact[];
  factById: Record<string, AuthoredFact>;
  concepts: Concept[];
  units: LearningUnit[];
  sections: BookSection[];
  items: PracticeItem[];
  questions: AuthoredQuestion[];
  stats: ReturnType<typeof curriculumStats>;
};

let _cache: Curriculum | null = null;
export function loadCurriculum(): Curriculum {
  if (_cache) return _cache;
  _cache = {
    facts: ALL_FACTS,
    factById: Object.fromEntries(ALL_FACTS.map((f) => [f.id, f])),
    concepts: compileConcepts(),
    units: compileUnits(),
    sections: compileSections(),
    items: compileItems(),
    questions: ALL_QUESTIONS,
    stats: curriculumStats(),
  };
  return _cache;
}

export function resetCurriculumCache() {
  _cache = null;
}
