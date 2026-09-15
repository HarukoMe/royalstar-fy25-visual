/**
 * Data integrity suite.
 *
 * These tests assert the arithmetic that the audited statements assert of
 * themselves. If a transcription error is introduced into src/data/reported.ts,
 * the build fails rather than the report shipping a wrong number.
 */

import { describe, expect, it } from 'vitest';
import {
  geography,
  licMaturity,
  productLines,
  reinsurerRatings,
  reported as r,
  sensitivities,
} from '@/data/reported';
import { calculated, netIncomeBridge, revenueDecomposition } from '@/data/calculated';
import { grossTriangle, netTriangle, triangleReconciliation } from '@/data/claims';
import { figures } from '@/data';

const v = (id: string) => {
  const f = r[id];
  if (!f) throw new Error(`missing ${id}`);
  return f.value;
};
const p = (id: string) => {
  const f = r[id];
  if (!f || f.prior === undefined) throw new Error(`missing prior ${id}`);
  return f.prior;
};

describe('consolidated balance sheet', () => {
  it('assets sum to total assets, both years', () => {
    const parts = [
      'cash',
      'termDeposits',
      'reinsuranceContractAssets',
      'dueFromAgents',
      'prepayments',
      'investmentsFvtpl',
      'investmentsAmortised',
      'investmentInAssociate',
      'investmentProperty',
      'propertyAndEquipment',
    ];
    expect(parts.reduce((s, id) => s + v(id), 0)).toBe(v('totalAssets'));
    expect(parts.reduce((s, id) => s + p(id), 0)).toBe(p('totalAssets'));
  });

  it('balances: assets equal liabilities plus equity, both years', () => {
    expect(v('totalLiabilities') + v('totalEquity')).toBe(v('totalAssets'));
    expect(p('totalLiabilities') + p('totalEquity')).toBe(p('totalAssets'));
  });

  it('liabilities reconcile', () => {
    expect(v('accountsPayable') + v('borrowings')).toBe(v('otherLiabilities'));
    expect(v('insuranceContractLiabilities') + v('otherLiabilities')).toBe(v('totalLiabilities'));
    expect(p('accountsPayable') + p('borrowings')).toBe(p('otherLiabilities'));
    expect(p('insuranceContractLiabilities') + p('otherLiabilities')).toBe(p('totalLiabilities'));
  });

  it('equity components sum to total equity, both years', () => {
    const parts = [
      'ordinaryShares',
      'preferenceShares',
      'contributedSurplus',
      'revaluationReserve',
      'retainedEarnings',
    ];
    expect(parts.reduce((s, id) => s + v(id), 0)).toBe(v('totalEquity'));
    expect(parts.reduce((s, id) => s + p(id), 0)).toBe(p('totalEquity'));
  });
});

describe('consolidated statement of comprehensive income', () => {
  it('insurance service result ties to its three components, both years', () => {
    expect(
      v('insuranceRevenue') + v('insuranceServiceExpenses') + v('netReinsuranceExpenses'),
    ).toBe(v('insuranceServiceResult'));
    expect(
      p('insuranceRevenue') + p('insuranceServiceExpenses') + p('netReinsuranceExpenses'),
    ).toBe(p('insuranceServiceResult'));
  });

  it('net investment income ties to its components, both years', () => {
    expect(v('interestRevenue') + v('fvtplGains') + v('creditImpairmentReversal')).toBe(
      v('netInvestmentIncome'),
    );
    expect(p('interestRevenue') + p('fvtplGains') + p('creditImpairmentReversal')).toBe(
      p('netInvestmentIncome'),
    );
  });

  it('net insurance and investment result ties, both years', () => {
    expect(
      v('insuranceServiceResult') + v('netInvestmentIncome') + v('netInsuranceFinanceExpenses'),
    ).toBe(v('netInsuranceAndInvestmentResult'));
    expect(
      p('insuranceServiceResult') + p('netInvestmentIncome') + p('netInsuranceFinanceExpenses'),
    ).toBe(p('netInsuranceAndInvestmentResult'));
  });

  it('net income ties from the net insurance and investment result, both years', () => {
    expect(
      v('netInsuranceAndInvestmentResult') +
        v('rentalAndOtherIncome') +
        v('otherIncome') +
        v('otherOperatingExpenses') +
        v('interestExpense'),
    ).toBe(v('netIncome'));
    expect(
      p('netInsuranceAndInvestmentResult') +
        p('rentalAndOtherIncome') +
        p('otherIncome') +
        p('otherOperatingExpenses') +
        p('interestExpense'),
    ).toBe(p('netIncome'));
  });

  it('total comprehensive income equals net income, no other comprehensive income', () => {
    expect(v('totalComprehensiveIncome')).toBe(v('netIncome'));
    expect(p('totalComprehensiveIncome')).toBe(p('netIncome'));
  });
});

