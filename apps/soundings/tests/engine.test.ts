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
  it("treats employer credits as salary and not personal transfers", () => {
    const salary = ledger.filter((t) => t.flowKind === "salary");
    expect(salary).toHaveLength(6);
    expect(salary.every((t) => t.countsAsIncome)).toBe(true);
    expect(salaryTotal(ledger)).toBe(10488.6);
  });

  it("does not treat Mom/Chrystal movements as merchant spending", () => {
    const people = ledger.filter((t) => ["Mom", "Chrystal"].includes(t.counterparty));
    expect(people.length).toBeGreaterThan(10);
    expect(people.every((t) => !t.countsAsMerchantSpend)).toBe(true);
    expect(people.every((t) => t.countsAsPersonalTransfer || t.flowKind === "possible_passthrough")).toBe(true);
  });

  it("treats outbound PayPal person payments as personal, not merchant spend", () => {
    const paypalOut = ledger.filter((t) => t.counterparty === "PayPal person" && t.direction === "out");
    expect(paypalOut.length).toBeGreaterThan(0);
    expect(paypalOut.every((t) => !t.countsAsMerchantSpend)).toBe(true);
    expect(paypalOut.every((t) => t.flowKind === "personal_out")).toBe(true);
  });

  it("does not ship legal names, ATM terminal IDs, or account numbers", () => {
    const blob = rawTransactions.map((t) => `${t.originalDescription} ${t.counterpartyRaw}`).join(" ");
    expect(blob).not.toMatch(/FLORENCE|CHRYSTAL BAIN|TRAYVON|1504542/i);
    expect(blob).not.toMatch(/\b\d{7}\b/);
    expect(blob).not.toMatch(/\b\d{15,}\b/);
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

  it("calls takeout a bad idea even after payday", () => {
    const state = defaultPlanning();
    state.paydayPosted = true;
    state.obligations = state.obligations.map((o) => ({ ...o, remaining: o.id === "october-flight" ? 0 : 0 }));
    const v = evaluatePurchase(state, ledger, "Tropical Gyros", 18, "2026-09-15", "lunch");
    expect(["AFFORDABLE_BUT_BAD_IDEA", "NO", "WAIT_UNTIL_PAYDAY"]).toContain(v.verdict);
    expect(v.verdict).not.toBe("SAFE");
  });

  it("does not treat the idle October-flight scenario as an untyped debt", () => {
    const state = defaultPlanning();
    state.paydayPosted = true;
    state.obligations = state.obligations.map((o) => ({ ...o, remaining: o.id === "october-flight" ? 0 : 0 }));
    const pos = currentPosition(state);
    expect(pos.unresolved).toEqual([]);
    expect(pos.freeMoneyCertifiable).toBe(true);
  });

  it("counts the October flight once when Mom fronts it", () => {
    const state = defaultPlanning();
    state.paydayPosted = true;
    state.octoberFlightMomFronts = true;
    state.obligations = state.obligations.map((o) =>
      o.id === "october-flight" ? { ...o, remaining: 330 } : { ...o, remaining: 0 }
    );
    const forecast = buildForecast(state, ledger);
    const flightRows = forecast.nextPayAllocation.filter((a) => /flight/i.test(a.label) || a.label === "October flight (if Mom fronts)");
    expect(flightRows).toHaveLength(1);
    expect(flightRows[0]!.amount).toBe(330);
  });

  it("lets a September gap log move assumed cash when no override is set", () => {
    const state = defaultPlanning();
    state.gapEntries = [{ id: "g1", date: "2026-09-10", amount: 40, direction: "out", note: "food" }];
    const pos = currentPosition(state);
    expect(pos.assumedBalance).toBe(round2(26.91 - 40));
  });

  it("keeps saveInsteadOf100 = 0 as zero instead of snapping back to 100", () => {
    const state = defaultPlanning();
    state.saveInsteadOf100 = 0;
    const forecast = buildForecast(state, ledger);
    expect(forecast.expectedSavings).toBe(0);
  });
});
