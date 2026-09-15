/**
 * The colour grammar, as enforceable code.
 *
 * Gold (--role-retained) is reachable only through the `retained` role. A
 * figure describing a gross flow or a ceded amount cannot resolve to gold,
 * because chart components receive a SemanticRole and never a colour, and
 * this module is the only mapping from role to token.
 *
 * src/tests/colorGrammar.test.ts asserts the invariant.
 */

import type { SemanticRole } from './types';

export interface RoleTokens {
  /** Primary fill / stroke. */
  readonly base: string;
  /** Low-luminance companion, for ramps, fills beneath lines and inactive states. */
  readonly low: string;
  /** Elevated companion, for emphasis. Only `retained` defines a distinct one. */
  readonly high: string;
  readonly label: string;
  readonly meaning: string;
}

export const ROLE_TOKENS: Readonly<Record<SemanticRole, RoleTokens>> = {
  gross: {
    base: 'var(--role-gross)',
    low: 'var(--role-gross-lo)',
    high: 'var(--role-gross)',
    label: 'Gross',
    meaning: 'Amounts before risk transfer — what RoyalStar underwrites',
  },
  ceded: {
    base: 'var(--role-ceded)',
    low: 'var(--role-ceded-lo)',
    high: 'var(--role-ceded)',
    label: 'Ceded',
    meaning: 'Amounts transferred to, or held with, reinsurers',
  },
  retained: {
    base: 'var(--role-retained)',
    low: 'var(--role-retained-lo)',
    high: 'var(--role-retained-hi)',
    label: 'Retained',
    meaning: 'What remains with RoyalStar after risk transfer, and its equity',
  },
  operating: {
    base: 'var(--role-operating)',
    low: 'var(--role-operating-lo)',
    high: 'var(--role-operating)',
    label: 'Operating',
    meaning: 'Expense and administrative flows',
  },
  investment: {
    base: 'var(--role-investment)',
    low: 'var(--role-investment-lo)',
    high: 'var(--role-investment)',
    label: 'Investment',
    meaning: 'Non-underwriting income and investment assets',
  },
};

/** The only sanctioned path from a semantic role to a colour. */
export function roleColor(role: SemanticRole, variant: 'base' | 'low' | 'high' = 'base'): string {
  return ROLE_TOKENS[role][variant];
}

/**
 * Direction of change. Distinct from the role tokens on purpose: a movement
 * being favourable or adverse is not the same kind of fact as an amount being
 * gross, ceded or retained, and must not borrow those colours.
 */
export type Direction = 'up' | 'down';

const DIRECTION_TOKENS: Readonly<Record<Direction, string>> = {
  up: 'var(--dir-up)',
  down: 'var(--dir-down)',
};

export function directionColor(direction: Direction): string {
  return DIRECTION_TOKENS[direction];
}

/** The gold token, for the assertion in the colour-grammar test. */
export const GOLD_TOKENS = ['var(--role-retained)', '#c9a227', '#e8cc6a', 'var(--role-retained-hi)'];

/** Roles that may never resolve to gold. */
export const NON_RETAINED_ROLES: readonly SemanticRole[] = [
  'gross',
  'ceded',
  'operating',
  'investment',
];

/** Legend entries for the grammar tutorial in the overture. */
export const GRAMMAR_LEGEND: readonly SemanticRole[] = ['gross', 'ceded', 'retained'];
