export type Direction = "in" | "out";

export type Necessity = "essential" | "flexible" | "discretionary" | "not_spend";

export type RecurringStatus =
  | "salary"
  | "subscription"
  | "repeat_topup"
  | "repeat_merchant"
  | "repeat_person"
  | "once"
  | "unknown";

export type FlowKind =
  | "salary"
  | "personal_in"
  | "personal_out"
  | "possible_passthrough"
  | "refund"
  | "reimbursement"
  | "atm"
  | "fee"
  | "interest"
  | "merchant"
  | "ambiguous";

export interface RawTransaction {
  id: string;
  date: string;
  postingDate: string;
  typeRaw: string;
  amount: number;
  direction: Direction;
  signedAmount: number;
  runningBalance: number | null;
  originalDescription: string;
  counterpartyRaw: string;
  accountAlias: string;
  sourceStatement: string;
  sourceMonth: string;
  sourcePage: number;
}

export interface StatementSummary {
  sourceStatement: string;
  sourceMonth: string;
  periodStartRaw: string | null;
  periodEndRaw: string | null;
  openingBalance: number;
  closingBalance: number;
  summaryDeposits: number;
  summaryWithdrawals: number;
  depositCount: number;
  withdrawalCount: number;
  totalCharges: number | null;
  parsedCount: number;
  parsedDeposits: number;
  parsedWithdrawals: number;
  reconstructedClosing: number;
  depositDelta: number;
  withdrawalDelta: number;
  closingDelta: number;
}

export interface LedgerTransaction extends RawTransaction {
  merchant: string;
  counterparty: string;
  category: string;
  subcategory: string;
  flowKind: FlowKind;
  necessity: Necessity;
  recurringStatus: RecurringStatus;
  isTransfer: boolean;
  isRefund: boolean;
  isReimbursement: boolean;
  isCashWithdrawal: boolean;
  isFee: boolean;
  isInterest: boolean;
  countsAsMerchantSpend: boolean;
  countsAsIncome: boolean;
  countsAsPersonalTransfer: boolean;
  classificationConfidence: number;
  flags: string[];
  reviewReason: string | null;
}

export interface PersonNet {
  name: string;
  in: number;
  out: number;
  netOut: number;
  countIn: number;
  countOut: number;
}

export interface ManualObligation {
  id: string;
  name: string;
  kind: "family_debt" | "housing" | "groceries" | "travel" | "other";
  remaining: number | null;
  originalAmount: number | null;
  due: string | null;
  notes: string;
  source: "manual" | "inferred_unresolved";
  priority: number;
}

export interface GapEntry {
  id: string;
  date: string;
  amount: number;
  direction: Direction;
  note: string;
}

export interface PlanningState {
  asOfDate: string;
  lastKnownBalance: number;
  lastKnownDate: string;
  currentBalanceOverride: number | null;
  paydayPosted: boolean;
  expectedPayAmount: number;
  payrollDeduction: number;
  protectedSavingsTarget: number;
  protectedSavingsHeld: number;
  nextPayday: string;
  followingPayday: string;
  octoberFlightMomFronts: boolean;
  octoberFlightAmount: number;
  weekendSpendWhatIf: number;
  saveInsteadOf100: number;
  payAllFamilyNow: boolean;
  freezeDiscretionaryDays: number;
  obligations: ManualObligation[];
  gapEntries: GapEntry[];
}

export type Verdict = "SAFE" | "WAIT_UNTIL_PAYDAY" | "AFFORDABLE_BUT_BAD_IDEA" | "ONLY_IF_YOU_CUT" | "NO";

export interface PurchaseVerdict {
  verdict: Verdict;
  item: string;
  price: number;
  reason: string;
  freeBefore: number | null;
  freeAfter: number | null;
  dailyBefore: number | null;
  dailyAfter: number | null;
  cuts: string[];
  certainty: "actual" | "known_future" | "projected";
}
