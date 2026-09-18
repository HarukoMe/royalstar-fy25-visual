import type { SpeechAct } from "./types";

export type KokoroSettings = {
  baseUrl: string;
  voice: string;
  langCode: string;
  speed: number;
};

/** Isabella’s British mouth, Heart’s timbre. lang_code b keeps IF2 numbers in British English. */
export const STUDIO_MIX = "bf_isabella(2)+af_heart(1)";

export const DEFAULT_KOKORO: KokoroSettings = {
  baseUrl: "http://127.0.0.1:8880",
  voice: STUDIO_MIX,
  langCode: "b",
  speed: 0.95,
};

export const KOKORO_VOICES: { id: string; label: string }[] = [
  { id: STUDIO_MIX, label: "Studio mix · British (Isabella + Heart)" },
  { id: "bf_isabella", label: "Isabella · British" },
  { id: "bf_alice", label: "Alice · British" },
  { id: "bf_emma", label: "Emma · British" },
  { id: "bf_lily", label: "Lily · British" },
  { id: "bm_george", label: "George · British" },
  { id: "bm_lewis", label: "Lewis · British" },
  { id: "bm_daniel", label: "Daniel · British" },
  { id: "af_heart", label: "Heart · American (highest fidelity; British phonemes still on)" },
  { id: "af_bella", label: "Bella · American" },
];

const VOICE_FALLBACKS = [STUDIO_MIX, "bf_isabella", "af_heart", "bf_emma"];

const KKEY = "if2-kokoro-v1";

export function normalizeBaseUrl(raw: string): string {
  const t = raw.trim().replace(/\/+$/, "");
  return t || DEFAULT_KOKORO.baseUrl;
}

function clampSpeed(n: unknown): number {
  const x = typeof n === "number" ? n : Number(n);
  if (!Number.isFinite(x)) return DEFAULT_KOKORO.speed;
  return Math.min(1.2, Math.max(0.7, x));
}

export function loadKokoroSettings(): KokoroSettings {
  try {
    const raw = localStorage.getItem(KKEY);
    if (!raw) return { ...DEFAULT_KOKORO };
    const parsed = JSON.parse(raw) as Partial<KokoroSettings> & { voiceLocked?: boolean };
    const voice = parsed.voice === "bf_emma" && !parsed.voiceLocked ? DEFAULT_KOKORO.voice : parsed.voice || DEFAULT_KOKORO.voice;
    return {
      baseUrl: normalizeBaseUrl(parsed.baseUrl || DEFAULT_KOKORO.baseUrl),
      voice,
      langCode: parsed.langCode || DEFAULT_KOKORO.langCode,
      speed: clampSpeed(parsed.speed ?? DEFAULT_KOKORO.speed),
    };
  } catch {
    return { ...DEFAULT_KOKORO };
  }
}

export function saveKokoroSettings(next: KokoroSettings) {
  try {
    localStorage.setItem(
      KKEY,
      JSON.stringify({
        baseUrl: normalizeBaseUrl(next.baseUrl),
        voice: next.voice || DEFAULT_KOKORO.voice,
        langCode: next.langCode || DEFAULT_KOKORO.langCode,
        speed: clampSpeed(next.speed),
      })
    );
  } catch {
    /* tests / no window */
  }
}

/** Work PC bookmark: `?kokoro=https://….trycloudflare.com` (optional `&voice=` `&lang=`). */
export function applyKokoroFromSearch(search: string): KokoroSettings {
  const current = loadKokoroSettings();
  const q = new URLSearchParams(search.startsWith("?") ? search.slice(1) : search);
  const next: KokoroSettings = { ...current };
  const url = q.get("kokoro") || q.get("voiceUrl");
  if (url) next.baseUrl = normalizeBaseUrl(url);
  const voice = q.get("voice");
  if (voice) next.voice = voice;
  const lang = q.get("lang");
  if (lang) next.langCode = lang;
  const speed = q.get("speed");
  if (speed) next.speed = clampSpeed(speed);
  saveKokoroSettings(next);
  return next;
}

