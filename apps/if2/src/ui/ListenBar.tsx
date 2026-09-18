import { useEffect, useState } from "react";
import {
  DEFAULT_KOKORO,
  KOKORO_VOICES,
  loadKokoroSettings,
  probeKokoro,
  saveKokoroSettings,
  type KokoroSettings,
} from "../engine/kokoro";
import type { ListenState } from "../engine/audio";

export function ListenBar({
  listen,
  error,
  onPlay,
  onPause,
  onResume,
  onStop,
}: {
  listen: ListenState;
  error: string | null;
  onPlay: () => void;
  onPause: () => void;
  onResume: () => void;
  onStop: () => void;
}) {
  const [settings, setSettings] = useState<KokoroSettings>(() => loadKokoroSettings());
  const [status, setStatus] = useState<"unknown" | "up" | "down">("unknown");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let live = true;
    probeKokoro(settings.baseUrl).then((r) => {
      if (!live) return;
      setStatus(r.ok ? "up" : "down");
      if (!r.ok) setOpen(true);
    });
    return () => {
      live = false;
    };
  }, [settings.baseUrl]);

  function persist(next: KokoroSettings) {
    saveKokoroSettings(next);
    setSettings(next);
  }

  return (
    <div className="listen-wrap">
      <div className="listen-bar" role="group" aria-label="Read this section aloud">
        {listen === "idle" && (
          <button type="button" onClick={onPlay}>
            Listen to this section
          </button>
        )}
        {listen === "loading" && (
          <button type="button" disabled>
            Asking Kokoro…
          </button>
        )}
        {listen === "speaking" && (
          <button type="button" className="ghost" onClick={onPause}>
            Pause
          </button>
        )}
        {listen === "paused" && (
          <button type="button" onClick={onResume}>
            Resume
          </button>
        )}
        {listen !== "idle" && (
          <button type="button" className="ghost" onClick={onStop}>
            Stop
          </button>
        )}
        <span className="meta" style={{ margin: 0 }}>
          {status === "up"
            ? `Kokoro · ${settings.voice}`
            : status === "down"
              ? "Kokoro not reachable"
              : "Kokoro · checking"}
        </span>
        <button type="button" className="ghost" onClick={() => setOpen((v) => !v)}>
          Voice
        </button>
      </div>
      {error && <p className="note">{error}</p>}
      {open && (
        <div className="kokoro-settings">
          <p className="meta" style={{ marginTop: 0 }}>
            Uses the GPU container on port 8880. Leave it running. Same words as the page.
          </p>
          <label>
            Kokoro URL
            <input
              value={settings.baseUrl}
              onChange={(ev) => persist({ ...settings, baseUrl: ev.target.value })}
              placeholder={DEFAULT_KOKORO.baseUrl}
            />
          </label>
          <label>
            Voice
            <select
              value={settings.voice}
              onChange={(ev) => persist({ ...settings, voice: ev.target.value })}
            >
              {KOKORO_VOICES.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.label}
                </option>
              ))}
            </select>
          </label>
          <button
            type="button"
            className="ghost"
            onClick={() => {
              probeKokoro(settings.baseUrl).then((r) => {
                setStatus(r.ok ? "up" : "down");
                if (!r.ok) window.alert(r.error);
                else window.alert(`Kokoro is up. Voices: ${r.voices.slice(0, 8).join(", ") || settings.voice}`);
              });
            }}
          >
            Test connection
          </button>
        </div>
      )}
    </div>
  );
}
