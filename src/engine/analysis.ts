import { addDays, daysBetween, monthKey, round2 } from "./money";
import { economicSpending, salaryTotal } from "./reconcile";
import type { LedgerTransaction, PersonNet } from "./types";

export interface MonthSnapshot {
  month: string;
  salary: number;
  otherIn: number;
  merchantSpend: number;
  personalOut: number;
  personalIn: number;
  atm: number;
  fees: number;
  refunds: number;
  discretionary: number;
  essential: number;
  flexible: number;
  lowestBalance: number | null;
  closingBalance: number | null;
  txnCount: number;
}

export interface PaydayCycle {
  payday: string;
  nextPayday: string | null;
  paycheck: number;
  balanceBefore: number | null;
  balanceAfter: number | null;
  spent24h: number;
  transferred24h: number;
  spent3d: number;
  spent7d: number;
  halfwayBalance: number | null;
  lowestBalance: number | null;
  finalPrePayday: number | null;
  discretionary: number;
  essential: number;
  merchantSpend: number;
  personalOut: number;
  atm: number;
  savingsRetained: number | null;
  sustainable: boolean;
  why: string;
}

export interface MerchantAgg {
  merchant: string;
  category: string;
  total: number;
  count: number;
  months: string[];
  necessity: string;
}

export interface CategoryAgg {
  category: string;
  total: number;
  count: number;
  necessity: string;
}

export interface RecurringCandidate {
  merchant: string;
  category: string;
  monthlyEstimate: number;
  annualEstimate: number;
  count: number;
  months: number;
  amounts: number[];
  action: "KEEP" | "REVIEW" | "CUT";
  why: string;
  impact: string;
}

const lastBalanceOn = (rows: LedgerTransaction[], date: string): number | null => {
  const prior = rows.filter((r) => r.date <= date && r.runningBalance !== null);
  return prior.at(-1)?.runningBalance ?? null;
};

const firstBalanceOn = (rows: LedgerTransaction[], date: string): number | null => {
  const on = rows.filter((r) => r.date === date && r.runningBalance !== null);
  return on.at(-1)?.runningBalance ?? lastBalanceOn(rows, date);
};

export const personNets = (rows: LedgerTransaction[]): PersonNet[] => {
  const map = new Map<string, PersonNet>();
  for (const r of rows) {
    if (!r.countsAsPersonalTransfer && r.flowKind !== "possible_passthrough") continue;
    const cur = map.get(r.counterparty) ?? {
      name: r.counterparty,
      in: 0,
      out: 0,
      netOut: 0,
      countIn: 0,
      countOut: 0,
    };
    if (r.direction === "in") {
      cur.in = round2(cur.in + r.amount);
      cur.countIn += 1;
    } else {
      cur.out = round2(cur.out + r.amount);
      cur.countOut += 1;
    }
    cur.netOut = round2(cur.out - cur.in);
    map.set(r.counterparty, cur);
  }
  return [...map.values()].sort((a, b) => b.out - a.out);
};

