import { useEffect, useMemo, useRef, useState } from "react";
import type { AttentionSnapshot } from "../engine/attention";
import {
  confidenceMismatch,
  emptyAttention,
  noteAnswer,
  noteClicks,
  noteIdle,
} from "../engine/attention";
import type { FocusActivity } from "../engine/session";
import {
  beginGrade,
  commitGrade,
  endSession,
  markRead,
  nextActivity,
  openChapter,
  signal,
  requestCheck,
  type EngineState,
} from "../engine/session";
import { createBrowserAudio, type ListenState } from "../engine/audio";
import { saveLearner, saveSession } from "../storage";
import type { BookSection, ChapterId, PracticeItem } from "../engine/types";
import { CHAPTER_META } from "../curriculum/facts";
import { McqCard } from "./McqCard";
import { ListenBar } from "./ListenBar";

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
  const [confidence, setConfidence] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [listen, setListen] = useState<ListenState>("idle");
  const [listenError, setListenError] = useState<string | null>(null);
  const started = useRef(Date.now());
  const lastInput = useRef(Date.now());
  const att = useRef<AttentionSnapshot>(emptyAttention());
  const clicks = useRef<number[]>([]);
  const engineRef = useRef(engine);
  const activityRef = useRef(activity);
  const listenRef = useRef(listen);
  engineRef.current = engine;
  activityRef.current = activity;
  listenRef.current = listen;
  const audio = useMemo(() => createBrowserAudio(), []);

  useEffect(() => {
    audio.stop();
    setListen("idle");
    return () => audio.stop();
  }, [activity, audio]);

  useEffect(() => {
    const mark = () => {
      lastInput.current = Date.now();
    };
    window.addEventListener("pointerdown", mark);
    window.addEventListener("keydown", mark);
    window.addEventListener("scroll", mark, true);
    const id = window.setInterval(() => {
      const idle = Date.now() - lastInput.current;
      const { signals } = noteIdle(att.current, idle);
      const listening =
        listenRef.current === "speaking" || listenRef.current === "loading" || listenRef.current === "paused";
      if (signals.includes("inactivity") && activityRef.current.kind === "read" && !listening) {
        const next = signal(engineRef.current, "inactivity");
        setEngine(next);
        jump(next);
      }
    }, 4000);
    return () => {
      window.clearInterval(id);
      window.removeEventListener("pointerdown", mark);
      window.removeEventListener("keydown", mark);
      window.removeEventListener("scroll", mark, true);
    };
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
    lastInput.current = Date.now();
    audio.stop();
    setListen("idle");
    setListenError(null);
    const a = nextActivity(e);
    setActivity(a);
    setDraft("");
    setConfidence(null);
    setFeedback(null);
    if (a.kind === "debrief") {
      const ended = endSession(e);
      saveLearner(ended.learner);
      saveSession(ended.log);
      onEnded(ended);
    }
  }

  function continueAfterRead(check: boolean) {
    let e = engine;
    if (activity.kind === "read") e = markRead(e, activity.unit);
    if (check) e = requestCheck(e);
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
    setFeedback(g.note);
    setEngine(e);
  }

  function lockConfidence() {
    const conf = confidence ?? 3;
    if (!engine.pending) return;
    const mismatch = confidenceMismatch(conf, engine.pending.auto.success);
    let e = commitGrade(engine, conf);
    if (mismatch) e = signal(e, mismatch);
    saveLearner(e.learner);
    setEngine(e);
    jump(e);
  }

  function goChapter(ch: ChapterId) {
    const e = openChapter(engine, ch);
    setEngine(e);
    jump(e);
  }

  function playSection() {
    if (activity.kind !== "read" && activity.kind !== "retrieve") return;
    setListenError(null);
    setListen("loading");
    audio.speak(activity.speech, {
      onState: setListen,
      onError: (message) => {
        setListen("idle");
        setListenError(message);
      },
      onEnd: () => setListen("idle"),
    });
  }

  function pauseSection() {
    audio.pause();
    setListen("paused");
  }

  function resumeSection() {
    audio.resume();
    setListen("speaking");
  }

  function stopSection() {
    audio.stop();
    setListen("idle");
  }

  if (activity.kind === "debrief") return null;

  const item = activity.kind === "retrieve" || activity.kind === "predict" ? activity.item : null;
  const useMcq = Boolean(item?.options && item.options.length === 4 && item.type !== "prediction");
  const useTyped = Boolean(item && !useMcq);
  const liveSection: BookSection | undefined = activity.kind === "read" ? activity.section : undefined;
  const chapter: ChapterId =
    liveSection?.chapter ?? (item?.chapter as ChapterId | undefined) ?? engine.preferredChapter ?? 1;
  const kernel = activity.kind === "read" ? activity.kernel : undefined;
  const hold = kernel?.hold || liveSection?.lede || CHAPTER_META[chapter].hold;
  const lessonHay = (activity.kind === "read" ? activity.unit.reading : [])
    .map((r) => `${r.body} ${(r.bullets ?? []).join(" ")}`)
    .join(" ")
    .toLowerCase();
  const trap = activity.kind === "read" ? activity.section.traps[0] : undefined;
  const showTrap = Boolean(trap && !lessonHay.includes(trap.body.slice(0, 48).toLowerCase()));

  return (
    <div
      className="stage quiet-stage"
      onClick={(ev) => {
        if ((ev.target as HTMLElement).closest("button, textarea, input, label, nav, a")) return;
        bumpClick();
      }}
    >
      <article className="card quiet-card">
        <div className="chapter-pills" role="navigation" aria-label="Chapters">
          {([1, 2, 3, 4, 5, 6] as const).map((ch) => (
            <button
              key={ch}
              type="button"
              className={chapter === ch ? "" : "ghost"}
              data-on={chapter === ch ? "1" : "0"}
              onClick={() => goChapter(ch)}
              title={CHAPTER_META[ch].title}
            >
              {ch}
            </button>
          ))}
        </div>

        {activity.kind === "read" && kernel && (
          <>
            <p className="kicker">
              {chapter} · {activity.section.title}
            </p>
            <h2 className="hold">{hold}</h2>
            <div className="reading">
              {activity.unit.reading.map((r, i) => (
                <section key={`${r.factId ?? "p"}-${i}`}>
                  {r.heading && r.heading !== activity.section.title && i > 0 ? <h3>{r.heading}</h3> : null}
                  {r.body ? <p>{r.body}</p> : null}
                  {r.bullets?.length ? (
                    <ul>
                      {r.bullets.map((b) => (
                        <li key={b.slice(0, 48)}>{b}</li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}
            </div>
            {activity.unit.comparisonTable && (
              <table className="table lesson-table">
                <caption>{activity.unit.comparisonTable.caption}</caption>
                <thead>
                  <tr>
                    {activity.unit.comparisonTable.headers.map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {activity.unit.comparisonTable.rows.map((row) => (
                    <tr key={row.join("|")}>
                      {row.map((cell, i) => (
                        <td key={`${i}-${cell.slice(0, 24)}`}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {showTrap && trap && (
              <p className="mixup">
                Keep this apart. {trap.body}
              </p>
            )}
            <ListenBar
              listen={listen}
              error={listenError}
              onPlay={playSection}
              onPause={pauseSection}
              onResume={resumeSection}
              onStop={stopSection}
            />
            <div className="row">
              <button type="button" onClick={() => continueAfterRead(false)}>
                Next
              </button>
              <button type="button" className="ghost quiet-check" onClick={() => continueAfterRead(true)}>
                Check this
              </button>
            </div>
          </>
        )}

        {useMcq && item && (
          <>
            <p className="kicker">
              {chapter} · {CHAPTER_META[chapter].title}
            </p>
            <McqCard
              item={item}
              onCommit={(text, _i, conf) => {
                setConfidence(conf);
                submitItem(item, text, false);
              }}
            />
            {engine.pending && (
              <div className="row">
                <button type="button" onClick={lockConfidence}>
                  Continue
                </button>
              </div>
            )}
          </>
        )}

        {useTyped && item && (
          <>
            <p className="kicker">
              {chapter} · {CHAPTER_META[chapter].title}
            </p>
            <h2 className="hold">{item.prompt}</h2>
            <textarea
              value={draft}
              onChange={(ev) => setDraft(ev.target.value)}
              placeholder="From memory."
            />
            {!engine.pending && (
              <div className="row">
                <button type="button" disabled={!draft.trim()} onClick={() => submitItem(item, draft, false)}>
                  Check this
                </button>
              </div>
            )}
            {engine.pending && (
              <>
                <p className="lede">{feedback}</p>
                <p className="meta">How sure?</p>
                <div className="confidence">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button key={n} type="button" data-on={confidence === n ? "1" : "0"} onClick={() => setConfidence(n)}>
                      {n}
                    </button>
                  ))}
                </div>
                <div className="row">
                  <button type="button" disabled={confidence == null} onClick={lockConfidence}>
                    Continue
                  </button>
                </div>
              </>
            )}
          </>
        )}
      </article>
    </div>
  );
}
