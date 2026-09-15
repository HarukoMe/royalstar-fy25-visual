import { useEffect, useState } from 'react';

/**
 * Progress 0–1 through a sticky scene whose track is taller than the viewport.
 */
export function useScrollScene() {
  const [node, setNode] = useState<HTMLElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!node) return;

    const update = () => {
      const rect = node.getBoundingClientRect();
      const travel = node.offsetHeight - window.innerHeight;
      if (travel <= 0) {
        setProgress(rect.top < 0 ? 1 : 0);
        return;
      }
      const p = Math.min(1, Math.max(0, -rect.top / travel));
      setProgress(p);
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [node]);

  return { progress, ref: setNode, node };
}
