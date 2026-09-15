import { arc as d3arc } from 'd3-shape';
import { figure } from '@/data';
import { directionColor, roleColor } from '@/data/roles';
import { percent, signedPercent } from '@/lib/format';
import { useInView } from '@/hooks/useInView';
import { useMeasure } from './chartkit';
import styles from './RatioDial.module.css';

const SWEEP = Math.PI * 1.32;

/**
 * A calculated ratio shown as a partial dial, with the prior year marked as a
 * tick so the movement is visible rather than merely stated.
 *
 * The dial takes its colour from the figure's semantic role, so a ceded ratio
 * is violet and a retained ratio gold — no override is possible.
 */
export function RatioDial({ id, caption }: { id: string; caption?: string }) {
  const f = figure(id);
  const { ref, inView } = useInView<HTMLDivElement>(0.3);
  const { ref: mRef, width } = useMeasure<HTMLDivElement>();

  if (f.provenance.tier !== 'calculated') {
    throw new Error(`RatioDial expects a calculated figure, received ${id}`);
  }

  const value = f.value;
  const prior = f.prior;
  const change = prior !== undefined ? value - prior : null;

  return (
    <div ref={ref} className={styles.wrap}>
      <div ref={mRef} className={styles.plot}>
        {width > 0 &&
          (() => {
            const size = Math.min(width, 260);
            const cx = size / 2;
            const cy = size / 2;
            const outer = size * 0.44;
            const inner = size * 0.35;
            const start = -SWEEP / 2;

            const mk = d3arc<{ a: number; b: number }>()
              .innerRadius(inner)
              .outerRadius(outer)
              .startAngle((d) => d.a)
              .endAngle((d) => d.b)
              .cornerRadius(2);

            const track = mk({ a: start, b: start + SWEEP });
            const fill = mk({ a: start, b: start + SWEEP * (inView ? value : 0) });
            const priorAngle = prior !== undefined ? start + SWEEP * prior : null;

            return (
              <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label={f.label}>
                <g transform={`translate(${cx}, ${cy})`}>
                  <path d={track ?? ''} fill={roleColor(f.role)} fillOpacity={0.12} />
                  <path d={fill ?? ''} fill={roleColor(f.role)} fillOpacity={0.85} className={styles.fill} />

                  {priorAngle !== null && (
                    <g transform={`rotate(${(priorAngle * 180) / Math.PI})`}>
                      <line
                        y1={-outer - 5}
                        y2={-inner + 3}
                        stroke={roleColor(f.role, 'high')}
                        strokeWidth={1.5}
                        strokeOpacity={0.9}
                      />
                    </g>
                  )}

                  <text className={styles.value} textAnchor="middle" y={6}>
                    {percent(value, 2)}
                  </text>
                  {change !== null && (
                    <text
                      className={styles.change}
                      textAnchor="middle"
                      y={26}
                      style={{ fill: directionColor(change >= 0 ? 'down' : 'up') }}
                    >
                      {signedPercent(change, 2)} pts
                    </text>
                  )}
                </g>
              </svg>
            );
          })()}
      </div>

      <div className={styles.meta}>
        <p className={styles.label}>{f.label}</p>
        <p className={styles.definition}>{f.provenance.definition}</p>
        <p className={styles.expression}>{f.provenance.expression}</p>
        {prior !== undefined && (
          <p className={styles.prior}>
            2024 comparative {percent(prior, 2)} — marked on the dial
          </p>
        )}
        {caption && <p className={styles.caption}>{caption}</p>}
      </div>
    </div>
  );
}
