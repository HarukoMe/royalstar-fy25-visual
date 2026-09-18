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
    });
    return () => {
      live = false;
    };
  }, [settings.baseUrl]);

  function persist(next: KokoroSettings) {
    saveKokoroSettings(next);
    setSettings(next);
    if (typeof window === "undefined") return;
    try {
      const u = new URL(window.location.href);
      if (next.baseUrl.startsWith("https://")) u.searchParams.set("kokoro", next.baseUrl);
      else u.searchParams.delete("kokoro");
      window.history.replaceState(null, "", u);
    } catch {
      /* ignore */
    }
  }

  const voiceInList = KOKORO_VOICES.some((v) => v.id === settings.voice);

  return (
    <div className="listen-wrap">
      <div className="listen-bar" role="group" aria-label="Read this section aloud">
        {listen === "idle" && (
          <button type="button" onClick={onPlay}>
            Listen
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
        <button type="button" className="ghost" onClick={() => setOpen((v) => !v)}>
          Voice
        </button>
      </div>
      {error && <p className="note">{error}</p>}
      {open && (
        <div className="kokoro-settings">
          <p className="meta" style={{ marginTop: 0 }}>
            Leave the LOQ Docker on port 8880 all day. On the work PC, paste the{" "}
            <code>https://….trycloudflare.com</code> tunnel and bookmark this tab — the address is stored as{" "}
            <code>?kokoro=</code>. Same words as the page. Default voice is a British studio mix (Isabella + Heart).
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
            <select value={settings.voice} onChange={(ev) => persist({ ...settings, voice: ev.target.value })}>
              {!voiceInList && (
                <option value={settings.voice}>{settings.voice}</option>
              )}
              {KOKORO_VOICES.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.label}
                </option>
              ))}
            </select>
          </label>
          <label>
            English
            <select
              value={settings.langCode}
              onChange={(ev) => persist({ ...settings, langCode: ev.target.value })}
            >
              <option value="b">British (recommended for IF2)</option>
              <option value="a">American</option>
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
