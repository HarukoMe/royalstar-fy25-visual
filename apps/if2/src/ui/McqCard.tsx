import { useEffect, useMemo, useState } from "react";
import type { PracticeItem } from "../engine/types";
import { shuffleMcq } from "../engine/shuffle";

export function McqCard({
  item,
  exam,
  onCommit,
}: {
  item: PracticeItem;
  exam?: boolean;
  onCommit: (chosenText: string, displayIndex: number, confidence: number) => void;
}) {
  const shuffled = useMemo(() => {
    if (item.shuffle === false && item.options && item.correctIndex != null) {
      return { options: item.options, correctIndex: item.correctIndex };
    }
    return shuffleMcq(item.options ?? [], item.correctIndex ?? 0);
  }, [item.id, item.shuffle, item.options, item.correctIndex]);
  const [choice, setChoice] = useState<number | null>(null);
  const [confidence, setConfidence] = useState<number | null>(exam ? 3 : null);
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    setChoice(null);
    setConfidence(exam ? 3 : null);
    setLocked(false);
  }, [item.id, exam]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (locked) return;
      const map: Record<string, number> = { a: 0, b: 1, c: 2, d: 3, "1": 0, "2": 1, "3": 2, "4": 3 };
      const k = e.key.toLowerCase();
      if (k in map && shuffled.options[map[k]]) setChoice(map[k]);
      if (e.key === "Enter" && choice != null && (exam || confidence != null)) commit();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  function commit() {
    if (choice == null || locked) return;
    if (!exam && confidence == null) return;
    setLocked(true);
    onCommit(shuffled.options[choice], choice, confidence ?? 3);
  }

  const showKey = locked && !exam;
  const correct = shuffled.correctIndex;

  return (
    <div>
      <p className="lede">{item.prompt}</p>
      {item.questionKind && (
        <p className="kicker">
          {item.questionKind.replace("-", " ")} · {item.cognitive ?? "recognition"}
          {item.difficulty ? ` · demand ${item.difficulty}` : ""}
        </p>
      )}
      <div className="options mcq-options">
        {shuffled.options.map((o, i) => {
          let state = "";
          if (choice === i && !showKey) state = "selected";
          if (showKey && i === correct) state = "right";
          if (showKey && choice === i && i !== correct) state = "wrong";
          return (
            <button
              key={`${item.id}-${i}-${o.slice(0, 24)}`}
              className={`mcq-opt ${state}`}
              disabled={locked && !exam ? true : false}
              onClick={() => !locked && setChoice(i)}
            >
              <span className="letter">{String.fromCharCode(65 + i)}</span>
              {o}
            </button>
          );
        })}
      </div>
      {!exam && !locked && (
        <>
          <p className="meta">How sure are you? Then lock the answer — the key is hidden until you do.</p>
          <div className="confidence">
            {[1, 2, 3, 4, 5].map((n) => (
              <button key={n} data-on={confidence === n ? "1" : "0"} onClick={() => setConfidence(n)}>
                {n}
              </button>
            ))}
          </div>
        </>
      )}
      {!locked && (
        <div className="row">
          <button disabled={choice == null || (!exam && confidence == null)} onClick={commit}>
            Lock answer
          </button>
        </div>
      )}
      {showKey && choice != null && (
        <div className="mcq-feedback">
          <p className="lede">{choice === correct ? "That is the sourced key." : "Not the sourced key."}</p>
          <p>
            <strong>Why the correct option is right.</strong> {item.whyCorrect ?? item.rubric}
          </p>
          {choice !== correct && item.whyWrong && (
            <p>
              <strong>Why your option is wrong.</strong> {rationaleFor(item, shuffled.options[choice])}
            </p>
          )}
          {item.whyWrong && item.options && (
            <details>
              <summary>The other distractors</summary>
              <ul>
                {shuffled.options.map((o, i) =>
                  i === correct ? null : (
                    <li key={o}>
                      <em>{o}</em> — {rationaleFor(item, o)}
                    </li>
                  )
                )}
              </ul>
            </details>
          )}
          {item.sources.map((s) => (
            <div className="source" key={s.locator}>
              {s.locator}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function rationaleFor(item: PracticeItem, optionText: string): string {
  const orig = item.options ?? [];
  const idx = orig.findIndex((o) => o === optionText);
  if (idx >= 0 && item.whyWrong?.[idx]) return item.whyWrong[idx];
  return "A plausible confusion, not the IF2-sourced answer.";
}
