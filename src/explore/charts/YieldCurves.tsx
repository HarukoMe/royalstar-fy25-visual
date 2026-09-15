import { scaleLinear } from 'd3-scale';
import { line as d3line, curveMonotoneX } from 'd3-shape';
import { yieldCurves } from '@/data/reported';
import { roleColor } from '@/data/roles';
import { percent } from '@/lib/format';
import { useInView } from '@/hooks/useInView';
import { ChartFrame, ChartLabel, RoleLegend, ValueLabel } from '@/components/charts/chartkit';
import { DataTable } from '@/components/DataTable';
import styles from './YieldCurves.module.css';

/**
 * The spot rates used to discount estimates of future cash flows, both
 * currencies and both years. These are measurement inputs to a gross insurance
 * liability, so the curves take the gross role; the prior year is dashed.
 */
export function YieldCurves() {
  const { ref, inView } = useInView<HTMLDivElement>(0.2);

  const rows = yieldCurves.flatMap((c) =>
    c.current.map((pt, i) => ({
      currency: c.currency,
      tenor: pt.tenor,
      current: pt.rate,
      prior: c.prior[i]!.rate,
    })),
  );

  return (
    <div ref={ref}>
      <ChartFrame
        title="Yield curves (spot rates) used to discount estimates of future cash flows"
        description="Note 3 — Significant Judgements and Estimates in Applying IFRS 17, printed page 30."
        minHeight={320}
        table={
          <DataTable
            rows={rows}
            columns={[
              { key: 'c', head: 'Currency', align: 'left', rowHeader: true, render: (r) => r.currency },
              { key: 't', head: 'Tenor', render: (r) => `${r.tenor}y` },
              { key: 'v', head: '2025', render: (r) => percent(r.current, 1) },
              { key: 'p', head: '2024', render: (r) => percent(r.prior, 1) },
            ]}
          />
        }
      >
        {(width) => {
          const isNarrow = width < 720;
          const chartW = isNarrow ? width : (width - 32) / 2;
          const chartH = 260;
          const height = isNarrow ? chartH * 2 + 40 : chartH;
          const pad = { top: 40, bottom: 44, left: 44, right: 20 };

          const allRates = yieldCurves.flatMap((c) =>
            [...c.current, ...c.prior].map((p) => p.rate),
          );
          const lo = Math.min(...allRates) * 0.9;
          const hi = Math.max(...allRates) * 1.06;

          return (
            <svg
              width={width}
              height={height}
              viewBox={`0 0 ${width} ${height}`}
              role="img"
              aria-label="Discount rate yield curves for both currencies and both years"
              className={styles.svg}
              data-in={inView ? 'true' : 'false'}
            >
              {yieldCurves.map((c, ci) => {
                const ox = isNarrow ? 0 : ci * (chartW + 32);
                const oy = isNarrow ? ci * (chartH + 40) : 0;
                const innerW = chartW - pad.left - pad.right;
                const innerH = chartH - pad.top - pad.bottom;

                const x = scaleLinear().domain([1, 20]).range([0, innerW]);
                const y = scaleLinear().domain([lo, hi]).range([innerH, 0]);

                const mk = (pts: readonly { tenor: number; rate: number }[]) =>
                  d3line<{ tenor: number; rate: number }>()
                    .x((d) => ox + pad.left + x(d.tenor))
                    .y((d) => oy + pad.top + y(d.rate))
                    .curve(curveMonotoneX)([...pts]);

                return (
                  <g key={c.currency} className={styles.panel} style={{ animationDelay: `${ci * 160}ms` }}>
                    <ChartLabel x={ox + pad.left} y={oy + 18} tone="bright" size="sm">
                      {c.currency.toUpperCase()}
                    </ChartLabel>

                    {/* Rate grid. */}
                    {[0.04, 0.05, 0.06, 0.07].map((r) => (
                      <g key={r}>
                        <line
                          x1={ox + pad.left}
                          x2={ox + pad.left + innerW}
                          y1={oy + pad.top + y(r)}
                          y2={oy + pad.top + y(r)}
                          className={styles.grid}
                        />
                        <ChartLabel
                          x={ox + pad.left - 8}
                          y={oy + pad.top + y(r) + 3}
                          anchor="end"
                          tone="faint"
                          size="xs"
                        >
                          {percent(r, 0)}
                        </ChartLabel>
                      </g>
                    ))}

                    {/* Tenor ticks. */}
                    {[1, 5, 10, 20].map((t) => (
                      <ChartLabel
                        key={t}
                        x={ox + pad.left + x(t)}
                        y={oy + pad.top + innerH + 18}
                        anchor="middle"
                        tone="faint"
                        size="xs"
                      >
                        {`${t}y`}
                      </ChartLabel>
                    ))}

                    <path
                      d={mk(c.prior) ?? ''}
                      fill="none"
                      stroke={roleColor('gross')}
                      strokeOpacity={0.45}
                      strokeWidth={1.2}
                      strokeDasharray="4 3"
                    />
                    <path
                      d={mk(c.current) ?? ''}
                      fill="none"
                      stroke={roleColor('gross')}
                      strokeWidth={1.8}
                      className={styles.curve}
                    />

                    {c.current.map((pt, i) => (
                      <g key={pt.tenor}>
                        <circle
                          cx={ox + pad.left + x(pt.tenor)}
                          cy={oy + pad.top + y(pt.rate)}
                          r={3}
                          fill={roleColor('gross')}
                        />
                        <ValueLabel
                          x={ox + pad.left + x(pt.tenor)}
                          y={oy + pad.top + y(pt.rate) - 11}
                          anchor={i === 0 ? 'start' : i === c.current.length - 1 ? 'end' : 'middle'}
                          size="xs"
                        >
                          {percent(pt.rate, 1)}
                        </ValueLabel>
                      </g>
                    ))}
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
            { color: roleColor('gross'), label: '2025 spot rates' },
            { color: roleColor('gross', 'low'), label: '2024 spot rates' },
          ]}
        />
      </div>
    </div>
  );
}
