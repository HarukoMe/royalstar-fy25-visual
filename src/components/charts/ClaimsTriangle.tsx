import { useMemo, useState } from 'react';
import { scaleLog } from 'd3-scale';
import { line as d3line, curveMonotoneX } from 'd3-shape';
import { accidentYears, triangleFor, developmentRatio } from '@/data/claims';
import { directionColor, roleColor } from '@/data/roles';
import { compact, exact, signedPercent } from '@/lib/format';
import { useInView } from '@/hooks/useInView';
import { useStore } from '@/state/useStore';
import { ChartFrame, ChartLabel, ValueLabel } from './chartkit';
import { DataTable } from '../DataTable';
import styles from './ClaimsTriangle.module.css';

/**
 * Note 13 as a development matrix.
 *
 * Rows are accident years, columns are successive revisions of the estimate of
 * ultimate claims cost. Cell luminance encodes magnitude on a log scale, which
 * is necessary because 2019 is two orders of magnitude above a quiet year.
 *
 * The gross matrix uses the blue (gross) ramp and the net matrix the gold
 * (retained) ramp, so the global basis toggle changes the grammar of the whole
 * field at once. Gold never appears on a gross cell.
 */
export function ClaimsTriangle() {
  const basis = useStore((s) => s.basis);
  const hoveredYear = useStore((s) => s.hoveredYear);
  const setHoveredYear = useStore((s) => s.setHoveredYear);
  const [hoveredCol, setHoveredCol] = useState<number | null>(null);
  const { ref, inView } = useInView<HTMLDivElement>(0.15);

  const rows = triangleFor(basis);
  const role = basis === 'gross' ? 'gross' : 'retained';

  const { lo, hi } = useMemo(() => {
    const all = rows.flatMap((r) => r.revisions);
    return { lo: Math.min(...all), hi: Math.max(...all) };
  }, [rows]);

  const intensity = useMemo(() => scaleLog().domain([lo, hi]).range([0.1, 1]).clamp(true), [lo, hi]);

  const hoveredRow = hoveredYear !== null ? rows.find((r) => r.year === hoveredYear) : undefined;

  return (
    <div ref={ref}>
      <ChartFrame
        title={`Estimates of ultimate claims cost by accident year, ${basis} of reinsurance`}
        description={`Note 13 — Claims Development, printed page ${basis === 'gross' ? 46 : 47}. Each row is an accident year; each column a successive annual revision of the estimate.`}
        minHeight={520}
        table={
          <DataTable
            dense
            rows={rows}
            columns={[
              { key: 'y', head: 'Accident year', align: 'left', rowHeader: true, render: (r) => String(r.year) },
              { key: 'f', head: 'At end of year', render: (r) => exact(r.revisions[0] ?? 0) },
              { key: 'c', head: 'Current estimate', render: (r) => exact(r.currentEstimate) },
              {
                key: 'd',
                head: 'Development',
                render: (r) => {
                  const d = developmentRatio(r);
                  return <span className={d <= 0 ? 'pos' : 'neg'}>{signedPercent(d)}</span>;
                },
              },
              { key: 'p', head: 'Paid to date', render: (r) => exact(r.cumulativePayments) },
              { key: 'l', head: 'In provision', render: (r) => exact(r.liabilityInProvision) },
            ]}
          />
        }
      >
        {(width) => {
          const isNarrow = width < 780;
          const labelW = isNarrow ? 44 : 58;
          const totalW = isNarrow ? 92 : 132;
          const devW = isNarrow ? 0 : 74;
          const gridW = width - labelW - totalW - devW - 12;
          const cell = Math.max(18, Math.min(52, gridW / accidentYears.length));
          const gap = cell > 30 ? 3 : 2;
          const rowH = cell + gap;
          const headerH = 34;
          const curveH = hoveredRow ? 130 : 0;
          const height = headerH + rows.length * rowH + 30 + curveH;

          const gx = (col: number) => labelW + col * rowH;
          const gy = (row: number) => headerH + row * rowH;

          return (
            <svg
              width={width}
              height={height}
              viewBox={`0 0 ${width} ${height}`}
              role="img"
              aria-label={`Claims development matrix, ${basis} of reinsurance`}
              className={styles.svg}
              data-in={inView ? 'true' : 'false'}
              onMouseLeave={() => {
                setHoveredYear(null);
                setHoveredCol(null);
              }}
            >
              {/* Column headers: development period. */}
              {accidentYears.map((_, col) => (
                <ChartLabel
                  key={col}
                  x={gx(col) + cell / 2}
                  y={headerH - 14}
                  anchor="middle"
                  tone={hoveredCol === col ? 'bright' : 'faint'}
                  size="xs"
                >
                  {col === 0 ? '0' : `+${col}`}
                </ChartLabel>
              ))}
              <ChartLabel x={labelW} y={14} tone="faint" size="xs">
                YEARS AFTER THE ACCIDENT YEAR →
              </ChartLabel>

              {rows.map((r, row) => {
                const isRowHot = hoveredYear === r.year;
                const dev = developmentRatio(r);

                return (
                  <g key={r.year} className={styles.row} data-hot={isRowHot ? 'true' : 'false'}>
                    {/* Accident year label. */}
                    <text
                      x={labelW - 10}
                      y={gy(row) + cell * 0.66}
                      textAnchor="end"
                      className={styles.yearLabel}
                      data-hot={isRowHot ? 'true' : 'false'}
                    >
                      {r.year}
                    </text>

                    {r.revisions.map((value, col) => {
                      const prev = col > 0 ? r.revisions[col - 1] : undefined;
                      const adverse = prev !== undefined && value > prev;
                      const favourable = prev !== undefined && value < prev;
                      const op = intensity(value);
                      const isHot = isRowHot || hoveredCol === col;

                      return (
                        <g
                          key={col}
                          className={styles.cellGroup}
                          style={{
                            // Diagonal cascade: cells illuminate in the order the
                            // revisions were actually reported.
                            animationDelay: `${(row + col) * 52}ms`,
                          }}
                          onMouseEnter={() => {
                            setHoveredYear(r.year);
                            setHoveredCol(col);
                          }}
                        >
                          <rect
                            x={gx(col)}
                            y={gy(row)}
                            width={cell}
                            height={cell}
                            fill={roleColor(role)}
                            fillOpacity={op * (isHot ? 1 : 0.82)}
                            stroke={roleColor(role)}
                            strokeOpacity={isHot ? 0.9 : 0.16}
                            strokeWidth={isHot ? 1.2 : 0.5}
                            className={styles.cell}
                          />
                          {/* Revision direction marker. Direction of change uses
                              the delta tokens, never a role colour. */}
                          {cell > 26 && (adverse || favourable) && (
                            <path
                              d={
                                adverse
                                  ? `M ${gx(col) + cell - 8} ${gy(row) + 5} l 5 0 l -2.5 5 z`
                                  : `M ${gx(col) + cell - 8} ${gy(row) + cell - 5} l 5 0 l -2.5 -5 z`
                              }
                              fill={directionColor(adverse ? 'down' : 'up')}
                              fillOpacity={0.95}
                            />
                          )}
                          <title>
                            {`Accident year ${r.year}, estimate ${col === 0 ? 'at end of accident year' : `${col} year${col > 1 ? 's' : ''} later`}: $${exact(value)}`}
                          </title>
                        </g>
                      );
                    })}

                    {/* Current estimate, at the end of each row. */}
                    <text
                      x={labelW + gridW + totalW - 12}
                      y={gy(row) + cell * 0.66}
                      textAnchor="end"
                      className={styles.total}
                      data-hot={isRowHot ? 'true' : 'false'}
                    >
                      {`$${compact(r.currentEstimate)}`}
                    </text>

                    {!isNarrow && (
                      <text
                        x={width - 8}
                        y={gy(row) + cell * 0.66}
                        textAnchor="end"
                        className={styles.dev}
                        data-dir={dev <= 0 ? 'fav' : 'adv'}
                      >
                        {signedPercent(dev, 1)}
                      </text>
                    )}
                  </g>
                );
              })}

              {/* Header for the trailing columns. */}
              <ChartLabel
                x={labelW + gridW + totalW - 12}
                y={headerH - 14}
                anchor="end"
                tone="faint"
                size="xs"
              >
                CURRENT
              </ChartLabel>
              {!isNarrow && (
                <ChartLabel x={width - 8} y={headerH - 14} anchor="end" tone="faint" size="xs">
                  DEVELOPMENT
                </ChartLabel>
              )}

              {/* Run-off curve for the hovered accident year. */}
              {hoveredRow && (
                <g className={styles.curve}>
                  <line
                    x1={labelW}
                    x2={width - 8}
                    y1={headerH + rows.length * rowH + 16}
                    y2={headerH + rows.length * rowH + 16}
                    className={styles.curveRule}
                  />
                  {(() => {
                    const top = headerH + rows.length * rowH + 40;
                    const h = 74;
                    const w = Math.min(gridW, width - labelW - 20);
                    const vals = hoveredRow.revisions;
                    const vlo = Math.min(...vals);
                    const vhi = Math.max(...vals);
                    const span = vhi - vlo || 1;
                    const px = (i: number) =>
                      labelW + (vals.length === 1 ? w / 2 : (i / (vals.length - 1)) * w);
                    const py = (v: number) => top + h - ((v - vlo) / span) * h;
                    const path = d3line<number>()
                      .x((_, i) => px(i))
                      .y((v) => py(v))
                      .curve(curveMonotoneX)(vals as number[]);

                    return (
                      <>
                        <ChartLabel x={labelW} y={top - 12} tone="dim" size="xs">
                          {`ACCIDENT YEAR ${hoveredRow.year} · RUN-OFF OF THE ESTIMATE`}
                        </ChartLabel>
                        <path d={path ?? ''} fill="none" stroke={roleColor(role)} strokeWidth={1.5} />
                        {vals.map((v, i) => (
                          <circle key={i} cx={px(i)} cy={py(v)} r={2.5} fill={roleColor(role)} />
                        ))}
                        <ValueLabel x={labelW} y={top + h + 18} size="xs">
                          {`first $${compact(vals[0] ?? 0)}`}
                        </ValueLabel>
                        <ValueLabel x={labelW + w} y={top + h + 18} anchor="end" size="xs">
                          {`current $${compact(hoveredRow.currentEstimate)}`}
                        </ValueLabel>
                      </>
                    );
                  })()}
                </g>
              )}
            </svg>
          );
        }}
      </ChartFrame>

      <div className={styles.footnotes}>
        <span>
          <i className={styles.markAdverse} /> revised upward
        </span>
        <span>
          <i className={styles.markFavourable} /> revised downward
        </span>
        <span className={styles.hint}>
          {hoveredRow
            ? `Accident year ${hoveredRow.year} selected`
            : 'Hover a row to trace its run-off'}
        </span>
      </div>
    </div>
  );
}
