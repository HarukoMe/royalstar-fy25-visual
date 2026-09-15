import { scaleLinear } from 'd3-scale';
import { productLineShares } from '@/data/calculated';
import { roleColor } from '@/data/roles';
import { compact, percent } from '@/lib/format';
import { useInView } from '@/hooks/useInView';
import { ChartFrame, ChartLabel, RoleLegend, ValueLabel } from '@/components/charts/chartkit';
import styles from './ProductLineSlope.module.css';

/**
 * Gross to ceded to net, by product line. Three columns in the three roles, so
 * the reader traces a liability from what RoyalStar underwrote, through what it
 * passed on, to what it kept.
 *
 * Motor is the instructive case: its reinsurance balance is negative, so the
 * net retained liability is larger than the gross figure and the connecting
 * band travels upward rather than down.
 */
export function ProductLineSlope() {
  const { ref, inView } = useInView<HTMLDivElement>(0.2);

  return (
    <div ref={ref}>
      <ChartFrame
        title="Insurance contract liabilities by product line: gross, reinsurance and net"
        description="Note 19 — Risk Management, concentrations of risk, printed page 52."
        minHeight={340}
      >
        {(width) => {
          const height = 360;
          const pad = { top: 48, bottom: 40, left: 8, right: 8 };
          const plotH = height - pad.top - pad.bottom;
          const colX = [0.12, 0.5, 0.88].map((t) => pad.left + t * (width - pad.left - pad.right));
          const max = Math.max(...productLineShares.map((l) => Math.max(l.gross, l.net)));
          const h = scaleLinear().domain([0, max]).range([0, plotH * 0.88]);

          let grossOffset = pad.top;
          let cededOffset = pad.top;
          let netOffset = pad.top;

          const bands = productLineShares.map((l, i) => {
            const gy = grossOffset;
            const gh = h(l.gross);
            grossOffset += gh + 4;

            const ch = h(Math.max(0, l.ceded));
            const cy = cededOffset;
            cededOffset += ch + 4;

            const ny = netOffset;
            const nh = h(l.net);
            netOffset += nh + 4;

            return { ...l, i, gy, gh, cy, ch, ny, nh };
          });

          const colW = Math.min(54, (width - pad.left - pad.right) * 0.07);

          return (
            <svg
              width={width}
              height={height}
              viewBox={`0 0 ${width} ${height}`}
              role="img"
              aria-label="Product line liabilities from gross through reinsurance to net"
              className={styles.svg}
              data-in={inView ? 'true' : 'false'}
            >
              <ChartLabel x={colX[0]!} y={22} anchor="middle" tone="dim" size="sm">
                GROSS
              </ChartLabel>
              <ChartLabel x={colX[1]!} y={22} anchor="middle" tone="dim" size="sm">
                CEDED
              </ChartLabel>
              <ChartLabel x={colX[2]!} y={22} anchor="middle" tone="dim" size="sm">
                NET RETAINED
              </ChartLabel>

              {bands.map((b) => {
                const x0 = colX[0]!;
                const x1 = colX[1]!;
                const x2 = colX[2]!;
                const negativeCeded = b.ceded < 0;

                return (
                  <g key={b.name} className={styles.band} style={{ animationDelay: `${b.i * 100}ms` }}>
                    {/* Gross → ceded ribbon. */}
                    {!negativeCeded && (
                      <path
                        d={`M ${x0 + colW / 2} ${b.gy} C ${(x0 + x1) / 2} ${b.gy}, ${(x0 + x1) / 2} ${b.cy}, ${x1 - colW / 2} ${b.cy} L ${x1 - colW / 2} ${b.cy + b.ch} C ${(x0 + x1) / 2} ${b.cy + b.ch}, ${(x0 + x1) / 2} ${b.gy + b.ch}, ${x0 + colW / 2} ${b.gy + b.ch} Z`}
                        fill={roleColor('ceded')}
                        fillOpacity={0.14}
                      />
                    )}
                    {/* Gross → net ribbon (the retained remainder). */}
                    <path
                      d={`M ${x0 + colW / 2} ${b.gy + b.gh - b.nh} C ${(x0 + x2) / 2} ${b.gy + b.gh - b.nh}, ${(x0 + x2) / 2} ${b.ny} , ${x2 - colW / 2} ${b.ny} L ${x2 - colW / 2} ${b.ny + b.nh} C ${(x0 + x2) / 2} ${b.ny + b.nh}, ${(x0 + x2) / 2} ${b.gy + b.gh}, ${x0 + colW / 2} ${b.gy + b.gh} Z`}
                      fill={roleColor('retained')}
                      fillOpacity={0.1}
                    />

                    {/* Columns. */}
                    <rect
                      x={x0 - colW / 2}
                      y={b.gy}
                      width={colW}
                      height={b.gh}
                      fill={roleColor('gross')}
                      fillOpacity={0.62}
                    />
                    {!negativeCeded && (
                      <rect
                        x={x1 - colW / 2}
                        y={b.cy}
                        width={colW}
                        height={b.ch}
                        fill={roleColor('ceded')}
                        fillOpacity={0.72}
                      />
                    )}
                    {negativeCeded && (
                      <rect
                        x={x1 - colW / 2}
                        y={b.cy}
                        width={colW}
                        height={6}
                        fill={roleColor('ceded')}
                        fillOpacity={0.3}
                        stroke={roleColor('ceded')}
                        strokeDasharray="2 2"
                        strokeOpacity={0.8}
                      />
                    )}
                    <rect
                      x={x2 - colW / 2}
                      y={b.ny}
                      width={colW}
                      height={b.nh}
                      fill={roleColor('retained')}
                      fillOpacity={0.82}
                    />

                    {/* Labels. */}
                    <ChartLabel x={x0 - colW / 2 - 10} y={b.gy + b.gh / 2 + 3} anchor="end" tone="bright" size="sm">
                      {b.name}
                    </ChartLabel>
                    <ValueLabel x={x0 - colW / 2 - 10} y={b.gy + b.gh / 2 + 17} anchor="end" size="xs">
                      {`$${compact(b.gross)}`}
                    </ValueLabel>

                    <ValueLabel x={x2 + colW / 2 + 10} y={b.ny + b.nh / 2 + 3} size="sm">
                      {`$${compact(b.net)}`}
                    </ValueLabel>
                    <ChartLabel x={x2 + colW / 2 + 10} y={b.ny + b.nh / 2 + 17} tone="faint" size="xs">
                      {negativeCeded ? 'ceded balance negative' : `${percent(b.netShare, 0)} retained`}
                    </ChartLabel>
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
            { color: roleColor('gross'), label: 'Insurance contract liabilities' },
            { color: roleColor('ceded'), label: 'Reinsurance contract assets' },
            { color: roleColor('retained'), label: 'Net retained' },
          ]}
        />
      </div>
    </div>
  );
}
