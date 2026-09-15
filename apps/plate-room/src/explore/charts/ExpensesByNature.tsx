import { scaleLinear } from 'd3-scale';
import { reported } from '@/data/reported';
import { directionColor, roleColor } from '@/data/roles';
import { compact, exact, percent } from '@/lib/format';
import { useInView } from '@/hooks/useInView';
import { ChartFrame, ChartLabel, ValueLabel } from '@/components/charts/chartkit';
import { DataTable } from '@/components/DataTable';
import styles from './ExpensesByNature.module.css';

const NATURE = ['personnelCosts', 'generalAdmin', 'directorsCosts', 'depreciation'] as const;
const ALLOCATION = ['expAcquisition', 'expDirectlyAttributable', 'expOtherOperating'] as const;

/**
 * Note 14 presents the same total twice. Both views are operating flows, so
 * both render in the operating role; the year-over-year movement is the only
 * thing coloured by direction.
 */
export function ExpensesByNature() {
  const { ref, inView } = useInView<HTMLDivElement>(0.2);

  const nature = NATURE.map((id) => reported[id]!);
  const allocation = ALLOCATION.map((id) => reported[id]!);
  const total = reported.totalExpensesByNature!;

  return (
    <div ref={ref}>
      <ChartFrame
        title="Expenses by nature and by allocation"
        description="Note 14 — Expenses by Nature, printed page 48."
        minHeight={320}
        table={
          <DataTable
            rows={[...nature, ...allocation, total]}
            columns={[
              { key: 'l', head: 'Line', align: 'left', rowHeader: true, render: (f) => f.label },
              { key: 'v', head: '2025 $', render: (f) => exact(f.value) },
              { key: 'p', head: '2024 $', render: (f) => exact(f.prior ?? 0) },
            ]}
          />
        }
      >
        {(width) => {
          const isNarrow = width < 700;
          const groupGap = isNarrow ? 46 : 62;
          const rowH = 46;
          const labelW = isNarrow ? 0 : 210;
          const barLeft = labelW + (isNarrow ? 0 : 14);
          const barW = width - barLeft - 120;
          const height =
            (nature.length + allocation.length) * rowH + groupGap * 2 + (isNarrow ? 80 : 40);
          const max = total.value;
          const x = scaleLinear().domain([0, max]).range([0, Math.max(60, barW)]);

          const renderRows = (
            rows: typeof nature,
            oy: number,
            heading: string,
          ) => (
            <g>
              <ChartLabel x={0} y={oy - 14} tone="dim" size="sm">
                {heading}
              </ChartLabel>
              {rows.map((f, i) => {
                const y = oy + i * rowH;
                const change = f.prior !== undefined ? f.value - f.prior : 0;
                const changePct = f.prior ? change / f.prior : 0;
                return (
                  <g key={f.id} className={styles.row} style={{ animationDelay: `${i * 80}ms` }}>
                    {isNarrow ? (
                      <ChartLabel x={0} y={y - 4} tone="bright" size="xs">
                        {f.label}
                      </ChartLabel>
                    ) : (
                      <ChartLabel x={labelW} y={y + 13} anchor="end" tone="bright" size="sm">
                        {f.label}
                      </ChartLabel>
                    )}
                    {/* Prior year ghost. */}
                    <rect
                      x={barLeft}
                      y={y + 17}
                      width={inView ? x(f.prior ?? 0) : 0}
                      height={4}
                      fill={roleColor('operating')}
                      fillOpacity={0.3}
                      className={styles.bar}
                    />
                    <rect
                      x={barLeft}
                      y={y}
                      width={inView ? x(f.value) : 0}
                      height={15}
                      fill={roleColor('operating')}
                      fillOpacity={0.75}
                      className={styles.bar}
                    />
                    <ValueLabel x={barLeft + x(f.value) + 10} y={y + 12} size="sm">
                      {`$${compact(f.value)}`}
                    </ValueLabel>
                    <text
                      x={width}
                      y={y + 12}
                      textAnchor="end"
                      className={styles.change}
                      style={{ fill: directionColor(change >= 0 ? 'down' : 'up') }}
                    >
                      {change >= 0 ? '+' : '−'}
                      {percent(Math.abs(changePct), 1)}
                    </text>
                  </g>
                );
              })}
            </g>
          );

          return (
            <svg
              width={width}
              height={height}
              viewBox={`0 0 ${width} ${height}`}
              role="img"
              aria-label="Expenses by nature and by allocation"
              className={styles.svg}
              data-in={inView ? 'true' : 'false'}
            >
              {renderRows(nature, 24, 'BY NATURE')}
              {renderRows(
                allocation as unknown as typeof nature,
                24 + nature.length * rowH + groupGap,
                'BY ALLOCATION',
              )}
              <line
                x1={barLeft}
                x2={barLeft + x(max)}
                y1={height - 18}
                y2={height - 18}
                className={styles.totalRule}
              />
              <ChartLabel x={barLeft} y={height - 4} tone="faint" size="xs">
                {`BOTH VIEWS SUM TO $${exact(max)}`}
              </ChartLabel>
            </svg>
          );
        }}
      </ChartFrame>
    </div>
  );
}
