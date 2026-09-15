import { scaleLinear } from 'd3-scale';
import { reported } from '@/data/reported';
import { roleColor } from '@/data/roles';
import { compact, exact } from '@/lib/format';
import { useInView } from '@/hooks/useInView';
import { ChartFrame, ChartLabel, ValueLabel } from '@/components/charts/chartkit';
import { DataTable } from '@/components/DataTable';
import styles from './CashFlowRibbon.module.css';

/**
 * Opening cash, the three activities, and closing cash — for both years side
 * by side, so the reader can see that the decline narrowed.
 *
 * Operating flows take the operating role, investing the investment role, and
 * financing the retained role, because financing here is almost entirely
 * dividends and debt repayment: movements in RoyalStar's own capital.
 */
export function CashFlowRibbon() {
  const { ref, inView } = useInView<HTMLDivElement>(0.2);

  const years = [
    {
      year: 2025,
      open: reported.cashOpening!.value,
      operating: reported.cashFromOperating!.value,
      investing: reported.cashUsedInInvesting!.value,
      financing: reported.cashUsedInFinancing!.value,
      close: reported.cash!.value,
    },
    {
      year: 2024,
      open: reported.cashOpening!.prior!,
      operating: reported.cashFromOperating!.prior!,
      investing: reported.cashUsedInInvesting!.prior!,
      financing: reported.cashUsedInFinancing!.prior!,
      close: reported.cash!.prior!,
    },
  ];

  return (
    <div ref={ref}>
      <ChartFrame
        title="Cash flows by activity, 2025 and 2024"
        description="Consolidated Statement of Cash Flows, printed pages 9 and 10."
        minHeight={320}
        table={
          <DataTable
            rows={years}
            columns={[
              { key: 'y', head: 'Year', align: 'left', rowHeader: true, render: (y) => String(y.year) },
              { key: 'o', head: 'Opening $', render: (y) => exact(y.open) },
              { key: 'op', head: 'Operating $', render: (y) => exact(y.operating) },
              { key: 'i', head: 'Investing $', render: (y) => exact(y.investing) },
              { key: 'f', head: 'Financing $', render: (y) => exact(y.financing) },
              { key: 'c', head: 'Closing $', render: (y) => exact(y.close) },
            ]}
          />
        }
      >
        {(width) => {
          const bandH = 112;
          const gap = 34;
          const height = years.length * (bandH + gap) + 24;
          const labelW = 54;
          const plotW = width - labelW - 8;
          const max = Math.max(...years.flatMap((y) => [y.open, y.close, Math.abs(y.operating)]));
          const x = scaleLinear().domain([0, max]).range([0, plotW * 0.92]);

          return (
            <svg
              width={width}
              height={height}
              viewBox={`0 0 ${width} ${height}`}
              role="img"
              aria-label="Cash flow by activity for 2025 and 2024"
              className={styles.svg}
              data-in={inView ? 'true' : 'false'}
            >
              {years.map((y, yi) => {
                const oy = yi * (bandH + gap) + 14;
                const segs = [
                  { id: 'open', label: 'Opening cash', value: y.open, role: 'investment' as const },
                  { id: 'op', label: 'Operating', value: y.operating, role: 'operating' as const },
                  { id: 'inv', label: 'Investing', value: y.investing, role: 'investment' as const },
                  { id: 'fin', label: 'Financing', value: y.financing, role: 'retained' as const },
                  { id: 'close', label: 'Closing cash', value: y.close, role: 'investment' as const },
                ];

                return (
                  <g key={y.year} className={styles.band} style={{ animationDelay: `${yi * 160}ms` }}>
                    <text x={0} y={oy + 24} className={styles.year}>
                      {y.year}
                    </text>

                    {segs.map((s, si) => {
                      const w = Math.max(3, x(Math.abs(s.value)));
                      const rowY = oy + si * 20;
                      const isOutflow = s.value < 0;
                      return (
                        <g key={s.id}>
                          <rect
                            x={labelW}
                            y={rowY}
                            width={inView ? w : 0}
                            height={13}
                            fill={roleColor(s.role)}
                            fillOpacity={isOutflow ? 0.3 : 0.75}
                            stroke={roleColor(s.role)}
                            strokeOpacity={isOutflow ? 0.75 : 0}
                            strokeDasharray={isOutflow ? '3 2' : undefined}
                            className={styles.seg}
                            style={{ transitionDelay: `${si * 70}ms` }}
                          />
                          <ChartLabel x={labelW + w + 9} y={rowY + 10} tone="faint" size="xs">
                            {s.label}
                          </ChartLabel>
                          <ValueLabel x={width} y={rowY + 10} anchor="end" size="xs">
                            {`${s.value < 0 ? '(' : ''}$${compact(Math.abs(s.value))}${s.value < 0 ? ')' : ''}`}
                          </ValueLabel>
                        </g>
                      );
                    })}
                  </g>
                );
              })}
            </svg>
          );
        }}
      </ChartFrame>
      <p className={styles.note}>
        Dashed segments are outflows. Financing takes the retained role because it comprises
        dividends paid, interest paid and repayment of borrowings — movements in RoyalStar's own
        capital rather than in underwriting or investment.
      </p>
    </div>
  );
}
