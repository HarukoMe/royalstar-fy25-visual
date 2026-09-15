import { daysBetween, round2 } from "./money";
import type { LedgerTransaction, ManualObligation, PlanningState } from "./types";
import { merchantAgg } from "./analysis";

export interface SpokenForItem {
  id: string;
  label: string;
  amount: number;
  certainty: "actual" | "known_future" | "projected";
  needed: boolean;
}

export interface Position {
  lastKnownBalance: number;
  lastKnownDate: string;
  assumedBalance: number;
  paycheckIncluded: boolean;
  protected: number;
  spokenForKnown: SpokenForItem[];
  spokenForKnownTotal: number;
  unresolved: ManualObligation[];
  freeMoney: number;
  freeMoneyCertifiable: boolean;
  daysToPayday: number;
  nextPayday: string;
  expectedPay: number;
  safeDaily: number;
  safeWeekly: number;
  canSpendToday: boolean;
  paceProjection: number | null;
}

export const knownSpokenFor = (state: PlanningState): SpokenForItem[] => {
  const items: SpokenForItem[] = [];
  items.push({
    id: "protected",
    label: "Protected savings floor",
    amount: state.protectedSavingsTarget,
    certainty: "known_future",
    needed: true,
  });
  const fees = 8.8;
  items.push({ id: "fees", label: "Likely bank fees this cycle", amount: fees, certainty: "projected", needed: true });
  items.push({ id: "phone", label: "Phone/data (one Aliv load)", amount: 40, certainty: "projected", needed: true });
  items.push({ id: "groceries", label: "Groceries this cycle (capped)", amount: 160, certainty: "projected", needed: true });
  items.push({ id: "fuel", label: "Fuel/transit this cycle", amount: 55, certainty: "projected", needed: true });
  for (const ob of state.obligations) {
    if (ob.remaining !== null && ob.remaining > 0) {
      items.push({
        id: ob.id,
        label: ob.name,
        amount: ob.remaining,
        certainty: "actual",
        needed: true,
      });
    }
  }
  return items;
};

export const currentPosition = (state: PlanningState): Position => {
  const assumed = state.currentBalanceOverride ?? state.lastKnownBalance + (state.paydayPosted ? state.expectedPayAmount : 0);
  const spoken = knownSpokenFor(state);
  const spokenForKnownTotal = round2(spoken.reduce((s, i) => s + i.amount, 0));
  const unresolved = state.obligations.filter((o) => o.remaining === null);
  const free = round2(assumed - spokenForKnownTotal);
  const daysToPayday = state.paydayPosted
    ? Math.max(1, daysBetween(state.asOfDate, state.followingPayday))
    : Math.max(0, daysBetween(state.asOfDate, state.nextPayday));
  const horizon = Math.max(daysToPayday, 1);
  const safeDaily = round2(Math.max(free, 0) / horizon);
  const safeWeekly = round2(safeDaily * 7);
  const canSpendToday = state.paydayPosted ? free > 20 && unresolved.length === 0 : assumed > 40 && free > 0;
  return {
    lastKnownBalance: state.lastKnownBalance,
    lastKnownDate: state.lastKnownDate,
    assumedBalance: round2(assumed),
    paycheckIncluded: state.paydayPosted,
    protected: state.protectedSavingsTarget,
    spokenForKnown: spoken,
    spokenForKnownTotal,
    unresolved,
    freeMoney: free,
    freeMoneyCertifiable: unresolved.length === 0 && (state.paydayPosted || state.currentBalanceOverride !== null),
    daysToPayday,
    nextPayday: state.paydayPosted ? state.followingPayday : state.nextPayday,
    expectedPay: state.expectedPayAmount,
    safeDaily,
    safeWeekly,
    canSpendToday: canSpendToday && free > 0,
    paceProjection: null,
  };
};

export interface TodayPlan {
  headline: string;
  tone: "safe" | "caution" | "danger";
  pay: string;
  save: string;
  doNotTouch: string;
  spendUpTo: string;
  orders: string[];
  nextPaycheckMust: string[];
  sacrificesThatMatter: string[];
  sacrificesThatDont: string[];
}

