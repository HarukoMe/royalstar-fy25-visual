import { useEffect, useMemo, useState, type ReactNode } from "react";
import { COMPANION } from "../curriculum/companion";
import { CHAPTER_META } from "../curriculum/facts";
import { loadCurriculum } from "../curriculum/compile";
import { loadMarks, saveMarks, type BookMark } from "../storage";
import type { BookSection } from "../engine/types";

function paint(text: string, marks: BookMark[]) {
  const quotes = [...new Set(marks.map((m) => m.quote).filter((q) => q && text.includes(q)))].sort(
    (a, b) => b.length - a.length
  );
  if (!quotes.length) return text;
  const nodes: ReactNode[] = [];
  let i = 0;
  let k = 0;
  while (i < text.length) {
    let at = -1;
    let quote = "";
    for (const q of quotes) {
      const found = text.indexOf(q, i);
      if (found === -1) continue;
      if (at === -1 || found < at || (found === at && q.length > quote.length)) {
        at = found;
        quote = q;
      }
    }
    if (at === -1) {
      nodes.push(text.slice(i));
      break;
    }
    if (at > i) nodes.push(text.slice(i, at));
    const mark = marks.find((m) => m.quote === quote);
    nodes.push(
      <mark key={k++} className={mark?.color === "amber" ? "hl amber" : "hl"} title={mark?.note || "Highlight"}>
        {quote}
      </mark>
    );
    i = at + quote.length;
  }
  return nodes;
}

function Prose({
  id,
  text,
  marks,
  className,
}: {
  id: string;
  text: string;
  marks: BookMark[];
  className?: string;
}) {
  const mine = marks.filter((m) => m.sectionId === id);
  return <p className={className}>{paint(text, mine)}</p>;
}

