import { addDays, round2 } from "./money";
import { currentPosition, knownSpokenFor } from "./position";
import type { LedgerTransaction, PlanningState } from "./types";
import { paydayCycles } from "./analysis";

export type FactKind = "actual" | "known_future" | "projected";

export interface ForecastPoint {
  date: string;
  label: string;
  balance: number;
  kind: FactKind;
}

export interface Forecast {
  points: ForecastPoint[];
  beforeNextPayday: number;
  afterObligations: number;
  expectedSavings: number;
  outstandingTypedDebt: number;
  discretionaryRemaining: number;
  nextPayAllocation: { label: string; amount: number }[];
  warnings: string[];
}

export const buildForecast = (state: PlanningState, ledger: LedgerTransaction[]): Forecast => {
  const pos = currentPosition(state);
  const cycles = paydayCycles(ledger);
  const avgDailyDisc =
    cycles.length === 0
      ? 15
      : round2(
          cycles.reduce((s, c) => s + c.discretionary, 0) /
            Math.max(
              cycles.reduce((s, c) => s + Math.max(1, (Date.parse(c.nextPayday ?? c.payday) - Date.parse(c.payday)) / 86400000), 0),
              1
            )
        );

  let cash = pos.assumedBalance;
  const points: ForecastPoint[] = [
    {
      date: state.lastKnownDate,
      label: "Last statement",
      balance: state.lastKnownBalance,
      kind: "actual",
    },
  ];
  if (state.asOfDate !== state.lastKnownDate) {
    points.push({
      date: state.asOfDate,
      label: state.paydayPosted ? "Today (payday included)" : "Today (assumed)",
      balance: cash,
      kind: state.currentBalanceOverride !== null || state.paydayPosted ? "known_future" : "projected",
    });
  }

  const spoken = knownSpokenFor(state).filter((s) => s.id !== "protected");
  const afterObligations = round2(cash - spoken.reduce((s, i) => s + i.amount, 0) - state.protectedSavingsTarget);
  const weekend = state.weekendSpendWhatIf;
  if (weekend > 0) cash = round2(cash - weekend);
  if (state.freezeDiscretionaryDays > 0) {
    cash = round2(cash + Math.min(avgDailyDisc, 12) * state.freezeDiscretionaryDays * 0.25);
  }
  if (state.saveInsteadOf100 > state.protectedSavingsTarget) {
    cash = round2(cash - (state.saveInsteadOf100 - state.protectedSavingsTarget));
  }
  if (state.payAllFamilyNow) {
    const typed = state.obligations.filter((o) => o.kind === "family_debt" && o.remaining);
    const sum = typed.reduce((s, o) => s + (o.remaining ?? 0), 0);
    cash = round2(cash - sum);
  }

  const nextPay = state.paydayPosted ? state.followingPayday : state.nextPayday;
  const beforeNextPayday = round2(Math.max(0, cash - Math.max(avgDailyDisc, 8) * pos.daysToPayday * 0.35));
  points.push({
    date: addDays(nextPay, -1),
    label: "Projected pre-payday",
    balance: beforeNextPayday,
    kind: "projected",
  });

  const allocation = [
    { label: "Protected savings", amount: state.saveInsteadOf100 || state.protectedSavingsTarget },
    { label: "Groceries cap", amount: 160 },
    { label: "Phone", amount: 40 },
    { label: "Fuel", amount: 55 },
    { label: "Fees", amount: 8.8 },
  ];
  if (state.octoberFlightMomFronts && nextPay >= "2026-10-01") {
    allocation.unshift({ label: "Mom — October flight", amount: state.octoberFlightAmount });
  }
  const typedNow = state.obligations.filter((o) => o.remaining && o.remaining > 0);
  for (const o of typedNow) allocation.unshift({ label: o.name, amount: o.remaining as number });

  const payAmt = state.expectedPayAmount;
  const allocSum = round2(allocation.reduce((s, a) => s + a.amount, 0));
  points.push({
    date: nextPay,
    label: "After next paycheck + recommended allocation",
    balance: round2(beforeNextPayday + payAmt - Math.min(allocSum, payAmt)),
    kind: "projected",
  });

  const outstandingTypedDebt = round2(state.obligations.reduce((s, o) => s + (o.remaining ?? 0), 0));
  const warnings: string[] = [
    "Projections are not facts. September 1–15 is not in the ledger.",
    "Pace uses your historical discretionary leak, damped — not a promise.",
  ];
  if (state.octoberFlightMomFronts) {
    warnings.push(
      `Mom-fronts-flight: B$${state.octoberFlightAmount.toFixed(2)} becomes a debt. The following paycheck must retire it or you repeat the “paycheck disappeared” month.`
    );
  }
  return {
    points,
    beforeNextPayday,
    afterObligations,
    expectedSavings: state.saveInsteadOf100 || state.protectedSavingsTarget,
    outstandingTypedDebt,
    discretionaryRemaining: round2(Math.max(afterObligations, 0)),
    nextPayAllocation: allocation,
    warnings,
  };
};
