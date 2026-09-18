import { useState } from "react";
import { Atlas } from "./ui/Atlas";
import { Debrief } from "./ui/Debrief";
import { ExamPractice } from "./ui/ExamPractice";
import { Focus } from "./ui/Focus";
import { buildDebrief, endSession, startSession, type DebriefReport, type EngineState } from "./engine/session";
import { loadLearner, resetLearner, saveLearner, saveSession } from "./storage";
import "./styles.css";

export function App() {
  const [mode, setMode] = useState<"atlas" | "focus" | "debrief" | "exam">("atlas");
  const [learner, setLearner] = useState(() => loadLearner());
  const [engine, setEngine] = useState<EngineState | null>(null);
  const [report, setReport] = useState<DebriefReport | null>(null);

  const begin = () => {
    const e = startSession(learner);
    setEngine(e);
    setMode("focus");
  };

  return (
    <div className="app">
      <header className="topbar">
        <h1 className="brand">
          IF2 <span>Conduct</span>
        </h1>
        {mode === "focus" ? (
          <nav>
            <button
              className="ghost"
              onClick={() => {
                if (!engine) return;
                const ended = endSession(engine);
                saveLearner(ended.learner);
                saveSession(ended.log);
                setLearner(ended.learner);
                setReport(buildDebrief(ended));
                setMode("debrief");
              }}
            >
              End session
            </button>
          </nav>
        ) : (
          <nav>
            <button className="ghost" onClick={() => setMode("atlas")}>
              Model
            </button>
            <button className="ghost" onClick={() => setMode("exam")}>
              Exam
            </button>
            <button onClick={begin}>Focus</button>
          </nav>
        )}
      </header>
      {mode !== "focus" && <div className="pulse">{/* quiet chrome */}</div>}
      {mode === "atlas" && (
        <Atlas
          learner={learner}
          onStart={begin}
          onExam={() => setMode("exam")}
          onReset={() => {
            resetLearner();
            setLearner(loadLearner());
          }}
          onImported={() => setLearner(loadLearner())}
        />
      )}
      {mode === "exam" && (
        <ExamPractice learner={learner} onLearner={setLearner} onClose={() => setMode("atlas")} />
      )}
      {mode === "focus" && engine && (
        <Focus
          engine={engine}
          setEngine={(e) => {
            setEngine(e);
            setLearner(e.learner);
          }}
          onEnded={(e) => {
            setLearner(e.learner);
            setReport(buildDebrief(e));
            setMode("debrief");
          }}
        />
      )}
      {mode === "debrief" && report && <Debrief report={report} onAtlas={() => setMode("atlas")} onAgain={begin} />}
    </div>
  );
}
