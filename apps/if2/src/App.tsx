import { useState } from "react";
import { Atlas } from "./ui/Atlas";
import { Book } from "./ui/Book";
import { ExamPractice } from "./ui/ExamPractice";
import { loadLearner, resetLearner } from "./storage";
import "./styles.css";

export function App() {
  const [mode, setMode] = useState<"book" | "atlas" | "exam">("book");
  const [learner, setLearner] = useState(() => loadLearner());
  const [openAt, setOpenAt] = useState<{ chapter: number; n: number } | null>(null);

  function read(chapter?: number) {
    setMode("book");
    if (chapter) setOpenAt({ chapter, n: Date.now() });
  }

  return (
    <div className="app">
      <header className="topbar">
        <h1 className="brand">
          IF2 <span>2026</span>
        </h1>
        <nav>
          <button aria-current={mode === "book" ? "page" : undefined} className={mode === "book" ? "" : "ghost"} onClick={() => setMode("book")}>
            Book
          </button>
          <button aria-current={mode === "exam" ? "page" : undefined} className={mode === "exam" ? "" : "ghost"} onClick={() => setMode("exam")}>
            Exam
          </button>
          <button aria-current={mode === "atlas" ? "page" : undefined} className={mode === "atlas" ? "" : "ghost"} onClick={() => setMode("atlas")}>
            Map
          </button>
        </nav>
      </header>
      {mode !== "book" && <div className="pulse">{/* quiet chrome */}</div>}
      {mode === "book" && <Book openAt={openAt} />}
      {mode === "atlas" && (
        <Atlas
          learner={learner}
          onRead={read}
          onExam={() => setMode("exam")}
          onReset={() => {
            resetLearner();
            setLearner(loadLearner());
          }}
          onImported={() => setLearner(loadLearner())}
        />
      )}
      {mode === "exam" && <ExamPractice learner={learner} onLearner={setLearner} onClose={() => setMode("book")} />}
    </div>
  );
}
