import { useMemo, useState } from 'react';
import { scaleSqrt } from 'd3-scale';
import { geographyShares } from '@/data/calculated';
import { directionColor, roleColor } from '@/data/roles';
import { compact, percent, signedPercent } from '@/lib/format';
import { useInView } from '@/hooks/useInView';
import { ChartFrame, ChartLabel, ValueLabel } from './chartkit';
import { DataTable } from '../DataTable';
import styles from './Archipelago.module.css';

/**
 * Six licences as a true Caribbean footprint.
 * Node area ∝ 2025 premiums written (gross). Growth is a directional ring,
 * never gold.
 */

interface Node {
  readonly short: string;
  readonly name: string;
  readonly lon: number;
  readonly lat: number;
}

const LAYOUT: readonly Node[] = [
  { short: 'CYM', name: 'Cayman Islands', lon: -81.25, lat: 19.3 },
  { short: 'BHS', name: 'The Bahamas', lon: -77.35, lat: 24.7 },
  { short: 'TCA', name: 'Turks & Caicos', lon: -71.8, lat: 21.75 },
  { short: 'VIR', name: 'United States Virgin Islands', lon: -64.8, lat: 18.34 },
  { short: 'VGB', name: 'British Virgin Islands', lon: -64.62, lat: 18.43 },
  { short: 'AIA', name: 'Anguilla', lon: -63.07, lat: 18.22 },
];

const LON0 = -83.2;
const LON1 = -60.4;
const LAT0 = 17.1;
const LAT1 = 26.6;

