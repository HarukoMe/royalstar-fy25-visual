import { useEffect, useRef, useState, type ReactNode } from 'react';
import styles from './chartkit.module.css';

/** Observes the container and reports its width, so SVG can be laid out in px. */
export function useMeasure<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) setWidth(entry.contentRect.width);
    });
    ro.observe(el);
    setWidth(el.getBoundingClientRect().width);
    return () => ro.disconnect();
  }, []);

  return { ref, width };
}

/**
 * Chart shell. Provides the measured width, a title for assistive technology,
 * and the accessible data table that backs every visual in this report.
 */
export function ChartFrame({
  title,
  description,
  children,
  table,
  minHeight,
}: {
  title: string;
  description?: string;
  children: (width: number) => ReactNode;
  table?: ReactNode;
  minHeight?: number;
}) {
  const { ref, width } = useMeasure<HTMLDivElement>();
  const [tableOpen, setTableOpen] = useState(false);

  return (
    <div className={styles.frame}>
      <div ref={ref} className={styles.plot} style={minHeight ? { minHeight } : undefined}>
        {width > 0 && children(width)}
      </div>
      {table && (
        <div className={styles.tableWrap}>
          <button
            className={styles.tableToggle}
            onClick={() => setTableOpen((o) => !o)}
            aria-expanded={tableOpen}
          >
            {tableOpen ? 'Hide table' : 'Table'}
          </button>
          {tableOpen && (
            <div className={styles.table}>
              <p className={styles.tableTitle}>{title}</p>
              {description && <p className={styles.tableDesc}>{description}</p>}
              {table}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/** Hairline axis rule with an optional label. */
export function AxisRule({
  x1,
  x2,
  y,
  label,
  align = 'start',
  faint = false,
}: {
  x1: number;
  x2: number;
  y: number;
  label?: string;
  align?: 'start' | 'end';
  faint?: boolean;
}) {
  return (
    <g>
      <line
        x1={x1}
        x2={x2}
        y1={y}
        y2={y}
        className={faint ? styles.ruleFaint : styles.rule}
        strokeDasharray={faint ? '2 4' : undefined}
      />
      {label && (
        <text
          x={align === 'start' ? x1 : x2}
          y={y - 7}
          textAnchor={align === 'start' ? 'start' : 'end'}
          className={styles.ruleLabel}
        >
          {label}
        </text>
      )}
    </g>
  );
}

export function ChartLabel({
  x,
  y,
  children,
  anchor = 'start',
  tone = 'dim',
  size = 'sm',
}: {
  x: number;
  y: number;
  children: ReactNode;
  anchor?: 'start' | 'middle' | 'end';
  tone?: 'bright' | 'dim' | 'faint';
  size?: 'xs' | 'sm' | 'md';
}) {
  return (
    <text x={x} y={y} textAnchor={anchor} className={styles.label} data-tone={tone} data-size={size}>
      {children}
    </text>
  );
}

export function ValueLabel({
  x,
  y,
  children,
  anchor = 'start',
  color,
  size = 'md',
}: {
  x: number;
  y: number;
  children: ReactNode;
  anchor?: 'start' | 'middle' | 'end';
  color?: string | undefined;
  size?: 'xs' | 'sm' | 'md' | 'lg';
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      className={styles.value}
      data-size={size}
      style={color ? { fill: color } : undefined}
    >
      {children}
    </text>
  );
}

/** Legend driven entirely by semantic roles. */
export function RoleLegend({
  items,
}: {
  items: readonly { readonly color: string; readonly label: string }[];
}) {
  return (
    <ul className={styles.legend}>
      {items.map((i) => (
        <li key={i.label}>
          <span style={{ background: i.color }} />
          {i.label}
        </li>
      ))}
    </ul>
  );
}

export { styles as chartStyles };
