import { useMemo, useState } from 'react';
import { scaleSqrt } from 'd3-scale';
import { geographyShares } from '@/data/calculated';
import { directionColor, roleColor } from '@/data/roles';
import { compact, percent, signedPercent } from '@/lib/format';
import { ChartFrame, ChartLabel } from './chartkit';
import { DataTable } from '../DataTable';
import styles from './Archipelago.module.css';

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

export function Archipelago() {
  const [active, setActive] = useState<string>('BHS');

  const nodes = useMemo(() => {
    const max = Math.max(...geographyShares.map((g) => g.value));
    const r = scaleSqrt().domain([0, max]).range([8, 42]);
    return LAYOUT.map((l) => {
      const data = geographyShares.find((g) => g.short === l.short);
      if (!data) throw new Error(`No premium data for ${l.short}`);
      return { ...l, ...data, radius: r(data.value) };
    });
  }, []);

  const selected = nodes.find((n) => n.short === active) ?? nodes[0]!;

  return (
    <div className={styles.wrap}>
      <ChartFrame
        title="Insurance premiums written by jurisdiction, 2025"
        description="Note 19 — Risk Management, concentrations of risk, printed page 52. Each meridian is a licence. Disc area is proportional to 2025 premiums written."
        minHeight={360}
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
          const height = 380;
          const pad = { top: 28, right: 8, bottom: 36, left: 8 };
          const inner = width - pad.left - pad.right;
          const col = inner / nodes.length;

          return (
            <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} role="img">
              {nodes.map((n, i) => {
                const x = pad.left + col * (i + 0.5);
                const y = pad.top + 28 + ((26.5 - n.lat) / 9.2) * 220;
                const on = active === n.short;
                return (
                  <g
                    key={n.short}
                    className={styles.node}
                    data-on={on ? 'true' : 'false'}
                    onPointerEnter={() => setActive(n.short)}
                    onFocus={() => setActive(n.short)}
                    tabIndex={0}
                    role="button"
                    aria-label={`${n.name} ${compact(n.value)}`}
                  >
                    <line
                      x1={x}
                      x2={x}
                      y1={pad.top}
                      y2={height - pad.bottom}
                      stroke={roleColor('gross')}
                      strokeOpacity={on ? 0.55 : 0.18}
                    />
                    <circle
                      cx={x}
                      cy={y}
                      r={n.radius}
                      fill={roleColor('gross')}
                      fillOpacity={on ? 0.28 : 0.12}
                      stroke={n.growth >= 0 ? directionColor('up') : directionColor('down')}
                      strokeWidth={on ? 2 : 1}
                    />
                    <ChartLabel x={x} y={height - 14} anchor="middle" tone="dim" size="xs">
                      {n.short}
                    </ChartLabel>
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
