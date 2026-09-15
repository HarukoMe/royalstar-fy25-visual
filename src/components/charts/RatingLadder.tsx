import { scaleLinear } from 'd3-scale';
import { reinsurerRatings, reported } from '@/data/reported';
import { roleColor } from '@/data/roles';
import { compact, exact, percent } from '@/lib/format';
import { useInView } from '@/hooks/useInView';
import { ChartFrame, ChartLabel, ValueLabel } from './chartkit';
import { DataTable } from '../DataTable';
import styles from './RatingLadder.module.css';

/**
 * The reinsurance contract asset by counterparty credit rating.
 *
 * This is a ceded exposure, so the ladder is violet throughout, with luminance
 * stepping down through the rating bands. The non-rated band is a negative
 * balance and is drawn as such rather than suppressed.
 */
export function RatingLadder() {
  const { ref, inView } = useInView<HTMLDivElement>(0.2);

  const total = reported.reinsuranceContractAssets!.value;
  const priorTotal = reported.reinsuranceContractAssets!.prior!;
  const positive = reinsurerRatings.filter((b) => b.value > 0);
  const positiveTotal = positive.reduce((s, b) => s + b.value, 0);

  return (
    <div ref={ref}>
      <ChartFrame
        title="Reinsurance contract assets by counterparty credit rating"
        description="Note 19 — Risk Management, reinsurance credit risk, printed page 61."
        minHeight={300}
        table={
          <DataTable
            rows={reinsurerRatings}
            columns={[
              { key: 'b', head: 'Rating', align: 'left', rowHeader: true, render: (b) => b.band },
              { key: 'v', head: '2025 $', render: (b) => exact(b.value) },
              { key: 'p', head: '2024 $', render: (b) => exact(b.prior) },
            ]}
            footer={
              <tr>
                <th scope="row" data-align="left">
                  Total
                </th>
                <td data-align="right">{exact(total)}</td>
                <td data-align="right">{exact(priorTotal)}</td>
              </tr>
            }
          />
        }
      >
        {(width) => {
          const rowH = 58;
          const labelW = 88;
          const valueW = width < 560 ? 92 : 130;
          const barW = width - labelW - valueW - 16;
          const height = reinsurerRatings.length * rowH + 52;
          const max = Math.max(...reinsurerRatings.map((b) => Math.abs(b.value)));
          const x = scaleLinear().domain([0, max]).range([0, barW]);

          return (
            <svg
              width={width}
              height={height}
              viewBox={`0 0 ${width} ${height}`}
              role="img"
              aria-label="Reinsurance contract assets by counterparty credit rating"
              className={styles.svg}
              data-in={inView ? 'true' : 'false'}
            >
              <ChartLabel x={0} y={16} tone="faint" size="xs">
                {`CEDED EXPOSURE BY RATING · TOTAL $${compact(total)}`}
              </ChartLabel>

              {reinsurerRatings.map((b, i) => {
                const y = 36 + i * rowH;
                const isNegative = b.value < 0;
                // Luminance steps down the ladder; all bands remain violet.
                const op = isNegative ? 0.2 : 0.85 - i * 0.12;
                const w = Math.max(2, x(Math.abs(b.value)));
                const priorW = Math.max(0, x(Math.abs(b.prior)));

                return (
                  <g key={b.band} className={styles.row} style={{ animationDelay: `${i * 90}ms` }}>
                    <text x={0} y={y + 16} className={styles.band}>
                      {b.band}
                    </text>

                    {/* Prior year ghost. */}
                    <rect
                      x={labelW}
                      y={y + 22}
                      width={inView ? priorW : 0}
                      height={4}
                      fill={roleColor('ceded')}
                      fillOpacity={0.24}
                      className={styles.bar}
                    />
                    <rect
                      x={labelW}
                      y={y}
                      width={inView ? w : 0}
                      height={18}
                      fill={roleColor('ceded')}
                      fillOpacity={op}
                      stroke={roleColor('ceded')}
                      strokeOpacity={isNegative ? 0.7 : 0}
                      strokeDasharray={isNegative ? '3 2' : undefined}
                      className={styles.bar}
                    />

                    <ValueLabel x={width} y={y + 14} anchor="end" size="sm">
                      {isNegative ? `(${exact(Math.abs(b.value))})` : `$${exact(b.value)}`}
                    </ValueLabel>
                    {!isNegative && (
                      <ChartLabel x={width} y={y + 30} anchor="end" tone="faint" size="xs">
                        {`${percent(b.value / positiveTotal, 1)} of rated`}
                      </ChartLabel>
                    )}
                    {isNegative && (
                      <ChartLabel x={width} y={y + 30} anchor="end" tone="faint" size="xs">
                        NEGATIVE BALANCE
                      </ChartLabel>
                    )}
                  </g>
                );
              })}

              <line
                x1={labelW}
                x2={width - valueW}
                y1={height - 10}
                y2={height - 10}
                className={styles.rule}
              />
            </svg>
          );
        }}
      </ChartFrame>
      <p className={styles.note}>
        Every positively-rated band sits at A− or better. The non-rated line is a negative balance
        of {exact(Math.abs(reinsurerRatings[4]!.value))} and is shown as disclosed rather than
        netted away.
      </p>
    </div>
  );
}
