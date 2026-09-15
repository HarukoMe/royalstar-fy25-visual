import { loadCurriculum } from "../curriculum/compile";
import type { LearnerModel, PracticeItem, Provenance } from "./types";
import { grade } from "./session";

export type TutorTurn = {
  role: "tutor";
  text: string;
  sources: Provenance[];
  layer: "generated-instruction";
  followUp?: string;
};

/** Source-grounded tutor: never invents policy numbers. Retracts to excerpts. */
export function tutorExplain(conceptId: string, whyFailed?: string): TutorTurn {
  const curr = loadCurriculum();
  const unit = curr.units.find((u) => u.conceptIds.includes(conceptId));
  const concept = curr.concepts.find((c) => c.id === conceptId);
  if (!unit || !concept) {
    return {
      role: "tutor",
      text: "I do not have that concept in the Chapters 1–6 model. I will not invent an IF2 rule.",
      sources: [],
      layer: "generated-instruction",
    };
  }
  const body = unit.reading.map((r) => `${r.heading}. ${r.body}`).join("\n\n");
  const other = concept.confusedWith[0];
  const contrast = other ? curr.units.find((u) => u.conceptIds.includes(other)) : undefined;
  let text = `From the IF2 materials (not from general insurance folklore):\n\n${body}`;
  if (whyFailed && contrast) {
    text += `\n\nA common mix-up is with ${contrast.title}. Contrast:\n${contrast.reading[0]?.body ?? ""}`;
  }
  if (whyFailed) {
    text += `\n\nYour last attempt did not overlap the sourced kernels. Do not memorise the sentence — name the relationship (who is indemnified, what limit, what is excluded).`;
  }
  return {
    role: "tutor",
    text,
    sources: unit.reading.flatMap((r) => r.sources),
    layer: "generated-instruction",
    followUp: concept.confusedWith.length
      ? `In your own words, what would be true of ${concept.title} that would be false of the related idea?`
      : `Say the rule back without copying the wording.`,
  };
}

export function tutorOnItem(item: PracticeItem, response: string): TutorTurn {
  const g = grade(item, response);
  const fact = loadCurriculum().factById[item.factIds[0]];
  const sources = item.sources;
  if (g.success) {
    return {
      role: "tutor",
      text: `That matches the sourced point. ${item.rubric}\n\nI will not treat this as mastered until it survives a gap and a production check.`,
      sources,
      layer: "generated-instruction",
    };
  }
  return {
    role: "tutor",
    text: `${g.note}\n\nSourced statement:\n${fact ? fact.claim.replace(/\[\[|\]\]/g, "") : item.rubric}\n\n${item.whyWrong && item.correctIndex != null ? "If this was a recognition item, read why the other options fail — that is the understand-level work." : "Try a teach-back next, not another reread of the whole chapter."}`,
    sources,
    layer: "generated-instruction",
    followUp: item.type === "mcq" ? "Why is one named distractor wrong?" : undefined,
  };
}

export function detectMemorisingWording(response: string, rubric: string): boolean {
  const a = response.trim().toLowerCase();
  const b = rubric.trim().toLowerCase();
  if (a.length < 40 || b.length < 40) return false;
  return b.includes(a) || a.includes(b.slice(0, Math.min(80, b.length)));
}

export function examVsMasteryNote(model: LearnerModel): string {
  const r = model.examReadiness["1.1"] ?? 0;
  return `Syllabus 1.1 exam-readiness overlay: ${Math.round(r * 100)} on a 0–100 heuristic. This is not a predicted mark. IF2 is 100 MCQs / 2 hours; LO1 is about 36 questions (±2). Chapters 1–6 populate 1.1 products only.`;
}
