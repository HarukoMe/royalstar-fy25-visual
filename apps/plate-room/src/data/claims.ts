/**
 * Note 13 — Claims Development.
 *
 * Estimates of ultimate claims cost by accident year, as successively revised.
 * Gross of reinsurance (printed p.46) and net of reinsurance (printed p.47).
 *
 * `revisions[0]` is the estimate made at the end of the accident year;
 * `revisions[n]` is the estimate n years later. Older accident years carry
 * more revisions, which is what gives the disclosure its triangular shape.
 */

import { citations } from './reported';
import type { Citation } from './types';

export interface AccidentYear {
  readonly year: number;
  readonly revisions: readonly number[];
  readonly currentEstimate: number;
  readonly cumulativePayments: number;
  readonly liabilityInProvision: number;
}

export const grossTriangle: readonly AccidentYear[] = [
  {
    year: 2016,
    revisions: [
      255_102_671, 278_874_890, 258_223_820, 251_375_340, 251_835_057, 252_038_193, 251_887_696,
      251_703_243, 251_701_797, 251_702_634,
    ],
    currentEstimate: 251_702_634,
    cumulativePayments: 251_702_634,
    liabilityInProvision: 0,
  },
  {
    year: 2017,
    revisions: [
      58_488_299, 53_730_565, 53_682_732, 55_347_032, 55_121_323, 54_533_129, 65_882_617,
      65_640_900, 65_640_540,
    ],
    currentEstimate: 65_640_540,
    cumulativePayments: 65_640_540,
    liabilityInProvision: 0,
  },
  {
    year: 2018,
    revisions: [7_256_701, 6_298_087, 4_566_200, 4_385_534, 4_547_546, 4_345_175, 4_341_394, 4_336_394],
    currentEstimate: 4_336_394,
    cumulativePayments: 3_988_894,
    liabilityInProvision: 347_500,
  },
  {
    year: 2019,
    revisions: [
      317_707_546, 296_296_655, 289_233_405, 284_966_929, 324_671_721, 324_713_121, 324_887_116,
    ],
    currentEstimate: 324_887_116,
    cumulativePayments: 324_218_182,
    liabilityInProvision: 668_934,
  },
  {
    year: 2020,
    revisions: [7_247_128, 7_020_031, 6_869_159, 6_770_159, 6_542_154, 6_685_135],
    currentEstimate: 6_685_135,
    cumulativePayments: 6_446_235,
    liabilityInProvision: 238_900,
  },
  {
    year: 2021,
    revisions: [5_807_528, 5_025_786, 4_749_713, 4_507_636, 4_359_397],
    currentEstimate: 4_359_397,
    cumulativePayments: 4_348_247,
    liabilityInProvision: 11_150,
  },
  {
    year: 2022,
    revisions: [10_625_990, 12_321_814, 11_875_469, 12_003_235],
    currentEstimate: 12_003_235,
    cumulativePayments: 10_834_284,
    liabilityInProvision: 1_168_951,
  },
  {
    year: 2023,
    revisions: [10_804_515, 10_802_115, 10_575_194],
    currentEstimate: 10_575_194,
    cumulativePayments: 8_162_549,
    liabilityInProvision: 2_412_645,
  },
  {
    year: 2024,
    revisions: [9_769_511, 9_974_309],
    currentEstimate: 9_974_309,
    cumulativePayments: 4_798_083,
    liabilityInProvision: 5_176_226,
  },
  {
    year: 2025,
    revisions: [11_704_436],
    currentEstimate: 11_704_436,
    cumulativePayments: 4_677_342,
    liabilityInProvision: 7_027_094,
  },
];

