import type { ManualObligation, PlanningState } from "./types";

export const AS_OF = "2026-09-15";
export const LAST_KNOWN_DATE = "2026-08-31";
export const LAST_KNOWN_BALANCE = 26.91;
export const EXPECTED_PAY = 1379.1;
export const PAYROLL_DEDUCTION = 369;
export const HISTORIC_PAY = 1748.1;
export const PROTECTED = 100;
export const NEXT_PAYDAY = "2026-09-15";
export const FOLLOWING_PAYDAY = "2026-10-15";
export const OCTOBER_FLIGHT = 330;

export const defaultObligations = (): ManualObligation[] => [
  {
    id: "mom",
    name: "Mom",
    kind: "family_debt",
    remaining: null,
    originalAmount: null,
    due: null,
    notes:
      "Bank history shows net B$1,000 paid to Mom March–August (B$1,900 out, B$900 in). Remaining balance is not on the statements. Family debt still counts. Type the real remaining amount.",
    source: "inferred_unresolved",
    priority: 1,
  },
  {
    id: "rent",
    name: "Rent owed",
    kind: "housing",
    remaining: null,
    originalAmount: null,
    due: null,
    notes:
      "No labelled rent debit exists on Scotia Everyday. Possible related: payday transfers to Chrystal Bain (including B$300 on 15 May). Amount currently owed is not reconstructable. Enter it.",
    source: "inferred_unresolved",
    priority: 2,
  },
  {
    id: "groceries-owed",
    name: "Groceries owed",
    kind: "groceries",
    remaining: null,
    originalAmount: null,
    due: null,
    notes:
      "You flagged groceries owed. Statements show Super Value / Quality Market spend, not an IOU balance. Enter the amount if someone is waiting to be repaid.",
    source: "inferred_unresolved",
    priority: 3,
  },
  {
    id: "october-flight",
    name: "October flight (if Mom fronts)",
    kind: "travel",
    remaining: null,
    originalAmount: OCTOBER_FLIGHT,
    due: "2026-10-15",
    notes: "Scenario: Mom fronts B$330, you repay from the following paycheck. Off by default until you toggle it.",
    source: "manual",
    priority: 4,
  },
];

export const defaultPlanning = (): PlanningState => ({
  asOfDate: AS_OF,
  lastKnownBalance: LAST_KNOWN_BALANCE,
  lastKnownDate: LAST_KNOWN_DATE,
  currentBalanceOverride: null,
  paydayPosted: false,
  expectedPayAmount: EXPECTED_PAY,
  payrollDeduction: PAYROLL_DEDUCTION,
  protectedSavingsTarget: PROTECTED,
  protectedSavingsHeld: 0,
  nextPayday: NEXT_PAYDAY,
  followingPayday: FOLLOWING_PAYDAY,
  octoberFlightMomFronts: false,
  octoberFlightAmount: OCTOBER_FLIGHT,
  weekendSpendWhatIf: 0,
  saveInsteadOf100: 100,
  payAllFamilyNow: false,
  freezeDiscretionaryDays: 0,
  obligations: defaultObligations(),
});

export const STORAGE_KEY = "soundings.planning.v1";
export const RULES_KEY = "soundings.rules.v1";
