import { classifyRaw } from "./classify";
import { addDays, daysBetween, monthKey, round2 } from "./money";
import type { LedgerTransaction, RawTransaction, RecurringStatus } from "./types";

const stampRecurring = (rows: LedgerTransaction[]): LedgerTransaction[] => {
  const byMerchant = new Map<string, LedgerTransaction[]>();
  for (const row of rows) {
    const list = byMerchant.get(row.merchant) ?? [];
    list.push(row);
    byMerchant.set(row.merchant, list);
  }

  const status = new Map<string, RecurringStatus>();
  for (const [merchant, list] of byMerchant) {
    const months = new Set(list.map((t) => monthKey(t.date)));
    const out = list.filter((t) => t.direction === "out" && t.flowKind === "merchant");
    if (list.some((t) => t.flowKind === "salary")) {
      status.set(merchant, "salary");
      continue;
    }
    if (list.some((t) => t.flowKind === "personal_out" || t.flowKind === "personal_in")) {
      status.set(merchant, months.size >= 2 ? "repeat_person" : "once");
      continue;
    }
    if (out.length >= 2 && months.size >= 2) {
      const amounts = out.map((t) => t.amount).sort((a, b) => a - b);
      const median = amounts[Math.floor(amounts.length / 2)];
      const similar = out.filter((t) => Math.abs(t.amount - median) / Math.max(median, 1) <= 0.2);
      if (merchant === "Aliv") status.set(merchant, "repeat_topup");
      else if (similar.length >= 2 && (merchant.includes("Prime") || similar.length >= 3 || months.size >= 3))
        status.set(merchant, list[0].category === "Subscriptions" ? "subscription" : "repeat_merchant");
      else if (list[0].category === "Subscriptions") status.set(merchant, "subscription");
      else status.set(merchant, "repeat_merchant");
    } else if (list[0].category === "Subscriptions" && out.length) {
      status.set(merchant, "subscription");
    } else {
      status.set(merchant, "once");
    }
  }

  return rows.map((row) => ({
    ...row,
    recurringStatus: status.get(row.merchant) ?? "unknown",
  }));
};

const markPassthroughs = (rows: LedgerTransaction[]): LedgerTransaction[] => {
  const byDay = new Map<string, LedgerTransaction[]>();
  for (const row of rows) {
    const list = byDay.get(row.date) ?? [];
    list.push(row);
    byDay.set(row.date, list);
  }
  const flagged = new Set<string>();
  for (const dayRows of byDay.values()) {
    const ins = dayRows.filter((t) => t.flowKind === "personal_in");
    const outs = dayRows.filter((t) => t.flowKind === "personal_out");
    for (const inn of ins) {
      for (const out of outs) {
        if (inn.counterparty === out.counterparty) continue;
        const ratio = out.amount / inn.amount;
        if (ratio >= 0.7 && ratio <= 1.0 && inn.amount >= 50) {
          flagged.add(out.id);
          flagged.add(inn.id);
        }
      }
    }
  }
  return rows.map((row) => {
    if (!flagged.has(row.id)) return row;
    return {
      ...row,
      flowKind: row.direction === "out" ? "possible_passthrough" : row.flowKind,
      flags: [...row.flags, "possible_passthrough"],
      reviewReason:
        row.reviewReason ??
        "Same-day personal inflow and similar outflow to a different person — possible pass-through, not spending.",
    };
  });
};

export const buildLedger = (raw: RawTransaction[]): LedgerTransaction[] => {
  const sorted = [...raw].sort((a, b) => a.date.localeCompare(b.date) || a.id.localeCompare(b.id));
  let classified: LedgerTransaction[] = sorted.map((txn) => {
    const hit = classifyRaw(txn);
    const isTransfer = hit.flowKind === "personal_in" || hit.flowKind === "personal_out" || hit.flowKind === "possible_passthrough";
    const isRefund = hit.flowKind === "refund";
    const isReimbursement = false;
    const isCashWithdrawal = hit.flowKind === "atm";
    const isFee = hit.flowKind === "fee";
    const isInterest = hit.flowKind === "interest";
    const countsAsMerchantSpend = hit.flowKind === "merchant" || hit.flowKind === "ambiguous";
    const countsAsIncome = hit.flowKind === "salary";
    const countsAsPersonalTransfer = isTransfer;
    return {
      ...txn,
      merchant: hit.merchant,
      counterparty: hit.counterparty,
      category: hit.category,
      subcategory: hit.subcategory,
      flowKind: hit.flowKind,
      necessity: hit.necessity,
      recurringStatus: "unknown",
      isTransfer,
      isRefund,
      isReimbursement,
      isCashWithdrawal,
      isFee,
      isInterest,
      countsAsMerchantSpend,
      countsAsIncome,
      countsAsPersonalTransfer,
      classificationConfidence: hit.confidence,
      flags: hit.flags,
      reviewReason: hit.reviewReason,
    };
  });
  classified = markPassthroughs(classified);
  classified = stampRecurring(classified);
  return classified;
};

export const applyBalanceWalk = (
  rows: LedgerTransaction[],
  opening: number,
  openingDate: string
): LedgerTransaction[] => {
  let bal = opening;
  return rows.map((row) => {
    if (row.date < openingDate) return row;
    bal = round2(bal + row.signedAmount);
    return { ...row, runningBalance: row.runningBalance ?? bal };
  });
};

export const paydayDates = (rows: LedgerTransaction[]): string[] =>
  rows.filter((t) => t.flowKind === "salary").map((t) => t.date);

export const cycleFor = (date: string, paydays: string[]): { start: string; end: string; payday: string | null } => {
  const prior = [...paydays].filter((p) => p <= date).sort();
  const next = [...paydays].filter((p) => p > date).sort();
  const payday = prior.at(-1) ?? null;
  const start = payday ?? date;
  const end = next[0] ? addDays(next[0], -1) : date;
  return { start, end, payday };
};

export const daysUntil = (from: string, to: string): number => Math.max(0, daysBetween(from, to));