describe('the two bridges presented in Movement 03', () => {
  it('the revenue-increase decomposition sums to the change in insurance service result', () => {
    const [increase, reins, svc, remainder] = revenueDecomposition;
    expect(increase!.value).toBe(15_478_611);
    expect(reins!.value).toBe(-13_459_239);
    expect(svc!.value).toBe(-1_880_590);
    expect(remainder!.value).toBe(138_782);
    expect(increase!.value + reins!.value + svc!.value).toBe(remainder!.value);
  });

  it('the net income bridge sums to the change in net income', () => {
    const total = netIncomeBridge.reduce((s, step) => s + step.change, 0);
    expect(total).toBe(v('netIncome') - p('netIncome'));
    expect(total).toBe(-323_759);
  });

  it('other operating expenses is the largest single movement in the net income bridge', () => {
    const largest = [...netIncomeBridge].sort(
      (a, b) => Math.abs(b.change) - Math.abs(a.change),
    )[0];
    expect(largest!.id).toBe('otherOperatingExpenses');
  });

  it('dividends appear nowhere in the net income bridge', () => {
    const ids = netIncomeBridge.map((s) => s.id).join(' ');
    expect(ids).not.toMatch(/ividend/);
  });
});

describe('consolidated statement of changes in equity', () => {
  it('bridges 31 December 2023 to 31 December 2025', () => {
    const y2024 = v('equityOpening2024') + p('netIncome') + p('totalDividends');
    expect(y2024).toBe(p('totalEquity'));
    const y2025 = p('totalEquity') + v('netIncome') + v('totalDividends');
    expect(y2025).toBe(v('totalEquity'));
    expect(y2025).toBe(67_369_530);
  });

  it('retained earnings bridge ties, both years', () => {
    expect(v('retainedEarningsOpening2024') + p('netIncome') + p('totalDividends')).toBe(
      p('retainedEarnings'),
    );
    expect(p('retainedEarnings') + v('netIncome') + v('totalDividends')).toBe(
      v('retainedEarnings'),
    );
  });

  it('dividend components sum to total transactions with owners, both years', () => {
    expect(v('preferenceDividends') + v('ordinaryDividends')).toBe(v('totalDividends'));
    expect(p('preferenceDividends') + p('ordinaryDividends')).toBe(p('totalDividends'));
  });
});

describe('consolidated statement of cash flows', () => {
  it('the three activities sum to the net decrease in cash, both years', () => {
    expect(v('cashFromOperating') + v('cashUsedInInvesting') + v('cashUsedInFinancing')).toBe(
      v('netDecreaseInCash'),
    );
    expect(p('cashFromOperating') + p('cashUsedInInvesting') + p('cashUsedInFinancing')).toBe(
      p('netDecreaseInCash'),
    );
  });

  it('opening cash plus the net movement equals closing cash, both years', () => {
    expect(v('cashOpening') + v('netDecreaseInCash')).toBe(v('cash'));
    expect(p('cashOpening') + p('netDecreaseInCash')).toBe(p('cash'));
  });
});

