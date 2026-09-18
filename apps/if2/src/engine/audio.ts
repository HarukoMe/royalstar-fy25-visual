import type { SpeechAct } from "./types";
import {
  chunkForKokoro,
  loadKokoroSettings,
  speechTexts,
  synthesizeKokoro,
  type KokoroSettings,
} from "./kokoro";

export function speechActsFor(activity: { speech: SpeechAct[] }): SpeechAct[] {
  return activity.speech;
}

export type ListenState = "idle" | "loading" | "speaking" | "paused";

export type AudioBridge = {
  speak: (
    acts: SpeechAct[],
    hooks?: {
      onState?: (s: ListenState) => void;
      onError?: (message: string) => void;
      onEnd?: () => void;
    }
  ) => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
  supported: boolean;
  status: () => ListenState;
};

export function createBrowserAudio(): AudioBridge {
  const el = typeof Audio !== "undefined" ? new Audio() : null;
  let objectUrl: string | null = null;
  let chunks: string[] = [];
  let index = 0;
  let generation = 0;
  let paused = false;
  let state: ListenState = "idle";
  let hooks: { onState?: (s: ListenState) => void; onError?: (message: string) => void; onEnd?: () => void } = {};
  let settings: KokoroSettings = loadKokoroSettings();

  function setState(next: ListenState) {
    state = next;
    hooks.onState?.(next);
  }

  function revoke() {
    if (objectUrl) {
      URL.revokeObjectURL(objectUrl);
      objectUrl = null;
    }
  }

  function stopInternal(advanceGen = true) {
    if (advanceGen) generation += 1;
    paused = false;
    chunks = [];
    index = 0;
    if (el) {
      el.pause();
      el.removeAttribute("src");
      el.load();
    }
    revoke();
    setState("idle");
  }

  async function playIndex(i: number, mine: number) {
    if (!el || mine !== generation) return;
    if (i >= chunks.length) {
      stopInternal(false);
      hooks.onEnd?.();
      return;
    }
    index = i;
    paused = false;
    setState("loading");
    try {
      const blob = await synthesizeKokoro(settings, chunks[i]);
      if (mine !== generation) return;
      revoke();
      objectUrl = URL.createObjectURL(blob);
      el.src = objectUrl;
      el.onended = () => {
        if (mine !== generation || paused) return;
        void playIndex(i + 1, mine);
      };
      await el.play();
      if (mine !== generation) return;
      setState("speaking");
    } catch (err) {
      if (mine !== generation) return;
      const message = err instanceof Error ? err.message : "Kokoro failed.";
      stopInternal(false);
      hooks.onError?.(message);
    }
  }

  if (el) {
    el.preload = "auto";
  }

  return {
    supported: Boolean(el),
    status: () => state,
    stop() {
      stopInternal(true);
    },
    pause() {
      if (!el || state === "idle" || state === "loading") return;
      paused = true;
      el.pause();
      setState("paused");
    },
    resume() {
      if (!el || !paused) return;
      paused = false;
      void el.play().then(
        () => setState("speaking"),
        (err) => hooks.onError?.(err instanceof Error ? err.message : "Could not resume.")
      );
    },
    speak(acts, nextHooks) {
      generation += 1;
      const mine = generation;
      hooks = nextHooks ?? {};
      settings = loadKokoroSettings();
      paused = false;
      const texts = speechTexts(acts);
      chunks = chunkForKokoro(texts);
      if (!el) {
        hooks.onError?.("This browser cannot play audio.");
        return;
      }
      if (!chunks.length) {
        hooks.onEnd?.();
        return;
      }
      void playIndex(0, mine);
    },
  };
}