export const netTriangle: readonly AccidentYear[] = [
  {
    year: 2016,
    revisions: [
      9_354_395, 9_289_889, 9_084_808, 9_524_973, 9_920_549, 10_009_046, 9_870_813, 9_876_395,
      9_879_950, 9_880_786,
    ],
    currentEstimate: 9_880_786,
    cumulativePayments: 9_880_786,
    liabilityInProvision: 0,
  },
  {
    year: 2017,
    revisions: [
      6_312_245, 5_527_490, 5_646_440, 5_568_945, 5_584_701, 5_768_127, 5_832_617, 5_590_901,
      5_590_541,
    ],
    currentEstimate: 5_590_541,
    cumulativePayments: 5_590_541,
    liabilityInProvision: 0,
  },
  {
    year: 2018,
    revisions: [6_976_057, 5_955_122, 4_350_050, 4_208_222, 4_218_196, 4_005_825, 3_937_044, 3_937_044],
    currentEstimate: 3_937_044,
    cumulativePayments: 3_817_044,
    liabilityInProvision: 120_000,
  },
  {
    year: 2019,
    revisions: [9_443_677, 8_698_799, 8_609_810, 8_675_248, 8_310_351, 8_310_351, 8_459_703],
    currentEstimate: 8_459_703,
    cumulativePayments: 8_230_769,
    liabilityInProvision: 228_934,
  },
  {
    year: 2020,
    revisions: [4_804_977, 3_769_215, 4_007_481, 4_124_583, 3_799_872, 3_800_222],
    currentEstimate: 3_800_222,
    cumulativePayments: 3_800_222,
    liabilityInProvision: 0,
  },
  {
    year: 2021,
    revisions: [5_033_074, 4_244_737, 4_032_859, 3_826_575, 3_677_336],
    currentEstimate: 3_677_336,
    cumulativePayments: 3_668_186,
    liabilityInProvision: 9_150,
  },
  {
    year: 2022,
    revisions: [5_276_745, 4_672_990, 4_321_222, 4_051_118],
    currentEstimate: 4_051_118,
    cumulativePayments: 3_708_147,
    liabilityInProvision: 342_971,
  },
  {
    year: 2023,
    revisions: [5_443_638, 4_773_758, 4_627_962],
    currentEstimate: 4_627_962,
    cumulativePayments: 4_317_971,
    liabilityInProvision: 309_991,
  },
  {
    year: 2024,
    revisions: [7_595_632, 6_118_182],
    currentEstimate: 6_118_182,
    cumulativePayments: 4_309_812,
    liabilityInProvision: 1_808_370,
  },
  {
    year: 2025,
    revisions: [7_027_786],
    currentEstimate: 7_027_786,
    cumulativePayments: 3_289_082,
    liabilityInProvision: 3_738_704,
  },
];

/** Reconciling items below the triangle, as disclosed. */
export const triangleReconciliation = {
  gross: {
    liabilityInProvision: 17_051_400,
    priorYears: 85_000,
    discounting: -1_315_000,
    riskAdjustment: 1_620_000,
    expenseAccruals: 214_047,
    licOriginated: 17_655_447,
    citation: citations.note13 as Citation,
  },
  net: {
    liabilityInProvision: 6_558_120,
    priorYears: 85_000,
    discounting: -696_000,
    riskAdjustment: 691_000,
    expenseAccruals: -460_407,
    licOriginated: 6_177_713,
    citation: citations.note13n as Citation,
  },
} as const;

export const accidentYears = grossTriangle.map((a) => a.year);

export function triangleFor(basis: 'gross' | 'net'): readonly AccidentYear[] {
  return basis === 'gross' ? grossTriangle : netTriangle;
}

export function yearFor(basis: 'gross' | 'net', year: number): AccidentYear {
  const found = triangleFor(basis).find((a) => a.year === year);
  if (!found) throw new Error(`No accident year ${year} in ${basis} triangle`);
  return found;
}

/** Development of the first estimate to the current estimate, as a proportion. */
export function developmentRatio(a: AccidentYear): number {
  const first = a.revisions[0];
  if (first === undefined || first === 0) return 0;
  return (a.currentEstimate - first) / first;
}