describe('Note 12 — reconciliation of insurance and reinsurance contracts', () => {
  it('insurance service expense components sum to the reported total, both years', () => {
    expect(v('incurredClaims') + v('changesPastServiceGross') + v('acquisitionAmortisation')).toBe(
      Math.abs(v('insuranceServiceExpenses')),
    );
    expect(p('incurredClaims') + p('changesPastServiceGross') + p('acquisitionAmortisation')).toBe(
      Math.abs(p('insuranceServiceExpenses')),
    );
  });

  it('reinsurance expense components sum to the reported total, both years', () => {
    expect(
      v('reinsuranceExpenses') + v('incurredClaimsRecovery') + v('changesPastServiceCeded'),
    ).toBe(Math.abs(v('netReinsuranceExpenses')));
    expect(
      p('reinsuranceExpenses') + p('incurredClaimsRecovery') + p('changesPastServiceCeded'),
    ).toBe(Math.abs(p('netReinsuranceExpenses')));
  });

  it('closing insurance contract liability ties to its components, both years', () => {
    expect(v('lrcExclLossComponent') + v('licFutureCashFlows') + v('licRiskAdjustment')).toBe(
      v('insuranceContractLiabilities'),
    );
    expect(p('lrcExclLossComponent') + p('licFutureCashFlows') + p('licRiskAdjustment')).toBe(
      p('insuranceContractLiabilities'),
    );
  });

  it('closing reinsurance asset ties to its components, both years', () => {
    expect(
      -(v('arcReinsurance') + v('aicReinsuranceCashFlows') + v('aicReinsuranceRiskAdj')),
    ).toBe(v('reinsuranceContractAssets'));
    expect(
      -(p('arcReinsurance') + p('aicReinsuranceCashFlows') + p('aicReinsuranceRiskAdj')),
    ).toBe(p('reinsuranceContractAssets'));
  });

  it('insurance contract liability roll-forward ties opening to closing for 2025', () => {
    const closing =
      p('insuranceContractLiabilities') -
      v('insuranceRevenue') +
      Math.abs(v('insuranceServiceExpenses')) +
      398_000 +
      v('premiumsReceived') +
      v('claimsPaid') +
      v('acquisitionCashFlows');
    expect(closing).toBe(v('insuranceContractLiabilities'));
  });

  it('insurance contract liability roll-forward ties opening to closing for 2024', () => {
    const closing =
      v('insuranceLiabilityOpening2024') -
      p('insuranceRevenue') +
      Math.abs(p('insuranceServiceExpenses')) +
      378_000 +
      p('premiumsReceived') +
      p('claimsPaid') +
      p('acquisitionCashFlows');
    expect(closing).toBe(p('insuranceContractLiabilities'));
  });

  it('reinsurance asset roll-forward ties opening to closing for 2025', () => {
    const closing =
      -p('reinsuranceContractAssets') +
      Math.abs(v('netReinsuranceExpenses')) -
      204_000 +
      v('reinsurancePremiumsPaid') +
      v('reinsuranceRecoveries');
    expect(closing).toBe(-v('reinsuranceContractAssets'));
  });

  it('reinsurance asset roll-forward ties opening to closing for 2024', () => {
    const closing =
      v('reinsuranceAssetOpening2024') +
      Math.abs(p('netReinsuranceExpenses')) -
      169_000 +
      p('reinsurancePremiumsPaid') +
      p('reinsuranceRecoveries');
    expect(closing).toBe(-p('reinsuranceContractAssets'));
  });
});