export function Book() {
  const curr = useMemo(() => loadCurriculum(), []);
  const [marks, setMarks] = useState<BookMark[]>(() => loadMarks());
  const [query, setQuery] = useState("");
  const [only, setOnly] = useState<number | 0>(0);
  const [here, setHere] = useState(0);
  const [pop, setPop] = useState<{ x: number; y: number; sectionId: string; quote: string } | null>(null);
  const [draft, setDraft] = useState("");

  useEffect(() => {
    saveMarks(marks);
  }, [marks]);

  useEffect(() => {
    const nodes = [...document.querySelectorAll<HTMLElement>(".book-ch")];
    if (!nodes.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (!hit) return;
        const n = Number(hit.target.id.replace("ch-", ""));
        if (n) setHere(n);
      },
      { rootMargin: "-12% 0px -72% 0px", threshold: 0 }
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, [only, query]);

  useEffect(() => {
    const rail = document.querySelector(".rail-list");
    const btn = rail?.querySelector<HTMLElement>('[aria-current="true"]');
    if (!rail || !btn) return;
    const railBox = rail.getBoundingClientRect();
    const btnBox = btn.getBoundingClientRect();
    if (btnBox.top < railBox.top || btnBox.bottom > railBox.bottom) {
      rail.scrollTop += btnBox.top - railBox.top - 8;
    }
    if (btnBox.left < railBox.left || btnBox.right > railBox.right) {
      rail.scrollLeft += btnBox.left - railBox.left - 8;
    }
  }, [here]);

  const q = query.trim().toLowerCase();

  function grab(sectionId: string) {
    const sel = window.getSelection();
    const quote = sel?.toString().replace(/\s+/g, " ").trim() ?? "";
    if (!sel || sel.isCollapsed || quote.length < 2 || quote.length > 420) {
      setPop(null);
      return;
    }
    const range = sel.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    setDraft("");
    setPop({
      x: Math.min(Math.max(8, rect.left), window.innerWidth - 300),
      y: Math.min(rect.bottom + 8, window.innerHeight - 180),
      sectionId,
      quote,
    });
  }

  function addMark(color: BookMark["color"]) {
    if (!pop) return;
    const next: BookMark = {
      id: `m-${Date.now()}`,
      sectionId: pop.sectionId,
      quote: pop.quote,
      note: draft.trim(),
      color,
    };
    setMarks((all) => [next, ...all.filter((m) => !(m.sectionId === next.sectionId && m.quote === next.quote))]);
    setPop(null);
    window.getSelection()?.removeAllRanges();
  }

  function jump(n: number) {
    setOnly(0);
    setHere(n);
    requestAnimationFrame(() => {
      document.getElementById(`ch-${n}`)?.scrollIntoView({ behavior: "instant", block: "start" });
    });
  }

  const sourced = (chapter: number) =>
    curr.sections.filter((s) => {
      if (s.chapter !== chapter) return false;
      if (!q) return true;
      const blob = [s.title, ...s.reading.flatMap((r) => [r.body, ...(r.bullets ?? [])])].join(" ").toLowerCase();
      return blob.includes(q);
    });

  const words =
    COMPANION.flatMap((c) => c.blocks.flatMap((b) => [b.hold ?? "", ...b.paras, ...(b.bullets ?? [])])).join(" ").split(/\s+/).length +
    Math.round(
      curr.sections.reduce(
        (n, s) => n + s.reading.map((r) => `${r.body} ${(r.bullets ?? []).join(" ")}`).join(" ").length,
        0
      ) / 5
    );

  return (
    <div className="book">
      <aside className="book-rail">
        <div className="rail-head">
          <p className="kicker">Contents</p>
          <label>
            Find
            <input value={query} onChange={(ev) => setQuery(ev.target.value)} placeholder="A word in the book" />
          </label>
        </div>
        <nav className="rail-list" aria-label="Chapters">
          <button
            type="button"
            className="ghost"
            aria-current={here === 0 ? "true" : undefined}
            onClick={() => {
              setOnly(0);
              setHere(0);
              window.scrollTo({ top: 0, behavior: "instant" });
            }}
          >
            <span className="rail-n">·</span>
            <span>Overview</span>
          </button>
          {COMPANION.map((c) => (
            <button
              key={c.chapter}
              type="button"
              className="ghost"
              aria-current={here === c.chapter ? "true" : undefined}
              onClick={() => jump(c.chapter)}
            >
              <span className="rail-n">{String(c.chapter).padStart(2, "0")}</span>
              <span>{c.title}</span>
            </button>
          ))}
        </nav>
        <div className="rail-foot">
          <p className="meta">
            {marks.length} highlight{marks.length === 1 ? "" : "s"}
          </p>
          {marks.length > 0 && (
            <button type="button" className="ghost quiet-check" onClick={() => setMarks([])}>
              Clear highlights
            </button>
          )}
        </div>
      </aside>
      <article className="book-page" onMouseUp={(ev) => {
        const sec = (ev.target as HTMLElement).closest("[data-sec]");
        if (!sec) return;
        grab(sec.getAttribute("data-sec") || "");
      }}>
        <p className="kicker">IF2 2026 · 100 questions · 2 hours · English law</p>
        <h2>The whole paper, in one read.</h2>
        <p className="lede">
          About {words.toLocaleString()} words. Each chapter follows the study text’s own sections. Where a key-facts
          checklist sits underneath, it is the short list, after the chapter. Highlight any sentence. Add a note. It
          stays in this browser.
        </p>
        <table className="table lesson-table syllabus">
          <caption>How the 100 questions are split (syllabus, ±2)</caption>
          <thead>
            <tr>
              <th>Outcome</th>
              <th>What it is</th>
              <th>Questions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Products and the services around them. Chapters 1–7.</td>
              <td>36</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Underwriting and wordings. Chapters 8–10.</td>
              <td>31</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Premium, applied to a scene.</td>
              <td>2</td>
            </tr>
            <tr>
              <td>4</td>
              <td>Claims. Chapter 11.</td>
              <td>21</td>
            </tr>
            <tr>
              <td>5</td>
              <td>Policy conditions on a claim.</td>
              <td>2</td>
            </tr>
            <tr>
              <td>6</td>
              <td>Data, security, technology. Chapter 12.</td>
              <td>5</td>
            </tr>
            <tr>
              <td>7</td>
              <td>Customer service. Chapter 13.</td>
              <td>3</td>
            </tr>
          </tbody>
        </table>

        {COMPANION.filter((c) => only === 0 || only === c.chapter).map((c) => (
          <section key={c.chapter} id={`ch-${c.chapter}`} className="book-ch">
            <p className="kicker">
              Chapter {c.chapter} · LO {c.lo} · {c.weight}
            </p>
            <h2>{c.title}</h2>
            {c.blocks.map((b) => (
              <div key={b.id} className="book-note" data-sec={b.id}>
                <h3>{b.heading}</h3>
                {b.hold && <Prose id={b.id} text={b.hold} marks={marks} className="hold" />}
                {b.paras.map((p) => (
                  <Prose key={p.slice(0, 48)} id={b.id} text={p} marks={marks} />
                ))}
                {b.bullets && (
                  <ul>
                    {b.bullets.map((item) => (
                      <li key={item.slice(0, 40)}>{item}</li>
                    ))}
                  </ul>
                )}
                <Notes sectionId={b.id} marks={marks} onChange={setMarks} />
              </div>
            ))}
            {c.chapter <= 6 && sourced(c.chapter).length > 0 && (
              <h3 className="kf-break">Key facts checklist</h3>
            )}
            {c.chapter <= 6 &&
              sourced(c.chapter).map((s) => (
                <Sourced key={s.id} section={s} marks={marks} onChange={setMarks} />
              ))}
            {c.chapter <= 6 && q && sourced(c.chapter).length === 0 && (
              <p className="meta">No heading in this chapter contains “{query.trim()}”.</p>
            )}
          </section>
        ))}
      </article>
      {pop && (
        <div className="mark-pop" style={{ left: Math.max(8, pop.x), top: pop.y }}>
          <p>{pop.quote.slice(0, 140)}{pop.quote.length > 140 ? "…" : ""}</p>
          <input
            value={draft}
            placeholder="Note (optional)"
            onChange={(ev) => setDraft(ev.target.value)}
            onKeyDown={(ev) => {
              if (ev.key === "Enter") addMark("ink");
            }}
          />
          <div className="row">
            <button type="button" onClick={() => addMark("ink")}>
              Highlight
            </button>
            <button type="button" className="ghost" onClick={() => addMark("amber")}>
              Amber
            </button>
            <button type="button" className="ghost" onClick={() => setPop(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Sourced({
  section,
  marks,
  onChange,
}: {
  section: BookSection;
  marks: BookMark[];
  onChange: (m: BookMark[]) => void;
}) {
  const hold = section.reading.find((r) => r.hold)?.hold || section.lede || CHAPTER_META[section.chapter].hold;
  return (
    <section className="book-sec" id={section.id} data-sec={section.id}>
      <p className="kicker">
        {section.chapter}.{section.indexInChapter} · {section.chapterTitle}
      </p>
      <h3>{section.title}</h3>
      <p className="hold">{hold}</p>
      <div className="reading">
        {section.reading.map((r, i) => (
          <div key={`${section.id}-${i}`}>
            {r.body ? <Prose id={section.id} text={r.body} marks={marks} /> : null}
            {r.bullets?.length ? (
              <ul>
                {r.bullets.map((b) => (
                  <li key={b.slice(0, 60)}>
                    <Prose id={section.id} text={b} marks={marks} />
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        ))}
      </div>
      {section.comparisonTable && (
        <table className="table lesson-table">
          <caption>{section.comparisonTable.caption}</caption>
          <thead>
            <tr>
              {section.comparisonTable.headers.map((h) => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {section.comparisonTable.rows.map((row) => (
              <tr key={row.join("|")}>
                {row.map((cell) => (
                  <td key={cell.slice(0, 24)}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <p className="source">{section.reading[0]?.sources[0]?.locator}</p>
      <Notes sectionId={section.id} marks={marks} onChange={onChange} />
    </section>
  );
}

function Notes({
  sectionId,
  marks,
  onChange,
}: {
  sectionId: string;
  marks: BookMark[];
  onChange: (m: BookMark[]) => void;
}) {
  const notes = marks.filter((m) => m.sectionId === sectionId && (m.note || m.quote));
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  if (!notes.length && !open) {
    return (
      <button type="button" className="ghost quiet-check" onClick={() => setOpen(true)}>
        Add a note
      </button>
    );
  }
  return (
    <div className="notes">
      {notes.map((m) => (
        <p key={m.id}>
          {m.quote && <em>“{m.quote.slice(0, 160)}{m.quote.length > 160 ? "…" : ""}”</em>}
          {m.note && <> — {m.note}</>}
          <button
            type="button"
            className="ghost quiet-check"
            onClick={() => onChange(marks.filter((x) => x.id !== m.id))}
          >
            Remove
          </button>
        </p>
      ))}
      {open ? (
        <div className="row">
          <input
            value={text}
            placeholder="Your note on this heading"
            onChange={(ev) => setText(ev.target.value)}
          />
          <button
            type="button"
            onClick={() => {
              if (!text.trim()) return;
              onChange([
                { id: `n-${Date.now()}`, sectionId, quote: "", note: text.trim(), color: "ink" },
                ...marks,
              ]);
              setText("");
              setOpen(false);
            }}
          >
            Save
          </button>
        </div>
      ) : (
        <button type="button" className="ghost quiet-check" onClick={() => setOpen(true)}>
          Add a note
        </button>
      )}
    </div>
  );
}
