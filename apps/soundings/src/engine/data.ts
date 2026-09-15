import raw from "../data/raw-transactions.json";
import summaries from "../data/statement-summaries.json";
import { applyRules, type CorrectionRule } from "./rules";
import { applyBalanceWalk, buildLedger } from "./ledger";
import type { LedgerTransaction, RawTransaction, StatementSummary } from "./types";

export const rawTransactions = raw as RawTransaction[];
export const statementSummaries = summaries as StatementSummary[];

export const makeLedger = (rules: CorrectionRule[] = []): LedgerTransaction[] => {
  const opening = statementSummaries[0]?.openingBalance ?? 0;
  const classified = applyRules(buildLedger(rawTransactions), rules);
  return applyBalanceWalk(classified, opening, "2026-01-01");
};
