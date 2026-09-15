import { useState } from "react";
import { finishExam, startExam, type ExamMode, type ExamState } from "../engine/exam";
import { loadCurriculum } from "../curriculum/compile";
import type { ChapterId, LearnerModel } from "../engine/types";
import { McqCard } from "./McqCard";
import { saveLearner } from "../storage";

export function ExamPractice({
  learner,
  onLearner,
  onClose,
}: {
  learner: LearnerModel;
  onLearner: (m: LearnerModel) => void;
  onClose: () => void;
}) {
  const [exam, setExam] = useState<ExamState | null>(null);
  const [result, setResult] = useState<ReturnType<typeof finishExam> | null>(null);
  const curr = loadCurriculum();

  function begin(mode: ExamMode, chapter?: ChapterId) {
    setResult(null);
    setExam(startExam(learner, { mode, chapter }));
  }

  if (result) {
    const { attempt, byConcept } = result;
    return (
      <div className="stage exam-stage">
        <article className="card debrief">
          <p className="kicker">Exam practice reconstructed</p>
          <h2>
            {attempt.correct} of {attempt.n} in this set — not a predicted IF2 mark.
          </h2>
          <p className="note">
            Feedback was withheld on purpose. IF2 is 100 MCQs in two hours; this set trains
            recognition without immediate correction.
          </p>
          <ul>
            {Object.entries(byConcept).map(([id, row]) => {
              const title = curr.concepts.find((c) => c.id === id)?.title ?? id;
              return (
                <li key={id}>
                  {title}: {row.correct}/{row.n}
                </li>
              );
            })}
          </ul>
          <div className="row">
            <button onClick={() => setResult(null)}>Another set</button>
            <button className="ghost" onClick={onClose}>
              Back to the model
            </button>
          </div>
        </article>
      </div>
    );
  }

  if (!exam) {
    return (
      <div className="stage exam-stage">
        <article className="card">
          <p className="kicker">Examination practice · restrained</p>
          <h2>Sit the question, then find out.</h2>
          <p className="lede">
            Learning sessions explain. This room does not — until the set is finished. Mix of
            weaker and previously successful items, syllabus 1.1 products only.
          </p>
          <div className="row">
            <button onClick={() => begin("drill")}>Short drill</button>
            <button className="ghost" onClick={() => begin("mixed")}>
              Mixed cumulative
            </button>
            <button className="ghost" onClick={() => begin("full")}>
              36-item LO1-shaped set
            </button>
          </div>
          <p className="meta">Chapter tests</p>
          <div className="row">
            {([1, 2, 3, 4, 5, 6] as const).map((ch) => (
              <button key={ch} className="ghost" onClick={() => begin("chapter", ch)}>
                Ch {ch}
              </button>
            ))}
          </div>
          <div className="row">
            <button className="ghost" onClick={onClose}>
              Leave
            </button>
          </div>
        </article>
      </div>
    );
  }

  const q = exam.questions[exam.current];
  return (
    <div className="stage exam-stage">
      <article className="card">
        <p className="kicker">
          {exam.mode} · {exam.current + 1} / {exam.questions.length}
        </p>
        <McqCard
          item={{ ...q.item, options: q.displayOptions, correctIndex: q.displayCorrect, shuffle: false }}
          exam
          onCommit={(_text, displayIndex) => {
            const answers = [...exam.answers];
            answers[exam.current] = displayIndex;
            if (exam.current + 1 >= exam.questions.length) {
              const finished = { ...exam, answers, finished: true };
              const out = finishExam(learner, finished);
              saveLearner(out.learner);
              onLearner(out.learner);
              setExam(null);
              setResult(out);
            } else {
              setExam({ ...exam, answers, current: exam.current + 1 });
            }
          }}
        />
      </article>
    </div>
  );
}
