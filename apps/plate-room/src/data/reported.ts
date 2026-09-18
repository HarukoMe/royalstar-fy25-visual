/**
 * Reported figures — transcribed from the audited consolidated financial
 * statements of RoyalStar Assurance Ltd. for the year ended 31 December 2025
 * (PricewaterhouseCoopers, Nassau, unqualified opinion dated 17 April 2026).
 *
 * This is the only file in the project permitted to contain a financial
 * literal. Page references are as printed on the statement page; the source
 * PDF runs one page ahead throughout.
 *
 * All amounts are Bahamian dollars, unrounded, as presented.
 */

import type { Citation, Figure, SemanticRole, Unit } from './types';

const BS: Citation = {
  statement: 'Consolidated Balance Sheet',
  printedPage: 5,
  pdfPage: 6,
};
const BS2: Citation = {
  statement: 'Consolidated Balance Sheet (continued)',
  printedPage: 6,
  pdfPage: 7,
};
const CI: Citation = {
  statement: 'Consolidated Statement of Comprehensive Income',
  printedPage: 7,
  pdfPage: 8,
};
const EQ: Citation = {
  statement: 'Consolidated Statement of Changes in Equity',
  printedPage: 8,
  pdfPage: 9,
};
const CF: Citation = {
  statement: 'Consolidated Statement of Cash Flows',
  printedPage: 9,
  pdfPage: 10,
};
const CF2: Citation = {
  statement: 'Consolidated Statement of Cash Flows (continued)',
  printedPage: 10,
  pdfPage: 11,
};
const N1: Citation = { statement: 'Note 1 — General Information', printedPage: 11, pdfPage: 12 };
const N3: Citation = {
  statement: 'Note 3 — Significant Judgements and Estimates in Applying IFRS 17',
  printedPage: 30,
  pdfPage: 31,
};
const N3B: Citation = {
  statement: 'Note 3 — Significant Judgements and Estimates in Applying IFRS 17',
  printedPage: 31,
  pdfPage: 32,
};
const N5: Citation = { statement: 'Note 5 — Term Deposits', printedPage: 32, pdfPage: 33 };
const N6: Citation = { statement: 'Note 6 — Due from Agents', printedPage: 32, pdfPage: 33 };
const N6B: Citation = {
  statement: 'Note 6 — Due from Agents (continued)',
  printedPage: 33,
  pdfPage: 34,
};
const N7: Citation = { statement: 'Note 7 — Investments', printedPage: 33, pdfPage: 34 };
const N7B: Citation = {
  statement: 'Note 7 — Investments (continued)',
  printedPage: 35,
  pdfPage: 36,
};
const N10: Citation = { statement: 'Note 10 — Investment Property', printedPage: 40, pdfPage: 41 };
const N12: Citation = {
  statement: 'Note 12 — Reconciliation of Insurance and Reinsurance Contracts',
  printedPage: 42,
  pdfPage: 43,
};
const N12R: Citation = {
  statement: 'Note 12 — Reconciliation of Insurance and Reinsurance Contracts',
  printedPage: 44,
  pdfPage: 45,
};
const N13: Citation = { statement: 'Note 13 — Claims Development', printedPage: 46, pdfPage: 47 };
const N13N: Citation = {
  statement: 'Note 13 — Claims Development (net of reinsurance)',
  printedPage: 47,
  pdfPage: 48,
};
const N14: Citation = { statement: 'Note 14 — Expenses by Nature', printedPage: 48, pdfPage: 49 };
const N17: Citation = { statement: 'Note 17 — Employee Benefits', printedPage: 50, pdfPage: 51 };
const N19C: Citation = {
  statement: 'Note 19 — Risk Management, concentrations of risk',
  printedPage: 52,
  pdfPage: 53,
};
const N19R: Citation = {
  statement: 'Note 19 — Risk Management, reinsurance credit risk',
  printedPage: 61,
  pdfPage: 62,
};
const N19L: Citation = {
  statement: 'Note 19 — Risk Management, liquidity risk',
  printedPage: 62,
  pdfPage: 63,
};
const N19M: Citation = {
  statement: 'Note 19 — Risk Management, market risk',
  printedPage: 63,
  pdfPage: 64,
};
const N19S: Citation = {
  statement: 'Note 19 — Risk Management, sensitivity analyses',
  printedPage: 64,
  pdfPage: 65,
};
const N20: Citation = { statement: 'Note 20 — Borrowings', printedPage: 64, pdfPage: 65 };
const N21: Citation = { statement: 'Note 21 — Capital Management', printedPage: 65, pdfPage: 66 };
const N23: Citation = { statement: 'Note 23 — Subsequent Events', printedPage: 65, pdfPage: 66 };

