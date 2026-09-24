import { useState } from "react";
import { Atlas } from "./ui/Atlas";
import { Book } from "./ui/Book";
import { Debrief } from "./ui/Debrief";
import { ExamPractice } from "./ui/ExamPractice";
import { Focus } from "./ui/Focus";
import { buildDebrief, endSession, startSession, type DebriefReport, type EngineState } from "./engine/session";
import { loadLearner, resetLearner, saveLearner, saveSession } from "./storage";
import type { ChapterId } from "./engine/types";
import "./styles.css";

export function App() {
  const [mode, setMode] = useState<"book" | "atlas" | "focus" | "debrief" | "exam">("book");
  const [learner, setLearner] = useState(() => loadLearner());
  const [engine, setEngine] = useState<EngineState | null>(() => startSession(loadLearner()));
  const [report, setReport] = useState<DebriefReport | null>(null);

  const begin = (chapter?: ChapterId) => {
    const e = startSession(learner, Date.now(), chapter ? { chapter } : undefined);
    setEngine(e);
    setMode("focus");
  };

  return (
    <div className="app">
      <header className="topbar">
        <h1 className="brand">
          IF2 <span>2026</span>
        </h1>
        <nav>
          <button className={mode === "book" ? "" : "ghost"} onClick={() => setMode("book")}>
            Book
          </button>
          <button className={mode === "focus" ? "" : "ghost"} onClick={() => begin()}>
            Cards
          </button>
          <button className={mode === "exam" ? "" : "ghost"} onClick={() => setMode("exam")}>
            Exam
          </button>
          <button className={mode === "atlas" ? "" : "ghost"} onClick={() => setMode("atlas")}>
            Map
          </button>
          {mode === "focus" && (
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
              End
            </button>
          )}
        </nav>
      </header>
      {mode !== "focus" && mode !== "book" && <div className="pulse">{/* quiet chrome */}</div>}
      {mode === "book" && <Book />}
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
      {mode === "debrief" && report && <Debrief report={report} onAtlas={() => setMode("atlas")} onAgain={() => begin()} />}
    </div>
  );
}
