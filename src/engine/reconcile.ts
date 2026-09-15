import { round2 } from "./money";
import type { LedgerTransaction, StatementSummary } from "./types";

export interface ReconcileResult {
  month: string;
  opening: number;
  closing: number;
  parsedIn: number;
  parsedOut: number;
  reconstructed: number;
  statementDeposits: number;
  statementWithdrawals: number;
  closingDelta: number;
  depositDelta: number;
  withdrawalDelta: number;
  countIn: number;
  countOut: number;
  expectedCountIn: number;
  expectedCountOut: number;
  ties: boolean;
}

export const reconcileMonth = (
  summary: StatementSummary,
  rows: LedgerTransaction[]
): ReconcileResult => {
  const monthRows = rows.filter((r) => r.sourceMonth === summary.sourceMonth);
  const parsedIn = round2(monthRows.filter((r) => r.direction === "in").reduce((s, r) => s + r.amount, 0));
  const parsedOut = round2(monthRows.filter((r) => r.direction === "out").reduce((s, r) => s + r.amount, 0));
  const reconstructed = round2(summary.openingBalance + parsedIn - parsedOut);
  const closingDelta = round2(reconstructed - summary.closingBalance);
  const depositDelta = round2(parsedIn - summary.summaryDeposits);
  const withdrawalDelta = round2(parsedOut - summary.summaryWithdrawals);
  const countIn = monthRows.filter((r) => r.direction === "in").length;
  const countOut = monthRows.filter((r) => r.direction === "out").length;
  return {
    month: summary.sourceMonth,
    opening: summary.openingBalance,
    closing: summary.closingBalance,
    parsedIn,
    parsedOut,
    reconstructed,
    statementDeposits: summary.summaryDeposits,
    statementWithdrawals: summary.summaryWithdrawals,
    closingDelta,
    depositDelta,
    withdrawalDelta,
    countIn,
    countOut,
    expectedCountIn: summary.depositCount,
    expectedCountOut: summary.withdrawalCount,
    ties:
      closingDelta === 0 &&
      depositDelta === 0 &&
      withdrawalDelta === 0 &&
      countIn === summary.depositCount &&
      countOut === summary.withdrawalCount,
  };
};

export const findDuplicateKeys = (rows: LedgerTransaction[]): string[] => {
  const seen = new Map<string, string>();
  const dupes: string[] = [];
  for (const r of rows) {
    const key = `${r.date}|${r.typeRaw}|${r.amount}|${r.originalDescription}`;
    const prev = seen.get(key);
    if (prev && prev !== r.sourceStatement) dupes.push(r.id);
    else seen.set(key, r.sourceStatement);
  }
  return dupes;
};

export const economicSpending = (rows: LedgerTransaction[]): number =>
  round2(
    rows
      .filter((r) => r.countsAsMerchantSpend && r.direction === "out")
      .reduce((s, r) => s + r.amount, 0) -
      rows.filter((r) => r.isRefund).reduce((s, r) => s + r.amount, 0)
  );

export const salaryTotal = (rows: LedgerTransaction[]): number =>
  round2(rows.filter((r) => r.countsAsIncome).reduce((s, r) => s + r.amount, 0));
