import { scaleLinear } from 'd3-scale';
import { area, curveStepAfter } from 'd3-shape';
import { licMaturity } from '@/data/reported';
import { roleColor } from '@/data/roles';
import { useInView } from '@/hooks/useInView';
import { ChartFrame, ChartLabel, RoleLegend, ValueLabel } from '@/components/charts/chartkit';
import styles from './MaturityLadder.module.css';

/**
 * Stepped run-off of the gross liability for incurred claims. A gross
 * obligation, so the ladder is blue; the prior year is a stepped outline.
 */
export function MaturityLadder() {
  const { ref, inView } = useInView<HTMLDivElement>(0.2);

  return (
    <div ref={ref}>
      <ChartFrame
        title="Maturity profile of liabilities for incurred claims"
        description="Note 19 — Risk Management, liquidity risk, printed page 62. Amounts in thousands of Bahamian dollars, as presented."
        minHeight={300}
      >
        {(width) => {
          const height = 300;
          const pad = { top: 34, bottom: 56, left: 8, right: 8 };
          const plotW = width - pad.left - pad.right;
          const plotH = height - pad.top - pad.bottom;
          const max = Math.max(...licMaturity.flatMap((m) => [m.value, m.prior])) * 1.15;
          const y = scaleLinear().domain([0, max]).range([pad.top + plotH, pad.top]);
          const step = plotW / licMaturity.length;

          const pts = licMaturity.map((m, i) => ({ i, v: m.value, p: m.prior }));

          const mkArea = (key: 'v' | 'p') =>
            area<{ i: number; v: number; p: number }>()
              .x((d) => pad.left + d.i * step)
              .y0(pad.top + plotH)
              .y1((d) => y(d[key]))
              .curve(curveStepAfter)([...pts, { i: pts.length, v: pts[pts.length - 1]!.v, p: pts[pts.length - 1]!.p }]);

          return (
            <svg
              width={width}
              height={height}
              viewBox={`0 0 ${width} ${height}`}
              role="img"
              aria-label="Maturity profile of liabilities for incurred claims"
              className={styles.svg}
              data-in={inView ? 'true' : 'false'}
            >
              <defs>
                <linearGradient id="ml-fill" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor={roleColor('gross')} stopOpacity="0.5" />
                  <stop offset="100%" stopColor={roleColor('gross')} stopOpacity="0.06" />
                </linearGradient>
              </defs>

              {/* Horizontal grid. */}
              {[0.25, 0.5, 0.75, 1].map((t) => (
                <g key={t}>
                  <line
                    x1={pad.left}
                    x2={width - pad.right}
                    y1={y(max * t)}
                    y2={y(max * t)}
                    className={styles.grid}
                  />
                  <ChartLabel x={pad.left} y={y(max * t) - 5} tone="faint" size="xs">
                    {Math.round(max * t).toLocaleString('en-US')}
                  </ChartLabel>
                </g>
              ))}

              {/* Prior year outline. */}
              <path
                d={mkArea('p') ?? ''}
                fill="none"
                stroke={roleColor('gross')}
                strokeOpacity={0.4}
                strokeWidth={1}
                strokeDasharray="3 3"
              />
              {/* Current year. */}
              <path d={mkArea('v') ?? ''} fill="url(#ml-fill)" className={styles.fill} />
              <path
                d={mkArea('v') ?? ''}
                fill="none"
                stroke={roleColor('gross')}
                strokeOpacity={0.9}
                strokeWidth={1.5}
                className={styles.fill}
              />

              {licMaturity.map((m, i) => (
                <g key={m.bucket}>
                  <ValueLabel x={pad.left + i * step + step / 2} y={y(m.value) - 10} anchor="middle" size="sm">
                    {m.value.toLocaleString('en-US')}
                  </ValueLabel>
                  <text
                    transform={`translate(${pad.left + i * step + step / 2}, ${pad.top + plotH + 18}) rotate(-18)`}
                    textAnchor="middle"
                    className={styles.bucket}
                  >
                    {m.bucket}
                  </text>
                </g>
              ))}

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
      <div className={styles.legendRow}>
        <RoleLegend
          items={[
            { color: roleColor('gross'), label: '2025 profile' },
            { color: roleColor('gross', 'low'), label: '2024 outline' },
          ]}
        />
      </div>
    </div>
  );
}
