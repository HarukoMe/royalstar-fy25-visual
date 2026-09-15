import { useEffect, useRef, type ReactNode } from 'react';
import { useStore } from '@/state/useStore';
import styles from './Movement.module.css';

export interface MovementMeta {
  readonly index: number;
  readonly id: string;
  readonly ordinal: string;
  readonly name: string;
}

export const MOVEMENTS: readonly MovementMeta[] = [
  { index: 0, id: 'overture', ordinal: '01', name: 'Overture' },
  { index: 1, id: 'growth', ordinal: '02', name: 'Growth' },
  { index: 2, id: 'cost', ordinal: '03', name: 'Cost' },
  { index: 3, id: 'proof', ordinal: '04', name: 'Proof' },
  { index: 4, id: 'strength', ordinal: '05', name: 'Reinsurance Strength' },
  { index: 5, id: 'capital', ordinal: '06', name: 'Capital' },
  { index: 6, id: 'closing', ordinal: '07', name: 'Closing' },
];

interface Props {
  meta: MovementMeta;
  title: ReactNode;
  standfirst?: ReactNode;
  children: ReactNode;
  /** Suppresses the standard header, for the overture. */
  bare?: boolean;
}

export function Movement({ meta, title, standfirst, children, bare = false }: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const setActiveMovement = useStore((s) => s.setActiveMovement);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveMovement(meta.index);
        }
      },
      { rootMargin: '-45% 0px -45% 0px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [meta.index, setActiveMovement]);

  return (
    <section ref={ref} id={meta.id} className={styles.root} aria-labelledby={`${meta.id}-title`}>
      {!bare && (
        <header className={styles.header}>
          <div className={styles.ordinalRow}>
            <span className={styles.ordinal}>{meta.ordinal}</span>
            <span className={styles.rule} />
            <span className="eyebrow">{meta.name}</span>
          </div>
          <h2 id={`${meta.id}-title`} className={styles.title}>
            {title}
          </h2>
          {standfirst && <div className={styles.standfirst}>{standfirst}</div>}
        </header>
      )}
      {bare && (
        <h2 id={`${meta.id}-title`} className="sr-only">
          {meta.name}
        </h2>
      )}
      <div className={styles.body}>{children}</div>
    </section>
  );
}

/** A full-bleed canvas band for a single visualization, with breathing room. */
export function Canvas({
  children,
  label,
  caption,
  wide = false,
}: {
  children: ReactNode;
  label?: string;
  caption?: ReactNode;
  wide?: boolean;
}) {
  return (
    <figure className={`${styles.canvas} ${wide ? styles.canvasWide! : ''}`}>
      {label && <figcaption className={`${styles.canvasLabel} eyebrow`}>{label}</figcaption>}
      <div className={styles.canvasInner}>{children}</div>
      {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
    </figure>
  );
}
