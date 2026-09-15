import { ALL_FACTS, loadCurriculum } from "../curriculum/compile";

export type IntegrityReport = {
  ok: boolean;
  problems: string[];
};

export function runIntegrity(): IntegrityReport {
  const problems: string[] = [];
  const curr = loadCurriculum();
  if (curr.facts.some((f) => f.chapter < 1 || f.chapter > 6)) {
    problems.push("Fact outside chapters 1–6");
  }
  const banned = /non-insurance services|helplines and advice|material circumstances in risk|customer service standards should always/i;
  for (const f of ALL_FACTS) {
    if (!f.sources.length) problems.push(`No provenance: ${f.id}`);
    if (banned.test(f.claim) && /chapter 7/i.test(f.claim)) problems.push(`Looks like ch7+ leaked: ${f.id}`);
  }
  const mcqBy = new Map<string, number>();
  for (const item of curr.items) {
    if (!item.sources.length) problems.push(`Item ${item.id} has no sources`);
    if (item.type === "mcq") {
      if (!item.options || item.options.length !== 4) problems.push(`MCQ ${item.id} must have 4 options`);
      if (new Set(item.options).size !== (item.options?.length ?? 0)) problems.push(`MCQ ${item.id} duplicate options`);
      if (item.correctIndex == null) problems.push(`MCQ ${item.id} missing key`);
      for (const id of item.conceptIds) mcqBy.set(id, (mcqBy.get(id) ?? 0) + 1);
    }
  }
  for (const c of curr.concepts) {
    if (!c.syllabusOutcomes.includes("1.1")) problems.push(`Concept ${c.id} missing LO 1.1`);
    if (!c.sources.length) problems.push(`Concept ${c.id} has no sources`);
    if ((mcqBy.get(c.id) ?? 0) < 1) problems.push(`Concept ${c.id} has no MCQ`);
  }
  const titles = new Set(Object.values(curr.stats.chapters).map((ch) => ch.title));
  for (const t of ["Non-insurance services", "Material circumstances", "Customer service"]) {
    if (titles.has(t)) problems.push(`Chapter title ${t} should not be modelled`);
  }
  if (curr.stats.mcq < 120) problems.push(`MCQ pool too small: ${curr.stats.mcq}`);
  if (curr.stats.concepts < 70) problems.push(`Concept map too small: ${curr.stats.concepts}`);
  if (curr.stats.factsByChapter[2] < 18) problems.push(`Chapter 2 still too thin: ${curr.stats.factsByChapter[2]} facts`);
  if (curr.stats.factsByChapter[4] < 16) problems.push(`Chapter 4 still too thin: ${curr.stats.factsByChapter[4]} facts`);
  if (curr.stats.factsByChapter[5] < 14) problems.push(`Chapter 5 still too thin: ${curr.stats.factsByChapter[5]} facts`);
  const dummy = /not how IF2 describes|none of the above|all of the above/i;
  for (const item of curr.items) {
    if (item.type !== "mcq" || !item.options) continue;
    if (item.options.some((o) => dummy.test(o))) problems.push(`Filler MCQ option on ${item.id}`);
  }
  for (const [id, n] of mcqBy) {
    if (n < 2) problems.push(`Concept ${id} has only ${n} MCQ(s)`);
  }
  return { ok: problems.length === 0, problems };
}
