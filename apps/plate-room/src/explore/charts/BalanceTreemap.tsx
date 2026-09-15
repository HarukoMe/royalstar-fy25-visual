import { useMemo } from 'react';
import { reported } from '@/data/reported';
import { roleColor } from '@/data/roles';
import { compact, percent } from '@/lib/format';
import type { SemanticRole } from '@/data/types';
import { useInView } from '@/hooks/useInView';
import { ChartFrame, RoleLegend } from '@/components/charts/chartkit';
import styles from './BalanceTreemap.module.css';

/**
 * Area-accurate treemap of the balance sheet. Implemented with a squarified
 * slice-and-dice so we do not pull in d3-hierarchy for a two-level layout.
 *
 * Roles are assigned from the data layer, so the reinsurance asset renders
 * violet (a ceded position, notwithstanding that it is an asset), insurance
 * contract liabilities render blue, and equity renders gold.
 */

interface Item {
  readonly id: string;
  readonly label: string;
  readonly value: number;
  readonly role: SemanticRole;
}

interface Rect extends Item {
  x: number;
  y: number;
  w: number;
  h: number;
}

function squarify(items: readonly Item[], x: number, y: number, w: number, h: number): Rect[] {
  const total = items.reduce((s, i) => s + i.value, 0);
  if (total <= 0 || items.length === 0) return [];

  const out: Rect[] = [];
  let rest = [...items].sort((a, b) => b.value - a.value);
  let cx = x;
  let cy = y;
  let cw = w;
  let ch = h;

  while (rest.length > 0) {
    const remaining = rest.reduce((s, i) => s + i.value, 0);
    const horizontal = cw >= ch;
    // Take a run of items whose aspect ratios stay reasonable.
    let run: Item[] = [];
    let runSum = 0;
    let bestRatio = Infinity;

    for (const item of rest) {
      const trySum = runSum + item.value;
      const frac = trySum / remaining;
      const bandThickness = horizontal ? cw * frac : ch * frac;
      const along = horizontal ? ch : cw;
      const worst = Math.max(
        ...[...run, item].map((it) => {
          const side = (it.value / trySum) * along;
          return Math.max(bandThickness / side, side / bandThickness);
        }),
      );
      if (worst > bestRatio && run.length > 0) break;
      bestRatio = worst;
      run = [...run, item];
      runSum = trySum;
    }

    const frac = runSum / remaining;
    const bandThickness = horizontal ? cw * frac : ch * frac;
    let offset = 0;
    for (const it of run) {
      const side = (it.value / runSum) * (horizontal ? ch : cw);
      out.push(
        horizontal
          ? { ...it, x: cx, y: cy + offset, w: bandThickness, h: side }
          : { ...it, x: cx + offset, y: cy, w: side, h: bandThickness },
      );
      offset += side;
    }

    if (horizontal) {
      cx += bandThickness;
      cw -= bandThickness;
    } else {
      cy += bandThickness;
      ch -= bandThickness;
    }
    rest = rest.slice(run.length);
  }

  return out;
}

const ASSET_IDS = [
  'reinsuranceContractAssets',
  'termDeposits',
  'investmentsFvtpl',
  'dueFromAgents',
  'propertyAndEquipment',
  'cash',
  'investmentsAmortised',
  'investmentProperty',
  'prepayments',
] as const;

