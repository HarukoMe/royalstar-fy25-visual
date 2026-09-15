import { useEffect, useMemo, useRef, useState } from 'react';
import { figures } from '@/data';
import { roleColor } from '@/data/roles';
import { formatUnit, unitPrefix } from '@/lib/format';
import { useStore } from '@/state/useStore';
import { MOVEMENTS } from './Movement';
import styles from './CommandPalette.module.css';

interface Entry {
  kind: 'figure' | 'movement';
  id: string;
  label: string;
  detail: string;
  color: string;
  href?: string;
}

export function CommandPalette() {
  const open = useStore((s) => s.paletteOpen);
  const setOpen = useStore((s) => s.setPaletteOpen);
  const setView = useStore((s) => s.setView);
  const [query, setQuery] = useState('');
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const entries = useMemo<Entry[]>(() => {
    const movements: Entry[] = MOVEMENTS.map((m) => ({
      kind: 'movement',
      id: m.id,
      label: m.name,
      detail: `Movement ${m.ordinal}`,
      color: roleColor('operating'),
      href: `#${m.id}`,
    }));
    const figs: Entry[] = Object.values(figures).map((f) => ({
      kind: 'figure',
      id: f.id,
      label: f.label,
      detail: `${unitPrefix(f.unit)}${formatUnit(f.value, f.unit)} · ${
        f.provenance.tier === 'reported'
          ? `${f.provenance.citation.statement}, p.${f.provenance.citation.printedPage}`
          : 'calculated'
      }`,
      color: roleColor(f.role),
    }));
    return [...movements, ...figs];
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return entries.slice(0, 40);
    return entries
      .filter((e) => `${e.label} ${e.detail} ${e.id}`.toLowerCase().includes(q))
      .slice(0, 40);
  }, [entries, query]);

  useEffect(() => {
    if (open) {
      setQuery('');
      setCursor(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setCursor((c) => Math.min(results.length - 1, c + 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setCursor((c) => Math.max(0, c - 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const target = results[cursor];
        if (target) select(target);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  function select(entry: Entry) {
    setOpen(false);
    if (entry.kind === 'movement' && entry.href) {
      setView('report');
      requestAnimationFrame(() => {
        document.querySelector(entry.href!)?.scrollIntoView({ behavior: 'smooth' });
      });
      return;
    }
    setView('explore');
    requestAnimationFrame(() => {
      const el = document.querySelector(`[data-figure-anchor="${entry.id}"]`);
      el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el?.classList.add('flash');
      window.setTimeout(() => el?.classList.remove('flash'), 1800);
    });
  }

  if (!open) return null;

  return (
    <div className={styles.scrim} onClick={() => setOpen(false)} role="presentation">
      <div
        className={styles.panel}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Search figures and movements"
      >
        <div className={styles.inputRow}>
          <span className={styles.prompt}>/</span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setCursor(0);
            }}
            placeholder="Search any figure, movement or note…"
            className={styles.input}
            spellCheck={false}
          />
          <span className={styles.count}>{results.length}</span>
        </div>
        <ul className={styles.results}>
          {results.map((e, i) => (
            <li key={`${e.kind}-${e.id}`}>
              <button
                className={styles.result}
                data-active={i === cursor ? 'true' : 'false'}
                onMouseEnter={() => setCursor(i)}
                onClick={() => select(e)}
              >
                <span className={styles.swatch} style={{ background: e.color }} />
                <span className={styles.resultLabel}>{e.label}</span>
                <span className={styles.resultDetail}>{e.detail}</span>
              </button>
            </li>
          ))}
          {results.length === 0 && <li className={styles.empty}>No figure matches that search.</li>}
        </ul>
        <div className={styles.footer}>
          <span>↑↓ navigate</span>
          <span>⏎ open</span>
          <span>esc close</span>
        </div>
      </div>
    </div>
  );
}