interface Spec {
  readonly value: number;
  readonly prior?: number;
  readonly label: string;
  readonly role: SemanticRole;
  readonly citation: Citation;
  readonly unit?: Unit;
}

function build(specs: Record<string, Spec>): Record<string, Figure> {
  const out: Record<string, Figure> = {};
  for (const [id, s] of Object.entries(specs)) {
    out[id] = {
      id,
      value: s.value,
      unit: s.unit ?? 'BSD',
      label: s.label,
      role: s.role,
      provenance: { tier: 'reported', citation: s.citation },
      ...(s.prior !== undefined ? { prior: s.prior } : {}),
    };
  }
  return out;
}

export const reported = build({
  /* ---- Consolidated Statement of Comprehensive Income (printed p.7) ---- */
  insuranceRevenue: {
    value: 165_644_900,
    prior: 150_166_289,
    label: 'Insurance revenue',
    role: 'gross',
    citation: CI,
  },
  insuranceServiceExpenses: {
    value: -30_977_946,
    prior: -29_097_356,
    label: 'Insurance service expenses',
    role: 'operating',
    citation: CI,
  },
  netReinsuranceExpenses: {
    value: -124_317_638,
    prior: -110_858_399,
    label: 'Net expenses from reinsurance contracts held',
    role: 'ceded',
    citation: CI,
  },
  insuranceServiceResult: {
    value: 10_349_316,
    prior: 10_210_534,
    label: 'Insurance service result',
    role: 'retained',
    citation: CI,
  },
  interestRevenue: {
    value: 1_644_641,
    prior: 1_566_104,
    label: 'Interest revenue from financial assets not measured at FVTPL',
    role: 'investment',
    citation: CI,
  },
  fvtplGains: {
    value: 418_138,
    prior: 462_450,
    label: 'Net gains on investments at FVTPL',
    role: 'investment',
    citation: CI,
  },
  creditImpairmentReversal: {
    value: 0,
    prior: 41_716,
    label: 'Reversal for credit impairment losses',
    role: 'investment',
    citation: CI,
  },
  netInvestmentIncome: {
    value: 2_062_779,
    prior: 2_070_270,
    label: 'Net investment income',
    role: 'investment',
    citation: CI,
  },
  netInsuranceFinanceExpenses: {
    value: -194_000,
    prior: -209_000,
    label: 'Net insurance finance expenses',
    role: 'operating',
    citation: CI,
  },
  netInsuranceAndInvestmentResult: {
    value: 12_218_095,
    prior: 12_071_804,
    label: 'Net insurance and investment result',
    role: 'retained',
    citation: CI,
  },
  rentalAndOtherIncome: {
    value: 254_772,
    prior: 249_020,
    label: 'Rental and other income',
    role: 'investment',
    citation: CI,
  },
  // Presented as a dash in the 2024 column, i.e. nil.
  otherIncome: { value: 9_000, prior: 0, label: 'Other income', role: 'investment', citation: CI },
  otherOperatingExpenses: {
    value: -1_748_597,
    prior: -1_235_310,
    label: 'Other operating expenses',
    role: 'operating',
    citation: CI,
  },
  interestExpense: {
    value: -93_724,
    prior: -122_209,
    label: 'Interest expense',
    role: 'operating',
    citation: CI,
  },
  netIncome: {
    value: 10_639_546,
    prior: 10_963_305,
    label: 'Net income',
    role: 'retained',
    citation: CI,
  },
  totalComprehensiveIncome: {
    value: 10_639_546,
    prior: 10_963_305,
    label: 'Total comprehensive income',
    role: 'retained',
    citation: CI,
  },

  /* ---- Consolidated Balance Sheet (printed p.5–6) ---- */
  cash: {
    value: 6_159_807,
    prior: 7_143_491,
    label: 'Cash on hand and at banks',
    role: 'investment',
    citation: BS,
  },
  termDeposits: {
    value: 27_707_155,
    prior: 26_727_028,
    label: 'Term deposits',
    role: 'investment',
    citation: BS,
  },
  reinsuranceContractAssets: {
    value: 44_837_612,
    prior: 34_242_284,
    label: 'Reinsurance contract assets',
    role: 'ceded',
    citation: BS,
  },
  dueFromAgents: {
    value: 16_820_729,
    prior: 12_478_835,
    label: 'Due from agents',
    role: 'operating',
    citation: BS,
  },
  prepayments: {
    value: 805_083,
    prior: 945_678,
    label: 'Prepayments and other assets',
    role: 'operating',
    citation: BS,
  },
  investmentsFvtpl: {
    value: 27_220_722,
    prior: 20_531_252,
    label: 'Investments — fair value through profit or loss',
    role: 'investment',
    citation: BS,
  },
  investmentsAmortised: {
    value: 4_225_685,
    prior: 6_129_723,
    label: 'Investments — amortized cost',
    role: 'investment',
    citation: BS,
  },
  investmentInAssociate: {
    value: 0,
    prior: 0,
    label: 'Investment in associate',
    role: 'investment',
    citation: BS,
  },
  investmentProperty: {
    value: 3_469_996,
    prior: 3_469_996,
    label: 'Investment property',
    role: 'investment',
    citation: BS,
  },
  propertyAndEquipment: {
    value: 10_659_150,
    prior: 10_425_155,
    label: 'Property and equipment',
    role: 'operating',
    citation: BS,
  },
  totalAssets: {
    value: 141_905_939,
    prior: 122_093_442,
    label: 'Total assets',
    role: 'operating',
    citation: BS,
  },
  insuranceContractLiabilities: {
    value: 71_402_709,
    prior: 58_904_733,
    label: 'Insurance contract liabilities',
    role: 'gross',
    citation: BS,
  },
  accountsPayable: {
    value: 1_133_700,
    prior: 396_225,
    label: 'Accounts payable and accrued expenses',
    role: 'operating',
    citation: BS,
  },
  borrowings: { value: 2_000_000, prior: 2_750_000, label: 'Borrowings', role: 'operating', citation: BS },
  otherLiabilities: {
    value: 3_133_700,
    prior: 3_146_225,
    label: 'Other liabilities',
    role: 'operating',
    citation: BS,
  },
  totalLiabilities: {
    value: 74_536_409,
    prior: 62_050_958,
    label: 'Total liabilities',
    role: 'gross',
    citation: BS,
  },
  ordinaryShares: {
    value: 3_000_000,
    prior: 3_000_000,
    label: 'Ordinary shares',
    role: 'retained',
    citation: BS2,
  },
  preferenceShares: {
    value: 5_000_000,
    prior: 5_000_000,
    label: 'Preference shares',
    role: 'retained',
    citation: BS2,
  },
  contributedSurplus: {
    value: 7_000_000,
    prior: 7_000_000,
    label: 'Contributed surplus',
    role: 'retained',
    citation: BS2,
  },
  revaluationReserve: {
    value: 1_888_449,
    prior: 1_888_449,
    label: 'Revaluation reserve',
    role: 'retained',
    citation: BS2,
  },
  retainedEarnings: {
    value: 50_481_081,
    prior: 43_154_035,
    label: 'Retained earnings',
    role: 'retained',
    citation: BS2,
  },
  totalEquity: {
    value: 67_369_530,
    prior: 60_042_484,
    label: 'Total equity',
    role: 'retained',
    citation: BS2,
  },
  ordinarySharesCount: {
    value: 10_000_000,
    prior: 10_000_000,
    label: 'Ordinary shares issued and fully paid',
    role: 'retained',
    citation: BS2,
    unit: 'count',
  },

  /* ---- Consolidated Statement of Changes in Equity (printed p.8) ---- */
  equityOpening2024: {
    value: 58_514_540,
    label: 'Total equity as at 31 December 2023',
    role: 'retained',
    citation: EQ,
  },
  retainedEarningsOpening2024: {
    value: 41_626_091,
    label: 'Retained earnings as at 31 December 2023',
    role: 'retained',
    citation: EQ,
  },
  preferenceDividends: {
    value: -312_500,
    prior: -312_500,
    label: 'Dividends — preference shares',
    role: 'retained',
    citation: EQ,
  },
  ordinaryDividends: {
    value: -3_000_000,
    prior: -9_122_861,
    label: 'Dividends — ordinary shares',
    role: 'retained',
    citation: EQ,
  },
  totalDividends: {
    value: -3_312_500,
    prior: -9_435_361,
    label: 'Total transactions with owners',
    role: 'retained',
    citation: EQ,
  },
  dividendPerOrdinaryShare: {
    value: 0.3,
    prior: 0.91,
    label: 'Dividends per ordinary share',
    role: 'retained',
    citation: EQ,
    unit: 'perShare',
  },
  dividendPerPreferenceShare: {
    value: 0.63,
    prior: 0.63,
    label: 'Dividends per preference share',
    role: 'retained',
    citation: EQ,
    unit: 'perShare',
  },

  /* ---- Consolidated Statement of Cash Flows (printed p.9–10) ---- */
  cashFromOperating: {
    value: 7_635_725,
    prior: 12_830_205,
    label: 'Net cash from operating activities',
    role: 'operating',
    citation: CF,
  },
  cashUsedInInvesting: {
    value: -4_463_185,
    prior: -12_127_001,
    label: 'Net cash used in investing activities',
    role: 'investment',
    citation: CF,
  },
  cashUsedInFinancing: {
    value: -4_156_224,
    prior: -3_184_709,
    label: 'Net cash used in financing activities',
    role: 'retained',
    citation: CF2,
  },
  netDecreaseInCash: {
    value: -983_684,
    prior: -2_481_505,
    label: 'Net decrease in cash and cash equivalents',
    role: 'investment',
    citation: CF2,
  },
  cashOpening: {
    value: 7_143_491,
    prior: 9_624_996,
    label: 'Cash and cash equivalents at beginning of year',
    role: 'investment',
    citation: CF2,
  },
  depreciation: {
    value: 526_410,
    prior: 490_533,
    label: 'Depreciation and amortization',
    role: 'operating',
    citation: CF,
  },
  ordinaryDividendsPaidCash: {
    value: -3_000_000,
    prior: -2_000_000,
    label: 'Payment of dividends on ordinary shares',
    role: 'retained',
    citation: CF2,
  },
  repaymentOfBorrowings: {
    value: -750_000,
    prior: -750_000,
    label: 'Repayment of borrowings',
    role: 'operating',
    citation: CF2,
  },

  /* ---- Note 12 — insurance contracts issued (printed p.42) ---- */
  premiumsReceived: {
    value: 175_691_678,
    prior: 148_293_988,
    label: 'Premiums received',
    role: 'gross',
    citation: N12,
  },
  incurredClaims: {
    value: 15_681_134,
    prior: 13_908_238,
    label: 'Incurred claims and other directly attributable expenses',
    role: 'gross',
    citation: N12,
  },
  changesPastServiceGross: {
    value: -149_190,
    prior: -1_687_509,
    label: 'Changes that relate to past services',
    role: 'gross',
    citation: N12,
  },
  acquisitionAmortisation: {
    value: 15_446_002,
    prior: 16_876_627,
    label: 'Insurance acquisition cash flows amortization',
    role: 'operating',
    citation: N12,
  },
  claimsPaid: {
    value: -14_765_074,
    prior: -11_262_595,
    label: 'Claims and other directly attributable expenses paid',
    role: 'gross',
    citation: N12,
  },
  acquisitionCashFlows: {
    value: -14_159_674,
    prior: -16_646_260,
    label: 'Insurance acquisition cash flows',
    role: 'operating',
    citation: N12,
  },
  licFutureCashFlows: {
    value: 16_035_447,
    prior: 14_961_577,
    label: 'Liability for incurred claims — future cash flows',
    role: 'gross',
    citation: N12,
  },
  licRiskAdjustment: {
    value: 1_620_000,
    prior: 1_529_000,
    label: 'Liability for incurred claims — risk adjustment',
    role: 'gross',
    citation: N12,
  },
  lrcExclLossComponent: {
    value: 53_747_262,
    prior: 42_414_156,
    label: 'Liability for remaining coverage',
    role: 'gross',
    citation: N12,
  },
  insuranceLiabilityOpening2024: {
    value: 59_210_533,
    label: 'Opening insurance liability as at 1 January 2024',
    role: 'gross',
    citation: N12,
  },

  /* ---- Note 12 — reinsurance contracts held (printed p.44) ---- */
  reinsuranceExpenses: {
    value: 131_559_411,
    prior: 113_453_760,
    label: 'Reinsurance expenses',
    role: 'ceded',
    citation: N12R,
  },
  incurredClaimsRecovery: {
    value: -5_351_479,
    prior: -2_101_929,
    label: 'Incurred claims recovery',
    role: 'ceded',
    citation: N12R,
  },
  changesPastServiceCeded: {
    value: -1_890_294,
    prior: -493_432,
    label: 'Changes that relate to past services (reinsurance)',
    role: 'ceded',
    citation: N12R,
  },
  reinsurancePremiumsPaid: {
    value: -138_266_097,
    prior: -116_031_801,
    label: 'Premiums paid, net of ceding commissions',
    role: 'ceded',
    citation: N12R,
  },
  reinsuranceRecoveries: {
    value: 3_557_131,
    prior: 2_225_701,
    label: 'Recoveries from reinsurance and other expenses paid',
    role: 'ceded',
    citation: N12R,
  },
  reinsuranceAssetOpening2024: {
    value: -31_125_583,
    label: 'Opening reinsurance asset as at 1 January 2024',
    role: 'ceded',
    citation: N12R,
  },
  arcReinsurance: {
    value: -33_359_878,
    prior: -26_653_192,
    label: 'Asset for remaining coverage',
    role: 'ceded',
    citation: N12R,
  },
  aicReinsuranceCashFlows: {
    value: -10_548_734,
    prior: -6_771_092,
    label: 'Asset for incurred claims — future cash flows',
    role: 'ceded',
    citation: N12R,
  },
  aicReinsuranceRiskAdj: {
    value: -929_000,
    prior: -818_000,
    label: 'Asset for incurred claims — risk adjustment',
    role: 'ceded',
    citation: N12R,
  },

  /* ---- Note 13 — claims development totals ---- */
  grossUltimateTotal: {
    value: 701_868_390,
    label: 'Current estimate of cumulative claims — gross',
    role: 'gross',
    citation: N13,
  },
  grossPaymentsTotal: {
    value: -684_816_990,
    label: 'Cumulative payments to date — gross',
    role: 'gross',
    citation: N13,
  },
  grossLicOriginated: {
    value: 17_655_447,
    label: 'Gross liability for incurred claims for contracts originated',
    role: 'gross',
    citation: N13,
  },
  netUltimateTotal: {
    value: 57_170_680,
    label: 'Current estimate of cumulative claims — net',
    role: 'retained',
    citation: N13N,
  },
  netPaymentsTotal: {
    value: -50_612_560,
    label: 'Cumulative payments to date — net',
    role: 'retained',
    citation: N13N,
  },
  netLicOriginated: {
    value: 6_177_713,
    label: 'Net liability for incurred claims for contracts originated',
    role: 'retained',
    citation: N13N,
  },
  ay2019GrossFirst: {
    value: 317_707_546,
    label: 'Accident year 2019 — estimate at end of accident year, gross',
    role: 'gross',
    citation: N13,
  },
  ay2019GrossCurrent: {
    value: 324_887_116,
    label: 'Accident year 2019 — current estimate of cumulative claims, gross',
    role: 'gross',
    citation: N13,
  },
  ay2019NetFirst: {
    value: 9_443_677,
    label: 'Accident year 2019 — estimate at end of accident year, net',
    role: 'retained',
    citation: N13N,
  },
  ay2019NetCurrent: {
    value: 8_459_703,
    label: 'Accident year 2019 — current estimate of cumulative claims, net',
    role: 'retained',
    citation: N13N,
  },

  /* ---- Note 14 — expenses by nature (printed p.48) ---- */
  personnelCosts: {
    value: 4_315_489,
    prior: 3_951_294,
    label: 'Personnel costs',
    role: 'operating',
    citation: N14,
  },
  generalAdmin: {
    value: 2_823_754,
    prior: 2_016_726,
    label: 'General and administrative',
    role: 'operating',
    citation: N14,
  },
  directorsCosts: {
    value: 120_500,
    prior: 126_500,
    label: "Directors' costs",
    role: 'operating',
    citation: N14,
  },
  totalExpensesByNature: {
    value: 7_786_153,
    prior: 6_585_053,
    label: 'Total expenses by nature',
    role: 'operating',
    citation: N14,
  },
  expAcquisition: {
    value: 2_074_223,
    prior: 1_757_705,
    label: 'Acquisition cash flows',
    role: 'operating',
    citation: N14,
  },
  expDirectlyAttributable: {
    value: 3_963_333,
    prior: 3_592_038,
    label: 'Other directly attributable expenses',
    role: 'operating',
    citation: N14,
  },
  expOtherOperating: {
    value: 1_748_597,
    prior: 1_235_310,
    label: 'Other operating expenses',
    role: 'operating',
    citation: N14,
  },
  generalAdminOtherOperating: {
    value: 863_045,
    prior: 419_386,
    label: 'General and administrative within other operating expenses',
    role: 'operating',
    citation: N14,
  },
  auditFees: { value: 170_000, prior: 170_000, label: 'Audit fees', role: 'operating', citation: N14 },

  /* ---- Notes 5, 6, 7, 10, 17, 20 ---- */
  termDepositsUnrestricted: {
    value: 20_809_500,
    prior: 19_922_285,
    label: 'Term deposits with maturities greater than three months',
    role: 'investment',
    citation: N5,
  },
  termDepositsRestricted: {
    value: 6_747_444,
    prior: 6_629_987,
    label: 'Restricted term deposits',
    role: 'investment',
    citation: N5,
  },
  termDepositsAccruedInterest: {
    value: 150_211,
    prior: 174_756,
    label: 'Accrued interest on term deposits',
    role: 'investment',
    citation: N5,
  },
  premiumsReceivableGross: {
    value: 17_151_729,
    prior: 12_712_835,
    label: 'Premiums and taxes receivable from agents',
    role: 'operating',
    citation: N6,
  },
  agentEcl: {
    value: -331_000,
    prior: -234_000,
    label: 'Allowance for expected credit losses',
    role: 'operating',
    citation: N6,
  },
  eclCharge: {
    value: 97_000,
    prior: 0,
    label: 'Expected credit losses recognised in the year',
    role: 'operating',
    citation: N6B,
  },
  agentsPastDue90: {
    value: 1_001_431,
    prior: 1_268_934,
    label: 'Balances over 90 days past due but not impaired',
    role: 'operating',
    citation: N6B,
  },
  treasuryBonds: {
    value: 17_114_829,
    prior: 12_093_817,
    label: 'Treasury bonds — US fixed income',
    role: 'investment',
    citation: N7,
  },
  sovereignBonds: {
    value: 2_494_164,
    prior: 1_986_414,
    label: 'Sovereign bonds',
    role: 'investment',
    citation: N7,
  },
  fvtplPreferenceShares: {
    value: 350_136,
    prior: 350_136,
    label: 'Preference shares at FVTPL',
    role: 'investment',
    citation: N7,
  },
  mutualFundsUs: {
    value: 1_421_569,
    prior: 295_133,
    label: 'Mutual funds — US investment share',
    role: 'investment',
    citation: N7,
  },
  mutualFunds: {
    value: 533_772,
    prior: 514_233,
    label: 'Mutual funds',
    role: 'investment',
    citation: N7,
  },
  ordinarySharesHeld: {
    value: 5_306_252,
    prior: 5_291_519,
    label: 'Ordinary shares held',
    role: 'investment',
    citation: N7,
  },
  notesReceivable: {
    value: 3_157_186,
    prior: 5_000_000,
    label: 'Notes receivable',
    role: 'investment',
    citation: N7,
  },
  totalInvestments: {
    value: 31_446_407,
    prior: 26_660_975,
    label: 'Total investments',
    role: 'investment',
    citation: N7,
  },
  fvtplCost: {
    value: 23_665_233,
    prior: 17_386_865,
    label: 'Cost of financial assets at fair value through profit or loss',
    role: 'investment',
    citation: N7B,
  },
  fvtplLevel1: {
    value: 18_536_398,
    prior: 12_388_950,
    label: 'Level 1 financial assets at FVTPL',
    role: 'investment',
    citation: N7B,
  },
  fvtplLevel2: {
    value: 8_684_324,
    prior: 8_142_302,
    label: 'Level 2 financial assets at FVTPL',
    role: 'investment',
    citation: N7B,
  },
  rentalIncomeProperty: {
    value: 254_772,
    prior: 249_020,
    label: 'Rental income earned on investment property',
    role: 'investment',
    citation: N10,
  },
  employees: {
    value: 34,
    prior: 34,
    label: 'Persons employed',
    role: 'operating',
    citation: N17,
    unit: 'count',
  },
  pensionCosts: {
    value: 92_764,
    prior: 83_662,
    label: 'Pension costs recognised in personnel costs',
    role: 'operating',
    citation: N17,
  },
  loanFacility: {
    value: 5_000_000,
    label: 'Non-revolving demand instalment loan obtained',
    role: 'operating',
    citation: N20,
  },
  loanSecurity: {
    value: 2_500_000,
    label: 'Fixed deposit pledged as security',
    role: 'operating',
    citation: N20,
  },

  /* ---- Note 19 — concentrations, sensitivities, market risk ---- */
  premiumsWritten: {
    value: 175_691_678,
    prior: 148_293_988,
    label: 'Insurance premiums written',
    role: 'gross',
    citation: N19C,
  },
  fvtplPriceShock: {
    value: 584_002,
    prior: 580_575,
    label: 'Impact of a 10% movement in FVTPL investment returns',
    role: 'investment',
    citation: N19M,
  },
  bisxReturn: {
    value: 0.0338,
    prior: 0.0549,
    label: 'BISX All-Share Index return',
    role: 'investment',
    citation: N19M,
    unit: 'ratio',
  },
  riskAdjustmentConfidence: {
    value: 0.74,
    prior: 0.75,
    label: 'Risk adjustment confidence level',
    role: 'gross',
    citation: N3B,
    unit: 'ratio',
  },
  minCapitalLow: {
    value: 75_000,
    label: 'Lowest minimum capital requirement applicable',
    role: 'retained',
    citation: N21,
  },
  minCapitalHigh: {
    value: 5_000_000,
    label: 'Highest minimum capital requirement applicable',
    role: 'retained',
    citation: N21,
  },
  subsequentPreferenceDividend: {
    value: 0.31,
    label: 'Dividend approved on Series B preference shares after year end',
    role: 'retained',
    citation: N23,
    unit: 'perShare',
  },
  parentOwnership: {
    value: 0.5209,
    prior: 0.5286,
    label: "RSA Sunshine Holdings Ltd. interest in RSHL's ordinary shares",
    role: 'retained',
    citation: N1,
    unit: 'ratio',
  },
});

