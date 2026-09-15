import type { DebriefReport } from "../engine/session";

export function Debrief({ report, onAtlas, onAgain }: { report: DebriefReport; onAtlas: () => void; onAgain: () => void }) {
  return (
    <div className="stage">
      <article className="card debrief">
        <p className="kicker">Session reconstructed</p>
        <h2>Not a score. What you demonstrated.</h2>
        <section>
          <h3>Demonstrably understood</h3>
          <ul>
            {report.understood.length ? report.understood.map((x) => <li key={x.id}>{x.title}</li>) : <li>Nothing has survived production yet.</li>}
          </ul>
        </section>
        <section>
          <h3>Still uncertain</h3>
          <ul>
            {report.uncertain.map((x) => (
              <li key={x.id}>
                {x.title} — {x.why}
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h3>Misconceptions / mix-ups</h3>
          <ul>
            {report.misconceptions.length ? report.misconceptions.map((x) => <li key={x.id}>{x.title}</li>) : <li>None flagged this session.</li>}
          </ul>
        </section>
        <section>
          <h3>Confident errors</h3>
          <ul>
            {report.confidentErrors.length ? report.confidentErrors.map((x) => <li key={x.id}>{x.title}</li>) : <li>None recorded.</li>}
          </ul>
        </section>
        <section>
          <h3>Scheduled to return</h3>
          <ul>
            {report.reviews.map((x) => (
              <li key={x.id}>
                {x.title} — {x.why}
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h3>Syllabus</h3>
          <p>{report.outcomes.join(" ")}</p>
          <p className="note">{report.masteryVsExam}</p>
        </section>
        <section>
          <h3>Still on the journey</h3>
          <p className="note">
            {report.coverageRemaining} mapped concepts have not been encountered yet. One correct
            answer today does not retire a concept — it will return after a gap.
          </p>
        </section>
        <section>
          <h3>Why the next session does what it does</h3>
          <p className="lede">{report.nextFocus}</p>
        </section>
        <div className="row">
          <button onClick={onAgain}>Start the next session now</button>
          <button className="ghost" onClick={onAtlas}>
            Knowledge model
          </button>
        </div>
      </article>
    </div>
  );
}
