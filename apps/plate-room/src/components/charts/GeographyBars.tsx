import { scaleLinear } from 'd3-scale';
import { geographyShares } from '@/data/calculated';
import { roleColor } from '@/data/roles';
import { compact, percent, signedPercent } from '@/lib/format';
import { useInView } from '@/hooks/useInView';
import { ChartFrame, ChartLabel, RoleLegend, ValueLabel } from './chartkit';
import { DataTable } from '../DataTable';
import styles from './GeographyBars.module.css';

/**
 * Premiums written by jurisdiction, 2025 against 2024. A gross flow, so the
 * bars carry the gross role; the prior year is drawn as a recessed ghost so
 * growth reads as the difference between the two.
 */
export function GeographyBars() {
  const { ref, inView } = useInView<HTMLDivElement>(0.2);

  return (
    <div ref={ref}>
      <ChartFrame
        title="Insurance premiums written by jurisdiction"
        description="Note 19 — Risk Management, concentrations of risk, printed page 52."
        minHeight={380}
        table={
          <DataTable
            rows={geographyShares}
            columns={[
              { key: 'n', head: 'Jurisdiction', align: 'left', rowHeader: true, render: (g) => g.name },
              { key: 'v', head: '2025 $', render: (g) => g.value.toLocaleString('en-US') },
              { key: 'p', head: '2024 $', render: (g) => g.prior.toLocaleString('en-US') },
              { key: 's', head: 'Share', render: (g) => percent(g.share) },
              {
                key: 'g',
                head: 'Change',
                render: (g) => (
                  <span className={g.growth >= 0 ? 'pos' : 'neg'}>{signedPercent(g.growth)}</span>
                ),
              },
            ]}
          />
        }
      >
        {(width) => {
          const rowH = width < 560 ? 76 : 64;
          const labelW = width < 560 ? 0 : Math.min(230, width * 0.24);
          const metaW = width < 560 ? 0 : 156;
          const barLeft = labelW + 16;
          const barRight = width - metaW - 8;
          const barW = Math.max(60, barRight - barLeft);
          const height = geographyShares.length * rowH + 44;
          const max = Math.max(...geographyShares.map((g) => Math.max(g.value, g.prior)));
          const x = scaleLinear().domain([0, max]).range([0, barW]);

          return (
            <svg
              width={width}
              height={height}
              viewBox={`0 0 ${width} ${height}`}
              role="img"
              aria-label="Insurance premiums written by jurisdiction, 2025 compared with 2024"
            >
              {/* Vertical grid at quarter intervals of the largest value. */}
              <g aria-hidden="true">
                {[0.25, 0.5, 0.75, 1].map((t) => (
                  <g key={t}>
                    <line
                      x1={barLeft + x(max * t)}
                      x2={barLeft + x(max * t)}
                      y1={18}
                      y2={height - 30}
                      className={styles.grid}
                    />
                    <ChartLabel x={barLeft + x(max * t)} y={height - 14} anchor="middle" tone="faint" size="xs">
                      {`$${compact(max * t)}`}
                    </ChartLabel>
                  </g>
                ))}
              </g>

              {geographyShares.map((g, i) => {
                const y = 26 + i * rowH;
                const bh = width < 560 ? 12 : 15;
                const isMobile = width < 560;

                return (
                  <g key={g.short} className={styles.row}>
                    <ChartLabel
                      x={isMobile ? 0 : labelW}
                      y={isMobile ? y - 6 : y + bh * 0.55}
                      anchor={isMobile ? 'start' : 'end'}
                      tone="bright"
                      size="sm"
                    >
                      {g.name}
                    </ChartLabel>

                    {/* Prior year, recessed. */}
                    <rect
                      x={isMobile ? 0 : barLeft}
                      y={y + bh + 5}
                      width={inView ? x(g.prior) : 0}
                      height={5}
                      fill={roleColor('gross')}
                      className={styles.prior}
                      style={{ transitionDelay: `${i * 90 + 260}ms` }}
                    />
                    {/* Current year. */}
                    <rect
                      x={isMobile ? 0 : barLeft}
                      y={y}
                      width={inView ? x(g.value) : 0}
                      height={bh}
                      fill={roleColor('gross')}
                      className={styles.bar}
                      style={{ transitionDelay: `${i * 90}ms` }}
                    />

                    <ValueLabel
                      x={(isMobile ? 0 : barLeft) + x(g.value) + 10}
                      y={y + bh * 0.85}
                      size="sm"
                    >
                      {`$${compact(g.value)}`}
                    </ValueLabel>

                    {!isMobile && (
                      <>
                        <text
                          x={width - 8}
                          y={y + bh * 0.85}
                          textAnchor="end"
                          className={styles.growth}
                          data-dir={g.growth >= 0 ? 'up' : 'down'}
                        >
                          {signedPercent(g.growth, 1)}
                        </text>
                        <ChartLabel x={width - 8} y={y + bh + 14} anchor="end" tone="faint" size="xs">
                          {`${percent(g.share, 1)} of book`}
                        </ChartLabel>
                      </>
                    )}
                    {isMobile && (
                      <text
                        x={x(g.value) + 10}
                        y={y + bh + 14}
                        className={styles.growth}
                        data-dir={g.growth >= 0 ? 'up' : 'down'}
                      >
                        {signedPercent(g.growth, 1)} · {percent(g.share, 1)}
                      </text>
                    )}
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
            { color: roleColor('gross'), label: '2025 premiums written' },
            { color: roleColor('gross', 'low'), label: '2024 comparative' },
          ]}
        />
      </div>
    </div>
  );
}