/* ------------------------------------------------------------------ *
 * Tabular disclosures. Each row carries the citation of its table.
 * ------------------------------------------------------------------ */

export const citations = {
  balanceSheet: BS,
  balanceSheet2: BS2,
  comprehensiveIncome: CI,
  equity: EQ,
  cashFlow: CF,
  cashFlow2: CF2,
  note1: N1,
  note3: N3,
  note3b: N3B,
  note5: N5,
  note6: N6,
  note7: N7,
  note10: N10,
  note12: N12,
  note12r: N12R,
  note13: N13,
  note13n: N13N,
  note14: N14,
  note17: N17,
  note19c: N19C,
  note19r: N19R,
  note19l: N19L,
  note19m: N19M,
  note19s: N19S,
  note20: N20,
  note21: N21,
  note23: N23,
} as const;

/** Premiums written by jurisdiction — Note 19, printed p.52. */
export const geography = [
  { name: 'The Bahamas', short: 'BHS', value: 102_220_741, prior: 86_695_016 },
  { name: 'Cayman Islands', short: 'CYM', value: 37_062_119, prior: 30_106_158 },
  { name: 'Turks & Caicos', short: 'TCA', value: 17_965_866, prior: 11_837_032 },
  { name: 'United States Virgin Islands', short: 'VIR', value: 13_289_709, prior: 12_391_457 },
  { name: 'British Virgin Islands', short: 'VGB', value: 5_043_132, prior: 6_724_218 },
  { name: 'Anguilla', short: 'AIA', value: 110_111, prior: 540_107 },
] as const;

