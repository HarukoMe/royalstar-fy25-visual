/**
 * The epistemic model.
 *
 * Every number in this report belongs to exactly one of three tiers, and the
 * tier is carried in the type system rather than in a comment:
 *
 *   reported       a figure printed in the audited statements, with a citation
 *   calculated     a metric we derive, with its definition and its inputs
 *   interpretation an editorial claim, with the figures it rests on
 *
 * Reported figures are authored once. Calculated figures are computed at
 * runtime from reported inputs so a formula and its displayed result cannot
 * drift apart. Interpretations must declare a basis.
 */

/** Where a reported figure appears in the audited statements. */
export interface Citation {
  /** e.g. "Note 13 — Claims Development" */
  readonly statement: string;
  /** Page number as printed on the statement page. */
  readonly printedPage: number;
  /** Corresponding page in the source PDF (printed + 1 throughout). */
  readonly pdfPage: number;
}

export type Provenance =
  | { readonly tier: 'reported'; readonly citation: Citation }
  | {
      readonly tier: 'calculated';
      /** Prose definition, precise enough to rebuild the number. */
      readonly definition: string;
      /** Human-readable expression. */
      readonly expression: string;
      readonly inputs: readonly string[];
    }
  | {
      readonly tier: 'interpretation';
      readonly basis: readonly string[];
    };

/**
 * Semantic data roles. These are the only legitimate source of data colour.
 *
 *   gross       pre-risk-transfer flows and positions
 *   ceded       amounts transferred to, or held with, reinsurers
 *   retained    post-cession amounts remaining with RoyalStar, and equity
 *   operating   expense and administrative flows, neither gross-risk nor ceded
 *   investment  non-underwriting income and investment assets
 *
 * Gold (--role-retained) is reachable only through `retained`. A test asserts
 * that no figure tagged gross or ceded can resolve to the gold token.
 */
export type SemanticRole = 'gross' | 'ceded' | 'retained' | 'operating' | 'investment';

export type Unit = 'BSD' | 'BSD000' | 'ratio' | 'perShare' | 'count' | 'percent';

export interface Figure {
  readonly id: string;
  readonly value: number;
  readonly unit: Unit;
  /** Short label for tiles and axes. */
  readonly label: string;
  readonly role: SemanticRole;
  readonly provenance: Provenance;
  /** Prior-year comparative, where the statements present one. */
  readonly prior?: number;
}

export interface Interpretation {
  readonly id: string;
  readonly text: string;
  readonly basis: readonly string[];
}

export const FISCAL = { current: 2025, prior: 2024 } as const;

export function isReported(f: Figure): boolean {
  return f.provenance.tier === 'reported';
}

export function isCalculated(f: Figure): boolean {
  return f.provenance.tier === 'calculated';
}

/** Year-over-year change, absolute and proportional, or null where no comparative exists. */
export function delta(f: Figure): { abs: number; pct: number } | null {
  if (f.prior === undefined || f.prior === 0) return null;
  return { abs: f.value - f.prior, pct: (f.value - f.prior) / Math.abs(f.prior) };
}
