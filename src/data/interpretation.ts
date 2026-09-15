/**
 * The interpretation register.
 *
 * Every editorial claim made anywhere in this report is declared here, with
 * the figures it rests on. Nothing in this file is a fact from the audited
 * statements; it is a reading of them. The UI renders these in a distinct
 * voice and the "Facts only" control removes them entirely.
 *
 * Interpretations are barred from chart titles, axis labels and figure tiles.
 */

import type { Interpretation } from './types';

export const thesis = {
  headline: 'Growth accelerated, protection became more expensive, and RoyalStar retained more of the earnings it still produced.',
  basis: [
    'premiumsWritten',
    'insuranceRevenue',
    'netReinsuranceExpenses',
    'insuranceServiceResult',
    'netIncome',
    'retainedEarnings',
    'totalEquity',
  ],
} as const;

export const interpretations: readonly Interpretation[] = [
  {
    id: 'growthConcentrated',
    text: 'Growth was concentrated rather than uniform. Turks & Caicos and the Cayman Islands expanded sharply while the British Virgin Islands and Anguilla contracted, which reads less like a book simply getting bigger and more like one being actively reshaped.',
    basis: ['premiumsWritten'],
  },
  {
    id: 'protectionCostlier',
    text: 'Protection became more expensive. The charge for reinsurance grew faster than the revenue it protects, and that is why double-digit revenue growth produced an almost flat insurance service result.',
    basis: ['insuranceRevenue', 'netReinsuranceExpenses', 'insuranceServiceResult'],
  },
  {
    id: 'earningsAttribution',
    text: 'The decline in net income is not a reinsurance story. Reinsurance explains why the insurance service result barely moved; the fall in net income is dominated by a single line below it, other operating expenses. Dividends, which fell far more sharply, are a distribution of earnings and had no effect on net income at all.',
    basis: ['netIncome', 'otherOperatingExpenses', 'insuranceServiceResult', 'ordinaryDividends'],
  },
  {
    id: 'triangleEvidence',
    text: 'The claims development disclosure is the clearest evidence in the document that the reinsurance structure performs as intended. Across ten accident years the gross and net columns diverge by an order of magnitude, and in 2019 they diverge by nearly two.',
    basis: ['grossUltimateTotal', 'netUltimateTotal', 'ay2019GrossCurrent', 'ay2019NetCurrent'],
  },
  {
    id: 'developmentAsymmetry',
    text: 'The asymmetry between the two triangles is worth pausing on. Several accident years developed adversely gross of reinsurance while developing favourably net of it, which suggests the structure absorbed not only losses but a share of the error in estimating them.',
    basis: ['grossUltimateTotal', 'netUltimateTotal'],
  },
  {
    id: 'capitalRetention',
    text: 'The company retained more of what it earned. A smaller distribution left materially more capital inside the business, lifting equity and book value per ordinary share even in a year when earnings edged down.',
    basis: ['ordinaryDividends', 'retainedEarnings', 'totalEquity', 'bookValuePerOrdinaryShare'],
  },
  {
    id: 'climateContext',
    text: 'The statements themselves set the context for all of this: management believes climatic change is making extreme weather more frequent and the resulting damage more severe. In that setting, the cost of protection is the cost of continuing to underwrite.',
    basis: ['netReinsuranceExpenses'],
  },
  {
    id: 'operatingLeverage',
    text: 'Thirty-four people, unchanged from the prior year, stand behind a book of this size. Whatever else the numbers say, the operation is unusually concentrated.',
    basis: ['employees', 'premiumsWritten'],
  },
];

export function interpretation(id: string): Interpretation {
  const found = interpretations.find((i) => i.id === id);
  if (!found) throw new Error(`Unknown interpretation: ${id}`);
  return found;
}
