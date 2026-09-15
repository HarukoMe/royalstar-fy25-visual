import { round2 } from "./money";
import { currentPosition } from "./position";
import type { PlanningState, PurchaseVerdict, Verdict } from "./types";
import type { LedgerTransaction } from "./types";

export const evaluatePurchase = (
  state: PlanningState,
  ledger: LedgerTransaction[],
  item: string,
  price: number,
  when: string,
  reason: string
): PurchaseVerdict => {
  const pos = currentPosition(state);
  const days = Math.max(1, pos.daysToPayday);
  const freeBefore = pos.freeMoney;
  const freeAfter = round2(freeBefore - price);
  const dailyBefore = round2(Math.max(freeBefore, 0) / days);
  const dailyAfter = round2(Math.max(freeAfter, 0) / days);
  const cuts: string[] = [];
  let verdict: Verdict = "SAFE";
  let text = "";
  const lower = `${item} ${reason}`.toLowerCase();
  const isFoodOut = /gyro|pizza|kfc|wendy|mcdonald|takeout|lunch|dinner|dine/.test(lower);
  const isApp = /apple|claude|venice|game|prime|roblox/.test(lower);
  const historicGyros = ledger.some((t) => t.merchant === "Tropical Gyros");
  const buyDate = when || state.asOfDate;
  const nextPay = state.paydayPosted ? state.followingPayday : state.nextPayday;
  const beforeThisPayday = buyDate < state.nextPayday && !state.paydayPosted;

  if (beforeThisPayday && (state.currentBalanceOverride ?? state.lastKnownBalance) < price + 15) {
    verdict = "WAIT_UNTIL_PAYDAY";
    text = `Do not buy ${item} for B$${price.toFixed(2)} before the B$${state.expectedPayAmount.toFixed(2)} paycheck posts. Last known cash cannot absorb it without going dark.`;
  } else if (price >= (state.currentBalanceOverride ?? pos.assumedBalance) && state.paydayPosted) {
    verdict = "NO";
    text = `No. B$${price.toFixed(2)} is at or above assumed cash of B$${pos.assumedBalance.toFixed(2)}.`;
  } else if (!pos.freeMoneyCertifiable && price > 15) {
    verdict = "WAIT_UNTIL_PAYDAY";
    if (state.paydayPosted) {
      verdict = "NO";
      text = `Technically there is cash, but free money is uncertified because ${pos.unresolved.map((u) => u.name).join(", ") || "obligations"} still have no remaining amount. Do not spend B$${price.toFixed(2)} on ${item} until those numbers exist.`;
    } else {
      text = `Wait. September activity is not on a statement, debts are untyped, and this is not a survival purchase.`;
    }
  } else if (freeAfter < 0) {
    verdict = "NO";
    text = `No. This drops true free cash from B$${freeBefore.toFixed(2)} to B$${freeAfter.toFixed(2)}. Protected savings and spoken-for money would be raided.`;
  } else if ((isFoodOut || (historicGyros && /gyro/i.test(item))) && price >= 8) {
    verdict = "AFFORDABLE_BUT_BAD_IDEA";
    text = `You can tap B$${price.toFixed(2)} for ${item}, but takeout is the pattern that keeps killing your balance. Free cash would fall from B$${freeBefore.toFixed(2)} to B$${freeAfter.toFixed(2)}; safe daily from B$${dailyBefore.toFixed(2)} to B$${dailyAfter.toFixed(2)}.`;
    cuts.push("Replace with food already bought in the grocery cap.");
    if (buyDate > nextPay) text += ` Even dated ${buyDate}, this still competes with the grocery cap.`;
  } else if (isApp) {
    verdict = "AFFORDABLE_BUT_BAD_IDEA";
    text = `Software/entertainment on a cycle that cannot hold B$100 is how Apple became a major merchant. Skip it.`;
  } else if (price > dailyBefore * 3 && price > 40) {
    verdict = "ONLY_IF_YOU_CUT";
    cuts.push(`Cut B$${price.toFixed(2)} from dining this week.`);
    cuts.push("No family extras until this is absorbed.");
    text = `Only if you cut B$${price.toFixed(2)} somewhere else this week. Otherwise the rest of the month buckles.`;
  } else if (freeAfter < 50) {
    verdict = "AFFORDABLE_BUT_BAD_IDEA";
    text = `Technically affordable, but it screws up the rest of the month. Free cash would sit at B$${freeAfter.toFixed(2)}.`;
  } else {
    verdict = "SAFE";
    text = `Yes — after protected savings and known reserves, B$${price.toFixed(2)} for ${item} leaves B$${freeAfter.toFixed(2)} free. Safe daily falls from B$${dailyBefore.toFixed(2)} to B$${dailyAfter.toFixed(2)}.`;
  }

  if (state.octoberFlightMomFronts && verdict === "SAFE" && price > 25) {
    verdict = "AFFORDABLE_BUT_BAD_IDEA";
    text += ` October flight repayment of B$${state.octoberFlightAmount.toFixed(2)} is already sitting on a future paycheck. Do not stack optional spend on top.`;
  }

  return {
    verdict,
    item: item || "this",
    price,
    reason: text,
    freeBefore,
    freeAfter,
    dailyBefore,
    dailyAfter,
    cuts,
    certainty: pos.freeMoneyCertifiable ? "known_future" : "projected",
  };
};
