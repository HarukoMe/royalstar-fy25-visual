import { useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

/**
 * Eases a value up from zero once the element enters the viewport, with easing
 * tuned so digits settle rather than snap. Honours reduced-motion by returning
 * the final value immediately.
 */
export function useCountUp(target: number, durationMs = 1600, decimals = 0) {
  const ref = useRef<HTMLElement | null>(null);
  const [value, setValue] = useState(0);
  const reduced = usePrefersReducedMotion();
  const started = useRef(false);

  useEffect(() => {
    if (reduced) {
      setValue(target);
      return;
    }
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting || started.current) return;
        started.current = true;

        const start = performance.now();
        const step = (now: number) => {
          const t = Math.min(1, (now - start) / durationMs);
          // Quintic ease-out: fast arrival, long settle.
          const eased = 1 - Math.pow(1 - t, 5);
          const next = target * eased;
          const factor = Math.pow(10, decimals);
          setValue(Math.round(next * factor) / factor);
          if (t < 1) requestAnimationFrame(step);
          else setValue(target);
        };
        requestAnimationFrame(step);
      },
      { threshold: 0.4 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, durationMs, decimals, reduced]);

  return { ref, value };
}