describe('Note 13 — claims development', () => {
  it('gross current estimates sum to the reported total', () => {
    expect(grossTriangle.reduce((s, a) => s + a.currentEstimate, 0)).toBe(v('grossUltimateTotal'));
  });

  it('net current estimates sum to the reported total', () => {
    expect(netTriangle.reduce((s, a) => s + a.currentEstimate, 0)).toBe(v('netUltimateTotal'));
  });

  it('gross cumulative payments sum to the reported total', () => {
    expect(-grossTriangle.reduce((s, a) => s + a.cumulativePayments, 0)).toBe(
      v('grossPaymentsTotal'),
    );
  });

  it('net cumulative payments sum to the reported total', () => {
    expect(-netTriangle.reduce((s, a) => s + a.cumulativePayments, 0)).toBe(v('netPaymentsTotal'));
  });

  it("each year's current estimate equals its latest revision", () => {
    for (const a of [...grossTriangle, ...netTriangle]) {
      expect(a.currentEstimate).toBe(a.revisions[a.revisions.length - 1]);
    }
  });

  it('current estimate less payments equals the liability in the provision, each year', () => {
    for (const a of [...grossTriangle, ...netTriangle]) {
      expect(a.currentEstimate - a.cumulativePayments).toBe(a.liabilityInProvision);
    }
  });

  it('liabilities in the provision sum to the disclosed subtotals', () => {
    expect(grossTriangle.reduce((s, a) => s + a.liabilityInProvision, 0)).toBe(
      triangleReconciliation.gross.liabilityInProvision,
    );
    expect(netTriangle.reduce((s, a) => s + a.liabilityInProvision, 0)).toBe(
      triangleReconciliation.net.liabilityInProvision,
    );
  });

  it('the reconciliation below each triangle ties to the reported LIC', () => {
    for (const t of [triangleReconciliation.gross, triangleReconciliation.net]) {
      const sum =
        t.liabilityInProvision +
        t.priorYears +
        t.discounting +
        t.riskAdjustment +
        t.expenseAccruals;
      expect(sum).toBe(t.licOriginated);
    }
    expect(triangleReconciliation.gross.licOriginated).toBe(v('grossLicOriginated'));
    expect(triangleReconciliation.net.licOriginated).toBe(v('netLicOriginated'));
  });

  it('the gross risk adjustment in the reconciliation matches the Note 12 risk adjustment', () => {
    expect(triangleReconciliation.gross.riskAdjustment).toBe(v('licRiskAdjustment'));
  });

  it('accident year revision counts decline by one per year, forming the triangle', () => {
    for (const t of [grossTriangle, netTriangle]) {
      t.forEach((a, i) => expect(a.revisions.length).toBe(t.length - i));
    }
  });

  it('the 2019 headline figures match the triangles', () => {
    const g = grossTriangle.find((a) => a.year === 2019)!;
    const n = netTriangle.find((a) => a.year === 2019)!;
    expect(g.revisions[0]).toBe(v('ay2019GrossFirst'));
    expect(g.currentEstimate).toBe(v('ay2019GrossCurrent'));
    expect(n.revisions[0]).toBe(v('ay2019NetFirst'));
    expect(n.currentEstimate).toBe(v('ay2019NetCurrent'));
  });
});

describe('Note 14 — expenses by nature', () => {
  it('expenses by nature sum to the reported total, both years', () => {
    expect(
      v('personnelCosts') + v('generalAdmin') + v('directorsCosts') + v('depreciation'),
    ).toBe(v('totalExpensesByNature'));
    expect(
      p('personnelCosts') + p('generalAdmin') + p('directorsCosts') + p('depreciation'),
    ).toBe(p('totalExpensesByNature'));
  });

  it('expenses by allocation sum to the same total, both years', () => {
    expect(v('expAcquisition') + v('expDirectlyAttributable') + v('expOtherOperating')).toBe(
      v('totalExpensesByNature'),
    );
    expect(p('expAcquisition') + p('expDirectlyAttributable') + p('expOtherOperating')).toBe(
      p('totalExpensesByNature'),
    );
  });

  it('other operating expenses in Note 14 agrees with the income statement', () => {
    expect(v('expOtherOperating')).toBe(Math.abs(v('otherOperatingExpenses')));
    expect(p('expOtherOperating')).toBe(Math.abs(p('otherOperatingExpenses')));
  });
});

