import { scaleLinear } from 'd3-scale';
import { revenueDecomposition } from '@/data/calculated';
import { roleColor } from '@/data/roles';
import { exact } from '@/lib/format';
import { ChartFrame, RoleLegend } from './chartkit';
import { DataTable } from '../DataTable';
import styles from './RevenueDecomposition.module.css';

export function RevenueDecomposition() {
  const [entry, ceded, operating, remainder] = revenueDecomposition;
  if (!entry || !ceded || !operating || !remainder) throw new Error('decomposition malformed');

  return (
    <div>
      <ChartFrame
        title="Decomposition of the increase in insurance revenue, 2024 to 2025"
        description="Consolidated Statement of Comprehensive Income, printed page 7."
        minHeight={280}
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
          const height = 300;
          const max = 220;
          const s = scaleLinear().domain([0, entry.value]).range([16, max]);
          const outer = s(entry.value);
          const inner = Math.max(14, s(remainder.value));
          const cx = width / 2;
          const cy = height / 2;

          return (
            <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} role="img">
              <rect
                x={cx - outer / 2}
                y={cy - outer / 2}
                width={outer}
                height={outer}
                fill={roleColor('ceded')}
                fillOpacity={0.38}
                stroke={roleColor('gross')}
                strokeWidth={3}
              />
              <rect
                x={cx - inner / 2}
                y={cy - inner / 2}
                width={inner}
                height={inner}
                fill={roleColor('retained')}
                fillOpacity={0.85}
                stroke={roleColor('retained', 'high')}
              />
              <text x={24} y={22} className={styles.cap} fill={roleColor('gross')}>
                +${exact(entry.value)} revenue
              </text>
              <text x={24} y={40} className={styles.cap} fill={roleColor('ceded')}>
                −${exact(Math.abs(ceded.value))} reinsurance
              </text>
              <text x={24} y={58} className={styles.cap} fill={roleColor('operating')}>
                −${exact(Math.abs(operating.value))} service expense
              </text>
              <text x={width - 24} y={height - 18} textAnchor="end" className={styles.cap} fill={roleColor('retained', 'high')}>
                +${exact(remainder.value)} result
              </text>
            </svg>
          );
        }}
      </ChartFrame>
      <RoleLegend
        items={[
          { color: roleColor('gross'), label: 'Revenue increase' },
          { color: roleColor('ceded'), label: 'Reinsurance offset' },
          { color: roleColor('operating'), label: 'Service expense' },
          { color: roleColor('retained'), label: 'Service result' },
        ]}
      />
    </div>
  );
}
