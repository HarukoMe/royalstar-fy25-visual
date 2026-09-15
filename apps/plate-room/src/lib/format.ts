/**
 * Number formatting. The only module permitted to reach for d3-format;
 * components format exclusively through the <Figure> primitive.
 */

import { format } from 'd3-format';
import type { Unit } from '@/data/types';

const grouped = format(',.0f');
const groupedCents = format(',.2f');
const oneDp = format('.1f');
const twoDp = format('.2f');

/** Full precision, as presented in the statements: unrounded, grouped. */
export function exact(value: number): string {
  const sign = value < 0 ? '(' : '';
  const close = value < 0 ? ')' : '';
  return `${sign}${grouped(Math.abs(value))}${close}`;
}

/** Abbreviated for display at large type sizes. */
export function compact(value: number): string {
  const abs = Math.abs(value);
  const sign = value < 0 ? '−' : '';
  if (abs >= 1_000_000_000) return `${sign}${twoDp(abs / 1_000_000_000)}bn`;
  if (abs >= 1_000_000) return `${sign}${oneDp(abs / 1_000_000)}m`;
  if (abs >= 1_000) return `${sign}${grouped(abs / 1_000)}k`;
  return `${sign}${grouped(abs)}`;
}

export function percent(value: number, dp = 2): string {
  return `${format(`.${dp}f`)(value * 100)}%`;
}

export function signedPercent(value: number, dp = 2): string {
  const s = format(`+.${dp}f`)(value * 100);
  return `${s.replace('-', '−')}%`;
}

export function signedExact(value: number): string {
  const s = grouped(Math.abs(value));
  return `${value < 0 ? '−' : '+'}${s}`;
}

export function perShare(value: number): string {
  return `$${groupedCents(value)}`;
}

export function formatUnit(value: number, unit: Unit, mode: 'exact' | 'compact' = 'exact'): string {
  switch (unit) {
    case 'BSD':
      return mode === 'compact' ? compact(value) : exact(value);
    case 'BSD000':
      return `${grouped(value)}`;
    case 'ratio':
      return percent(value);
    case 'percent':
      return percent(value / 100);
    case 'perShare':
      return perShare(value);
    case 'count':
      return grouped(value);
  }
}

/** Unit prefix shown alongside a figure, where one applies. */
export function unitPrefix(unit: Unit): string {
  return unit === 'BSD' || unit === 'BSD000' ? '$' : '';
}

export function unitSuffix(unit: Unit): string {
  return unit === 'BSD000' ? ' thousand' : '';
}
