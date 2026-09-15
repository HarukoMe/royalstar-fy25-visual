import { useEffect, useMemo, useRef, useState } from "react";
import type { AttentionSnapshot } from "../engine/attention";
import {
  confidenceMismatch,
  emptyAttention,
  noteAnswer,
  noteClicks,
  noteIdle,
  noteReread,
} from "../engine/attention";
import type { FocusActivity } from "../engine/session";
import {
  beginGrade,
  commitGrade,
  markRead,
  nextActivity,
  signal,
  type EngineState,
} from "../engine/session";
import { tutorExplain, tutorOnItem } from "../engine/tutor";
import { createBrowserAudio } from "../engine/audio";
import { saveLearner, saveSession } from "../storage";
import type { PracticeItem } from "../engine/types";

export function Focus({
  engine,
  setEngine,
  onEnded,
}: {
  engine: EngineState;
  setEngine: (e: EngineState) => void;
  onEnded: (e: EngineState) => void;
}) {
  const [activity, setActivity] = useState<FocusActivity>(() => nextActivity(engine));
  const [draft, setDraft] = useState("");
  const [choice, setChoice] = useState<number | null>(null);
  const [confidence, setConfidence] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [tutor, setTutor] = useState<string | null>(null);
  const [sources, setSources] = useState<string[]>([]);
  const [audioOn, setAudioOn] = useState(false);
  const started = useRef(Date.now());
  const att = useRef<AttentionSnapshot>(emptyAttention());
  const clicks = useRef<number[]>([]);
  const engineRef = useRef(engine);
  const activityRef = useRef(activity);
  engineRef.current = engine;
  activityRef.current = activity;
  const audio = useMemo(() => createBrowserAudio(), []);

  useEffect(() => {
    if (audioOn) audio.speak(activity.speech);
    else audio.stop();
  }, [activity, audioOn, audio]);

  useEffect(() => {
    const id = window.setInterval(() => {
      const idle = Date.now() - started.current;
      const { signals } = noteIdle(att.current, idle);
      if (signals.includes("inactivity") && activityRef.current.kind === "read") {
        const next = signal(engineRef.current, "inactivity");
        setEngine(next);
        jump(next);
      }
    }, 4000);
    return () => window.clearInterval(id);
  }, [setEngine]);

  function bumpClick() {
    const now = Date.now();
    clicks.current = [...clicks.current.filter((t) => now - t < 2000), now];
    const { signals } = noteClicks(att.current, clicks.current.length);
    if (signals.length) {
      const next = signal(engine, signals[0]);
      setEngine(next);
      jump(next);
    }
  }

  function jump(e: EngineState = engine) {
    started.current = Date.now();
    const a = nextActivity(e);
    setActivity(a);
    setDraft("");
    setChoice(null);
    setConfidence(null);
    setFeedback(null);
    setTutor(null);
    if (a.kind === "debrief") {
      const ended = { ...e, log: { ...e.log, endedAt: Date.now() } };
      saveLearner(ended.learner);
      saveSession(ended.log);
      onEnded(ended);
    }
  }

  function continueAfterRead(unitRead = true) {
    let e = engine;
    if (activity.kind === "read" && unitRead) e = markRead(e, activity.unit);
    saveLearner(e.learner);
    setEngine(e);
    jump(e);
  }

  function submitItem(item: PracticeItem, text: string, revealed: boolean) {
    const latency = Date.now() - started.current;
    let e = beginGrade(engine, item, text, latency, revealed);
    const g = e.pending!.auto;
    const { att: nextAtt, signals } = noteAnswer(att.current, latency, g.success, revealed);
    att.current = nextAtt;
    for (const s of signals) e = signal(e, s);
    const t = tutorOnItem(item, text);
    setTutor(t.text);
    setSources(t.sources.map((x) => x.locator));
    setFeedback(g.note);
    setEngine(e);
  }

  function lockConfidence() {
    if (confidence == null || !engine.pending) return;
    const mismatch = confidenceMismatch(confidence, engine.pending.auto.success);
    let e = commitGrade(engine, confidence);
    if (mismatch) e = signal(e, mismatch);
    saveLearner(e.learner);
    setEngine(e);
    jump(e);
  }

  if (activity.kind === "debrief") return null;

  const item = activity.kind === "retrieve" || activity.kind === "predict" ? activity.item : null;

  return (
    <div
      className="stage"
      onClick={(ev) => {
        if ((ev.target as HTMLElement).closest("button, textarea, input")) return;
        bumpClick();
      }}
    >
      <article className="card">
        <p className="kicker">
          {label(activity)}
          {audioOn ? " · spoken" : ""}
        </p>
        {activity.kind === "read" && (
          <>
            <h2>{activity.unit.title}</h2>
            {activity.unit.comparisonTable && !activity.shortened && (
              <table className="table">
                <thead>
                  <tr>
                    {activity.unit.comparisonTable.headers.map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {activity.unit.comparisonTable.rows.map((row, i) => (
                    <tr key={i}>
                      {row.map((cell, j) => (
                        <td key={j}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            <div className="reading">
              {(activity.shortened ? activity.unit.reading.slice(0, 1) : activity.unit.reading).map((r) => (
                <section key={r.heading}>
                  <h3>{r.heading}</h3>
                  {r.body.split("\n\n").map((p) => (
                    <p key={p.slice(0, 40)}>{p}</p>
                  ))}
                  {r.sources.slice(0, 2).map((s) => (
                    <div className="source" key={s.locator}>
                      {s.locator}
                    </div>
                  ))}
                </section>
              ))}
            </div>
            <div className="row">
              <button onClick={() => continueAfterRead(true)}>I have the idea — retrieve it</button>
              <button
                className="ghost"
                onClick={() => {
                  const { signals } = noteReread(att.current);
                  att.current = { ...att.current, rereadCount: att.current.rereadCount + 1 };
                  if (signals.length) {
                    const e = signal(engine, "reread-loop");
                    setEngine(e);
                    jump(e);
                  }
                }}
              >
                Read once more
              </button>
            </div>
          </>
        )}

        {item && (
          <>
            <h2>{item.type === "prediction" ? "Before the text" : "Retrieve"}</h2>
            <p className="lede">{item.prompt}</p>
            {item.options && (
              <div className="options">
                {item.options.map((o, i) => (
                  <button
                    key={o}
                    data-on={choice === i ? "1" : "0"}
                    onClick={() => {
                      setChoice(i);
                      setDraft(o);
                    }}
                  >
                    {String.fromCharCode(65 + i)}. {o}
                  </button>
                ))}
              </div>
            )}
            {!item.options && (
              <textarea
                value={draft}
                onChange={(ev) => setDraft(ev.target.value)}
                placeholder="Answer from memory. Names, limits, who is indemnified."
              />
            )}
            {!engine.pending && (
              <div className="row">
                <button disabled={!draft.trim()} onClick={() => submitItem(item, draft, false)}>
                  Commit answer
                </button>
                {item.type !== "prediction" && (
                  <button
                    className="ghost"
                    onClick={() => {
                      setDraft(item.rubric);
                      submitItem(item, item.expected[0] ?? "", true);
                    }}
                  >
                    Reveal sourced point
                  </button>
                )}
              </div>
            )}
            {engine.pending && (
              <>
                <p className="lede">{feedback}</p>
                {tutor && <p>{tutor}</p>}
                {sources.map((s) => (
                  <div className="source" key={s}>
                    {s}
                  </div>
                ))}
                <p className="meta">How sure were you before seeing the sourced point?</p>
                <div className="confidence">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button key={n} data-on={confidence === n ? "1" : "0"} onClick={() => setConfidence(n)}>
                      {n}
                    </button>
                  ))}
                </div>
                <div className="row">
                  <button disabled={confidence == null} onClick={lockConfidence}>
                    Continue
                  </button>
                  <button
                    className="ghost"
                    onClick={() => {
                      const t = tutorExplain(item.conceptIds[0], engine.pending?.auto.success ? undefined : "fail");
                      setTutor(t.text);
                      setSources(t.sources.map((x) => x.locator));
                    }}
                  >
                    Explain differently
                  </button>
                </div>
              </>
            )}
          </>
        )}

        <p className="meta">
          The engine is choosing the next move. Do not hunt the syllabus from here.
          <button className="ghost" style={{ marginLeft: 8 }} onClick={() => setAudioOn((v) => !v)}>
            {audioOn ? "Mute" : "Speak this step"}
          </button>
        </p>
      </article>
    </div>
  );
}

function label(a: FocusActivity): string {
  if (a.kind === "read") return a.shortened ? "Shortened exposition" : "Focused reading";
  if (a.kind === "predict") return "Predict before explanation";
  if (a.kind === "retrieve") {
    const map = {
      "due-review": "Spaced retrieval",
      encode: "Immediate retrieval",
      "attention-switch": "Attention adaptation",
      cumulative: "Earlier material",
      misconception: "Distinguish confused ideas",
    };
    return map[a.mode];
  }
  return a.kind;
}
