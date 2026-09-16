import { useId, useState, type ReactNode } from 'react';
import { figure as lookup } from '@/data';
import { roleColor } from '@/data/roles';
import type { Figure as Fig } from '@/data/types';
import { delta } from '@/data/types';
import { compact, exact, formatUnit, signedPercent, unitPrefix } from '@/lib/format';
import { useStore } from '@/state/useStore';
import { useCountUp } from '@/hooks/useCountUp';
import styles from './Figure.module.css';

type Size = 'hero' | 'display' | 'large' | 'body' | 'inline';

interface Props {
  /** Figure id from the data layer. Components never pass raw numbers. */
  id: string;
  size?: Size;
  /** Abbreviate at large sizes. */
  mode?: 'exact' | 'compact';
  /** Animate up from zero on entry. */
  countUp?: boolean;
  /** Show the year-over-year delta chip. */
  showDelta?: boolean;
  /** Override the label, for tighter contexts. */
  label?: string;
  /** Suppress the label entirely. */
  bare?: boolean;
  children?: ReactNode;
}

const SIZE_CLASS: Record<Size, string> = {
  hero: styles.hero!,
  display: styles.display!,
  large: styles.large!,
  body: styles.body!,
  inline: styles.inline!,
};

function ProvenanceCard({ f }: { f: Fig }) {
  const pv = f.provenance;
  if (pv.tier === 'interpretation') return null;
  if (pv.tier === 'reported') {
    return (
      <div className={styles.card}>
        <span className={styles.cardTier} data-tier="reported">
          Reported
        </span>
        <p className={styles.cardLabel}>{f.label}</p>
        <p className={styles.cardValue}>
          {unitPrefix(f.unit)}
          {formatUnit(f.value, f.unit)}
        </p>
        <p className={styles.cardSource}>{pv.citation.statement}</p>
        <p className={styles.cardPage}>
          Printed page {pv.citation.printedPage} · source PDF page {pv.citation.pdfPage}
        </p>
      </div>
    );
  }
  return (
    <div className={styles.card}>
      <span className={styles.cardTier} data-tier="calculated">
        Calculated
      </span>
      <p className={styles.cardLabel}>{f.label}</p>
      <p className={styles.cardValue}>
        {unitPrefix(f.unit)}
        {formatUnit(f.value, f.unit)}
      </p>
      <p className={styles.cardDefinition}>{pv.definition}</p>
      <p className={styles.cardExpression}>{pv.expression}</p>
      <ul className={styles.cardInputs}>
        {pv.inputs.map((inputId) => {
          let inputLabel = inputId;
          let cite = '';
          try {
            const input = lookup(inputId);
            inputLabel = input.label;
            if (input.provenance.tier === 'reported') {
              cite = `${input.provenance.citation.statement}, p.${input.provenance.citation.printedPage}`;
            }
          } catch {
            inputLabel = inputId;
          }
          return (
            <li key={inputId}>
              <span>{inputLabel}</span>
              {cite && <em>{cite}</em>}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function priorLabel(f: Fig): string {
  if (f.prior === undefined) return '';
  if (f.unit === 'BSD') return `${unitPrefix(f.unit)}${compact(f.prior)}`;
  return formatUnit(f.prior, f.unit);
}

export function Figure({
  id,
  size = 'body',
  mode = 'exact',
  countUp = false,
  showDelta = false,
  label,
  bare = false,
  children,
}: Props) {
  const f = lookup(id);
  const provenanceMode = useStore((s) => s.provenanceMode);
  const [open, setOpen] = useState(false);
  const tooltipId = useId();

  const decimals = f.unit === 'ratio' ? 4 : f.unit === 'perShare' ? 2 : 0;
  const { ref, value } = useCountUp(f.value, 1600, decimals);
  const shown = countUp ? value : f.value;

  const d = delta(f);
  const tier = f.provenance.tier;

  const body =
    f.unit === 'BSD' && mode === 'compact'
      ? compact(shown)
      : f.unit === 'BSD'
        ? exact(shown)
        : formatUnit(shown, f.unit);

  return (
    <span
      className={`${styles.wrap} ${SIZE_CLASS[size]}`}
      data-tier={tier}
      data-provenance={provenanceMode ? 'on' : 'off'}
    >
      {!bare && (label ?? f.label) && size !== 'inline' && (
        <span className={styles.label}>{label ?? f.label}</span>
      )}
      <button
        className={styles.trigger}
        aria-describedby={open ? tooltipId : undefined}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onClick={() => setOpen((o) => !o)}
      >
        <span
          className={`${styles.value} num`}
          ref={ref as React.Ref<HTMLSpanElement>}
          style={{ color: roleColor(f.role, size === 'hero' ? 'high' : 'base') }}
        >
          {unitPrefix(f.unit)}
          {body}
        </span>
        {tier === 'calculated' && <span className={styles.fx} aria-hidden="true">ƒ</span>}
      </button>

      {showDelta && d && (
        <span className={styles.delta} data-dir={d.abs >= 0 ? 'up' : 'down'}>
          {signedPercent(d.pct, 2)}
          <em>
            {' '}
            vs {priorLabel(f)} in 2024
          </em>
        </span>
      )}

      {children}

      {open && (
        <span role="tooltip" id={tooltipId} className={styles.tooltip}>
          <ProvenanceCard f={f} />
        </span>
      )}
    </span>
  );
}

/** A figure rendered as a standalone tile, for the overture and section openers. */
export function FigureTile({
  id,
  mode = 'compact',
  eyebrow,
}: {
  id: string;
  mode?: 'exact' | 'compact';
  eyebrow?: string;
}) {
  const f = lookup(id);
  return (
    <div className={styles.tile} style={{ ['--tile-rule' as string]: roleColor(f.role) }}>
      {eyebrow && <span className={styles.tileEyebrow}>{eyebrow}</span>}
      <Figure id={id} size="display" mode={mode} countUp showDelta bare />
      <span className={styles.tileLabel}>{f.label}</span>
    </div>
  );
}
