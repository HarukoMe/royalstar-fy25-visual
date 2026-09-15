import { loadCurriculum } from "../curriculum/compile";
import { FACTS } from "../curriculum/facts";

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
  for (const f of FACTS) {
    if (!f.sources.length) problems.push(`No provenance: ${f.id}`);
    if (banned.test(f.claim) && f.chapter <= 6 && /chapter 7/i.test(f.claim)) {
      problems.push(`Looks like ch7+ leaked: ${f.id}`);
    }
    if (!f.claim.includes("[[") && f.kind !== "cover" && f.importance === "core" && !f.mcq) {
      // cover paragraphs may be wide; still prefer kernels
    }
  }
  for (const c of curr.concepts) {
    if (!c.syllabusOutcomes.includes("1.1")) problems.push(`Concept ${c.id} missing LO 1.1`);
    if (!c.sources.length) problems.push(`Concept ${c.id} has no sources`);
  }
  for (const item of curr.items) {
    if (!item.sources.length) problems.push(`Item ${item.id} has no sources`);
  }
  const titles = new Set(Object.values(curr.stats.chapters).map((c) => c.title));
  for (const t of ["Non-insurance services", "Material circumstances", "Customer service"]) {
    if (titles.has(t)) problems.push(`Chapter title ${t} should not be modelled`);
  }
  return { ok: problems.length === 0, problems };
}
