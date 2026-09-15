import { scaleLinear } from 'd3-scale';
import { sensitivities } from '@/data/reported';
import { roleColor } from '@/data/roles';
import { compact, exact, percent } from '@/lib/format';
import { useInView } from '@/hooks/useInView';
import { ChartFrame, ChartLabel, RoleLegend, ValueLabel } from './chartkit';
import { DataTable } from '../DataTable';
import styles from './SensitivityTornado.module.css';

/**
 * The Note 19(d) sensitivity analysis, gross against net.
 *
 * Gross impacts are blue and net impacts gold, so the gap between the paired
 * bars is the portion of each shock that does not reach RoyalStar's own
 * result. Sliders are deliberately absent: only the disclosed scenarios exist,
 * so there is nothing to interpolate.
 */
export function SensitivityTornado() {
  const { ref, inView } = useInView<HTMLDivElement>(0.2);

  return (
    <div ref={ref}>
      <ChartFrame
        title="Impact on profit and equity of reasonably possible changes in assumptions"
        description="Note 19 — Risk Management, sensitivity analyses, printed page 64. Only the scenarios disclosed in the statements are shown."
        minHeight={340}
        table={
          <DataTable
            rows={sensitivities}
            columns={[
              { key: 'f', head: 'Factor', align: 'left', rowHeader: true, render: (s) => s.factor },
              { key: 'c', head: 'Change', align: 'left', render: (s) => s.change },
              { key: 'g', head: '2025 gross $', render: (s) => exact(s.gross) },
              { key: 'n', head: '2025 net $', render: (s) => exact(s.net) },
              { key: 'gp', head: '2024 gross $', render: (s) => exact(s.grossPrior) },
              { key: 'np', head: '2024 net $', render: (s) => exact(s.netPrior) },
            ]}
          />
        }
      >
        {(width) => {
          const groupH = 104;
          const labelW = width < 620 ? 0 : 172;
          const height = sensitivities.length * groupH + 56;
          const barLeft = labelW + (width < 620 ? 0 : 16);
          const barW = width - barLeft - 130;
          const max = Math.max(...sensitivities.map((s) => Math.abs(s.gross)));
          const x = scaleLinear().domain([0, max]).range([0, Math.max(60, barW)]);

          return (
            <svg
              width={width}
              height={height}
              viewBox={`0 0 ${width} ${height}`}
              role="img"
              aria-label="Sensitivity of profit and equity to changes in assumptions, gross and net of reinsurance"
              className={styles.svg}
              data-in={inView ? 'true' : 'false'}
            >
              <ChartLabel x={0} y={16} tone="faint" size="xs">
                ADVERSE IMPACT ON PROFIT AND EQUITY · GROSS AND NET OF REINSURANCE
              </ChartLabel>

              {sensitivities.map((s, i) => {
                const y = 40 + i * groupH;
                const absorbed = 1 - Math.abs(s.net) / Math.abs(s.gross);
                const isNarrow = width < 620;

                return (
                  <g key={s.factor} className={styles.group} style={{ animationDelay: `${i * 130}ms` }}>
                    {isNarrow ? (
                      <ChartLabel x={0} y={y - 8} tone="bright" size="sm">
                        {`${s.factor} — ${s.change}`}
                      </ChartLabel>
                    ) : (
                      <>
                        <ChartLabel x={labelW} y={y + 12} anchor="end" tone="bright" size="md">
                          {s.factor}
                        </ChartLabel>
                        <ChartLabel x={labelW} y={y + 30} anchor="end" tone="faint" size="xs">
                          {s.change}
                        </ChartLabel>
                      </>
                    )}

                    {/* Gross impact. */}
                    <rect
                      x={barLeft}
                      y={y}
                      width={inView ? x(Math.abs(s.gross)) : 0}
                      height={17}
                      fill={roleColor('gross')}
                      fillOpacity={0.72}
                      className={styles.bar}
                    />
                    <ValueLabel x={barLeft + x(Math.abs(s.gross)) + 10} y={y + 13} size="sm">
                      {`$${compact(Math.abs(s.gross))}`}
                    </ValueLabel>

                    {/* Net impact. */}
                    <rect
                      x={barLeft}
                      y={y + 24}
                      width={inView ? x(Math.abs(s.net)) : 0}
                      height={17}
                      fill={roleColor('retained')}
                      fillOpacity={0.92}
                      className={styles.bar}
                      style={{ transitionDelay: '180ms' }}
                    />
                    <ValueLabel
                      x={barLeft + x(Math.abs(s.net)) + 10}
                      y={y + 37}
                      size="sm"
                      color={roleColor('retained', 'high')}
                    >
                      {`$${compact(Math.abs(s.net))}`}
                    </ValueLabel>

                    {/* The gap between the pair, annotated. */}
                    <g className={styles.gap}>
                      <line
                        x1={barLeft + x(Math.abs(s.net))}
                        x2={barLeft + x(Math.abs(s.gross))}
                        y1={y + 52}
                        y2={y + 52}
                        stroke={roleColor('ceded')}
                        strokeOpacity={0.55}
                        strokeWidth={1}
                        strokeDasharray="2 3"
                      />
                      <text
                        x={(barLeft + x(Math.abs(s.net)) + barLeft + x(Math.abs(s.gross))) / 2}
                        y={y + 68}
                        textAnchor="middle"
                        className={styles.gapLabel}
                      >
                        {`${percent(absorbed, 1)} does not reach the net result`}
                      </text>
                    </g>
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
            { color: roleColor('retained'), label: 'Net of reinsurance' },
            { color: roleColor('ceded'), label: 'The difference' },
          ]}
        />
      </div>
    </div>
  );
}
