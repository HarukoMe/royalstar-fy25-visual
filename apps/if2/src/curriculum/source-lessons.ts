import type { AuthoredFact, ChapterId, Provenance } from "../engine/types";
import sources from "./generated/sources.json";

export type LessonChunk = {
  heading?: string;
  body: string;
  bullets?: string[];
};

export type SourceLesson = {
  heading: string;
  chunks: LessonChunk[];
  text: string;
  sources: Provenance[];
};

type Page = { printedPage: number; text: string };

const KF_HEADINGS: Record<ChapterId, string[]> = {
  1: [
    "Private motor insurance",
    "Standard policy cover",
    "Road Traffic Act only",
    "Third party only (TPO)",
    "Third party, fire and theft (TPFT)",
    "Comprehensive",
    "No claims discount (NCD)",
    "Uninsured driver promise",
    "Optional extensions",
    "Breakage of glass",
    "Personal belongings and clothing",
    "Young additional drivers",
    "Loss of use",
    "Personal accident benefits",
    "Foreign use",
    "Elections",
    "Racing, competitions, rallies and trials",
    "Caravans and trailers",
    "Breakdown cover",
    "Motor legal expenses",
    "Joint policies",
    "Multi car policies",
    "Misfuelling",
    "Exclusions",
    "Motorcycle insurance",
    "Commercial motor insurance",
    "Third party liability",
    "Loss of or damage to the vehicle",
    "Trailers",
    "Limitations",
  ],
  2: [
    "Personal accident and sickness",
    "Standard policy cover",
    "Accident cover",
    "Sickness cover",
    "Policy benefits",
    "Death",
    "Total loss of (sight in) one or both eyes",
    "Total loss of one or both limbs",
    "Permanent total disablement",
    "Permanent partial disablement",
    "Temporary total disablement",
    "Temporary partial disablement",
    "Medical expenses",
    "Optional extensions",
    "Limitations",
    "Geographical limits",
    "Age limits",
    "Exclusions",
    "Medical expenses insurance",
  ],
  3: [
    "Introduction",
    "Household insurance",
    "Building insurance",
    "Contents insurance",
    "Personal possessions",
    "Legal liability",
    "Travel insurance",
    "Commercial packages",
    "Shopkeepers",
    "Office",
    "Tradesman",
    "Hotel",
  ],
  4: [
    "Fire and special perils",
    "Theft insurance",
    "Glass insurance",
    "Money insurance",
    "All risks",
    "Engineering",
  ],
  5: [
    "Legal expenses insurance",
    "Business interruption insurance",
    "Material damage warranty",
    "Fidelity",
    "Credit insurance",
  ],
  6: [
    "Employers’ liability insurance",
    "Employers' liability insurance",
    "Standard policy cover",
    "Definition of employee",
    "Public liability insurance",
    "Product liability insurance",
    "Directors’ and officers’ D&O",
    "Professional indemnity",
    "Trustee insurance",
    "Cyber insurance",
    "Extended warranties",
  ],
};

const STUDY_HEADINGS: { raw: string; as: string }[] = [
  { raw: "Introduction", as: "Private motor insurance" },
  { raw: "A Private motor insurance", as: "Private motor insurance" },
  { raw: "A1 Standard policy cover", as: "Standard policy cover" },
  { raw: "A1A Road Traffic Act only", as: "Road Traffic Act only" },
  { raw: "A1B Third party only (TPO)", as: "Third party only (TPO)" },
  { raw: "A1C Third party, fire and theft (TPFT)", as: "Third party, fire and theft (TPFT)" },
  { raw: "A1D Comprehensive", as: "Comprehensive" },
  { raw: "A1E No claims discount (NCD)", as: "No claims discount (NCD)" },
  { raw: "A1F Uninsured driver promise", as: "Uninsured driver promise" },
  { raw: "A2 Optional extensions", as: "Optional extensions" },
  { raw: "A2A Breakage of glass", as: "Breakage of glass" },
  { raw: "A2B Personal belongings and clothing", as: "Personal belongings and clothing" },
  { raw: "A2C Young additional drivers", as: "Young additional drivers" },
  { raw: "A2D Loss of use", as: "Loss of use" },
  { raw: "A2E Personal accident benefits", as: "Personal accident benefits" },
  { raw: "A2F Foreign use", as: "Foreign use" },
  { raw: "A2G Elections", as: "Elections" },
  { raw: "A2H Racing, competitions, rallies and trials", as: "Racing, competitions, rallies and trials" },
  { raw: "A2I Caravans and trailers", as: "Caravans and trailers" },
  { raw: "A2J Breakdown cover", as: "Breakdown cover" },
  { raw: "A2K Motor legal expenses", as: "Motor legal expenses" },
  { raw: "A2L Joint policies", as: "Joint policies" },
  { raw: "A2M Multi car policies", as: "Multi car policies" },
  { raw: "A2N Misfuelling", as: "Misfuelling" },
  { raw: "A3 Exclusions", as: "Exclusions" },
  { raw: "A3A Use of the insured vehicle", as: "Use of the insured vehicle" },
  { raw: "B Motorcycle insurance", as: "Motorcycle insurance" },
  { raw: "B1 Standard policy cover", as: "Motorcycle insurance" },
  { raw: "B2 Optional extensions", as: "Motorcycle insurance" },
  { raw: "B3 Limitations", as: "Motorcycle insurance" },
  { raw: "C Commercial motor insurance", as: "Commercial motor insurance" },
  { raw: "C1 Standard policy cover", as: "Commercial motor insurance" },
  { raw: "C1A Third party liability", as: "Third party liability" },
  { raw: "C1B Loss of or damage to the vehicle", as: "Loss of or damage to the vehicle" },
  { raw: "C1C Trailers", as: "Trailers" },
  { raw: "C1D Private motor policies only", as: "Private motor policies only" },
  { raw: "C2 Optional extensions", as: "Commercial motor insurance" },
  { raw: "C3 Limitations", as: "Limitations" },
];