export function speechTexts(acts: SpeechAct[]): string[] {
  return acts.filter((a) => a.kind !== "wait" && a.text.trim()).map((a) => a.text.trim());
}

/** Keep each Kokoro request to a readable paragraph group, not a novel. */
export function chunkForKokoro(texts: string[], maxChars = 900): string[] {
  const chunks: string[] = [];
  let buf = "";
  for (const t of texts) {
    if (!buf) {
      buf = t;
      continue;
    }
    if (buf.length + 2 + t.length <= maxChars) buf = `${buf}\n\n${t}`;
    else {
      chunks.push(buf);
      buf = t;
    }
  }
  if (buf) chunks.push(buf);
  return chunks;
}

export function parseVoiceIds(payload: unknown): string[] {
  if (!payload) return [];
  if (Array.isArray(payload)) {
    return payload.map((v) => (typeof v === "string" ? v : (v as { id?: string })?.id)).filter((x): x is string => Boolean(x));
  }
  if (typeof payload === "object") {
    const o = payload as { voices?: unknown };
    if (Array.isArray(o.voices)) return parseVoiceIds(o.voices);
    return Object.keys(o).filter((k) => k !== "voices");
  }
  return [];
}

export async function probeKokoro(baseUrl: string): Promise<{ ok: true; voices: string[] } | { ok: false; error: string }> {
  const root = normalizeBaseUrl(baseUrl);
  try {
    const health = await fetch(`${root}/health`, { method: "GET" });
    if (!health.ok) return { ok: false, error: `Kokoro /health returned ${health.status} at ${root}` };
  } catch (err) {
    return { ok: false, error: blockedMessage(root, err) };
  }
  try {
    const voicesRes = await fetch(`${root}/v1/audio/voices`, { method: "GET" });
    if (!voicesRes.ok) return { ok: true, voices: [] };
    const ids = parseVoiceIds(await voicesRes.json());
    return { ok: true, voices: ids };
  } catch {
    return { ok: true, voices: [] };
  }
}

export async function synthesizeKokoro(settings: KokoroSettings, text: string): Promise<Blob> {
  const root = normalizeBaseUrl(settings.baseUrl);
  const chain = unique([settings.voice || DEFAULT_KOKORO.voice, ...VOICE_FALLBACKS]);
  let last = "Kokoro speech failed.";
  for (const voice of chain) {
    let res: Response;
    try {
      res = await fetch(`${root}/v1/audio/speech`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "audio/mpeg,audio/*" },
        body: JSON.stringify({
          model: "kokoro",
          input: text,
          voice,
          response_format: "mp3",
          speed: clampSpeed(settings.speed),
          lang_code: settings.langCode || DEFAULT_KOKORO.langCode,
        }),
      });
    } catch (err) {
      throw new Error(blockedMessage(root, err));
    }
    if (res.ok) return res.blob();
    const detail = await res.text().catch(() => "");
    last = `Kokoro speech failed (${res.status}) ${detail.slice(0, 180)}`.trim();
    if (res.status === 404 || res.status === 422 || res.status === 400) continue;
    throw new Error(last);
  }
  throw new Error(last);
}

function unique(xs: string[]): string[] {
  return [...new Set(xs.filter(Boolean))];
}

function blockedMessage(root: string, err: unknown): string {
  const httpsPage = typeof window !== "undefined" && window.location.protocol === "https:";
  const httpKokoro = root.startsWith("http://");
  if (httpsPage && httpKokoro) {
    return `Browser blocked ${root} from this HTTPS page. Leave Docker on :8880, then paste an https:// tunnel (Cloudflare/Tailscale) here — or open IF2 from http://localhost on the same PC as Docker. Bookmark this tab with ?kokoro=https://….trycloudflare.com so the work PC finds the voice.`;
  }
  const msg = err instanceof Error ? err.message : "network error";
  return `Cannot reach Kokoro at ${root} (${msg}). Keep the GPU container on port 8880.`;
}