export const todayPlan = (state: PlanningState, pos: Position, ledger: LedgerTransaction[]): TodayPlan => {
  const gyros = merchantAgg(ledger).find((m) => m.merchant === "Tropical Gyros");
  const dining = merchantAgg(ledger)
    .filter((m) => m.category === "Dining")
    .reduce((s, m) => s + m.total, 0);

  if (!state.paydayPosted) {
    return {
      headline: "Do not spend. The September statement is missing and the last snapshot is B$26.91.",
      tone: "danger",
      pay: "Nothing until the paycheck posts and you type what you actually owe.",
      save: "When B$1,379.10 posts, move B$100 to protected before anyone else gets paid.",
      doNotTouch: "The last B$26.91 — treat it as already gone to fees, not as spending money.",
      spendUpTo: "B$0 until payday is confirmed.",
      orders: [
        "Confirm whether today’s Royal Star deposit of B$1,379.10 has posted.",
        "Enter the real current balance. Blind September 1–15 spending is a hole in the map.",
        `Enter remaining amounts for Mom, rent, and groceries owed. Until then free money is not certifiable.`,
        "Do not buy food out, Apple stuff, or send family money from the leftover August cash.",
      ],
      nextPaycheckMust: [
        `Cover protected savings of B$100 first — you have not held this at any month-end since March.`,
        "Pay named debts with typed amounts, not vibes.",
        "Buy groceries once, not every other day.",
        "Leave enough to last until 15 October on a smaller paycheck than March–August (B$1,379.10 vs B$1,748.10).",
      ],
      sacrificesThatMatter: [
        `Dining: B$${dining.toFixed(0)} across six months. Cut Tropical Gyros${gyros ? ` (B$${gyros.total.toFixed(0)} / ${gyros.count} visits)` : ""} to B$0 until 30 September.`,
        "Apple / AI / extra apps: lumpy and optional. Pause Anthropic (B$20.25) and Venice immediately.",
        "Florida-style shopping days: August 12–17 is how a paycheck dies.",
        "Payday-day family transfers before savings: historically B$200–500 leaves the account within hours.",
      ],
      sacrificesThatDont: [
        "Patreon B$1.09/month. Cancelling it does not fix this.",
        "Obsessing over a B$3 convenience-store tap while Super Value runs B$140–280 after payday.",
        "50/30/20 rules. Your constraint is cash-on-hand before the 15th, not a textbook ratio.",
      ],
    };
  }

  const free = pos.freeMoney;
  const tone = free < 0 ? "danger" : free < 150 ? "caution" : "safe";
  const spendCap = Math.max(0, round2(Math.min(free * 0.25, pos.safeDaily * 2)));
  return {
    headline:
      free < 0
        ? "The paycheck is already spoken for. Do not add purchases."
        : pos.freeMoneyCertifiable
          ? `You may spend up to ${spendCap.toFixed(2)} today if nothing else hits.`
          : "Paycheck is in, but free money is uncertified until debts are typed.",
    tone,
    pay: pos.unresolved.length
      ? "Type Mom / rent / groceries owed, then pay the highest-priority named amount today — not a round number guess."
      : "Pay the highest-priority obligation on the plan, then stop.",
    save: `Move B$100 into protected savings immediately, before Tropical Gyros, Apple, or family.`,
    doNotTouch: `Protected B$100 plus any typed debt remaining.`,
    spendUpTo: pos.unresolved.length ? "B$0 discretionary until obligations are entered." : `B$${spendCap.toFixed(2)} today.`,
    orders: [
      `Park B$100 now. This is not optional. Six months of statements never ended with that floor intact.`,
      pos.unresolved.length
        ? "Enter remaining to Mom, rent owed, and groceries owed. The system will not invent those numbers."
        : "Follow the obligation stack: overdue housing/food debts, then Mom, then smaller people-debts.",
      "One grocery shop, cap B$160. August 19's B$279.49 Super Value after a trip is how you feel broke.",
      "One Aliv load, B$40. Stop the B$5–40 drip.",
      `No Tropical Gyros before ${state.nextPayday}. Dining is the pattern that keeps killing the balance.`,
      `Safe daily after the floor and known reserves: B$${Math.max(pos.safeDaily, 0).toFixed(2)}. Weekly: B$${Math.max(pos.safeWeekly, 0).toFixed(2)}.`,
    ],
    nextPaycheckMust: [
      state.octoberFlightMomFronts
        ? `If Mom fronts the B$330 flight, the 15 October check must repay B$330 AND still park B$100 AND still feed you. That check will feel like it vanished. Prefer paying the flight yourself later over financing it with Mom unless the typed debts are already zero.`
        : "Do not add the October flight onto Mom unless October 15 is already mapped.",
      "Rebuild a closing balance above B$100 for the first time in this history.",
      "Keep family transfers to typed remaining balances, not whatever is in the account on the 15th.",
    ],
    sacrificesThatMatter: [
      "Skip takeout for 14 days: that is the only category large enough and optional enough to change the month.",
      "Do not do another Florida shopping burst on this smaller net pay.",
      "Cut Claude + Venice this cycle (about B$35+). That is a grocery day.",
    ],
    sacrificesThatDont: [
      "Cancelling Patreon B$1.09.",
      "Agonizing over a B$4 pharmacy add-on.",
      "Rearranging 50/30/20 buckets.",
    ],
  };
};

export const nextActionsStack = (state: PlanningState, pos: Position) => {
  const rows = [
    { rank: 1, title: "Confirm cash", detail: pos.paycheckIncluded ? `Working balance B$${pos.assumedBalance.toFixed(2)}` : "Payday not marked posted." },
    { rank: 2, title: "Park protected savings", detail: `B$${state.protectedSavingsTarget.toFixed(2)} — unavailable for spending.` },
    { rank: 3, title: "Name the debts", detail: pos.unresolved.length ? `${pos.unresolved.length} unresolved obligations` : "Amounts entered." },
    { rank: 4, title: "Feed the house", detail: "Groceries cap B$160 this cycle." },
    { rank: 5, title: "Keep the phone on", detail: "Aliv B$40 once." },
    { rank: 6, title: "Move", detail: "Fuel B$55 reserve." },
    { rank: 7, title: "Discretionary", detail: pos.freeMoneyCertifiable ? `Only after the above. Cap today accordingly.` : "Locked until debts are typed." },
  ];
  return rows;
};