export function Archipelago() {
  const { ref, inView } = useInView<HTMLDivElement>(0.2);
  const [active, setActive] = useState<string | null>('BHS');

  const nodes = useMemo(() => {
    const max = Math.max(...geographyShares.map((g) => g.value));
    const r = scaleSqrt().domain([0, max]).range([0, 1]);
    return LAYOUT.map((l) => {
      const data = geographyShares.find((g) => g.short === l.short);
      if (!data) throw new Error(`No premium data for ${l.short}`);
      return { ...l, ...data, radius: r(data.value) };
    });
  }, []);

  const selected = nodes.find((n) => n.short === active) ?? nodes[0]!;

  return (
    <div ref={ref} className={styles.wrap}>
      <ChartFrame
        title="Insurance premiums written by jurisdiction, 2025"
        description="Note 19 — Risk Management, concentrations of risk, printed page 52. Node area is proportional to premiums written. Positions follow approximate geography."
        minHeight={420}
        table={
          <DataTable
            rows={geographyShares}
            columns={[
              { key: 'n', head: 'Jurisdiction', align: 'left', rowHeader: true, render: (g) => g.name },
              { key: 'v', head: '2025 $', render: (g) => g.value.toLocaleString('en-US') },
              { key: 'p', head: '2024 $', render: (g) => g.prior.toLocaleString('en-US') },
              { key: 's', head: 'Share 2025', render: (g) => percent(g.share) },
              {
                key: 'g',
                head: 'Change',
                render: (g) => (
                  <span className={g.growth >= 0 ? 'pos' : 'neg'}>{signedPercent(g.growth)}</span>
                ),
              },
            ]}
          />
        }
      >
        {(width) => {
          const height = Math.max(480, Math.min(760, width * 0.62));
          const pad = { top: 40, right: 110, bottom: 48, left: 36 };
          const px = (lon: number) => pad.left + ((lon - LON0) / (LON1 - LON0)) * (width - pad.left - pad.right);
          const py = (lat: number) =>
            pad.top + ((LAT1 - lat) / (LAT1 - LAT0)) * (height - pad.top - pad.bottom);
          const maxR = Math.min(width, height) * 0.18;

          return (
            <svg
              width={width}
              height={height}
              viewBox={`0 0 ${width} ${height}`}
              role="img"
              aria-label="Insurance premiums written across six Caribbean jurisdictions"
            >
              <defs>
                <radialGradient id="arch-node" cx="38%" cy="32%" r="62%">
                  <stop offset="0%" stopColor={roleColor('gross')} stopOpacity="0.55" />
                  <stop offset="100%" stopColor={roleColor('gross')} stopOpacity="0" />
                </radialGradient>
              </defs>

              <g className={styles.contours} aria-hidden="true">
                {[0.28, 0.46, 0.64, 0.82, 0.98].map((s) => (
                  <ellipse
                    key={s}
                    cx={px(-72.5)}
                    cy={py(21.2)}
                    rx={(width - pad.left - pad.right) * s * 0.52}
                    ry={(height - pad.top - pad.bottom) * s * 0.48}
                    className={styles.contour}
                  />
                ))}
              </g>

              <g aria-hidden="true">
                {nodes.map((n) => {
                  const origin = nodes.find((m) => m.short === 'BHS')!;
                  if (n.short === 'BHS') return null;
                  return (
                    <path
                      key={n.short}
                      d={`M ${px(origin.lon)} ${py(origin.lat)} Q ${px((origin.lon + n.lon) / 2)} ${py(Math.max(origin.lat, n.lat) + 1.4)} ${px(n.lon)} ${py(n.lat)}`}
                      className={styles.filament}
                      data-in={inView ? 'true' : 'false'}
                    />
                  );
                })}
              </g>

              {nodes.map((n, i) => {
                const cx = px(n.lon);
                const cy = py(n.lat);
                const r = Math.max(7, n.radius * maxR);
                const priorR = Math.max(
                  5,
                  Math.sqrt(n.prior / Math.max(...nodes.map((m) => m.value))) * maxR,
                );
                const labelRight = n.lon < -68 && cx + r + 160 < width - 8;
                const labelX = labelRight ? cx + r + 12 : cx - r - 12;
                const anchor = labelRight ? 'start' : 'end';
                const growing = n.growth >= 0;

                return (
                  <g
                    key={n.short}
                    className={styles.node}
                    data-in={inView ? 'true' : 'false'}
                    data-active={active === n.short ? 'true' : 'false'}
                    style={{ animationDelay: `${0.08 + i * 0.1}s` }}
                    onPointerEnter={() => setActive(n.short)}
                    onFocus={() => setActive(n.short)}
                    tabIndex={0}
                    role="button"
                    aria-label={`${n.name} ${compact(n.value)}`}
                  >
                    <circle cx={cx} cy={cy} r={r * 2.1} fill="url(#arch-node)" />
                    <circle
                      cx={cx}
                      cy={cy}
                      r={priorR}
                      className={styles.priorRing}
                      stroke={roleColor('gross')}
                    />
                    <circle
                      cx={cx}
                      cy={cy}
                      r={r}
                      className={styles.core}
                      fill={roleColor('gross')}
                      stroke={growing ? directionColor('up') : directionColor('down')}
                    />
                    <ChartLabel x={labelX} y={cy - 2} anchor={anchor} tone="bright" size="sm">
                      {n.name}
                    </ChartLabel>
                    <ValueLabel x={labelX} y={cy + 14} anchor={anchor} size="sm">
                      ${compact(n.value)}
                    </ValueLabel>
                    <text
                      x={labelX}
                      y={cy + 28}
                      textAnchor={anchor}
                      className={styles.growth}
                      data-dir={growing ? 'up' : 'down'}
                    >
                      {signedPercent(n.growth, 1)}
                    </text>
                  </g>
                );
              })}
            </svg>
          );
        }}
      </ChartFrame>

      <div className={styles.readout}>
        <span className="eyebrow">{selected.name}</span>
        <p className={styles.readoutValue} style={{ color: roleColor('gross') }}>
          ${compact(selected.value)}
        </p>
        <p className={styles.readoutMeta}>
          <span data-dir={selected.growth >= 0 ? 'up' : 'down'}>{signedPercent(selected.growth, 1)}</span>
          <span>{percent(selected.share, 1)} of book</span>
        </p>
      </div>
    </div>
  );
}
