import type { SpeechAct } from "./types";
import type { FocusActivity } from "./session";

export function speechActsFor(activity: FocusActivity): SpeechAct[] {
  return activity.speech;
}

export type AudioBridge = {
  speak: (acts: SpeechAct[], onEnd?: () => void) => void;
  stop: () => void;
  supported: boolean;
};

export function createBrowserAudio(): AudioBridge {
  const synth = typeof window !== "undefined" ? window.speechSynthesis : undefined;
  let queue: SpeechSynthesisUtterance[] = [];
  return {
    supported: Boolean(synth),
    stop() {
      queue = [];
      synth?.cancel();
    },
    speak(acts, onEnd) {
      if (!synth) return onEnd?.();
      synth.cancel();
      queue = acts
        .filter((a) => a.kind !== "wait")
        .map((a, i, arr) => {
          const u = new SpeechSynthesisUtterance(a.text);
          u.rate = a.kind === "ask" ? 0.95 : 1;
          if (i === arr.length - 1) u.onend = () => onEnd?.();
          return u;
        });
      for (const u of queue) synth.speak(u);
    },
  };
}