/** Net insurance contract liabilities by product line — Note 19, printed p.52. */
export const productLines = [
  {
    name: 'Property',
    gross: 54_657_944,
    ceded: 38_029_486,
    net: 16_628_458,
    grossPrior: 44_675_219,
    cededPrior: 29_745_281,
    netPrior: 14_929_938,
  },
  {
    name: 'Motor',
    gross: 6_858_806,
    ceded: -35_738,
    net: 6_894_544,
    grossPrior: 5_729_760,
    cededPrior: -110_049,
    netPrior: 5_839_809,
  },
  {
    name: 'Casualty',
    gross: 6_886_861,
    ceded: 4_258_090,
    net: 2_628_771,
    grossPrior: 5_863_199,
    cededPrior: 2_592_403,
    netPrior: 3_270_796,
  },
  {
    name: 'Marine',
    gross: 2_999_098,
    ceded: 2_585_774,
    net: 413_324,
    grossPrior: 2_636_555,
    cededPrior: 2_014_649,
    netPrior: 621_906,
  },
] as const;

/** Reinsurance contract assets by credit rating — Note 19, printed p.61. */
export const reinsurerRatings = [
  { band: 'AA+', value: 2_695_810, prior: 3_921_537 },
  { band: 'A+', value: 11_266_803, prior: 8_188_206 },
  { band: 'A', value: 28_644_380, prior: 21_575_331 },
  { band: 'A-', value: 2_770_452, prior: 557_210 },
  { band: 'Non-rated', value: -539_833, prior: 0 },
] as const;