export const monthlySnapshots = (rows: LedgerTransaction[]): MonthSnapshot[] => {
  const months = [...new Set(rows.map((r) => monthKey(r.date)))].sort();
  return months.map((month) => {
    const m = rows.filter((r) => monthKey(r.date) === month);
    const bals = m.map((r) => r.runningBalance).filter((b): b is number => b !== null);
    return {
      month,
      salary: salaryTotal(m),
      otherIn: round2(
        m.filter((r) => r.direction === "in" && !r.countsAsIncome && !r.isRefund).reduce((s, r) => s + r.amount, 0)
      ),
      merchantSpend: economicSpending(m),
      personalOut: round2(
        m.filter((r) => r.direction === "out" && (r.flowKind === "personal_out" || r.flowKind === "possible_passthrough")).reduce((s, r) => s + r.amount, 0)
      ),
      personalIn: round2(m.filter((r) => r.flowKind === "personal_in").reduce((s, r) => s + r.amount, 0)),
      atm: round2(m.filter((r) => r.isCashWithdrawal).reduce((s, r) => s + r.amount, 0)),
      fees: round2(m.filter((r) => r.isFee).reduce((s, r) => s + r.amount, 0)),
      refunds: round2(m.filter((r) => r.isRefund).reduce((s, r) => s + r.amount, 0)),
      discretionary: round2(m.filter((r) => r.countsAsMerchantSpend && r.necessity === "discretionary").reduce((s, r) => s + r.amount, 0)),
      essential: round2(m.filter((r) => r.countsAsMerchantSpend && r.necessity === "essential").reduce((s, r) => s + r.amount, 0)),
      flexible: round2(m.filter((r) => r.countsAsMerchantSpend && r.necessity === "flexible").reduce((s, r) => s + r.amount, 0)),
      lowestBalance: bals.length ? Math.min(...bals) : null,
      closingBalance: bals.at(-1) ?? null,
      txnCount: m.length,
    };
  });
};

export const paydayCycles = (rows: LedgerTransaction[]): PaydayCycle[] => {
  const pays = rows.filter((t) => t.flowKind === "salary");
  return pays.map((pay, i) => {
    const payday = pay.date;
    const nextPayday = pays[i + 1]?.date ?? null;
    const end = nextPayday ? addDays(nextPayday, -1) : rows.at(-1)?.date ?? payday;
    const beforeRows = rows.filter((r) => r.date < payday && r.runningBalance !== null);
    const balanceBefore = beforeRows.at(-1)?.runningBalance ?? null;
    const dayRows = rows.filter((r) => r.date === payday);
    const balanceAfter = dayRows.filter((r) => r.runningBalance !== null).at(-1)?.runningBalance ?? null;
    const inWindow = (from: string, to: string) => rows.filter((r) => r.date >= from && r.date <= to);
    const d0 = inWindow(payday, payday);
    const d3 = inWindow(payday, addDays(payday, 2));
    const d7 = inWindow(payday, addDays(payday, 6));
    const cycle = inWindow(payday, end);
    const merchant = (set: LedgerTransaction[]) => economicSpending(set);
    const personalOut = (set: LedgerTransaction[]) =>
      round2(set.filter((r) => r.direction === "out" && (r.flowKind === "personal_out" || r.flowKind === "possible_passthrough")).reduce((s, r) => s + r.amount, 0));
    const halfwayDate = addDays(payday, Math.floor(Math.max(daysBetween(payday, end), 1) / 2));
    const halfRows = rows.filter((r) => r.date <= halfwayDate && r.date >= payday && r.runningBalance !== null);
    const cycleBals = cycle.map((r) => r.runningBalance).filter((b): b is number => b !== null);
    const lowest = cycleBals.length ? Math.min(...cycleBals) : null;
    const finalPre = rows.filter((r) => r.date <= end && r.runningBalance !== null).at(-1)?.runningBalance ?? null;
    const disc = round2(cycle.filter((r) => r.countsAsMerchantSpend && r.necessity === "discretionary").reduce((s, r) => s + r.amount, 0));
    const ess = round2(cycle.filter((r) => r.countsAsMerchantSpend && r.necessity === "essential").reduce((s, r) => s + r.amount, 0));
    const spent24h = round2(merchant(d0) + personalOut(d0) + d0.filter((r) => r.isCashWithdrawal || r.isFee).reduce((s, r) => s + r.amount, 0));
    const transferred24h = personalOut(d0);
    const sustainable = (finalPre ?? 0) >= 100 && (lowest ?? 0) >= 50;
    const why = sustainable
      ? "Ended the cycle with at least B$100 still in the account."
      : `Paycheck was B$${pay.amount.toFixed(2)}. Within 24 hours ${spent24h.toFixed(2)} moved. Cycle finished near B$${(finalPre ?? 0).toFixed(2)}.`;
    return {
      payday,
      nextPayday,
      paycheck: pay.amount,
      balanceBefore,
      balanceAfter,
      spent24h,
      transferred24h,
      spent3d: round2(merchant(d3) + personalOut(d3)),
      spent7d: round2(merchant(d7) + personalOut(d7)),
      halfwayBalance: halfRows.at(-1)?.runningBalance ?? null,
      lowestBalance: lowest,
      finalPrePayday: finalPre,
      discretionary: disc,
      essential: ess,
      merchantSpend: merchant(cycle),
      personalOut: personalOut(cycle),
      atm: round2(cycle.filter((r) => r.isCashWithdrawal).reduce((s, r) => s + r.amount, 0)),
      savingsRetained: finalPre,
      sustainable,
      why,
    };
  });
};

