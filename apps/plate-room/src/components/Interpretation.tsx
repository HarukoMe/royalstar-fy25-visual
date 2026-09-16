import { interpretation } from '@/data/interpretation';
import { figure } from '@/data';
import { useStore } from '@/state/useStore';
import styles from './Interpretation.module.css';

export function Interpretation({ id, defaultOpen = false }: { id: string; defaultOpen?: boolean }) {
  const factsOnly = useStore((s) => s.factsOnly);
  const provenanceMode = useStore((s) => s.provenanceMode);
  const i = interpretation(id);

  if (factsOnly) {
    return (
      <aside className={styles.suppressed} aria-live="polite">
        <span className={styles.suppressedMark}>Reading withheld</span>
      </aside>
    );
  }

  return (
    <details className={styles.root} data-provenance={provenanceMode ? 'on' : 'off'} defaultOpen={defaultOpen}>
      <summary className={styles.summary}>Reading</summary>
      <p className={styles.text}>{i.text}</p>
      <p className={styles.basis}>
        <span>Rests on</span>
        {i.basis.map((b) => {
          let label = b;
          try {
            label = figure(b).label;
          } catch {
            label = b;
          }
          return <em key={b}>{label}</em>;
        })}
      </p>
    </details>
  );
}
