import { scaleLinear } from 'd3-scale';
import { reported } from '@/data/reported';
import { roleColor } from '@/data/roles';
import { compact, exact, signedExact } from '@/lib/format';
import { ChartFrame } from './chartkit';
import { DataTable } from '../DataTable';
import styles from './EquityBridge.module.css';

export function EquityBridge() {
  const open2024 = reported.equityOpening2024!.value;
  const ni2024 = reported.netIncome!.prior!;
  const div2024 = reported.totalDividends!.prior!;
  const close2024 = reported.totalEquity!.prior!;
  const ni2025 = reported.netIncome!.value;
  const div2025 = reported.totalDividends!.value;
  const close2025 = reported.totalEquity!.value;

  const years = [
    { label: '31 Dec 2023', value: open2024, note: '' },
    { label: '31 Dec 2024', value: close2024, note: `${signedExact(ni2024)} income · ${signedExact(div2024)} dividends` },
    { label: '31 Dec 2025', value: close2025, note: `${signedExact(ni2025)} income · ${signedExact(div2025)} dividends` },
  ];

  return (
    <ChartFrame
      title="Movement in total equity, 31 December 2023 to 31 December 2025"
      description="Consolidated Statement of Changes in Equity, printed page 8."
      minHeight={240}
      table={
        <DataTable
          rows={years}
          columns={[
            { key: 'l', head: 'Date', align: 'left', rowHeader: true, render: (s) => s.label },
            { key: 'v', head: '$', render: (s) => exact(s.value) },
          ]}
        />
      }
    >
      {(width) => {
        const y = scaleLinear().domain([0, close2025]).range([0, 1]);

        return (
          <div className={styles.stack} style={{ width }}>
            {years.map((yr) => (
              <div key={yr.label} className={styles.row}>
                <div className={styles.meta}>
                  <span className={styles.date}>{yr.label}</span>
                  <span className={styles.val} style={{ color: roleColor('retained', 'high') }}>
                    ${compact(yr.value)}
                  </span>
                  {yr.note && <span className={styles.note}>{yr.note}</span>}
                </div>
                <div className={styles.track}>
                  <div
                    className={styles.fill}
                    style={{
                      width: `${y(yr.value) * 100}%`,
                      background: roleColor('retained'),
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        );
      }}
    </ChartFrame>
  );
}
