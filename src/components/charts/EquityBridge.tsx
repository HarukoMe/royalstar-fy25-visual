import { scaleLinear } from 'd3-scale';
import { reported } from '@/data/reported';
import { directionColor, roleColor } from '@/data/roles';
import { compact, exact, signedExact } from '@/lib/format';
import { useInView } from '@/hooks/useInView';
import { ChartFrame, ChartLabel, ValueLabel } from './chartkit';
import { DataTable } from '../DataTable';
import styles from './EquityBridge.module.css';

/**
 * Total equity from 31 December 2023 to 31 December 2025.
 *
 * Equity is RoyalStar's own capital, so the whole chart sits in the retained
 * role. Dividends are drawn as distributions out of equity — which is exactly
 * what they are, and the reason they appear here rather than in the net income
 * bridge in Movement 03.
 *
 * The 2024 ordinary dividend is distinguished because $7,122,861 of the
 * $9,122,861 declared was a non-cash transfer of an equity interest, and only
 * $2,000,000 was paid in cash that year.
 */
export function EquityBridge() {
  const { ref, inView } = useInView<HTMLDivElement>(0.18);

  const open2024 = reported.equityOpening2024!.value;
  const ni2024 = reported.netIncome!.prior!;
  const div2024 = reported.totalDividends!.prior!;
  const close2024 = reported.totalEquity!.prior!;
  const ni2025 = reported.netIncome!.value;
  const div2025 = reported.totalDividends!.value;
  const close2025 = reported.totalEquity!.value;

  const steps = [
    { id: 'o23', label: '31 Dec 2023', kind: 'pillar' as const, value: open2024 },
    { id: 'ni24', label: 'Net income 2024', kind: 'delta' as const, value: ni2024 },
    { id: 'dv24', label: 'Dividends declared 2024', kind: 'delta' as const, value: div2024, nonCash: true },
    { id: 'o24', label: '31 Dec 2024', kind: 'pillar' as const, value: close2024 },
    { id: 'ni25', label: 'Net income 2025', kind: 'delta' as const, value: ni2025 },
    { id: 'dv25', label: 'Dividends declared 2025', kind: 'delta' as const, value: div2025 },
    { id: 'o25', label: '31 Dec 2025', kind: 'pillar' as const, value: close2025 },
  ];

  return (
    <div ref={ref}>
      <ChartFrame
        title="Movement in total equity, 31 December 2023 to 31 December 2025"
        description="Consolidated Statement of Changes in Equity, printed page 8. Dividends are a distribution of earnings and reduce equity; they do not affect net income."
        minHeight={440}
        table={
          <DataTable
            rows={steps}
            columns={[
              { key: 'l', head: 'Movement', align: 'left', rowHeader: true, render: (s) => s.label },
              {
                key: 'v',
                head: '$',
                render: (s) =>
                  s.kind === 'pillar' ? (
                    exact(s.value)
                  ) : (
                    <span className={s.value >= 0 ? 'pos' : 'neg'}>{signedExact(s.value)}</span>
                  ),
              },
            ]}
          />
        }
      >
        {(width) => {
          const isNarrow = width < 720;
          const height = isNarrow ? 470 : 420;
          const pad = { top: 66, bottom: isNarrow ? 116 : 92, left: 6, right: 6 };
          const plotH = height - pad.top - pad.bottom;
          const plotW = width - pad.left - pad.right;
          const slot = plotW / steps.length;
          const barW = Math.min(slot * 0.5, 62);

          const lo = Math.min(open2024, close2024, close2025) * 0.94;
          const hi = Math.max(open2024, close2024, close2025) * 1.03;
          const y = scaleLinear().domain([lo, hi]).range([pad.top + plotH, pad.top]);
          const cx = (i: number) => pad.left + slot * (i + 0.5);

          let running = open2024;

          return (
            <svg
              width={width}
              height={height}
              viewBox={`0 0 ${width} ${height}`}
              role="img"
              aria-label="Waterfall of total equity across 2024 and 2025"
              className={styles.svg}
              data-in={inView ? 'true' : 'false'}
            >
              <ChartLabel x={pad.left} y={22} tone="faint" size="xs">
                TOTAL EQUITY · BAHAMIAN DOLLARS
              </ChartLabel>

              {steps.map((s, i) => {
                if (s.kind === 'pillar') {
                  running = s.value;
                  return (
                    <g key={s.id} className={styles.col} style={{ animationDelay: `${i * 120}ms` }}>
                      <rect
                        x={cx(i) - barW / 2}
                        y={y(s.value)}
                        width={barW}
                        height={pad.top + plotH - y(s.value)}
                        fill={roleColor('retained')}
                        fillOpacity={i === steps.length - 1 ? 0.4 : 0.2}
                        stroke={roleColor(
                          'retained',
                          i === steps.length - 1 ? 'high' : 'base',
                        )}
                        strokeOpacity={i === steps.length - 1 ? 0.9 : 0.5}
                      />
                      <ValueLabel
                        x={cx(i)}
                        y={y(s.value) - 12}
                        anchor="middle"
                        size="sm"
                        color={
                          i === steps.length - 1 ? roleColor('retained', 'high') : undefined
                        }
                      >
                        {`$${compact(s.value)}`}
                      </ValueLabel>
                      <text
                        transform={`translate(${cx(i)}, ${pad.top + plotH + 26}) rotate(-32)`}
                        textAnchor="end"
                        className={styles.pillarLabel}
                      >
                        {s.label}
                      </text>
                    </g>
                  );
                }

                const from = running;
                running += s.value;
                const top = y(Math.max(from, running));
                const h = Math.max(1.5, Math.abs(y(from) - y(running)));

                return (
                  <g key={s.id} className={styles.col} style={{ animationDelay: `${i * 120}ms` }}>
                    <line
                      x1={cx(i - 1) + barW / 2}
                      x2={cx(i) - barW / 2}
                      y1={y(from)}
                      y2={y(from)}
                      className={styles.connector}
                    />
                    <rect
                      x={cx(i) - barW / 2}
                      y={top}
                      width={barW}
                      height={h}
                      fill={roleColor('retained')}
                      fillOpacity={s.value >= 0 ? 0.72 : 0.34}
                      stroke={roleColor('retained')}
                      strokeOpacity={0.8}
                      strokeDasharray={s.value < 0 ? '3 2' : undefined}
                    />
                    {/* The non-cash component of the 2024 dividend, marked out. */}
                    {s.nonCash && (
                      <g>
                        <rect
                          x={cx(i) - barW / 2}
                          y={top}
                          width={barW}
                          height={h * (7_122_861 / Math.abs(s.value))}
                          fill={roleColor('operating')}
                          fillOpacity={0.55}
                        />
                        <text
                          x={cx(i) + barW / 2 + 8}
                          y={top + 12}
                          className={styles.nonCash}
                        >
                          of which $7.1m non-cash
                        </text>
                      </g>
                    )}
                    <text
                      x={cx(i)}
                      y={s.value >= 0 ? top - 10 : top + h + 17}
                      textAnchor="middle"
                      className={styles.stepValue}
                      style={{ fill: directionColor(s.value >= 0 ? 'up' : 'down') }}
                    >
                      {signedExact(s.value)}
                    </text>
                    <text
                      transform={`translate(${cx(i)}, ${pad.top + plotH + 26}) rotate(-32)`}
                      textAnchor="end"
                      className={styles.stepLabel}
                    >
                      {s.label}
                    </text>
                  </g>
                );
              })}

              <line
                x1={pad.left}
                x2={width - pad.right}
                y1={pad.top + plotH}
                y2={pad.top + plotH}
                className={styles.baseline}
              />
            </svg>
          );
        }}
      </ChartFrame>
    </div>
  );
}
