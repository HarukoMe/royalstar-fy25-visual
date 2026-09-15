import { calculated } from './calculated';
import { reported } from './reported';
import type { Figure } from './types';

export * from './types';
export * from './roles';
export * from './reported';
export * from './calculated';
export * from './claims';
export * from './interpretation';

/** Every figure in the report, reported and calculated, by id. */
export const figures: Readonly<Record<string, Figure>> = { ...reported, ...calculated };

export function figure(id: string): Figure {
  const f = figures[id];
  if (!f) throw new Error(`Unknown figure: ${id}`);
  return f;
}

export const figureIds = Object.keys(figures);