export const merchantAgg = (rows: LedgerTransaction[]): MerchantAgg[] => {
  const map = new Map<string, MerchantAgg>();
  for (const r of rows) {
    if (!r.countsAsMerchantSpend || r.direction !== "out") continue;
    const cur = map.get(r.merchant) ?? {
      merchant: r.merchant,
      category: r.category,
      total: 0,
      count: 0,
      months: [],
      necessity: r.necessity,
    };
    cur.total = round2(cur.total + r.amount);
    cur.count += 1;
    const mk = monthKey(r.date);
    if (!cur.months.includes(mk)) cur.months.push(mk);
    map.set(r.merchant, cur);
  }
  return [...map.values()].sort((a, b) => b.total - a.total);
};

export const categoryAgg = (rows: LedgerTransaction[]): CategoryAgg[] => {
  const map = new Map<string, CategoryAgg>();
  for (const r of rows) {
    if (!r.countsAsMerchantSpend || r.direction !== "out") continue;
    const cur = map.get(r.category) ?? { category: r.category, total: 0, count: 0, necessity: r.necessity };
    cur.total = round2(cur.total + r.amount);
    cur.count += 1;
    map.set(r.category, cur);
  }
  return [...map.values()].sort((a, b) => b.total - a.total);
};

export const spendByDay = (rows: LedgerTransaction[]): { date: string; amount: number }[] => {
  const map = new Map<string, number>();
  for (const r of rows) {
    if (!r.countsAsMerchantSpend || r.direction !== "out") continue;
    map.set(r.date, round2((map.get(r.date) ?? 0) + r.amount));
  }
  return [...map.entries()].map(([date, amount]) => ({ date, amount })).sort((a, b) => a.date.localeCompare(b.date));
};

export const largestPurchases = (rows: LedgerTransaction[], n = 12): LedgerTransaction[] =>
  [...rows]
    .filter((r) => r.countsAsMerchantSpend && r.direction === "out")
    .sort((a, b) => b.amount - a.amount)
    .slice(0, n);

