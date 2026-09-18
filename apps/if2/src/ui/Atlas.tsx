import { useMemo, useState } from "react";
import { loadCurriculum } from "../curriculum/compile";
import { coverageLabel, coverageOf, auditCurriculum, forgettingRisk } from "../engine/coverage";
import { emptyState, examReadinessFor, recomputeMastery } from "../engine/learner";
import { dueConceptIds, scheduleWhy } from "../engine/scheduler";
import { chapterReadiness } from "../engine/exam";
import type { LearnerModel } from "../engine/types";
import { loadSessions, downloadProgress, importProgress } from "../storage";

type View =
  | "map"
  | "outcomes"
  | "graph"
  | "reviews"
  | "misconceptions"
  | "readiness"
  | "sessions"
  | "questions"
  | "distinctions";

export function Atlas({
  learner,
  onStart,
  onReset,
  onExam,
  onImported,
}: {
  learner: LearnerModel;
  onStart: (chapter?: 1 | 2 | 3 | 4 | 5 | 6) => void;
  onReset: () => void;
  onExam: () => void;
  onImported?: () => void;
}) {
  const curr = loadCurriculum();
  const now = Date.now();
  const [view, setView] = useState<View>("map");
  const due = dueConceptIds(learner, now);
  const exam = examReadinessFor(learner);
  const audit = useMemo(() => auditCurriculum(curr.concepts, curr.facts, curr.items, learner, now), [learner, curr.concepts, curr.facts, curr.items, now]);
  const sessions = loadSessions();
  const exposed = audit.rows.filter((r) => r.flags.encountered).length;

  return (
    <div className="atlas">
      <p className="kicker">Progress map · not the study page</p>
      <h2>Chapters 1–6 of IF2 (syllabus 1.1 products).</h2>
      <p className="lede">
        {curr.stats.concepts} concepts · {curr.stats.facts} sourced claims · {curr.stats.sections} sections ·{" "}
        {curr.stats.mcq} multiple-choice items ({curr.stats.examStyleMcq} exam-shaped). Study is read the book with
        Next. Check this when you want a question on that lesson. This map is for gaps, mix-ups and a backup if you switch computers.
      </p>
      <div className="row">
        <button onClick={() => onStart()}>{exposed ? "Continue reading" : "Start reading"}</button>
        <button className="ghost" onClick={onExam}>
          Exam practice
        </button>
        <button className="ghost" onClick={() => downloadProgress()}>
          Export progress
        </button>
        <label className="ghost" style={{ display: "inline-flex", alignItems: "center", cursor: "pointer", padding: "0.85rem 1.2rem", borderRadius: 999, border: "1px solid var(--line)" }}>
          Import progress
          <input
            type="file"
            accept="application/json,.json"
            style={{ display: "none" }}
            onChange={(ev) => {
              const file = ev.target.files?.[0];
              ev.target.value = "";
              if (!file) return;
              const reader = new FileReader();
              reader.onload = () => {
                try {
                  const parsed = JSON.parse(String(reader.result));
                  const r = importProgress(parsed);
                  if (!r.ok) {
                    window.alert(r.error);
                    return;
                  }
                  onImported?.();
                } catch {
                  window.alert("Could not read that file.");
                }
              };
              reader.readAsText(file);
            }}
          />
        </label>
        <button className="ghost" onClick={onReset}>
          Reset learner
        </button>
      </div>
      <p className="meta">
        Encountered {exposed} of {curr.stats.concepts}. Still open in the journey: {audit.unfinishedCount}.
        Heuristic exam overlay 1.1: {Math.round(exam * 100)}. Due now: {due.length}. Sessions: {learner.sessionCount}.
        Rough study depth: {audit.journeyHoursEstimate}+ focused hours if you actually retrieve after delays.
        Progress stays in this browser — export a backup if you will study on another computer.
      </p>
      <nav className="view-nav">
        {(
          [
            ["map", "Curriculum map"],
            ["outcomes", "Learning outcome"],
            ["graph", "Dependencies"],
            ["reviews", "Spaced reviews"],
            ["misconceptions", "Mix-ups"],
            ["readiness", "Readiness"],
            ["sessions", "Sessions"],
            ["questions", "Question history"],
            ["distinctions", "Weak distinctions"],
          ] as const
        ).map(([id, label]) => (
          <button key={id} className={view === id ? "" : "ghost"} onClick={() => setView(id)}>
            {label}
          </button>
        ))}
      </nav>

      {view === "map" && (
        <div className="grid" style={{ marginTop: "1.4rem" }}>
          <div>
            {([1, 2, 3, 4, 5, 6] as const).map((ch) => (
              <section className="chapter" key={ch}>
                <h3 style={{ fontFamily: "var(--display)" }}>
                  {ch}. {curr.stats.chapters[ch].title}
                  <span className="meta">
                    {" "}
                    · {curr.stats.conceptsByChapter[ch]} concepts · {curr.stats.factsByChapter[ch]} claims
                  </span>
                  <button className="ghost" style={{ marginLeft: "0.6rem", padding: "0.2rem 0.7rem" }} onClick={() => onStart(ch)}>
                    Read
                  </button>
                </h3>
                {audit.rows
                  .filter((r) => r.chapter === ch)
                  .map((r) => (
                    <div className="concept-line" key={r.id}>
                      <span>
                        {r.title}
                        <em className="cov">{r.label}</em>
                      </span>
                      <span className={r.mastery < 0.35 ? "bar warn-bar" : "bar"}>
                        <i style={{ width: `${Math.round(r.mastery * 100)}%` }} />
                      </span>
                    </div>
                  ))}
              </section>
            ))}
          </div>
          <aside>
            <h3 style={{ fontFamily: "var(--display)" }}>Coverage, not a score</h3>
            <p className="note">
              Each concept should be introduced, explained, retrieved, applied where the syllabus
              asks, then retrieved again after a delay. Recognition is not the same as explanation.
            </p>
            <p className="meta">{audit.missingMcq.length} concepts still have fewer than two MCQs tagged — integrity tests watch this.</p>
          </aside>
        </div>
      )}

      {view === "outcomes" && (
        <section>
          <h3>Syllabus 1.1 — products in Chapters 1–6</h3>
          <p>
            Describe basic features and typical cover of motor, health, packaged, property,
            pecuniary and liability insurance. Chapter 7 (non-insurance services / 1.2) is out of this build.
          </p>
          <ul>
            {([1, 2, 3, 4, 5, 6] as const).map((ch) => (
              <li key={ch}>
                Chapter {ch} ({curr.stats.chapters[ch].title}): chapter readiness{" "}
                {Math.round(chapterReadiness(learner, ch) * 100)}
              </li>
            ))}
          </ul>
        </section>
      )}

      {view === "graph" && (
        <section>
          <h3>Prerequisite edges</h3>
          <ul className="graph-list">
            {curr.concepts
              .filter((c) => c.prerequisites.length || c.confusedWith.length)
              .map((c) => (
                <li key={c.id}>
                  <strong>{c.title}</strong>
                  {c.prerequisites.length ? ` needs ${c.prerequisites.join(", ")}` : ""}
                  {c.confusedWith.length ? ` · easily confused with ${c.confusedWith.join(", ")}` : ""}
                </li>
              ))}
          </ul>
        </section>
      )}

      {view === "reviews" && (
        <section>
          <h3>Upcoming retrievals</h3>
          <ul>
            {audit.rows
              .filter((r) => r.nextDueAt)
              .sort((a, b) => (a.nextDueAt ?? 0) - (b.nextDueAt ?? 0))
              .slice(0, 24)
              .map((r) => {
                const st = recomputeMastery(learner.concepts[r.id] ?? emptyState(r.id), now);
                return (
                  <li key={r.id}>
                    <strong>{r.title}</strong>
                    <div className="source">
                      {scheduleWhy(st, now)} · forgetting risk {Math.round(forgettingRisk(st, now) * 100)}
                    </div>
                  </li>
                );
              })}
          </ul>
        </section>
      )}

      {view === "misconceptions" && (
        <section>
          <h3>Mix-ups currently tracked</h3>
          <ul>
            {curr.concepts
              .map((c) => ({ c, st: learner.concepts[c.id] }))
              .filter((x) => x.st && (x.st.confidentErrors || Object.keys(x.st.confusedWithHits).length))
              .map(({ c, st }) => (
                <li key={c.id}>
                  {c.title}
                  {st!.confidentErrors ? ` · ${st!.confidentErrors} confident error(s)` : ""}
                  {Object.keys(st!.confusedWithHits)
                    .map((id) => ` × ${id}`)
                    .join("")}
                </li>
              ))}
          </ul>
          {!curr.concepts.some((c) => learner.concepts[c.id]?.confidentErrors) && (
            <p className="meta">None yet. They appear when a high-certainty answer misses the sourced key.</p>
          )}
        </section>
      )}

      {view === "readiness" && (
        <section>
          <h3>Chapter and examination overlay</h3>
          <p className="note">
            Mastery is delayed production plus more than one MCQ success. Exam-readiness is MCQ
            performance under that overlay — not a pass mark.
          </p>
          <ul>
            {([1, 2, 3, 4, 5, 6] as const).map((ch) => (
              <li key={ch}>
                Ch {ch}: {Math.round(chapterReadiness(learner, ch) * 100)}
              </li>
            ))}
          </ul>
          <p>LO 1.1 overlay: {Math.round(exam * 100)}</p>
        </section>
      )}

      {view === "sessions" && (
        <section>
          <h3>Previously completed sessions</h3>
          <ul>
            {sessions.length ? (
              sessions
                .slice()
                .reverse()
                .map((s) => (
                  <li key={s.id}>
                    {new Date(s.startedAt).toLocaleString()} · {s.events.filter((e) => e.type === "graded").length} retrievals
                    · {s.adaptations.length} attention adaptations
                  </li>
                ))
            ) : (
              <li>No closed sessions stored yet.</li>
            )}
          </ul>
        </section>
      )}

      {view === "questions" && (
        <section>
          <h3>Question history</h3>
          <ul>
            {Object.entries(learner.questionStats ?? {})
              .sort((a, b) => b[1].lastAt - a[1].lastAt)
              .slice(0, 40)
              .map(([id, st]) => {
                const item = curr.items.find((i) => i.id === id);
                return (
                  <li key={id}>
                    {(item?.prompt ?? id).slice(0, 110)} — {st.correct}/{st.seen}
                    {st.lastCorrect ? "" : " · last miss"}
                  </li>
                );
              })}
          </ul>
          {(learner.examAttempts ?? []).length > 0 && (
            <>
              <h3>Exam sets</h3>
              <ul>
                {learner.examAttempts.map((a) => (
                  <li key={a.id}>
                    {a.mode} {a.correct}/{a.n} · {new Date(a.at).toLocaleString()}
                  </li>
                ))}
              </ul>
            </>
          )}
        </section>
      )}

      {view === "distinctions" && (
        <section>
          <h3>Pairs the materials treat as easy to confuse</h3>
          <ul>
            {curr.concepts
              .filter((c) => c.confusedWith.length)
              .map((c) => (
                <li key={c.id}>
                  {c.title} ↔ {c.confusedWith.join(", ")}
                </li>
              ))}
          </ul>
        </section>
      )}
    </div>
  );
}

void coverageLabel;
void coverageOf;
