/**
 * Calculated figures.
 *
 * Every metric here is computed at runtime from `reported` inputs, so a
 * formula and its displayed result cannot drift apart. Each carries a prose
 * definition precise enough for a reader to rebuild the number, and each
 * declares its inputs so the provenance tooltip can cite them individually.
 *
 * Labelling discipline: these are ratios of named reported lines. None of
 * them is presented as a conventional P&C metric, because the audited
 * statements do not present one. In particular there is deliberately no
 * "combined ratio" here — that term implies a construction the accounting
 * presentation does not support.
 */

import { geography, productLines, reported } from './reported';
import { grossTriangle, netTriangle } from './claims';
import type { Figure, SemanticRole, Unit } from './types';

function fig(
  id: string,
  value: number,
  label: string,
  role: SemanticRole,
  definition: string,
  expression: string,
  inputs: readonly string[],
  unit: Unit,
  prior?: number,
): Figure {
  return {
    id,
    value,
    unit,
    label,
    role,
    provenance: { tier: 'calculated', definition, expression, inputs },
    ...(prior !== undefined ? { prior } : {}),
  };
}

const r = reported;

function val(id: string): number {
  const f = r[id];
  if (!f) throw new Error(`Unknown reported figure: ${id}`);
  return f.value;
}
function pri(id: string): number {
  const f = r[id];
  if (!f || f.prior === undefined) throw new Error(`No comparative for reported figure: ${id}`);
  return f.prior;
}

/* ---- The revenue-increase decomposition (Movement 03, stage A) ----
 * The three reported movements sum exactly to the change in the reported
 * insurance service result. This is arithmetic, not attribution.        */

const revenueIncrease = val('insuranceRevenue') - pri('insuranceRevenue');
const reinsuranceIncrease = Math.abs(val('netReinsuranceExpenses')) - Math.abs(pri('netReinsuranceExpenses'));
const serviceExpenseIncrease =
  Math.abs(val('insuranceServiceExpenses')) - Math.abs(pri('insuranceServiceExpenses'));
const serviceResultIncrease = val('insuranceServiceResult') - pri('insuranceServiceResult');

/* ---- The net income bridge (Movement 03, stage B) ---- */

export interface BridgeStep {
  readonly id: string;
  readonly label: string;
  readonly change: number;
  readonly role: SemanticRole;
}

export const netIncomeBridge: readonly BridgeStep[] = (
  [
    ['insuranceServiceResult', 'Insurance service result', 'retained'],
    ['netInvestmentIncome', 'Net investment income', 'investment'],
    ['netInsuranceFinanceExpenses', 'Net insurance finance expenses', 'operating'],
    ['rentalAndOtherIncome', 'Rental and other income', 'investment'],
    ['otherIncome', 'Other income', 'investment'],
    ['otherOperatingExpenses', 'Other operating expenses', 'operating'],
    ['interestExpense', 'Interest expense', 'operating'],
  ] as const
).map(([id, label, role]) => {
  const f = r[id];
  if (!f) throw new Error(`Unknown reported figure: ${id}`);
  return { id, label, change: f.value - (f.prior ?? 0), role: role as SemanticRole };
});

export const revenueDecomposition = [
  {
    id: 'revenueIncrease',
    label: 'Increase in insurance revenue',
    value: revenueIncrease,
    role: 'gross' as SemanticRole,
  },
  {
    id: 'reinsuranceOffset',
    label: 'Offset by higher net expenses from reinsurance contracts held',
    value: -reinsuranceIncrease,
    role: 'ceded' as SemanticRole,
  },
  {
    id: 'serviceExpenseOffset',
    label: 'Offset by higher insurance service expenses',
    value: -serviceExpenseIncrease,
    role: 'operating' as SemanticRole,
  },
  {
    id: 'serviceResultRemainder',
    label: 'Increase in insurance service result',
    value: serviceResultIncrease,
    role: 'retained' as SemanticRole,
  },
] as const;

/* ---- Claims development aggregates ---- */

const grossUltimate = val('grossUltimateTotal');
const netUltimate = val('netUltimateTotal');