export const recurringCandidates = (rows: LedgerTransaction[]): RecurringCandidate[] => {
  const merchants = merchantAgg(rows).filter((m) => m.count >= 2);
  return merchants
    .map((m) => {
      const tx = rows.filter((r) => r.merchant === m.merchant && r.direction === "out" && r.countsAsMerchantSpend);
      const monthlyEstimate = round2(m.total / Math.max(m.months.length, 1));
      const annualEstimate = round2(monthlyEstimate * 12);
      let action: RecurringCandidate["action"] = "REVIEW";
      let why = "Repeats, but amount or purpose varies.";
      if (m.merchant === "Aliv") {
        action = "KEEP";
        why = "Phone/data is essential. The problem is drip top-ups, not the existence of the line.";
      } else if (m.category === "Transportation") {
        action = "KEEP";
        why = "Fuel/transit is how you move. Cut rides, not the category label.";
      } else if (m.merchant === "Tropical Gyros" || m.category === "Dining") {
        action = "CUT";
        why = "This is the pattern that quietly empties the account after payday.";
      } else if (["Anthropic Claude", "Venice.ai", "Patreon", "Roblox", "PlayStation", "Snapchat"].includes(m.merchant)) {
        action = "CUT";
        why = "Nice-to-have software on a paycheck that already cannot hold B$100.";
      } else if (m.merchant === "Amazon Prime") {
        action = "REVIEW";
        why = "Small, but it does not earn its keep while grocery and takeout overshoot.";
      } else if (m.merchant === "Apple") {
        action = "CUT";
        why = "Apple charges are frequent and lumpy. Pause app spend until debts are current.";
      } else if (m.merchant === "Fitness Connection") {
        action = "REVIEW";
        why = "Two large charges (April, July), not a clean monthly debit. Confirm if this is still active.";
      } else if (m.merchant === "Quizlet") {
        action = "REVIEW";
        why = "Learning tool. Keep only if you actually use it this month.";
      } else if (m.necessity === "essential") {
        action = "KEEP";
        why = "Required category.";
      }
      const impact =
        monthlyEstimate >= 40
          ? `About ${monthlyEstimate.toFixed(0)} a month / ${annualEstimate.toFixed(0)} a year — this moves the needle.`
          : `About ${monthlyEstimate.toFixed(0)} a month. Do not pretend cancelling this fixes a 500-size problem.`;
      return {
        merchant: m.merchant,
        category: m.category,
        monthlyEstimate,
        annualEstimate,
        count: m.count,
        months: m.months.length,
        amounts: tx.map((t) => t.amount),
        action,
        why,
        impact,
      };
    })
    .sort((a, b) => b.monthlyEstimate - a.monthlyEstimate);
};

export const behaviorNarrative = (rows: LedgerTransaction[], cycles: PaydayCycle[]): string[] => {
  const months = monthlySnapshots(rows);
  const gyros = merchantAgg(rows).find((m) => m.merchant === "Tropical Gyros");
  const dining = categoryAgg(rows).find((c) => c.category === "Dining");
  const apple = merchantAgg(rows).find((m) => m.merchant === "Apple");
  const last = cycles.at(-1);
  const first = cycles[0];
  const closings = months.map((m) => m.closingBalance ?? 0);
  const worsening = (closings.at(-1) ?? 0) < (closings[0] ?? 0);
  const lines: string[] = [];
  lines.push(
    `From March through August you were paid B$${salaryTotal(rows).toFixed(2)} by Royal Star. Merchant spending was B$${economicSpending(rows).toFixed(2)}. That is not a budgeting vibe. That is the paycheck being spent.`
  );
  if (first && last) {
    lines.push(
      `Every observed payday cycle ended broke. March opened the study at B$0.09. August 31 closed at B$26.91. The B$100 protected floor never existed as actual cash at month end.`
    );
  }
  if (dining) {
    lines.push(
      `Dining alone was B$${dining.total.toFixed(2)} across the window. Tropical Gyros is the signature leak${gyros ? ` at B$${gyros.total.toFixed(2)} over ${gyros.count} visits` : ""}.`
    );
  }
  if (apple) {
    lines.push(`Apple charges summed to B$${apple.total.toFixed(2)} — death by small taps, not one splurge.`);
  }
  const aug = months.find((m) => m.month === "2026-08");
  if (aug) {
    lines.push(
      `August was the tell: payday on the 11th, a Florida run immediately after, B$400 to Mom on the 17th, then Super Value B$279.49 on the 19th. The account was at B$26.91 by the 31st.`
    );
  }
  lines.push(
    worsening
      ? "The trend is not improvement. Closing cash got thinner, not thicker."
      : "Closing cash is not building."
  );
  lines.push(
    "Why a paycheck feels like nothing: the first 24–72 hours absorb family transfers, groceries, phone, and impulse. There is no assignment for savings before discretionary starts, so discretionary starts immediately."
  );
  return lines;
};

export { lastBalanceOn, firstBalanceOn };