describe('Note 19 — concentrations and sensitivities', () => {
  it('premiums written by jurisdiction sum to the reported total, both years', () => {
    expect(geography.reduce((s, g) => s + g.value, 0)).toBe(v('premiumsWritten'));
    expect(geography.reduce((s, g) => s + g.prior, 0)).toBe(p('premiumsWritten'));
  });

  it('premiums written agrees with premiums received in Note 12', () => {
    expect(v('premiumsWritten')).toBe(v('premiumsReceived'));
    expect(p('premiumsWritten')).toBe(p('premiumsReceived'));
  });

  it('product lines reconcile gross, ceded and net, both years', () => {
    expect(productLines.reduce((s, l) => s + l.gross, 0)).toBe(v('insuranceContractLiabilities'));
    expect(productLines.reduce((s, l) => s + l.ceded, 0)).toBe(v('reinsuranceContractAssets'));
    expect(productLines.reduce((s, l) => s + l.net, 0)).toBe(26_565_097);
    expect(productLines.reduce((s, l) => s + l.grossPrior, 0)).toBe(
      p('insuranceContractLiabilities'),
    );
    expect(productLines.reduce((s, l) => s + l.cededPrior, 0)).toBe(
      p('reinsuranceContractAssets'),
    );
    expect(productLines.reduce((s, l) => s + l.netPrior, 0)).toBe(24_662_449);
  });

  it('each product line reconciles gross less ceded to net', () => {
    for (const l of productLines) {
      expect(l.gross - l.ceded).toBe(l.net);
      expect(l.grossPrior - l.cededPrior).toBe(l.netPrior);
    }
  });

  it('reinsurer rating bands net to the reinsurance contract asset, both years', () => {
    expect(reinsurerRatings.reduce((s, b) => s + b.value, 0)).toBe(
      v('reinsuranceContractAssets'),
    );
    expect(reinsurerRatings.reduce((s, b) => s + b.prior, 0)).toBe(
      p('reinsuranceContractAssets'),
    );
  });

  it('the LIC maturity ladder sums to the disclosed totals, both years', () => {
    expect(licMaturity.reduce((s, b) => s + b.value, 0)).toBe(17_655);
    expect(licMaturity.reduce((s, b) => s + b.prior, 0)).toBe(16_491);
  });

  it('the maturity ladder agrees with the gross LIC in Note 13, to the nearest thousand', () => {
    expect(licMaturity.reduce((s, b) => s + b.value, 0) * 1000).toBeCloseTo(
      v('grossLicOriginated'),
      -3,
    );
  });

  it('every sensitivity has a net impact no larger than its gross impact', () => {
    for (const s of sensitivities) {
      expect(Math.abs(s.net)).toBeLessThanOrEqual(Math.abs(s.gross));
      expect(Math.abs(s.netPrior)).toBeLessThanOrEqual(Math.abs(s.grossPrior));
    }
  });

  it('term deposit components sum to the reported total, both years', () => {
    expect(v('termDepositsUnrestricted') + v('termDepositsRestricted') + 150_211).toBe(
      v('termDeposits'),
    );
    expect(p('termDepositsUnrestricted') + p('termDepositsRestricted') + 174_756).toBe(
      p('termDeposits'),
    );
  });

  it('due from agents nets the ECL allowance, both years', () => {
    expect(v('premiumsReceivableGross') + v('agentEcl')).toBe(v('dueFromAgents'));
    expect(p('premiumsReceivableGross') + p('agentEcl')).toBe(p('dueFromAgents'));
  });

  it('the ECL allowance movement ties opening to closing', () => {
    expect(Math.abs(p('agentEcl')) + v('eclCharge')).toBe(Math.abs(v('agentEcl')));
  });

  it('FVTPL fair value levels sum to the reported carrying amount, both years', () => {
    expect(v('fvtplLevel1') + v('fvtplLevel2')).toBe(v('investmentsFvtpl'));
    expect(p('fvtplLevel1') + p('fvtplLevel2')).toBe(p('investmentsFvtpl'));
  });

  it('total investments equal the FVTPL and amortised cost carrying amounts, both years', () => {
    expect(v('investmentsFvtpl') + v('investmentsAmortised')).toBe(v('totalInvestments'));
    expect(p('investmentsFvtpl') + p('investmentsAmortised')).toBe(p('totalInvestments'));
  });
});