export function BalanceTreemap() {
  const { ref, inView } = useInView<HTMLDivElement>(0.15);

  const assets = useMemo<Item[]>(
    () =>
      ASSET_IDS.map((id) => {
        const f = reported[id]!;
        return { id: f.id, label: f.label, value: f.value, role: f.role };
      }),
    [],
  );

  const funding = useMemo<Item[]>(() => {
    const icl = reported.insuranceContractLiabilities!;
    const other = reported.otherLiabilities!;
    const eq = reported.totalEquity!;
    return [
      { id: icl.id, label: icl.label, value: icl.value, role: icl.role },
      { id: other.id, label: other.label, value: other.value, role: other.role },
      { id: eq.id, label: eq.label, value: eq.value, role: eq.role },
    ];
  }, []);

  const total = reported.totalAssets!.value;

  return (
    <div ref={ref}>
      <ChartFrame
        title="Balance sheet composition, 31 December 2025"
        description="Consolidated Balance Sheet, printed pages 5 and 6. Rectangle area is proportional to carrying amount."
        minHeight={360}
      >
        {(width) => {
          const isNarrow = width < 760;
          const gap = 2;
          const colGap = isNarrow ? 0 : 24;
          const height = isNarrow ? 640 : 400;
          const colW = isNarrow ? width : (width - colGap) * 0.62;
          const col2W = isNarrow ? width : width - colW - colGap;
          const headH = 26;
          const bodyH = isNarrow ? (height - colGap - headH * 2) / 2 : height - headH;

          const assetRects = squarify(assets, 0, 0, colW, bodyH);
          const fundRects = squarify(
            funding,
            0,
            0,
            col2W,
            bodyH,
          );

          const renderGroup = (
            rects: Rect[],
            ox: number,
            oy: number,
            heading: string,
            headingTotal: number,
          ) => (
            <g transform={`translate(${ox}, ${oy})`}>
              <text x={0} y={14} className={styles.groupHead}>
                {heading}
              </text>
              <text x={0} y={14} className={styles.groupTotal} textAnchor="end" transform={`translate(${rects.length ? (heading === 'ASSETS' ? colW : col2W) : 0}, 0)`}>
                {`$${compact(headingTotal)}`}
              </text>
              <g transform={`translate(0, ${headH})`}>
                {rects.map((r, i) => {
                  const showLabel = r.w > 78 && r.h > 34;
                  const showValue = r.w > 78 && r.h > 52;
                  return (
                    <g
                      key={r.id}
                      className={styles.tile}
                      data-in={inView ? 'true' : 'false'}
                      style={{ animationDelay: `${i * 55}ms` }}
                    >
                      <rect
                        x={r.x + gap / 2}
                        y={r.y + gap / 2}
                        width={Math.max(0, r.w - gap)}
                        height={Math.max(0, r.h - gap)}
                        fill={roleColor(r.role)}
                        fillOpacity={0.2}
                        stroke={roleColor(r.role)}
                        strokeOpacity={0.6}
                        strokeWidth={1}
                      />
                      {showLabel && (
                        <foreignObject
                          x={r.x + 8}
                          y={r.y + 7}
                          width={Math.max(0, r.w - 16)}
                          height={Math.max(0, r.h - 14)}
                        >
                          <div className={styles.tileLabel}>
                            <span>{r.label}</span>
                            {showValue && (
                              <>
                                <em>${compact(r.value)}</em>
                                <i>{percent(r.value / total, 1)}</i>
                              </>
                            )}
                          </div>
                        </foreignObject>
                      )}
                      <title>{`${r.label}: $${compact(r.value)} (${percent(r.value / total, 1)} of total assets)`}</title>
                    </g>
                  );
                })}
              </g>
            </g>
          );

          return (
            <svg
              width={width}
              height={height}
              viewBox={`0 0 ${width} ${height}`}
              role="img"
              aria-label="Treemap of the balance sheet"
            >
              {renderGroup(assetRects, 0, 0, 'ASSETS', total)}
              {renderGroup(
                fundRects,
                isNarrow ? 0 : colW + colGap,
                isNarrow ? bodyH + headH + colGap : 0,
                'LIABILITIES AND EQUITY',
                total,
              )}
            </svg>
          );
        }}
      </ChartFrame>
      <div className={styles.legendRow}>
        <RoleLegend
          items={[
            { color: roleColor('ceded'), label: 'Ceded — reinsurance asset' },
            { color: roleColor('gross'), label: 'Gross — insurance liabilities' },
            { color: roleColor('retained'), label: 'Retained — equity' },
            { color: roleColor('investment'), label: 'Investment assets' },
            { color: roleColor('operating'), label: 'Operating assets' },
          ]}
        />
      </div>
    </div>
  );
}
