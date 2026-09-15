import { scaleLinear } from 'd3-scale';
import { netIncomeBridge } from '@/data/calculated';
import { reported } from '@/data/reported';
import { roleColor } from '@/data/roles';
import { exact, signedExact } from '@/lib/format';
import { ChartFrame } from './chartkit';
import { DataTable } from '../DataTable';
import styles from './NetIncomeBridge.module.css';

export function NetIncomeBridge() {
  const open = reported.netIncome!.prior!;
  const close = reported.netIncome!.value;
  let running = open;
  const steps = netIncomeBridge.map((s) => {
    const from = running;
    running += s.change;
    return { ...s, from, to: running };
  });
  const largest = [...steps].sort((a, b) => Math.abs(b.change) - Math.abs(a.change))[0]!;
  const maxAbs = Math.max(...steps.map((s) => Math.abs(s.change)));

  return (
    <ChartFrame
      title="Movement in net income, 2024 to 2025"
      description="Consolidated Statement of Comprehensive Income, printed page 7."
      minHeight={280}
      table={
        <DataTable
          rows={steps}
          columns={[
            { key: 'l', head: 'Line', align: 'left', rowHeader: true, render: (s) => s.label },
            {
              key: 'c',
              head: 'Movement $',
              render: (s) => <span className={s.change >= 0 ? 'pos' : 'neg'}>{signedExact(s.change)}</span>,
            },
          ]}
        />
      }
    >
      {(width) => {
        const rowH = 36;
        const labelW = Math.min(220, width * 0.38);
        const valueW = 108;
        const barW = Math.max(80, width - labelW - valueW - 16);
        const height = 48 + (steps.length + 2) * rowH;
        const x = scaleLinear().domain([0, maxAbs]).range([0, barW]);

        return (
          <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} role="img">
            <text x={0} y={16} className={styles.cap}>
              2024 ${exact(open)} → 2025 ${exact(close)}
            </text>
            {steps.map((s, i) => {
              const y = 32 + i * rowH;
              const w = Math.max(2, x(Math.abs(s.change)));
              const emph = s.id === largest.id;
              return (
                <g key={s.id}>
                  <text x={0} y={y + 14} className={styles.lab}>
                    {s.label}
                  </text>
                  <rect
                    x={labelW}
                    y={y + 6}
                    width={w}
                    height={14}
                    fill={roleColor(s.role)}
                    fillOpacity={emph ? 0.95 : 0.45}
                  />
                  <text x={width} y={y + 16} textAnchor="end" className={styles.val}>
                    {signedExact(s.change)}
                  </text>
                </g>
              );
            })}
          </svg>
        );
      }}
    </ChartFrame>
  );
}
