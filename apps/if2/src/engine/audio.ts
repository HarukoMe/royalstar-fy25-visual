import type { SpeechAct } from "./types";
import type { FocusActivity } from "./session";

export function speechActsFor(activity: FocusActivity): SpeechAct[] {
  return activity.speech;
}

export type AudioStatus = "idle" | "speaking" | "paused";

export type AudioBridge = {
  speak: (acts: SpeechAct[], onEnd?: () => void) => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
  supported: boolean;
  status: () => AudioStatus;
};

export function createBrowserAudio(): AudioBridge {
  const synth = typeof window !== "undefined" ? window.speechSynthesis : undefined;
  let queue: SpeechSynthesisUtterance[] = [];
  let index = 0;
  let paused = false;
  let onEndCb: (() => void) | undefined;

  function speakFrom(i: number) {
    if (!synth) return onEndCb?.();
    if (i >= queue.length) {
      paused = false;
      queue = [];
      index = 0;
      onEndCb?.();
      return;
    }
    index = i;
    const u = queue[i];
    u.onend = () => {
      if (paused) return;
      speakFrom(i + 1);
    };
    u.onerror = () => {
      if (paused) return;
      speakFrom(i + 1);
    };
    synth.speak(u);
  }

  return {
    supported: Boolean(synth),
    status() {
      if (paused) return "paused";
      if (synth?.speaking) return "speaking";
      return "idle";
    },
    stop() {
      paused = false;
      queue = [];
      index = 0;
      synth?.cancel();
    },
    pause() {
      if (!synth) return;
      if (!synth.speaking && !paused) return;
      paused = true;
      synth.pause();
      if (!synth.paused) synth.cancel();
    },
    resume() {
      if (!synth) return;
      if (synth.paused) {
        paused = false;
        synth.resume();
        return;
      }
      if (paused) {
        paused = false;
        speakFrom(index);
      }
    },
    speak(acts, onEnd) {
      if (!synth) return onEnd?.();
      synth.cancel();
      paused = false;
      onEndCb = onEnd;
      queue = acts
        .filter((a) => a.kind !== "wait" && a.text.trim())
        .map((a) => {
          const u = new SpeechSynthesisUtterance(a.text);
          u.rate = a.kind === "ask" ? 0.95 : 1;
          return u;
        });
      speakFrom(0);
    },
  };
}