/** Note 19(d) sensitivity analyses — printed p.64. Impact on profit and equity. */
export const sensitivities = [
  {
    factor: 'Loss ratio',
    change: '5% increase',
    gross: -8_282_245,
    net: -2_008_418,
    grossPrior: -7_508_314,
    netPrior: -2_046_166,
  },
  {
    factor: 'Expenses',
    change: '5% increase',
    gross: -1_081_849,
    net: -368_041,
    grossPrior: -1_094_313,
    netPrior: -432_154,
  },
  {
    factor: 'Interest rate',
    change: '1% increase',
    gross: -230_000,
    net: -148_000,
    grossPrior: -230_000,
    netPrior: -102_000,
  },
] as const;

/**
 * Maturity profile of liabilities for incurred claims, in thousands of
 * Bahamian dollars as presented — Note 19, printed p.62.
 */
export const licMaturity = [
  { bucket: 'Up to 1 year', value: 7_049, prior: 8_462 },
  { bucket: '1 – 3 years', value: 5_129, prior: 2_688 },
  { bucket: '3 – 6 years', value: 2_960, prior: 3_908 },
  { bucket: '6 – 9 years', value: 1_682, prior: 727 },
  { bucket: 'Over 9 years', value: 835, prior: 706 },
] as const;

/** Discount rates (spot rates) used to discount estimates of future cash flows — Note 3, printed p.30. */
export const yieldCurves = [
  {
    currency: 'Bahamian dollars',
    current: [
      { tenor: 1, rate: 0.042 },
      { tenor: 5, rate: 0.055 },
      { tenor: 10, rate: 0.061 },
      { tenor: 20, rate: 0.068 },
    ],
    prior: [
      { tenor: 1, rate: 0.039 },
      { tenor: 5, rate: 0.049 },
      { tenor: 10, rate: 0.064 },
      { tenor: 20, rate: 0.071 },
    ],
  },
  {
    currency: 'Other Caribbean (based on USD)',
    current: [
      { tenor: 1, rate: 0.047 },
      { tenor: 5, rate: 0.049 },
      { tenor: 10, rate: 0.054 },
      { tenor: 20, rate: 0.063 },
    ],
    prior: [
      { tenor: 1, rate: 0.054 },
      { tenor: 5, rate: 0.056 },
      { tenor: 10, rate: 0.058 },
      { tenor: 20, rate: 0.062 },
    ],
  },
] as const;