export const calculated: Record<string, Figure> = {
  revenueIncrease: fig(
    'revenueIncrease',
    revenueIncrease,
    'Increase in insurance revenue',
    'gross',
    'The year-over-year increase in insurance revenue as reported in the consolidated statement of comprehensive income.',
    'insurance revenue 2025 − insurance revenue 2024',
    ['insuranceRevenue'],
    'BSD',
  ),

  reinsuranceExpenseIncrease: fig(
    'reinsuranceExpenseIncrease',
    reinsuranceIncrease,
    'Increase in net expenses from reinsurance contracts held',
    'ceded',
    'The year-over-year increase in the charge for net expenses from reinsurance contracts held.',
    'net expenses from reinsurance contracts held 2025 − 2024',
    ['netReinsuranceExpenses'],
    'BSD',
  ),

  serviceExpenseIncrease: fig(
    'serviceExpenseIncrease',
    serviceExpenseIncrease,
    'Increase in insurance service expenses',
    'operating',
    'The year-over-year increase in insurance service expenses.',
    'insurance service expenses 2025 − 2024',
    ['insuranceServiceExpenses'],
    'BSD',
  ),

  revenueIncreaseOffsetByReinsurance: fig(
    'revenueIncreaseOffsetByReinsurance',
    reinsuranceIncrease / revenueIncrease,
    'Share of the increase in insurance revenue offset by the increase in net expenses from reinsurance contracts held',
    'ceded',
    'The increase in net expenses from reinsurance contracts held, divided by the increase in insurance revenue. Both movements are differences between reported lines in the consolidated statement of comprehensive income.',
    '(reinsurance expense 2025 − 2024) ÷ (insurance revenue 2025 − 2024)',
    ['netReinsuranceExpenses', 'insuranceRevenue'],
    'ratio',
  ),

  serviceResultMargin: fig(
    'serviceResultMargin',
    val('insuranceServiceResult') / val('insuranceRevenue'),
    'Insurance service result as a percentage of insurance revenue',
    'retained',
    'The reported insurance service result divided by reported insurance revenue. This is a ratio of two reported lines and is not a conventional underwriting margin.',
    'insurance service result ÷ insurance revenue',
    ['insuranceServiceResult', 'insuranceRevenue'],
    'ratio',
    pri('insuranceServiceResult') / pri('insuranceRevenue'),
  ),

  reinsuranceToRevenue: fig(
    'reinsuranceToRevenue',
    Math.abs(val('netReinsuranceExpenses')) / val('insuranceRevenue'),
    'Net expenses from reinsurance contracts held as a percentage of insurance revenue',
    'ceded',
    'The reported charge for net expenses from reinsurance contracts held, divided by reported insurance revenue. A ratio of two reported lines under the IFRS 17 presentation; it is not a premium cession rate and should not be read as one.',
    'net expenses from reinsurance contracts held ÷ insurance revenue',
    ['netReinsuranceExpenses', 'insuranceRevenue'],
    'ratio',
    Math.abs(pri('netReinsuranceExpenses')) / pri('insuranceRevenue'),
  ),

  serviceExpenseToRevenue: fig(
    'serviceExpenseToRevenue',
    Math.abs(val('insuranceServiceExpenses')) / val('insuranceRevenue'),
    'Insurance service expenses as a percentage of insurance revenue',
    'operating',
    'Reported insurance service expenses divided by reported insurance revenue.',
    'insurance service expenses ÷ insurance revenue',
    ['insuranceServiceExpenses', 'insuranceRevenue'],
    'ratio',
    Math.abs(pri('insuranceServiceExpenses')) / pri('insuranceRevenue'),
  ),

  netToGrossUltimate: fig(
    'netToGrossUltimate',
    netUltimate / grossUltimate,
    'Net ultimate claims as a percentage of gross ultimate claims, accident years 2016–2025',
    'retained',
    'The current estimate of cumulative claims net of reinsurance, divided by the current estimate of cumulative claims gross of reinsurance, for all accident years presented in Note 13.',
    'net current estimate ÷ gross current estimate',
    ['netUltimateTotal', 'grossUltimateTotal'],
    'ratio',
  ),

  cededUltimate: fig(
    'cededUltimate',
    grossUltimate - netUltimate,
    'Difference between gross and net ultimate claims, accident years 2016–2025',
    'ceded',
    'The current estimate of cumulative claims gross of reinsurance less the equivalent net estimate, for all accident years presented in Note 13. It represents the portion of estimated ultimate claims borne by reinsurers.',
    'gross current estimate − net current estimate',
    ['grossUltimateTotal', 'netUltimateTotal'],
    'BSD',
  ),

  cededUltimateShare: fig(
    'cededUltimateShare',
    (grossUltimate - netUltimate) / grossUltimate,
    'Portion of gross ultimate claims borne by reinsurers, accident years 2016–2025',
    'ceded',
    'Gross less net current estimate of cumulative claims, divided by the gross current estimate, for all accident years presented in Note 13.',
    '(gross − net) ÷ gross',
    ['grossUltimateTotal', 'netUltimateTotal'],
    'ratio',
  ),

  ay2019NetToGross: fig(
    'ay2019NetToGross',
    val('ay2019NetCurrent') / val('ay2019GrossCurrent'),
    'Accident year 2019 — net ultimate claims as a percentage of gross',
    'retained',
    'The current estimate of cumulative claims for accident year 2019 net of reinsurance, divided by the equivalent gross estimate.',
    'net 2019 current estimate ÷ gross 2019 current estimate',
    ['ay2019NetCurrent', 'ay2019GrossCurrent'],
    'ratio',
  ),

  ay2019Ceded: fig(
    'ay2019Ceded',
    val('ay2019GrossCurrent') - val('ay2019NetCurrent'),
    'Accident year 2019 — difference between gross and net ultimate claims',
    'ceded',
    'The current estimate of cumulative claims for accident year 2019 gross of reinsurance, less the equivalent net estimate.',
    'gross 2019 − net 2019',
    ['ay2019GrossCurrent', 'ay2019NetCurrent'],
    'BSD',
  ),

  ay2019GrossToAssets: fig(
    'ay2019GrossToAssets',
    val('ay2019GrossCurrent') / val('totalAssets'),
    'Accident year 2019 gross ultimate claims as a multiple of total assets',
    'gross',
    'The current estimate of cumulative claims for accident year 2019 gross of reinsurance, divided by total assets as at 31 December 2025.',
    'gross 2019 current estimate ÷ total assets',
    ['ay2019GrossCurrent', 'totalAssets'],
    'ratio',
  ),

  lossRatioShockAbsorbed: fig(
    'lossRatioShockAbsorbed',
    1 - 2_008_418 / 8_282_245,
    'Portion of the disclosed 5% loss ratio sensitivity not borne net of reinsurance',
    'ceded',
    'One less the net-of-reinsurance impact divided by the gross-of-reinsurance impact, for the 5% loss ratio increase disclosed in the Note 19(d) sensitivity analysis.',
    '1 − (net impact ÷ gross impact)',
    ['sensitivities.lossRatio'],
    'ratio',
    1 - 2_046_166 / 7_508_314,
  ),

  returnOnAverageEquity: fig(
    'returnOnAverageEquity',
    val('netIncome') / ((val('totalEquity') + pri('totalEquity')) / 2),
    'Return on average total equity',
    'retained',
    'Net income divided by the average of opening and closing total equity.',
    'net income ÷ ((opening equity + closing equity) ÷ 2)',
    ['netIncome', 'totalEquity'],
    'ratio',
    pri('netIncome') / ((pri('totalEquity') + val('equityOpening2024')) / 2),
  ),

  bookValuePerOrdinaryShare: fig(
    'bookValuePerOrdinaryShare',
    (val('totalEquity') - val('preferenceShares')) / val('ordinarySharesCount'),
    'Total equity less preference share capital, per ordinary share',
    'retained',
    'Total equity less the par value of issued preference share capital, divided by the 10,000,000 ordinary shares issued and fully paid.',
    '(total equity − preference share capital) ÷ ordinary shares',
    ['totalEquity', 'preferenceShares', 'ordinarySharesCount'],
    'perShare',
    (pri('totalEquity') - pri('preferenceShares')) / pri('ordinarySharesCount'),
  ),

  earningsPerOrdinaryShare: fig(
    'earningsPerOrdinaryShare',
    (val('netIncome') + val('preferenceDividends')) / val('ordinarySharesCount'),
    'Net income less preference dividends, per ordinary share',
    'retained',
    'Net income less dividends declared on preference shares, divided by the 10,000,000 ordinary shares issued and fully paid. The statements do not present an earnings per share figure.',
    '(net income − preference dividends) ÷ ordinary shares',
    ['netIncome', 'preferenceDividends', 'ordinarySharesCount'],
    'perShare',
    (pri('netIncome') + pri('preferenceDividends')) / pri('ordinarySharesCount'),
  ),

  ordinaryPayoutRatio: fig(
    'ordinaryPayoutRatio',
    Math.abs(val('ordinaryDividends')) / (val('netIncome') + val('preferenceDividends')),
    'Ordinary dividends declared as a percentage of net income less preference dividends',
    'retained',
    'Dividends declared on ordinary shares divided by net income less dividends declared on preference shares. Dividends are a distribution of earnings and do not affect net income.',
    'ordinary dividends ÷ (net income − preference dividends)',
    ['ordinaryDividends', 'netIncome', 'preferenceDividends'],
    'ratio',
    Math.abs(pri('ordinaryDividends')) / (pri('netIncome') + pri('preferenceDividends')),
  ),

  retainedEarningsIncrease: fig(
    'retainedEarningsIncrease',
    val('retainedEarnings') - pri('retainedEarnings'),
    'Increase in retained earnings',
    'retained',
    'Closing retained earnings less opening retained earnings, being net income less dividends declared in the year.',
    'retained earnings 2025 − retained earnings 2024',
    ['retainedEarnings'],
    'BSD',
  ),

  equityToAssets: fig(
    'equityToAssets',
    val('totalEquity') / val('totalAssets'),
    'Total equity as a percentage of total assets',
    'retained',
    'Total equity divided by total assets.',
    'total equity ÷ total assets',
    ['totalEquity', 'totalAssets'],
    'ratio',
    pri('totalEquity') / pri('totalAssets'),
  ),

  catastropheCapAmount: fig(
    'catastropheCapAmount',
    0.1 * val('totalEquity'),
    'Ten per cent of total equity',
    'retained',
    'Ten per cent of total equity as at 31 December 2025. Note 19 states that reinsurance coverage is designed to limit the impact of claims related to any single event and/or catastrophe to approximately this proportion of total equity.',
    '10% × total equity',
    ['totalEquity'],
    'BSD',
  ),

  fvtplUnrealisedSurplus: fig(
    'fvtplUnrealisedSurplus',
    val('investmentsFvtpl') - val('fvtplCost'),
    'Excess of FVTPL carrying amount over cost',
    'investment',
    'The carrying amount of financial assets at fair value through profit or loss, less their disclosed cost.',
    'FVTPL carrying amount − FVTPL cost',
    ['investmentsFvtpl', 'fvtplCost'],
    'BSD',
    pri('investmentsFvtpl') - pri('fvtplCost'),
  ),

  premiumPerEmployee: fig(
    'premiumPerEmployee',
    val('premiumsWritten') / val('employees'),
    'Insurance premiums written per person employed',
    'gross',
    'Insurance premiums written divided by the number of persons employed at the reporting date.',
    'insurance premiums written ÷ persons employed',
    ['premiumsWritten', 'employees'],
    'BSD',
    pri('premiumsWritten') / pri('employees'),
  ),

  liquidAssets: fig(
    'liquidAssets',
    val('cash') + val('termDeposits') + val('totalInvestments'),
    'Cash, term deposits and investments',
    'investment',
    'The sum of cash on hand and at banks, term deposits, and total investments.',
    'cash + term deposits + total investments',
    ['cash', 'termDeposits', 'totalInvestments'],
    'BSD',
    pri('cash') + pri('termDeposits') + pri('totalInvestments'),
  ),

  agentEclCoverage: fig(
    'agentEclCoverage',
    Math.abs(val('agentEcl')) / val('premiumsReceivableGross'),
    'Allowance for expected credit losses as a percentage of gross premiums receivable from agents',
    'operating',
    'The allowance for expected credit losses divided by premiums and taxes receivable from agents before that allowance.',
    'ECL allowance ÷ gross premiums receivable',
    ['agentEcl', 'premiumsReceivableGross'],
    'ratio',
    Math.abs(pri('agentEcl')) / pri('premiumsReceivableGross'),
  ),
};

/* ---- Derived collections ---- */

const premiumsTotal = val('premiumsWritten');
const premiumsTotalPrior = pri('premiumsWritten');

export const geographyShares = geography.map((g) => ({
  ...g,
  share: g.value / premiumsTotal,
  priorShare: g.prior / premiumsTotalPrior,
  growth: (g.value - g.prior) / g.prior,
}));

export const productLineShares = productLines.map((p) => ({
  ...p,
  cededShare: p.ceded / p.gross,
  netShare: p.net / p.gross,
}));

/** Net-to-gross ratio by accident year, for the triangle's retention read-out. */
export const retentionByYear = grossTriangle.map((g, i) => {
  const n = netTriangle[i];
  if (!n) throw new Error(`Triangle length mismatch at index ${i}`);
  return {
    year: g.year,
    gross: g.currentEstimate,
    net: n.currentEstimate,
    ratio: n.currentEstimate / g.currentEstimate,
  };
});

export function getCalculated(id: string): Figure {
  const f = calculated[id];
  if (!f) throw new Error(`Unknown calculated figure: ${id}`);
  return f;
}
