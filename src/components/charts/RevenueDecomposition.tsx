import { scaleLinear } from 'd3-scale';
import { area, curveBumpX } from 'd3-shape';
import { revenueDecomposition } from '@/data/calculated';
import { roleColor } from '@/data/roles';
import { compact, exact } from '@/lib/format';
import { useInView } from '@/hooks/useInView';
import { ChartFrame, ChartLabel, RoleLegend, ValueLabel } from './chartkit';
import { DataTable } from '../DataTable';
import styles from './RevenueDecomposition.module.css';

/**
 * Where the increase in insurance revenue went.
 *
 * The band enters carrying the GROSS role, because an increase in insurance
 * revenue is a gross flow and not an amount RoyalStar retains. Tributaries
 * peel away in the ceded and operating roles, and only the remainder — the
 * increase in the insurance service result — resolves to gold.
 *
 * The three reported movements sum exactly to the change in the reported
 * insurance service result; this is arithmetic, not attribution.
 */
export function RevenueDecomposition() {
  const { ref, inView } = useInView<HTMLDivElement>(0.2);

  const [entry, ceded, operating, remainder] = revenueDecomposition;
  if (!entry || !ceded || !operating || !remainder) throw new Error('decomposition malformed');

  return (
    <div ref={ref}>
      <ChartFrame
        title="Decomposition of the increase in insurance revenue, 2024 to 2025"
        description="Consolidated Statement of Comprehensive Income, printed page 7. The increase in insurance revenue less the increases in net expenses from reinsurance contracts held and in insurance service expenses equals the increase in the insurance service result."
        minHeight={420}
        table={
          <DataTable
            rows={revenueDecomposition}
            columns={[
              { key: 'l', head: 'Movement', align: 'left', rowHeader: true, render: (d) => d.label },
              {
                key: 'v',
                head: '$',
                render: (d) => (
                  <span className={d.value >= 0 ? 'pos' : 'neg'}>
                    {d.value >= 0 ? '' : '−'}
                    {exact(Math.abs(d.value))}
                  </span>
                ),
              },
            ]}
          />
        }
      >
        {(width) => {
          const isNarrow = width < 720;
          const height = isNarrow ? 520 : 440;
          const pad = { top: 54, bottom: 72, left: isNarrow ? 8 : 16, right: isNarrow ? 12 : 88 };
          const plotW = width - pad.left - pad.right;
          const plotH = height - pad.top - pad.bottom;

          const total = entry.value;
          const h = scaleLinear().domain([0, total]).range([0, plotH]);

          // The band runs left to right, losing thickness at each tributary.
          const stations = [
            { x: 0.06, value: total },
            { x: 0.34, value: total },
            { x: 0.44, value: total - Math.abs(ceded.value) },
            { x: 0.66, value: total - Math.abs(ceded.value) },
            { x: 0.74, value: remainder.value },
            { x: 0.96, value: remainder.value },
          ];

          const bandArea = area<{ x: number; value: number }>()
            .x((d) => pad.left + d.x * plotW)
            .y0((d) => pad.top + plotH / 2 - h(d.value) / 2)
            .y1((d) => pad.top + plotH / 2 + h(d.value) / 2)
            .curve(curveBumpX);

          const mid = pad.top + plotH / 2;

          /** A tributary peeling downward out of the main band. */
          function tributary(
            xStart: number,
            xEnd: number,
            amount: number,
            bandValueBefore: number,
          ) {
            const x0 = pad.left + xStart * plotW;
            const x1 = pad.left + xEnd * plotW;
            const thickness = h(amount);
            const bandBottom = mid + h(bandValueBefore) / 2;
            const dropY = mid + plotH / 2 + 26;
            return `
              M ${x0} ${bandBottom - thickness}
              C ${(x0 + x1) / 2} ${bandBottom - thickness}, ${x0} ${dropY - thickness}, ${x1} ${dropY - thickness}
              L ${x1} ${dropY}
              C ${x0} ${dropY}, ${(x0 + x1) / 2} ${bandBottom}, ${x0} ${bandBottom}
              Z`;
          }

          return (
            <svg
              width={width}
              height={height}
              viewBox={`0 0 ${width} ${height}`}
              role="img"
              aria-label="The increase in insurance revenue, and the movements that offset it"
              className={styles.svg}
              data-in={inView ? 'true' : 'false'}
            >
              <defs>
                <linearGradient id="rd-band" x1="0" x2="1">
                  <stop offset="0%" stopColor={roleColor('gross')} stopOpacity="0.5" />
                  <stop offset="55%" stopColor={roleColor('gross')} stopOpacity="0.34" />
                  <stop offset="72%" stopColor={roleColor('retained')} stopOpacity="0.5" />
                  <stop offset="100%" stopColor={roleColor('retained')} stopOpacity="0.82" />
                </linearGradient>
                <linearGradient id="rd-ceded" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor={roleColor('ceded')} stopOpacity="0.55" />
                  <stop offset="100%" stopColor={roleColor('ceded')} stopOpacity="0.12" />
                </linearGradient>
                <linearGradient id="rd-operating" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor={roleColor('operating')} stopOpacity="0.6" />
                  <stop offset="100%" stopColor={roleColor('operating')} stopOpacity="0.14" />
                </linearGradient>
              </defs>

              {/* Tributaries, drawn behind the band. */}
              <path
                d={tributary(0.34, 0.5, Math.abs(ceded.value), total)}
                fill="url(#rd-ceded)"
                stroke={roleColor('ceded')}
                strokeOpacity={0.45}
                strokeWidth={1}
                className={styles.trib}
                style={{ animationDelay: '0.5s' }}
              />
              <path
                d={tributary(0.66, 0.8, Math.abs(operating.value), total - Math.abs(ceded.value))}
                fill="url(#rd-operating)"
                stroke={roleColor('operating')}
                strokeOpacity={0.5}
                strokeWidth={1}
                className={styles.trib}
                style={{ animationDelay: '0.95s' }}
              />

              {/* The main band. */}
              <path
                d={bandArea(stations) ?? ''}
                fill="url(#rd-band)"
                stroke={roleColor('gross')}
                strokeOpacity={0.3}
                strokeWidth={1}
                className={styles.band}
              />

              {/* Entry label. */}
              <g className={styles.anno} style={{ animationDelay: '0.2s' }}>
                <ChartLabel x={pad.left + 0.06 * plotW} y={pad.top - 28} tone="dim" size="sm">
                  INCREASE IN INSURANCE REVENUE
                </ChartLabel>
                <ValueLabel
                  x={pad.left + 0.06 * plotW}
                  y={pad.top - 6}
                  size="lg"
                  color={roleColor('gross')}
                >
                  {`+$${exact(entry.value)}`}
                </ValueLabel>
              </g>

              {/* Tributary labels. */}
              <g className={styles.anno} style={{ animationDelay: '0.75s' }}>
                <ChartLabel
                  x={pad.left + 0.5 * plotW + 10}
                  y={mid + plotH / 2 + 12}
                  tone="dim"
                  size="sm"
                >
                  OFFSET BY REINSURANCE COST
                </ChartLabel>
                <ValueLabel
                  x={pad.left + 0.5 * plotW + 10}
                  y={mid + plotH / 2 + 34}
                  size="md"
                  color={roleColor('ceded')}
                >
                  {`−$${exact(Math.abs(ceded.value))}`}
                </ValueLabel>
              </g>

              <g className={styles.anno} style={{ animationDelay: '1.2s' }}>
                <ChartLabel
                  x={pad.left + 0.8 * plotW + 10}
                  y={mid + plotH / 2 + 12}
                  tone="dim"
                  size="sm"
                  anchor={isNarrow ? 'end' : 'start'}
                >
                  OFFSET BY SERVICE EXPENSES
                </ChartLabel>
                <ValueLabel
                  x={pad.left + 0.8 * plotW + 10}
                  y={mid + plotH / 2 + 34}
                  size="md"
                  color={roleColor('operating')}
                  anchor={isNarrow ? 'end' : 'start'}
                >
                  {`−$${exact(Math.abs(operating.value))}`}
                </ValueLabel>
              </g>

              {/* Remainder. */}
              <g className={styles.anno} style={{ animationDelay: '1.5s' }}>
                <line
                  x1={pad.left + 0.96 * plotW}
                  x2={pad.left + 0.96 * plotW}
                  y1={mid - h(remainder.value) / 2 - 18}
                  y2={mid + h(remainder.value) / 2 + 18}
                  stroke={roleColor('retained', 'high')}
                  strokeWidth={1}
                  strokeOpacity={0.5}
                />
                <ChartLabel
                  x={pad.left + 0.96 * plotW}
                  y={mid - h(remainder.value) / 2 - 30}
                  anchor="end"
                  tone="dim"
                  size="sm"
                >
                  INCREASE IN INSURANCE SERVICE RESULT
                </ChartLabel>
                <ValueLabel
                  x={pad.left + 0.96 * plotW}
                  y={mid + h(remainder.value) / 2 + 40}
                  anchor="end"
                  size="lg"
                  color={roleColor('retained', 'high')}
                >
                  {`+$${exact(remainder.value)}`}
                </ValueLabel>
              </g>

              {/* Scale reference. */}
              <ChartLabel x={pad.left} y={height - 8} tone="faint" size="xs">
                {`BAND THICKNESS PROPORTIONAL TO AMOUNT · FULL THICKNESS = $${compact(total)}`}
              </ChartLabel>
            </svg>
          );
        }}
      </ChartFrame>
      <div className={styles.legendRow}>
        <RoleLegend
          items={[
            { color: roleColor('gross'), label: 'Gross — revenue increase' },
            { color: roleColor('ceded'), label: 'Ceded — reinsurance' },
            { color: roleColor('operating'), label: 'Operating — service expenses' },
            { color: roleColor('retained'), label: 'Retained — service result' },
          ]}
        />
      </div>
    </div>
  );
}
