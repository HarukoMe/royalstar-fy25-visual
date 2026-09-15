import { line as d3line, curveMonotoneX } from 'd3-shape';
import { grossTriangle, netTriangle, developmentRatio } from '@/data/claims';
import { directionColor, roleColor } from '@/data/roles';
import { compact, signedPercent } from '@/lib/format';
import { useInView } from '@/hooks/useInView';
import { useStore } from '@/state/useStore';
import { ChartFrame, RoleLegend } from './chartkit';
import { DataTable } from '../DataTable';
import styles from './RunOffMultiples.module.css';

/**
 * Ten accident-year cards, each tracing how the estimate of ultimate claims
 * was revised. Gross and net are overlaid within each card so the asymmetry
 * between them is visible year by year: several years developed adversely
 * gross while developing favourably net.
 *
 * Each card is normalised to its own first estimate, because the absolute
 * magnitudes differ by two orders of magnitude across the decade.
 */
export function RunOffMultiples() {
  const { ref, inView } = useInView<HTMLDivElement>(0.12);
  const hoveredYear = useStore((s) => s.hoveredYear);
  const setHoveredYear = useStore((s) => s.setHoveredYear);

  const rows = grossTriangle.map((g, i) => {
    const n = netTriangle[i]!;
    return { year: g.year, gross: g, net: n };
  });

  return (
    <div ref={ref}>
      <ChartFrame
        title="Development of the estimate of ultimate claims, by accident year"
        description="Note 13 — Claims Development, printed pages 46 and 47. Each card is indexed to its own estimate at the end of the accident year, so the shape of the revision is comparable across years of very different size."
        table={
          <DataTable
            dense
            rows={rows}
            columns={[
              { key: 'y', head: 'Accident year', align: 'left', rowHeader: true, render: (d) => String(d.year) },
              {
                key: 'gd',
                head: 'Gross development',
                render: (d) => {
                  const v = developmentRatio(d.gross);
                  return <span className={v <= 0 ? 'pos' : 'neg'}>{signedPercent(v)}</span>;
                },
              },
              {
                key: 'nd',
                head: 'Net development',
                render: (d) => {
                  const v = developmentRatio(d.net);
                  return <span className={v <= 0 ? 'pos' : 'neg'}>{signedPercent(v)}</span>;
                },
              },
              { key: 'gc', head: 'Gross current $', render: (d) => compact(d.gross.currentEstimate) },
              { key: 'nc', head: 'Net current $', render: (d) => compact(d.net.currentEstimate) },
            ]}
          />
        }
      >
        {(width) => {
          const cols = width < 480 ? 2 : width < 720 ? 3 : width < 1040 ? 4 : 5;
          const cardW = (width - (cols - 1) * 12) / cols;
          const cardH = Math.max(120, cardW * 0.74);
          const rowsOfCards = Math.ceil(rows.length / cols);
          const height = rowsOfCards * (cardH + 12);

          const pad = { top: 26, bottom: 22, left: 8, right: 8 };

          return (
            <svg
              width={width}
              height={height}
              viewBox={`0 0 ${width} ${height}`}
              role="img"
              aria-label="Small multiples of claims development by accident year"
              className={styles.svg}
              data-in={inView ? 'true' : 'false'}
              onMouseLeave={() => setHoveredYear(null)}
            >
              {rows.map((d, i) => {
                const col = i % cols;
                const row = Math.floor(i / cols);
                const ox = col * (cardW + 12);
                const oy = row * (cardH + 12);
                const isHot = hoveredYear === d.year;

                const innerW = cardW - pad.left - pad.right;
                const innerH = cardH - pad.top - pad.bottom;

                // Index each series to its own first estimate.
                const gFirst = d.gross.revisions[0]!;
                const nFirst = d.net.revisions[0]!;
                const gIdx = d.gross.revisions.map((v) => v / gFirst);
                const nIdx = d.net.revisions.map((v) => v / nFirst);
                const all = [...gIdx, ...nIdx, 1];
                const lo = Math.min(...all);
                const hi = Math.max(...all);
                const span = hi - lo || 0.1;

                const px = (idx: number, len: number) =>
                  ox + pad.left + (len === 1 ? innerW / 2 : (idx / (len - 1)) * innerW);
                const py = (v: number) => oy + pad.top + innerH - ((v - lo) / span) * innerH;

                const mk = (series: number[]) =>
                  d3line<number>()
                    .x((_, idx) => px(idx, series.length))
                    .y((v) => py(v))
                    .curve(curveMonotoneX)(series);

                const gDev = developmentRatio(d.gross);
                const nDev = developmentRatio(d.net);

                return (
                  <g
                    key={d.year}
                    className={styles.card}
                    data-hot={isHot ? 'true' : 'false'}
                    style={{ animationDelay: `${i * 70}ms` }}
                    onMouseEnter={() => setHoveredYear(d.year)}
                  >
                    <rect
                      x={ox}
                      y={oy}
                      width={cardW}
                      height={cardH}
                      className={styles.cardBg}
                      rx={2}
                    />
                    <text x={ox + pad.left} y={oy + 17} className={styles.cardYear}>
                      {d.year}
                    </text>

                    {/* Baseline at the original estimate. */}
                    <line
                      x1={ox + pad.left}
                      x2={ox + cardW - pad.right}
                      y1={py(1)}
                      y2={py(1)}
                      className={styles.baseline}
                    />

                    <path d={mk(gIdx) ?? ''} fill="none" stroke={roleColor('gross')} strokeWidth={1.4} />
                    <path
                      d={mk(nIdx) ?? ''}
                      fill="none"
                      stroke={roleColor('retained', 'high')}
                      strokeWidth={1.4}
                      strokeDasharray="3 2"
                    />

                    {/* Terminal dots. */}
                    <circle
                      cx={px(gIdx.length - 1, gIdx.length)}
                      cy={py(gIdx[gIdx.length - 1]!)}
                      r={2.4}
                      fill={roleColor('gross')}
                    />
                    <circle
                      cx={px(nIdx.length - 1, nIdx.length)}
                      cy={py(nIdx[nIdx.length - 1]!)}
                      r={2.4}
                      fill={roleColor('retained', 'high')}
                    />

                    {/* Development read-out, coloured by direction of change. */}
                    <text
                      x={ox + cardW - pad.right}
                      y={oy + 17}
                      textAnchor="end"
                      className={styles.devPair}
                    >
                      <tspan fill={directionColor(gDev <= 0 ? 'up' : 'down')}>
                        {signedPercent(gDev, 0)}
                      </tspan>
                      <tspan className={styles.devSep}> / </tspan>
                      <tspan fill={directionColor(nDev <= 0 ? 'up' : 'down')}>
                        {signedPercent(nDev, 0)}
                      </tspan>
                    </text>

                    <text x={ox + pad.left} y={oy + cardH - 7} className={styles.cardFoot}>
                      {`$${compact(d.gross.currentEstimate)} / $${compact(d.net.currentEstimate)}`}
                    </text>
                  </g>
                );
              })}
            </svg>
          );
        }}
      </ChartFrame>
      <div className={styles.legendRow}>
        <RoleLegend
          items={[
            { color: roleColor('gross'), label: 'Gross of reinsurance' },
            { color: roleColor('retained', 'high'), label: 'Net of reinsurance' },
          ]}
        />
        <p className={styles.note}>
          Percentages show development from the first estimate to the current estimate, gross then
          net. Green is a downward revision, red an upward one.
        </p>
      </div>
    </div>
  );
}
