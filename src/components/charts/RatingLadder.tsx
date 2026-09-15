import { scaleSqrt } from 'd3-scale';
import { reinsurerRatings, reported } from '@/data/reported';
import { roleColor } from '@/data/roles';
import { compact, exact } from '@/lib/format';
import { ChartFrame } from './chartkit';
import { DataTable } from '../DataTable';
import styles from './RatingLadder.module.css';

export function RatingLadder() {
  const total = reported.reinsuranceContractAssets!.value;
  const priorTotal = reported.reinsuranceContractAssets!.prior!;
  const positive = reinsurerRatings.filter((b) => b.value > 0);
  const max = Math.max(...positive.map((b) => b.value));

  return (
    <ChartFrame
      title="Reinsurance contract assets by counterparty credit rating"
      description="Note 19 — Risk Management, reinsurance credit risk, printed page 61."
      minHeight={320}
      table={
        <DataTable
          rows={reinsurerRatings}
          columns={[
            { key: 'b', head: 'Rating', align: 'left', rowHeader: true, render: (b) => b.band },
            { key: 'v', head: '2025 $', render: (b) => exact(b.value) },
            { key: 'p', head: '2024 $', render: (b) => exact(b.prior) },
          ]}
          footer={
            <tr>
              <th scope="row" data-align="left">
                Total
              </th>
              <td data-align="right">{exact(total)}</td>
              <td data-align="right">{exact(priorTotal)}</td>
            </tr>
          }
        />
      }
    >
      {(width) => {
        const height = 300;
        const cx = width * 0.38;
        const cy = height / 2;
        const r = scaleSqrt().domain([0, max]).range([18, Math.min(120, width * 0.22)]);
        const sorted = [...positive].sort((a, b) => b.value - a.value);

        return (
          <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} role="img">
            {sorted.map((b, i) => (
              <circle
                key={b.band}
                cx={cx}
                cy={cy}
                r={r(b.value)}
                fill="none"
                stroke={roleColor('ceded')}
                strokeOpacity={0.95 - i * 0.15}
                strokeWidth={10 - i * 1.4}
              />
            ))}
            <text x={cx} y={cy + 4} textAnchor="middle" className={styles.hub}>
              ${compact(total)}
            </text>
            <g transform={`translate(${Math.min(width - 160, width * 0.62)}, 48)`}>
              {reinsurerRatings.map((b, i) => (
                <text key={b.band} y={i * 22} className={styles.lab}>
                  {b.band}  {compact(b.value)}
                </text>
              ))}
            </g>
          </svg>
        );
      }}
    </ChartFrame>
  );
}
