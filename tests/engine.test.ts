import { describe, expect, it } from "vitest";
import { makeLedger, rawTransactions, statementSummaries } from "../src/engine/data";
import { economicSpending, findDuplicateKeys, reconcileMonth, salaryTotal } from "../src/engine/reconcile";
import { defaultPlanning } from "../src/engine/defaults";
import { currentPosition } from "../src/engine/position";
import { evaluatePurchase } from "../src/engine/purchase";
import { buildForecast } from "../src/engine/forecast";
import { paydayCycles, personNets } from "../src/engine/analysis";
import { round2 } from "../src/engine/money";

const ledger = makeLedger();

describe("statement extraction integrity", () => {
  it("captures 393 sanitized transactions", () => {
    expect(rawTransactions).toHaveLength(393);
    expect(rawTransactions.every((t) => !t.originalDescription.includes("1504542"))).toBe(true);
    expect(rawTransactions.every((t) => !/\d{15,}/.test(t.originalDescription))).toBe(true);
  });

  it("ties every monthly opening, deposits, withdrawals, and closing", () => {
    for (const summary of statementSummaries) {
      const result = reconcileMonth(summary, ledger);
      expect(result.ties, result.month).toBe(true);
      expect(result.closingDelta).toBe(0);
      expect(result.depositDelta).toBe(0);
      expect(result.withdrawalDelta).toBe(0);
    }
  });

  it("walks March opening 0.09 to August closing 26.91", () => {
    const march = statementSummaries[0];
    const august = statementSummaries[statementSummaries.length - 1];
    expect(march.openingBalance).toBe(0.09);
    expect(august.closingBalance).toBe(26.91);
    const net = round2(ledger.reduce((s, t) => s + t.signedAmount, 0));
    expect(round2(march.openingBalance + net)).toBe(26.91);
  });

  it("does not duplicate extracted rows across statements", () => {
    expect(new Set(ledger.map((t) => t.id)).size).toBe(ledger.length);
    expect(findDuplicateKeys(ledger)).toEqual([]);
  });
});

describe("classification rules", () => {
  it("treats Royal Star credits as salary and not personal transfers", () => {
    const salary = ledger.filter((t) => t.flowKind === "salary");
    expect(salary).toHaveLength(6);
    expect(salary.every((t) => t.countsAsIncome)).toBe(true);
    expect(salaryTotal(ledger)).toBe(10488.6);
  });

  it("does not treat Mom/Chrystal movements as merchant spending", () => {
    const people = ledger.filter((t) => ["Mom", "Chrystal Bain"].includes(t.counterparty));
    expect(people.length).toBeGreaterThan(10);
    expect(people.every((t) => !t.countsAsMerchantSpend)).toBe(true);
    expect(people.every((t) => t.countsAsPersonalTransfer || t.flowKind === "possible_passthrough")).toBe(true);
  });

  it("does not invent ATM spending categories", () => {
    const atm = ledger.filter((t) => t.isCashWithdrawal);
    expect(atm.length).toBeGreaterThan(5);
    expect(atm.every((t) => !t.countsAsMerchantSpend)).toBe(true);
    expect(atm.every((t) => t.reviewReason)).toBeTruthy();
  });

  it("does not count refunds as salary", () => {
    const refunds = ledger.filter((t) => t.isRefund);
    expect(refunds.length).toBeGreaterThan(0);
    expect(refunds.every((t) => !t.countsAsIncome)).toBe(true);
  });

  it("excludes transfers, ATM, and fees from merchant spend totals", () => {
    const spend = economicSpending(ledger);
    const naiveOut = round2(ledger.filter((t) => t.direction === "out").reduce((s, t) => s + t.amount, 0));
    expect(spend).toBeLessThan(naiveOut);
    expect(spend).toBeGreaterThan(5000);
  });

  it("nets Mom as money paid, not as disappearing informal debt", () => {
    const mom = personNets(ledger).find((p) => p.name === "Mom");
    expect(mom).toBeTruthy();
    expect(mom!.out).toBe(1900);
    expect(mom!.in).toBe(900);
    expect(mom!.netOut).toBe(1000);
  });
});

describe("payday cycles", () => {
  it("marks every historic cycle unsustainable against a B$100 floor", () => {
    const cycles = paydayCycles(ledger);
    expect(cycles).toHaveLength(6);
    expect(cycles.every((c) => c.paycheck === 1748.1)).toBe(true);
    expect(cycles.every((c) => !c.sustainable)).toBe(true);
  });
});

describe("free money and purchase engine", () => {
  it("subtracts protected savings from assumed cash", () => {
    const state = defaultPlanning();
    state.paydayPosted = true;
    const pos = currentPosition(state);
    expect(pos.assumedBalance).toBe(round2(26.91 + 1379.1));
    expect(pos.spokenForKnown.some((s) => s.id === "protected" && s.amount === 100)).toBe(true);
    expect(pos.freeMoneyCertifiable).toBe(false);
  });

  it("refuses a B$180 purchase before payday posts", () => {
    const v = evaluatePurchase(defaultPlanning(), ledger, "headphones", 180, "2026-09-15", "want");
    expect(v.verdict).toBe("WAIT_UNTIL_PAYDAY");
  });

  it("does not call takeout SAFE even after payday with debts zeroed", () => {
    const state = defaultPlanning();
    state.paydayPosted = true;
    state.obligations = state.obligations.map((o) => ({ ...o, remaining: o.id === "october-flight" ? null : 0 }));
    const v = evaluatePurchase(state, ledger, "Tropical Gyros", 18, "2026-09-15", "lunch");
    expect(v.verdict).not.toBe("SAFE");
  });

  it("does not double-count the October flight in paycheck allocation", () => {
    const state = defaultPlanning();
    state.paydayPosted = true;
    state.octoberFlightMomFronts = true;
    state.obligations = state.obligations.map((o) =>
      o.id === "october-flight" ? { ...o, remaining: 330 } : o
    );
    const f = buildForecast(state, ledger);
    const flights = f.nextPayAllocation.filter((a) => /flight/i.test(a.label));
    expect(flights).toHaveLength(1);
    expect(flights[0].amount).toBe(330);
  });
});
