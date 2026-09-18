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
  endSession,
  markRead,
  nextActivity,
  openChapter,
  openSection,
  signal,
  type EngineState,
} from "../engine/session";
import { tutorExplain, tutorOnItem } from "../engine/tutor";
import { createBrowserAudio, type ListenState } from "../engine/audio";
import { saveLearner, saveSession } from "../storage";
import type { BookSection, ChapterId, PracticeItem } from "../engine/types";
import { loadCurriculum } from "../curriculum/compile";
import { CHAPTER_META } from "../curriculum/facts";
import { ROLE_LABEL } from "../curriculum/book-layer";
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
  const [tutor, setTutor] = useState<string | null>(null);
  const [sources, setSources] = useState<string[]>([]);
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
  const curr = useMemo(() => loadCurriculum(), []);

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
      const listening = listenRef.current === "speaking" || listenRef.current === "loading" || listenRef.current === "paused";
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
    setTutor(null);
    if (a.kind === "debrief") {
      const ended = endSession(e);
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

  function goSection(id: string) {
    const e = openSection(engine, id);
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
  const chapterSections = curr.sections.filter((s) => s.chapter === chapter);

  return (
    <div
      className="stage book-stage"
      onClick={(ev) => {
        if ((ev.target as HTMLElement).closest("button, textarea, input, label, nav, a")) return;
        bumpClick();
      }}
    >
      <div className="desk">
        <nav className="book-rail" aria-label="Chapters and sections">
          <p className="kicker">In this book</p>
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
          <h3 className="rail-title">
            Ch {chapter} · {CHAPTER_META[chapter].title}
          </h3>
          <p className="rail-hold">{CHAPTER_META[chapter].hold}</p>
          <ol className="section-toc">
            {chapterSections.map((s) => {
              const seen = s.conceptIds.some((id) => (engine.learner.concepts[id]?.exposures ?? 0) > 0);
              const on = liveSection?.id === s.id;
              return (
                <li key={s.id}>
                  <button type="button" className={on ? "" : "ghost"} data-on={on ? "1" : "0"} onClick={() => goSection(s.id)}>
                    <span className="toc-idx">{s.indexInChapter}</span>
                    <span>
                      {s.title}
                      {seen ? <em className="cov"> read</em> : null}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </nav>

        <article className="book">
          <div className="spine" aria-hidden="true" />
          <div className="page">
            {activity.kind === "read" && (
              <>
                <p className="kicker">
                  Chapter {activity.section.chapter} · {activity.section.chapterTitle} · lesson {activity.section.indexInChapter} of{" "}
                  {activity.section.sectionCountInChapter}
                  {activity.shortened ? " · shorter pass" : ""}
                </p>
                <h2>{activity.section.title}</h2>
                {activity.section.lede && <p className="lede hold">{activity.section.lede}</p>}
                {activity.unit.comparisonTable && !activity.shortened && (
                  <figure className="table-wrap">
                    <figcaption>{activity.unit.comparisonTable.caption}</figcaption>
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
                  </figure>
                )}
                <div className="reading">
                  {(activity.shortened ? activity.section.reading.slice(0, 1) : activity.section.reading).map((r, i) => (
                    <section key={`${r.heading ?? "p"}-${i}`} data-role={r.role ?? "fact"}>
                      <span className={`role-tag ${r.role ?? "fact"}`}>{ROLE_LABEL[r.role ?? "fact"]}</span>
                      {r.heading ? <h3>{r.heading}</h3> : null}
                      {r.body.split("\n\n").map((p) => (
                        <p key={p.slice(0, 48)}>{p}</p>
                      ))}
                      {r.sources.map((s) => (
                        <div className="source" key={s.locator}>
                          {s.locator}
                        </div>
                      ))}
                    </section>
                  ))}
                </div>
                {!activity.shortened && activity.section.traps.length > 0 && (
                  <div className="traps">
                    {activity.section.traps.map((t) => (
                      <aside className="trap" key={`${t.title}-${t.body.slice(0, 24)}`}>
                        <span className="role-tag trap">Trap</span>
                        <h3>{t.title}</h3>
                        <p>{t.body}</p>
                        {t.sources.map((s) => (
                          <div className="source" key={s.locator}>
                            {s.locator}
                          </div>
                        ))}
                      </aside>
                    ))}
                  </div>
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
                  <button type="button" onClick={() => continueAfterRead(true)}>
                    Check this lesson
                  </button>
                  <button
                    type="button"
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

            {useMcq && item && (
              <>
                <p className="kicker">{label(activity)} · lock A–D</p>
                <h2>{item.examStyle ? "Exam-shaped check" : "Check this lesson"}</h2>
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
                    <button
                      type="button"
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
                )}
                {tutor && <p>{tutor}</p>}
              </>
            )}

            {useTyped && item && (
              <>
                <p className="kicker">{label(activity)}</p>
                <h2>{item.type === "prediction" ? "Before the text" : "In your own words"}</h2>
                <p className="lede">{item.prompt}</p>
                <textarea
                  value={draft}
                  onChange={(ev) => setDraft(ev.target.value)}
                  placeholder="Answer from memory. Names, limits, who is indemnified."
                />
                {!engine.pending && (
                  <div className="row">
                    <button type="button" disabled={!draft.trim()} onClick={() => submitItem(item, draft, false)}>
                      Commit answer
                    </button>
                    {item.type !== "prediction" && (
                      <button
                        type="button"
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

            <p className="meta own-words">
              <label>
                <input
                  type="checkbox"
                  checked={engine.ownWords}
                  onChange={(ev) => setEngine({ ...engine, ownWords: ev.target.checked })}
                />{" "}
                Answer in your own words next time
              </label>
            </p>
          </div>
        </article>
      </div>
    </div>
  );
}

function label(a: FocusActivity): string {
  if (a.kind === "read") return a.shortened ? "Shorter pass" : "Reading";
  if (a.kind === "predict") return "Before the text";
  if (a.kind === "retrieve") {
    const map = {
      "due-review": "Due question",
      encode: "Check this lesson",
      "attention-switch": "Quick check",
      cumulative: "Earlier material",
      misconception: "Distinguish these",
    };
    return map[a.mode];
  }
  return a.kind;
}