/** Verbatim disclosures quoted in the report, each with its citation. */
export const disclosures = {
  amBest: {
    text: 'As at 31 December 2025, the Group maintained its A.M. Best Financial Strength Rating of A (Excellent) with a stable outlook.',
    citation: N21,
  },
  reinsurerPolicy: {
    text: 'The policy is to accept only low credit risk reinsurers (credit rating of minimum A). As at 31 December 2025, the majority of the Group\u2019s reinsurers had a minimum A.M. Best Financial Strength Rating of A- (Excellent) or equivalent rating with alternate rating agencies.',
    citation: N19R,
  },
  catastropheCover: {
    text: 'The Group has reinsurance coverage in place to limit the impact of claims in any one year, with such coverage designed to limit the impact of claims related to any single event and/or catastrophe to approximately 10% of total equity.',
    citation: N19R,
  },
  climate: {
    text: 'For property insurance contracts, it is believed that climatic changes are giving rise to more frequent extreme weather events (for example, hurricanes, tropical storms and storm surges) and intensifying the resulting damages.',
    citation: { statement: 'Note 19 — Risk Management, property insurance risks', printedPage: 51, pdfPage: 52 },
  },
  auditOpinion: {
    text: 'In our opinion, the consolidated financial statements present fairly, in all material respects, the consolidated financial position of RoyalStar Assurance Ltd. (the Company) and its subsidiaries (together \u2018the Group\u2019) as at 31 December 2025, and their consolidated financial performance and their consolidated cash flows for the year then ended in accordance with IFRS Accounting Standards.',
    citation: { statement: 'Independent auditors\u2019 report — PricewaterhouseCoopers, Nassau, 17 April 2026', printedPage: 1, pdfPage: 2 },
  },
  licensing: {
    text: 'RoyalStar Assurance Ltd. is licensed to operate as a property and casualty insurance company in The Bahamas, and in the same capacity in the Cayman Islands, the Turks and Caicos Islands, the British Virgin Islands, the United States Virgin Islands and Anguilla.',
    citation: N1,
  },
  majorityOfClaims: {
    text: 'The majority of claims are settled within 12 months; therefore, the biggest risks connected with these claims are premium and reserving risks.',
    citation: N19L,
  },
} as const;
