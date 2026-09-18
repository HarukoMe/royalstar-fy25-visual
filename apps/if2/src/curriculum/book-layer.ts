import type { AuthoredFact, BookTrap, ChapterId, ReadingRole } from "../engine/types";
import { CHAPTER_META } from "./facts";

/** Exam-critical latches. Phrasing is a hold *about* the sourced claim, not a restatement of the paragraph. */
const FACT_HOLDS: Record<string, string> = {
  "m-compulsory":
    "The specimen exception is a SORN to the DVLA. A garage or a private driveway is not that exception.",
  "m-sorn-exam":
    "The specimen exception is a SORN to the DVLA. A garage or a private driveway is not that exception.",
  "m-four-levels":
    "The exam lives on the ladder: RTA only, TPO, TPFT, comprehensive. Injury is unlimited at every rung; third-party property damage is not.",
  "m-rta-tppd":
    "Injury is unlimited. Third-party property damage on RTA only is not — private car is £1.2 million.",
  "m-tpo-extras":
    "TPO is not RTA-only. The usual extras are off-road, territorial limits, and £20 million TPPD for private cars.",
  "m-tpft":
    "TPFT adds fire and theft of the insured car. It still does not pay accidental damage to that car.",
  "m-comp":
    "Comprehensive is the step that adds accidental and malicious damage to the insured car.",
  "h-pas-nature":
    "Personal accident pays a stated benefit on a contingency. That is not reimbursement of treatment.",
  "h-not-indemnity":
    "Personal accident pays a stated benefit on a contingency. That is not reimbursement of treatment.",
  "h-benefit-not-indemnity":
    "Personal accident pays a stated benefit on a contingency. That is not reimbursement of treatment.",
  "pe-mdw":
    "Business interruption usually will not start without a valid material-damage claim. The building cover and the trading cover are different questions.",
  "pe-bi-dims":
    "The indemnity period is how long BI reimburses the claim. It is not ‘until renewal’.",
  "l-el-comp":
    "Ask three questions: who was hurt, was there property damage, and does the policy fire when the injury is caused or when the claim is made.",
  "l-el-injury-only":
    "Who was hurt? An employee at work is employers’ liability. EL does not pay property claims.",
  "l-el-rsi":
    "Who was hurt? A secretary’s RSI from working conditions is EL, not public liability or legal expenses.",
  "l-pl":
    "Who was hurt? A guest or member of the public is public liability. An employee at work is not.",
  "l-el-min-limit":
    "£5 million is the statutory EL floor. Insurers have written £10 million in practice. That is not public liability’s usual occurrence limit.",
  "l-pl-exclusions":
    "Public liability is an open policy. The exclusions send the claim to someone else’s class.",
  "l-el-occurrence":
    "When does the policy fire? EL cares when the injury was caused, not when someone later notifies.",
  "l-claims-made":
    "When does the policy fire? Claims-made cares when the claim is made, not when the injury was caused.",
  "l-pi-claims":
    "When does the policy fire? Professional indemnity is always claims-made.",
  "l-ew":
    "The buyer paid for extra time after the maker’s guarantee. That is not products liability.",
  "l-ew-term":
    "The buyer paid for extra time after the maker’s guarantee. That is not products liability.",
  "l-products":
    "Products is injury or damage from goods supplied. It is not the buyer’s extended warranty.",
};


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

function shortName(id: string, title: string): string {
  const cut = title.replace(/\s+is\b.*/i, "").replace(/\s+[—–:].*/, "").trim();
  if (cut && cut.length <= 42) return cut;
  return id.replace(/-/g, " ");
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
    if (f.kind === "exclusion" || f.kind === "distinction") {
      for (const other of f.confusedWith ?? []) {
        const name = shortName(other, titleByConcept[other] ?? other);
        push(`Not ${name}`, f.extra?.trim() || `${f.title} is kept distinct from ${name}.`, f.sources);
      }
    }
  }
  return out.slice(0, 3);
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

function kernels(claim: string): string[] {
  const out: string[] = [];
  const re = /\[\[(.+?)\]\]/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(claim))) out.push(m[1]);
  return out;
}

/** One retainable latch about the fact — not a dump of the Key Facts paragraph. */
export function holdForFact(fact: AuthoredFact, titleByConcept: Record<string, string>): string {
  if (FACT_HOLDS[fact.id]) return FACT_HOLDS[fact.id];
  const others = (fact.confusedWith ?? []).map((id) => shortName(id, titleByConcept[id] ?? id));
  if (fact.kind === "distinction") {
    return others.length
      ? `Hold the difference: ${fact.title} is not ${others.join(" / ")}.`
      : "Hold the difference this card is for. The sourced line is the latch.";
  }
  if (fact.kind === "exclusion") {
    return others.length
      ? `This is an exclusion. The exam will offer ${others.join(" / ")} instead.`
      : "This is an exclusion — usually someone else’s class.";
  }
  if (fact.kind === "limit") {
    const k = kernels(fact.claim)[0];
    return k
      ? `One figure to keep: ${k}. Neighbouring classes use other numbers.`
      : CHAPTER_META[fact.chapter].hold;
  }
  if (others.length) {
    return `Easy mix-up with ${others.join(" / ")}. Keep this card on its own.`;
  }
  return CHAPTER_META[fact.chapter].hold;
}

export function seedTraps(chapter: ChapterId, indexInChapter: number): BookTrap[] {
  if (chapter !== 6 || indexInChapter !== 1) return [];
  return [
    {
      title: "Guest vs employee",
      body: "Public liability excludes injury to employees. A hotel guest is PL. A waiter injured arising out of and in the course of employment is EL.",
      sources: [
        { kind: "key-facts", chapter: 6, section: "Exclusions", page: "80", locator: "IF2 2026 Key Facts ch.6 p.80 — Exclusions" },
        { kind: "key-facts", chapter: 6, section: "Standard policy cover", page: "76–78", locator: "IF2 2026 Key Facts ch.6 p.76–78 — Standard policy cover" },
      ],
    },
    {
      title: "£5 million vs £10 million",
      body: "The 1998 Regulations set a statutory EL minimum of £5 million. Insurers have provided £10 million in practice since January 1995. That is not the same figure as public liability’s usual £2 million (up to £10 million not uncommon) occurrence limit.",
      sources: [
        { kind: "key-facts", chapter: 6, section: "Employers’ liability insurance", page: "73", locator: "IF2 2026 Key Facts ch.6 p.73 — Employers’ liability insurance" },
        { kind: "key-facts", chapter: 6, section: "Limit of indemnity", page: "80", locator: "IF2 2026 Key Facts ch.6 p.80 — Limit of indemnity" },
      ],
    },
  ];
}
