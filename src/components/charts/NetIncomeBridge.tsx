import { scaleLinear } from 'd3-scale';
import { netIncomeBridge } from '@/data/calculated';
import { reported } from '@/data/reported';
import { roleColor } from '@/data/roles';
import { compact, exact, signedExact } from '@/lib/format';
import { useInView } from '@/hooks/useInView';
import { ChartFrame, ChartLabel, ValueLabel } from './chartkit';
import { DataTable } from '../DataTable';
import styles from './NetIncomeBridge.module.css';

/**
 * From the FY2024 net income to the FY2025 net income, across all seven
 * reported lines. The largest single movement is other operating expenses,
 * which is the honest reason net income fell.
 *
 * Dividends do not appear here, and cannot: they are a distribution of
 * earnings, not a determinant of them. The integrity suite asserts their
 * absence.
 */
export function NetIncomeBridge() {
  const { ref, inView } = useInView<HTMLDivElement>(0.2);

  const open = reported.netIncome!.prior!;
  const close = reported.netIncome!.value;

  // Running positions for each step.
  let running = open;
  const steps = netIncomeBridge.map((s) => {
    const from = running;
    running += s.change;
    return { ...s, from, to: running };
  });

  const largest = [...steps].sort((a, b) => Math.abs(b.change) - Math.abs(a.change))[0]!;

  return (
    <div ref={ref}>
      <ChartFrame
        title="Movement in net income, 2024 to 2025"
        description="Consolidated Statement of Comprehensive Income, printed page 7. The seven reported movements sum to the change in net income of −323,759."
        minHeight={440}
        table={
          <DataTable
            rows={steps}
            columns={[
              { key: 'l', head: 'Line', align: 'left', rowHeader: true, render: (s) => s.label },
              {
                key: 'c',
                head: 'Movement $',
                render: (s) => (
                  <span className={s.change >= 0 ? 'pos' : 'neg'}>{signedExact(s.change)}</span>
                ),
              },
              { key: 't', head: 'Running $', render: (s) => exact(s.to) },
            ]}
            footer={
              <tr>
                <th scope="row" data-align="left">
                  Net income 2025
                </th>
                <td data-align="right">{signedExact(close - open)}</td>
                <td data-align="right">{exact(close)}</td>
              </tr>
            }
          />
        }
      >
        {(width) => {
          const isNarrow = width < 760;
          const colCount = steps.length + 2;
          const height = isNarrow ? 560 : 460;
          const pad = { top: 72, bottom: isNarrow ? 132 : 108, left: 8, right: 8 };
          const plotH = height - pad.top - pad.bottom;
          const plotW = width - pad.left - pad.right;
          const slot = plotW / colCount;
          const barW = Math.min(slot * 0.52, 58);

          const values = [open, close, ...steps.flatMap((s) => [s.from, s.to])];
          const lo = Math.min(...values) * 0.988;
          const hi = Math.max(...values) * 1.012;
          const y = scaleLinear().domain([lo, hi]).range([pad.top + plotH, pad.top]);

          const cx = (i: number) => pad.left + slot * (i + 0.5);

          return (
            <svg
              width={width}
              height={height}
              viewBox={`0 0 ${width} ${height}`}
              role="img"
              aria-label="Waterfall of the movement in net income from 2024 to 2025"
              className={styles.svg}
              data-in={inView ? 'true' : 'false'}
            >
              <ChartLabel x={pad.left} y={26} tone="faint" size="xs">
                MOVEMENT IN NET INCOME · 2024 TO 2025 · BAHAMIAN DOLLARS
              </ChartLabel>

              {/* Opening pillar. */}
              <g className={styles.col} style={{ animationDelay: '0ms' }}>
                <rect
                  x={cx(0) - barW / 2}
                  y={y(open)}
                  width={barW}
                  height={pad.top + plotH - y(open)}
                  fill={roleColor('retained')}
                  fillOpacity={0.22}
                  stroke={roleColor('retained')}
                  strokeOpacity={0.55}
                />
                <ValueLabel x={cx(0)} y={y(open) - 12} anchor="middle" size="sm">
                  {`$${compact(open)}`}
                </ValueLabel>
                <ChartLabel x={cx(0)} y={pad.top + plotH + 22} anchor="middle" tone="dim" size="xs">
                  2024
                </ChartLabel>
              </g>

              {steps.map((s, i) => {
                const idx = i + 1;
                const top = y(Math.max(s.from, s.to));
                const h = Math.max(1.5, Math.abs(y(s.from) - y(s.to)));
                const isLargest = s.id === largest.id;
                const color = roleColor(s.role);
                const dirColor = s.change >= 0 ? roleColor(s.role) : roleColor(s.role);

                return (
                  <g
                    key={s.id}
                    className={styles.col}
                    style={{ animationDelay: `${140 + i * 110}ms` }}
                    data-emph={isLargest ? 'true' : 'false'}
                  >
                    {/* Connector from the previous running total. */}
                    <line
                      x1={cx(idx - 1) + barW / 2}
                      x2={cx(idx) - barW / 2}
                      y1={y(s.from)}
                      y2={y(s.from)}
                      className={styles.connector}
                    />
                    <rect
                      x={cx(idx) - barW / 2}
                      y={top}
                      width={barW}
                      height={h}
                      fill={color}
                      fillOpacity={isLargest ? 0.9 : 0.5}
                      stroke={dirColor}
                      strokeOpacity={0.8}
                    />
                    {isLargest && (
                      <rect
                        x={cx(idx) - barW / 2 - 4}
                        y={top - 4}
                        width={barW + 8}
                        height={h + 8}
                        fill="none"
                        stroke={color}
                        strokeOpacity={0.45}
                        strokeDasharray="2 3"
                      />
                    )}
                    <text
                      x={cx(idx)}
                      y={s.change >= 0 ? top - 10 : top + h + 18}
                      textAnchor="middle"
                      className={styles.stepValue}
                      data-dir={s.change >= 0 ? 'up' : 'down'}
                    >
                      {signedExact(s.change)}
                    </text>
                    {/* Rotated line labels keep the axis legible at any width. */}
                    <text
                      transform={`translate(${cx(idx)}, ${pad.top + plotH + 30}) rotate(-38)`}
                      textAnchor="end"
                      className={styles.stepLabel}
                      data-emph={isLargest ? 'true' : 'false'}
                    >
                      {s.label}
                    </text>
                  </g>
                );
              })}

              {/* Closing pillar. */}
              <g className={styles.col} style={{ animationDelay: `${140 + steps.length * 110}ms` }}>
                <line
                  x1={cx(steps.length) + barW / 2}
                  x2={cx(colCount - 1) - barW / 2}
                  y1={y(close)}
                  y2={y(close)}
                  className={styles.connector}
                />
                <rect
                  x={cx(colCount - 1) - barW / 2}
                  y={y(close)}
                  width={barW}
                  height={pad.top + plotH - y(close)}
                  fill={roleColor('retained')}
                  fillOpacity={0.34}
                  stroke={roleColor('retained', 'high')}
                  strokeOpacity={0.8}
                />
                <ValueLabel
                  x={cx(colCount - 1)}
                  y={y(close) - 12}
                  anchor="middle"
                  size="sm"
                  color={roleColor('retained', 'high')}
                >
                  {`$${compact(close)}`}
                </ValueLabel>
                <ChartLabel
                  x={cx(colCount - 1)}
                  y={pad.top + plotH + 22}
                  anchor="middle"
                  tone="bright"
                  size="xs"
                >
                  2025
                </ChartLabel>
              </g>

              {/* Baseline. */}
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