let _cache: Map<string, SourceLesson[]> | null = null;

export function resetSourceLessonCache() {
  _cache = null;
}

export function normTitle(s: string): string {
  return s
    .toLowerCase()
    .replace(/[’']/g, "'")
    .replace(/\(.*?\)/g, " ")
    .replace(/insurance$/i, "")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function titlesMatch(a: string, b: string): boolean {
  const na = normTitle(a);
  const nb = normTitle(b);
  if (!na || !nb) return false;
  if (na === nb) return true;
  if (na.startsWith(nb) || nb.startsWith(na)) return true;
  const as = new Set(na.split(" ").filter((w) => w.length > 2));
  const bs = nb.split(" ").filter((w) => w.length > 2);
  if (!bs.length || !as.size) return false;
  const hit = bs.filter((w) => as.has(w)).length;
  return hit / bs.length >= 0.8 && hit >= 2;
}

function stitch(pages: Page[]): string {
  return pages.map((p) => p.text).join("\n");
}

function stripChrome(text: string, chapter: ChapterId): string {
  let t = text.replace(/\u00ad/g, "");
  t = t.replace(/^Chapter 1\s*$/gm, "");
  t = t.replace(/Chapter 1\s*Chapter 1[^\n]*/g, "\n");
  t = t.replace(/Chapter 1\s*\d+\/\d+\s*IF2\/[^\n]*/g, "\n");
  t = t.replace(/Chapter 1\s*Motor insurance\s*\d+\/\d+/g, "\n");
  t = t.replace(/^\d+\s+IF2\/.*$/gm, "");
  t = t.replace(/^IF2\/\d{4}.*$/gm, "");
  t = t.replace(new RegExp(`^${chapter}:\\s+[^\\n]+\\s+\\d+\\s*$`, "gm"), "");
  t = t.replace(/^\d+\s+IF2\/July 2026.*$/gm, "");
  t = t.replace(/Contents Syllabus learning[\s\S]*?(?=\nIntroduction\n|\nA )/g, "\n");
  t = t.replace(/Learning objectives[\s\S]*?(?=\nIntroduction\n|\nA )/g, "\n");
  t = t.replace(/This chapter features explanations[\s\S]*?(?=\nA )/g, "\n");
  t = t.replace(/Key terms\n[\s\S]*?(?=\nA )/g, "\n");
  t = t.replace(/^[A-C](\d+[A-Z]?)?\s+[^\n]{1,70}\s+1\.1\s*/gm, "");
  t = t.replace(/^Key points\s*$/gm, "");
  t = t.replace(/Refer to\nSee[^\n]+(\n[^\n]+)?/g, "\n");
  t = t.replace(/On the Web\n[\s\S]*?(?=\n[A-Z])/g, "\n");
  t = t.replace(/Question \d+\.\d+\n[\s\S]*?(?=\n[A-C]\d|[A-Z][a-z]{3,})/g, "\n");
  t = t.replace(/Self-test questions[\s\S]*$/g, "\n");
  t = t.replace(/Question answers[\s\S]*?(?=Self-test|$)/g, "\n");
  t = t.replace(/Key points\nThe main ideas covered[\s\S]*?(?=Question answers|Self-test|$)/g, "\n");
  t = t.replace(/\s*•\s*/g, "\n• ");
  return t;
}

function findLineHits(text: string, heading: string): number[] {
  const variants = [heading, heading.replace(/\s*\(.*?\)\s*/g, " ").replace(/\s+/g, " ").trim()];
  const hits: number[] = [];
  for (const v of variants) {
    if (!v) continue;
    const re = new RegExp(`(?:^|\\n)\\s*${escapeRe(v)}\\s*(?:\\n|$)`, "i");
    let from = 0;
    const hay = text;
    while (from < hay.length) {
      const slice = hay.slice(from);
      const m = re.exec(slice);
      if (!m || m.index == null) break;
      const at = from + m.index + (m[0].startsWith("\n") ? 1 : 0);
      if (!hits.includes(at)) hits.push(at);
      from = at + v.length;
    }
  }
  return hits;
}

function escapeRe(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/’/g, "[’']").replace(/'/g, "[’']");
}

function splitByHeadings(text: string, headings: { raw: string; as: string }[]): { heading: string; body: string }[] {
  const hits: { heading: string; at: number; rawLen: number }[] = [];
  for (const h of headings) {
    for (const at of findLineHits(text, h.raw)) {
      hits.push({ heading: h.as, at, rawLen: h.raw.length });
    }
  }
  hits.sort((a, b) => a.at - b.at || b.rawLen - a.rawLen);
  const picked: { heading: string; at: number; rawLen: number }[] = [];
  for (const h of hits) {
    const last = picked[picked.length - 1];
    if (last && Math.abs(h.at - last.at) < 3) continue;
    picked.push(h);
  }
  const out: { heading: string; body: string }[] = [];
  for (let i = 0; i < picked.length; i++) {
    const start = picked[i]!.at + picked[i]!.rawLen;
    const end = i + 1 < picked.length ? picked[i + 1]!.at : text.length;
    const body = text
      .slice(start, end)
      .trim()
      .replace(/^(insurance|cover)\s+/i, "")
      .trim();
    const existing = out[out.length - 1];
    if (existing && existing.heading === picked[i]!.heading) {
      existing.body = `${existing.body}\n\n${body}`.trim();
    } else {
      out.push({ heading: picked[i]!.heading, body });
    }
  }
  return out.filter((s) => s.body.replace(/\s+/g, " ").length > 40);
}

function shouldJoin(prev: string, next: string): boolean {
  if (!prev || !next) return false;
  if (next.startsWith("•") || next.startsWith("- ")) return false;
  if (prev.startsWith("•") && next.startsWith("•")) return false;
  if (prev.startsWith("•") && !/[.!?]$/.test(prev)) return true;
  if (/^[A-Z][A-Za-z’']{0,28}$/.test(next) && next.length < 32) return false;
  if (prev.endsWith("-") && /^[a-z]/.test(next)) return true;
  if (prev.startsWith("•") && /^[a-z(]/.test(next)) return true;
  if (/[.,;:]$/.test(prev) && !/^[A-Z]/.test(next)) return true;
  if (!/[.!?]$/.test(prev) && /^[a-z(]/.test(next)) return true;
  return false;
}

function joinLines(raw: string): string[] {
  const lines = raw
    .split(/\n/)
    .map((l) => l.replace(/[ \t]+/g, " ").trim())
    .filter(Boolean);
  const merged: string[] = [];
  for (const line of lines) {
    const prev = merged[merged.length - 1];
    if (prev && shouldJoin(prev, line)) {
      if (prev.endsWith("-") && /^[a-z]/.test(line)) merged[merged.length - 1] = prev.slice(0, -1) + line;
      else merged[merged.length - 1] = `${prev} ${line}`;
    } else merged.push(line);
  }
  return merged;
}

function toChunks(raw: string): LessonChunk[] {
  const lines = joinLines(raw);
  const chunks: LessonChunk[] = [];
  let para: string[] = [];
  let bullets: string[] = [];
  const flushPara = () => {
    const body = para.join(" ").replace(/\s+/g, " ").trim();
    if (body) chunks.push({ body });
    para = [];
  };
  const flushBullets = () => {
    if (bullets.length) chunks.push({ body: "", bullets: [...bullets] });
    bullets = [];
  };
  for (const line of lines) {
    if (line.startsWith("•") || line.startsWith("- ")) {
      flushPara();
      bullets.push(line.replace(/^•\s*|^-\s*/, "").replace(/;+\s*$/, "").trim());
      continue;
    }
    if (bullets.length) flushBullets();
    if (/^(Remember,|Be aware|It is important)/i.test(line) || line.length > 40 || /[.!?]$/.test(line)) {
      para.push(line);
    } else if (para.length && para[para.length - 1]!.length < 80) {
      para.push(line);
    } else {
      flushPara();
      para.push(line);
    }
  }
  flushPara();
  flushBullets();
  return chunks.filter((c) => (c.body && c.body.length > 1) || (c.bullets && c.bullets.length));
}

function kfHeadings(ch: ChapterId): { raw: string; as: string }[] {
  const extra = ["Third party only", "Third party, fire and theft", "No claims discount", "Employers’ liability", "Employers' liability", "Public liability", "Product liability", "Directors’ and officers’", "Extended warranty"];
  return [...KF_HEADINGS[ch], ...extra].map((h) => ({ raw: h, as: h }));
}

function buildIndex(): Map<string, SourceLesson[]> {
  const map = new Map<string, SourceLesson[]>();
  const kfChapters = sources.keyFacts as { chapter: ChapterId; title: string; pages: Page[] }[];
  for (const ch of kfChapters) {
    const text = stripChrome(stitch(ch.pages), ch.chapter);
    const parts = splitByHeadings(text, kfHeadings(ch.chapter));
    const lessons = parts.map((p) => {
      const chunks = toChunks(p.body).filter((c) => {
        const t = (c.body || "").trim();
        if (/1\.1/.test(t) && t.length < 160) return false;
        if (/^Key points$/i.test(t)) return false;
        return true;
      });
      return {
        heading: p.heading,
        chunks,
        text: chunks.map((c) => [c.body, ...(c.bullets ?? [])].filter(Boolean).join(" ")).join(" "),
        sources: [
          {
            kind: "key-facts" as const,
            chapter: ch.chapter,
            section: p.heading,
            locator: `IF2 2026 Key Facts ch.${ch.chapter} — ${p.heading}`,
          },
        ],
      };
    });
    map.set(`kf:${ch.chapter}`, lessons);
  }
  const study = (sources.studyText as { chapter: number; pages: Page[] }[] | undefined)?.[0];
  if (study) {
    const text = stripChrome(stitch(study.pages), 1);
    const parts = splitByHeadings(text, STUDY_HEADINGS);
    const lessons = parts.map((p) => {
      const chunks = toChunks(p.body).filter((c) => {
        const t = (c.body || "").trim();
        if (/1\.1/.test(t) && t.length < 160) return false;
        if (/^Key points$/i.test(t)) return false;
        return true;
      });
      return {
        heading: p.heading,
        chunks,
        text: chunks.map((c) => [c.body, ...(c.bullets ?? [])].filter(Boolean).join(" ")).join(" "),
        sources: [
          {
            kind: "study-text" as const,
            chapter: 1 as const,
            section: p.heading,
            locator: `IF2 2026 Study Text ch.1 — ${p.heading}`,
          },
        ],
      };
    });
    map.set("st:1", lessons);
  }
  return map;
}

function index(): Map<string, SourceLesson[]> {
  if (!_cache) _cache = buildIndex();
  return _cache;
}

function pickFrom(list: SourceLesson[], title: string, facts: AuthoredFact[]): SourceLesson | null {
  const matches = list.filter((l) => titlesMatch(l.heading, title));
  if (!matches.length) return null;
  if (matches.length === 1) return matches[0]!;
  const kernels = facts
    .map((f) => f.claim.replace(/\[\[|\]\]/g, "").slice(0, 48).toLowerCase())
    .filter(Boolean);
  const scored = matches
    .map((m) => {
      const hay = m.text.toLowerCase();
      const score = kernels.reduce((n, k) => n + (hay.includes(k.slice(0, 24)) ? 1 : 0), 0) + m.text.length / 4000;
      return { m, score };
    })
    .sort((a, b) => b.score - a.score);
  return scored[0]?.m ?? matches[0]!;
}

function mergeLessons(a: SourceLesson, b: SourceLesson): SourceLesson {
  const seen = new Set(a.chunks.map((c) => (c.body || c.bullets?.join(" ") || "").slice(0, 80)));
  const extra = b.chunks.filter((c) => !seen.has((c.body || c.bullets?.join(" ") || "").slice(0, 80)));
  const chunks = extra.length ? [...a.chunks, ...extra] : a.chunks.length >= b.chunks.length ? a.chunks : b.chunks;
  return {
    heading: a.heading,
    chunks,
    text: chunks.map((c) => [c.body, ...(c.bullets ?? [])].filter(Boolean).join(" ")).join(" "),
    sources: [...a.sources, ...b.sources.filter((s) => !a.sources.some((x) => x.locator === s.locator))],
  };
}

/** Full Key Facts (and ch.1 study text) lesson for this heading. */
export function lessonFor(chapter: ChapterId, title: string, facts: AuthoredFact[] = []): SourceLesson | null {
  const ix = index();
  const kf = pickFrom(ix.get(`kf:${chapter}`) ?? [], title, facts);
  const st = chapter === 1 ? pickFrom(ix.get("st:1") ?? [], title, facts) : null;
  if (st && kf) {
    const longer = st.text.length >= kf.text.length ? mergeLessons(st, kf) : mergeLessons(kf, st);
    return longer;
  }
  return st ?? kf;
}

export function sourceCoverageChars(chapter: ChapterId, title: string, facts: AuthoredFact[] = []): number {
  return lessonFor(chapter, title, facts)?.text.length ?? 0;
}