describe('the calculated tier', () => {
  it('every calculated figure recomputes to a finite number', () => {
    for (const [id, f] of Object.entries(calculated)) {
      expect(Number.isFinite(f.value), `${id} is not finite`).toBe(true);
    }
  });

  it('every calculated figure declares a definition, an expression and inputs', () => {
    for (const [id, f] of Object.entries(calculated)) {
      expect(f.provenance.tier).toBe('calculated');
      if (f.provenance.tier !== 'calculated') return;
      expect(f.provenance.definition.length, `${id} definition`).toBeGreaterThan(20);
      expect(f.provenance.expression.length, `${id} expression`).toBeGreaterThan(3);
      expect(f.provenance.inputs.length, `${id} inputs`).toBeGreaterThan(0);
    }
  });

  it('no calculated metric is labelled as a conventional combined ratio', () => {
    for (const f of Object.values(calculated)) {
      expect(f.label.toLowerCase()).not.toContain('combined ratio');
      if (f.provenance.tier === 'calculated') {
        expect(f.provenance.definition.toLowerCase()).not.toMatch(/is a combined ratio/);
      }
    }
  });

  it('key calculated values match independent computation', () => {
    expect(calculated.serviceResultMargin!.value).toBeCloseTo(0.0625, 4);
    expect(calculated.reinsuranceToRevenue!.value).toBeCloseTo(0.7505, 4);
    expect(calculated.netToGrossUltimate!.value).toBeCloseTo(0.0815, 4);
    expect(calculated.cededUltimate!.value).toBe(644_697_710);
    expect(calculated.cededUltimateShare!.value).toBeCloseTo(0.9185, 4);
    expect(calculated.ay2019NetToGross!.value).toBeCloseTo(0.026, 4);
    expect(calculated.returnOnAverageEquity!.value).toBeCloseTo(0.167, 3);
    expect(calculated.bookValuePerOrdinaryShare!.value).toBeCloseTo(6.237, 3);
    expect(calculated.ordinaryPayoutRatio!.value).toBeCloseTo(0.2905, 4);
    expect(calculated.retainedEarningsIncrease!.value).toBe(7_327_046);
    expect(calculated.catastropheCapAmount!.value).toBeCloseTo(6_736_953, 0);
    expect(calculated.revenueIncreaseOffsetByReinsurance!.value).toBeCloseTo(0.8695, 4);
    expect(calculated.lossRatioShockAbsorbed!.value).toBeCloseTo(0.7575, 4);
  });
});

describe('provenance completeness', () => {
  it('every figure carries a provenance tier and a non-empty label', () => {
    for (const [id, f] of Object.entries(figures)) {
      expect(f.id, `${id} id mismatch`).toBe(id);
      expect(f.label.length, `${id} label`).toBeGreaterThan(2);
      expect(['reported', 'calculated']).toContain(f.provenance.tier);
    }
  });

  it('every reported figure cites a statement and a page', () => {
    for (const [id, f] of Object.entries(figures)) {
      if (f.provenance.tier !== 'reported') continue;
      const c = f.provenance.citation;
      expect(c.statement.length, `${id} statement`).toBeGreaterThan(4);
      expect(c.printedPage, `${id} printed page`).toBeGreaterThan(0);
      expect(c.pdfPage, `${id} pdf page`).toBe(c.printedPage + 1);
    }
  });

  it('every calculated input resolves to a known figure', () => {
    for (const [id, f] of Object.entries(figures)) {
      if (f.provenance.tier !== 'calculated') continue;
      for (const input of f.provenance.inputs) {
        if (input.includes('.')) continue;
        expect(figures[input], `${id} input ${input}`).toBeDefined();
      }
    }
  });
});
