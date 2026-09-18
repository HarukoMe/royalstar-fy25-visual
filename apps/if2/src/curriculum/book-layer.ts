import type { AuthoredFact, BookTrap, ChapterId, ReadingRole } from "../engine/types";
import { CHAPTER_META } from "./facts";

export const ROLE_LABEL: Record<ReadingRole, string> = {
  open: "Open",
  fact: "Fact",
  why: "Why",
  trap: "Trap",
};

export function roleForFact(fact: AuthoredFact, indexInSection: number): ReadingRole {
  if (fact.kind === "exclusion") return "trap";
  if (fact.kind === "distinction" || fact.kind === "example") return "why";
  if (indexInSection === 0) return "open";
  return "fact";
}

function plain(claim: string): string {
  return claim.replace(/\[\[(.+?)\]\]/g, "$1");
}

export function trapsForSection(facts: AuthoredFact[], titleByConcept: Record<string, string>): BookTrap[] {
  const out: BookTrap[] = [];
  const seen = new Set<string>();
  const push = (title: string, body: string, sources: BookTrap["sources"]) => {
    const key = `${title}::${body.slice(0, 80)}`;
    if (seen.has(key)) return;
    seen.add(key);
    out.push({ title, body, sources });
  };

  for (const f of facts) {
    if (f.kind === "exclusion") {
      push("Exclusion", plain(f.claim), f.sources);
    }
    if (f.kind === "distinction") {
      push("Easy mix-up", plain(f.claim), f.sources);
    }
    for (const other of f.confusedWith ?? []) {
      const otherTitle = titleByConcept[other] ?? other.replace(/-/g, " ");
      push(`Not ${otherTitle}`, `${f.title} is kept distinct from ${otherTitle}. ${plain(f.claim)}`, f.sources);
    }
  }
  return out.slice(0, 4);
}

type Comparison = { caption: string; headers: string[]; rows: string[][] };

export function comparisonForSection(
  chapter: ChapterId,
  facts: AuthoredFact[],
  indexInChapter: number
): Comparison | undefined {
  const ids = new Set(facts.map((f) => f.id));
  const concepts = new Set(facts.map((f) => f.conceptId));

  if (ids.has("m-four-levels") || concepts.has("motor-cover-levels")) {
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

  if (
    ids.has("l-el-occurrence") ||
    ids.has("l-claims-made") ||
    ids.has("l-pi-claims") ||
    ids.has("l-employee-def")
  ) {
    return {
      caption: "When the policy fires (IF2 2026 Key Facts ch.6)",
      headers: ["Trigger", "Typical classes", "What has to happen in the period"],
      rows: [
        ["Occurrence", "Employers’ liability (and injury/damage ‘caused’ / happening in the period)", "The injury or disease is caused then — not when a claim is later notified"],
        ["Claims-made", "D&O, professional indemnity, pension-fund trustees", "The claim is made / notified then, subject to retroactive dates and discovery extensions"],
      ],
    };
  }

  if (ids.has("l-pl-exclusions")) {
    return {
      caption: "Public liability is an open policy: the exclusions do the work (Key Facts ch.6)",
      headers: ["PL exclusion", "Usually someone else’s class"],
      rows: [
        ["Injury to employees", "Employers’ liability"],
        ["Product liability", "Products (often bought as a PL extension)"],
        ["Professional negligence", "Professional indemnity"],
        ["Motor vehicles / vessels and craft", "Motor (and equivalent craft covers)"],
      ],
    };
  }

  if (chapter === 6 && (indexInChapter === 1 || concepts.has("el-cover") || concepts.has("pl-cover") || concepts.has("products-cover") || concepts.has("pi-cover") || concepts.has("do-cover"))) {
    return {
      caption: "Liability family — who, what, which trigger (IF2 2026 Key Facts ch.6)",
      headers: ["Class", "Who is hurt / who sues", "Property damage?", "Trigger"],
      rows: [
        ["Employers’ liability", "Employees (contract of service or apprenticeship)", "No — injury/disease only", "Occurrence (caused during the period)"],
        ["Public liability", "Third parties, not employees", "Yes, plus consequential loss from that damage", "Happening during the period; open policy"],
        ["Products liability", "Customers and others, from goods supplied", "Yes (injury and property)", "Injury/damage during the period; yearly aggregate"],
        ["Professional indemnity", "Clients / the public, from professional duty", "Injury, damage or financial loss from the advice", "Always claims-made"],
        ["D&O", "Directors personally, and the company where it may indemnify them", "Bodily injury and property damage are typical exclusions", "Claims-made"],
        ["Trustees’ indemnity", "Trustees, for personal liability / wrongful acts", "Injury and third-party property are other classes", "Claims-made (pension trustees)"],
        ["Extended warranty", "The buyer, after the maker’s guarantee", "First-party repair/replacement — not products liability", "Time extension of the 12-month guarantee, often up to five years"],
      ],
    };
  }

  if (concepts.has("extended-warranty") || ids.has("l-ew") || ids.has("l-ew-term")) {
    return {
      caption: "Buyer’s defect cover is not the manufacturer’s liability (Key Facts / specimen)",
      headers: ["Situation", "Class"],
      rows: [
        ["Dishwasher/TV defect after the original guarantee, buyer paid for extra cover", "Extended warranty"],
        ["Injury or property damage caused by products", "Products liability (often a public liability extension)"],
        ["Household contents ‘all risks’ of possessions", "Not a substitute for the maker’s guarantee in the specimen items"],
      ],
    };
  }

  if (
    ids.has("h-pas-nature") ||
    ids.has("h-not-indemnity") ||
    ids.has("h-benefit-not-indemnity") ||
    concepts.has("health-pas")
  ) {
    return {
      caption: "Benefit versus indemnity (IF2 2026 Key Facts ch.2)",
      headers: ["Product", "What it pays", "Do not confuse with"],
      rows: [
        ["Personal accident / sickness", "A stated benefit on a contingency — not a contract of indemnity", "Medical expenses (reimburses treatment)"],
        ["Weekly disablement", "Capped around normal earnings so there is no inducement to stay off work", "An excess (a franchise is a threshold, not a deduction)"],
      ],
    };
  }

  if (ids.has("pe-mdw") || (chapter === 5 && (concepts.has("pec-bi") || ids.has("pe-bi-dims")))) {
    return {
      caption: "Material damage versus the trading loss (IF2 2026 Key Facts ch.5)",
      headers: ["Class", "What it pays", "Exam latch"],
      rows: [
        ["Property / material damage", "Direct physical loss", "The BI policy usually will not start without a valid MD claim"],
        ["Business interruption", "Loss of income / increased cost of working for the indemnity period", "Indemnity period = how long the policy reimburses the claim, not ‘until renewal’"],
        ["Legal expenses", "Legal costs of specified disputes", "Not public liability disputes"],
      ],
    };
  }

  return undefined;
}

export function chapterHold(chapter: ChapterId): string {
  return CHAPTER_META[chapter].hold;
}
