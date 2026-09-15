import { loadCurriculum } from "../curriculum/compile";
import { emptyState, examReadinessFor, recomputeMastery } from "../engine/learner";
import { dueConceptIds, scheduleWhy } from "../engine/scheduler";
import type { LearnerModel } from "../engine/types";

export function Atlas({
  learner,
  onStart,
  onReset,
}: {
  learner: LearnerModel;
  onStart: () => void;
  onReset: () => void;
}) {
  const curr = loadCurriculum();
  const now = Date.now();
  const due = dueConceptIds(learner, now);
  const exam = examReadinessFor(learner);
  const exposed = Object.values(learner.concepts).filter((c) => c.exposures).length;

  return (
    <div className="atlas">
      <p className="kicker">Outside the session · knowledge model</p>
      <h2>Chapters 1–6 of IF2, held as concepts — not a progress bar.</h2>
      <p className="lede">
        Syllabus 1.1 (insurance products) is about 36 of 100 exam questions. This build maps motor,
        health, packages, property, pecuniary and liability. Non-insurance services and later
        chapters are not in the model.
      </p>
      <div className="row">
        <button onClick={onStart}>{exposed ? "Resume focus session" : "Begin a focus session"}</button>
        <button className="ghost" onClick={onReset}>
          Reset learner
        </button>
      </div>
      <p className="meta">
        Concepts touched: {exposed} / {curr.concepts.length}. Exam-readiness overlay for 1.1:{" "}
        {Math.round(exam * 100)} (heuristic, not a predicted mark). Due or at-risk: {due.length}.
        Sessions: {learner.sessionCount}.
      </p>
      <div className="grid" style={{ marginTop: "2rem" }}>
        <div>
          {[1, 2, 3, 4, 5, 6].map((ch) => (
            <section className="chapter" key={ch}>
              <h3 style={{ fontFamily: "var(--display)" }}>
                {ch}. {curr.stats.chapters[ch as 1].title}
              </h3>
              {curr.concepts
                .filter((c) => c.chapter === ch)
                .map((c) => {
                  const st = recomputeMastery(learner.concepts[c.id] ?? emptyState(c.id), now);
                  return (
                    <div className="concept-line" key={c.id}>
                      <span>
                        {c.title}
                        {st.confidentErrors ? " · confident error" : ""}
                        {Object.keys(st.confusedWithHits).length ? " · mix-up" : ""}
                      </span>
                      <span className={st.estimatedMastery < 0.35 ? "bar warn-bar" : "bar"}>
                        <i style={{ width: `${Math.round(st.estimatedMastery * 100)}%` }} />
                      </span>
                    </div>
                  );
                })}
            </section>
          ))}
        </div>
        <aside>
          <h3 style={{ fontFamily: "var(--display)" }}>Upcoming retrievals</h3>
          <ul>
            {curr.concepts
              .map((c) => ({ c, st: recomputeMastery(learner.concepts[c.id] ?? emptyState(c.id), now) }))
              .filter((x) => x.st.nextDueAt)
              .sort((a, b) => (a.st.nextDueAt ?? 0) - (b.st.nextDueAt ?? 0))
              .slice(0, 10)
              .map(({ c, st }) => (
                <li key={c.id}>
                  <strong>{c.title}</strong>
                  <div className="source">{scheduleWhy(st, now)}</div>
                </li>
              ))}
          </ul>
          <h3 style={{ fontFamily: "var(--display)" }}>Integrity</h3>
          <p className="note">
            Every fact, item and explanation is tagged study-text, key facts, syllabus or exam
            guide. The tutor refuses to invent limits. Calculated mastery is stored separately from
            sourced claims.
          </p>
        </aside>
      </div>
    </div>
  );
}
