import { arc as d3arc } from 'd3-shape';
import { calculated, retentionByYear } from '@/data/calculated';
import { reported } from '@/data/reported';
import { roleColor } from '@/data/roles';
import { compact, exact, percent } from '@/lib/format';
import { useInView } from '@/hooks/useInView';
import { ChartFrame, ChartLabel, RoleLegend } from './chartkit';
import { DataTable } from '../DataTable';
import styles from './RetentionArc.module.css';

const TAU = Math.PI * 2;

/**
 * Ultimate claims across accident years 2016–2025, split between the portion
 * borne by reinsurers and the portion retained. The violet arc is ceded, the
 * gold arc retained; gross is the whole circle.
 */
export function RetentionArc() {
  const { ref, inView } = useInView<HTMLDivElement>(0.25);

  const gross = reported.grossUltimateTotal!.value;
  const net = reported.netUltimateTotal!.value;
  const ceded = calculated.cededUltimate!.value;
  const netShare = net / gross;

  return (
    <div ref={ref}>
      <ChartFrame
        title="Current estimate of cumulative claims, accident years 2016 to 2025"
        description="Note 13 — Claims Development, printed pages 46 and 47."
        minHeight={360}
        table={
          <DataTable
            dense
            rows={retentionByYear}
            columns={[
              { key: 'y', head: 'Accident year', align: 'left', rowHeader: true, render: (d) => String(d.year) },
              { key: 'g', head: 'Gross $', render: (d) => exact(d.gross) },
              { key: 'n', head: 'Net $', render: (d) => exact(d.net) },
              { key: 'r', head: 'Net ÷ gross', render: (d) => percent(d.ratio) },
            ]}
            footer={
              <tr>
                <th scope="row" data-align="left">
                  Total
                </th>
                <td data-align="right">{exact(gross)}</td>
                <td data-align="right">{exact(net)}</td>
                <td data-align="right">{percent(netShare)}</td>
              </tr>
            }
          />
        }
      >
        {(width) => {
          const size = Math.min(width, 430);
          const height = size + 30;
          const cx = width / 2;
          const cy = height / 2 - 6;
          const outer = size * 0.42;
          const inner = size * 0.315;

          const makeArc = d3arc<{ from: number; to: number }>()
            .innerRadius(inner)
            .outerRadius(outer)
            .startAngle((d) => d.from * TAU)
            .endAngle((d) => d.to * TAU)
            .cornerRadius(1.5);

          const cededArc = makeArc({ from: 0, to: inView ? 1 - netShare : 0 });
          const netArc = makeArc({
            from: inView ? 1 - netShare : 0,
            to: inView ? 1 : 0,
          });

          return (
            <svg
              width={width}
              height={height}
              viewBox={`0 0 ${width} ${height}`}
              role="img"
              aria-label="Proportion of gross ultimate claims borne by reinsurers"
              className={styles.svg}
            >
              <g transform={`translate(${cx}, ${cy})`}>
                {/* Track. */}
                <circle
                  r={(inner + outer) / 2}
                  fill="none"
                  stroke={roleColor('gross')}
                  strokeOpacity={0.14}
                  strokeWidth={outer - inner}
                />
                <path
                  d={cededArc ?? ''}
                  fill={roleColor('ceded')}
                  fillOpacity={0.78}
                  className={styles.arc}
                />
                <path
                  d={netArc ?? ''}
                  fill={roleColor('retained', 'high')}
                  className={styles.arc}
                  style={{ animationDelay: '0.45s' }}
                />

                {/* Tick marks at each decile. */}
                {Array.from({ length: 10 }, (_, i) => {
                  const a = (i / 10) * TAU - Math.PI / 2;
                  return (
                    <line
                      key={i}
                      x1={Math.cos(a) * (outer + 5)}
                      y1={Math.sin(a) * (outer + 5)}
                      x2={Math.cos(a) * (outer + 11)}
                      y2={Math.sin(a) * (outer + 11)}
                      stroke={roleColor('gross')}
                      strokeOpacity={0.3}
                      strokeWidth={1}
                    />
                  );
                })}

                <text className={styles.centreValue} textAnchor="middle" y={-4}>
                  {percent(1 - netShare, 2)}
                </text>
                <text className={styles.centreLabel} textAnchor="middle" y={20}>
                  BORNE BY REINSURERS
                </text>
                <text className={styles.centreSub} textAnchor="middle" y={40}>
                  {`$${compact(ceded)} of $${compact(gross)}`}
                </text>
              </g>

              <ChartLabel x={width / 2} y={height - 4} anchor="middle" tone="faint" size="xs">
                {`RETAINED NET $${compact(net)} · ${percent(netShare, 2)} OF GROSS`}
              </ChartLabel>
            </svg>
          );
        }}
      </ChartFrame>
      <div className={styles.legendRow}>
        <RoleLegend
          items={[
            { color: roleColor('ceded'), label: 'Ceded to reinsurers' },
            { color: roleColor('retained', 'high'), label: 'Retained net' },
            { color: roleColor('gross'), label: 'Gross — the whole circle' },
          ]}
        />
      </div>
    </div>
  );
}
