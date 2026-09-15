import { useEffect, useState } from 'react';
import { MOVEMENTS } from './Movement';
import { useStore } from '@/state/useStore';
import { ROLE_TOKENS, roleColor } from '@/data/roles';
import styles from './Chrome.module.css';

export function ProgressRail() {
  const active = useStore((s) => s.activeMovement);
  const view = useStore((s) => s.view);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (view === 'explore') return null;

  return (
    <nav className={styles.rail} aria-label="Movements">
      <span className={styles.railTrack} aria-hidden="true">
        <span className={styles.railFill} style={{ transform: `scaleY(${progress})` }} />
      </span>
      <ol className={styles.railList}>
        {MOVEMENTS.map((m) => (
          <li key={m.id}>
            <a
              href={`#${m.id}`}
              className={styles.railLink}
              data-active={m.index === active ? 'true' : 'false'}
            >
              <span className={styles.railOrdinal}>{m.ordinal}</span>
              <span className={styles.railName}>{m.name}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function Controls() {
  const { basis, toggleBasis, provenanceMode, toggleProvenance, factsOnly, toggleFactsOnly } =
    useStore();
  const view = useStore((s) => s.view);
  const setView = useStore((s) => s.setView);
  const setPaletteOpen = useStore((s) => s.setPaletteOpen);

  return (
    <div className={styles.controls}>
      <div className={styles.basisToggle} role="group" aria-label="Basis of presentation">
        <span className={styles.controlLabel}>Basis</span>
        <button
          onClick={toggleBasis}
          className={styles.basisButton}
          data-basis={basis}
          aria-pressed={basis === 'net'}
          style={{
            ['--basis-color' as string]: roleColor(basis === 'gross' ? 'gross' : 'retained'),
          }}
        >
          <span data-on={basis === 'gross' ? 'true' : 'false'}>Gross</span>
          <span data-on={basis === 'net' ? 'true' : 'false'}>Net</span>
        </button>
      </div>

      <button
        className={styles.chip}
        onClick={toggleProvenance}
        aria-pressed={provenanceMode}
        data-on={provenanceMode ? 'true' : 'false'}
      >
        Provenance
      </button>

      <button
        className={styles.chip}
        onClick={toggleFactsOnly}
        aria-pressed={factsOnly}
        data-on={factsOnly ? 'true' : 'false'}
      >
        Facts only
      </button>

      <button
        className={styles.chip}
        onClick={() => setView(view === 'report' ? 'explore' : 'report')}
        data-on={view === 'explore' ? 'true' : 'false'}
      >
        {view === 'report' ? 'Explore' : 'Report'}
      </button>

      <button
        className={styles.palette}
        onClick={() => setPaletteOpen(true)}
        aria-label="Open figure search"
      >
        <span>/</span>
      </button>
    </div>
  );
}

/** The colour-grammar tutorial, shown once in the overture. */
export function GrammarLegend() {
  const roles = (['gross', 'ceded', 'retained'] as const).map((r) => ({
    role: r,
    ...ROLE_TOKENS[r],
  }));

  return (
    <dl className={styles.legend}>
      {roles.map((r, i) => (
        <div key={r.role} className={styles.legendItem} style={{ animationDelay: `${1.1 + i * 0.22}s` }}>
          <dt>
            <span className={styles.legendSwatch} style={{ background: roleColor(r.role) }} />
            {r.label}
          </dt>
          <dd>{r.meaning}</dd>
        </div>
      ))}
    </dl>
  );
}

export function KeyboardShortcuts() {
  const { toggleBasis, toggleProvenance, toggleFactsOnly, setPaletteOpen, paletteOpen } =
    useStore();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && /^(INPUT|TEXTAREA)$/.test(target.tagName)) return;

      if (e.key === '/' && !paletteOpen) {
        e.preventDefault();
        setPaletteOpen(true);
        return;
      }
      if (e.key === 'Escape') {
        setPaletteOpen(false);
        return;
      }
      if (e.metaKey || e.ctrlKey || e.altKey) return;

      switch (e.key.toLowerCase()) {
        case 'g':
          toggleBasis();
          break;
        case 'p':
          toggleProvenance();
          break;
        case 'f':
          toggleFactsOnly();
          break;
        default:
          break;
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [toggleBasis, toggleProvenance, toggleFactsOnly, setPaletteOpen, paletteOpen]);

  return null;
}
