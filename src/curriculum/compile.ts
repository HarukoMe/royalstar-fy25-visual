import { FACTS, CHAPTER_META } from "./facts";
import type {
  AuthoredFact,
  ChapterId,
  Concept,
  LearningUnit,
  PracticeItem,
  Provenance,
} from "../engine/types";

function kernels(claim: string): string[] {
  const out: string[] = [];
  const re = /\[\[(.+?)\]\]/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(claim))) out.push(m[1]);
  return out;
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
  for (const f of FACTS) {
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
  for (const f of FACTS) {
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
      comparisonTable: comparisonFor(c.id, facts),
    });
  }
  return units.sort((a, b) => {
    if (a.chapter !== b.chapter) return a.chapter - b.chapter;
    const fa = FACTS.findIndex((f) => f.conceptId === a.conceptIds[0]);
    const fb = FACTS.findIndex((f) => f.conceptId === b.conceptIds[0]);
    return fa - fb;
  });
}

function comparisonFor(conceptId: string, facts: AuthoredFact[]): LearningUnit["comparisonTable"] {
  if (conceptId !== "motor-cover-levels" && conceptId !== "motor-tpo") return undefined;
  if (!facts.some((f) => f.id === "m-four-levels")) return undefined;
  return {
    caption: "Private motor cover compared (IF2 study text / key facts)",
    headers: ["Level", "Own vehicle", "Third party injury", "Third party property (private car)"],
    rows: [
      ["RTA only", "None", "Unlimited", "£1.2 million (minimum)"],
      ["TPO", "None", "Unlimited", "Usually £20 million"],
      ["TPFT", "Fire, lightning, explosion, theft", "Unlimited", "Usually £20 million"],
      ["Comprehensive", "Accidental & malicious damage (‘all risks’ of own damage, with exclusions)", "Unlimited", "Usually £20 million"],
    ],
  };
}

export function compileItems(): PracticeItem[] {
  const items: PracticeItem[] = [];
  for (const f of FACTS) {
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
      });
    }
    if (f.mcq) {
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
        whyWrong: [...f.mcq.whyWrong],
        sources: f.sources,
        examStyle: f.sources.some((s) => s.kind === "exam-guide"),
      });
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
    sources: FACTS.find((f) => f.id === "m-tpo-extras")!.sources,
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
    sources: FACTS.find((f) => f.id === "m-comp")!.sources,
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
    sources: FACTS.find((f) => f.id === "l-pl")!.sources,
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
    sources: FACTS.find((f) => f.id === "l-ew")!.sources,
    examStyle: true,
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
    sources: FACTS.find((f) => f.id === "m-four-levels")!.sources,
  });

  return items;
}

function invertClaim(text: string): string {
  return `This is never excluded and always paid in full: ${text.slice(0, 140)}`;
}

export function curriculumStats() {
  const concepts = compileConcepts();
  const units = compileUnits();
  const items = compileItems();
  const byCh = (n: ChapterId) => FACTS.filter((f) => f.chapter === n).length;
  return {
    facts: FACTS.length,
    concepts: concepts.length,
    units: units.length,
    items: items.length,
    factsByChapter: {
      1: byCh(1),
      2: byCh(2),
      3: byCh(3),
      4: byCh(4),
      5: byCh(5),
      6: byCh(6),
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
  facts: typeof FACTS;
  factById: Record<string, AuthoredFact>;
  concepts: Concept[];
  units: LearningUnit[];
  items: PracticeItem[];
  stats: ReturnType<typeof curriculumStats>;
};

let _cache: Curriculum | null = null;
export function loadCurriculum(): Curriculum {
  if (_cache) return _cache;
  _cache = {
    facts: FACTS,
    factById: Object.fromEntries(FACTS.map((f) => [f.id, f])),
    concepts: compileConcepts(),
    units: compileUnits(),
    items: compileItems(),
    stats: curriculumStats(),
  };
  return _cache;
}
