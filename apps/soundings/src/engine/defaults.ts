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
      "No labelled rent debit exists on Scotia Everyday. Possible related: payday transfers to a person (including B$300 on 15 May). Amount currently owed is not reconstructable. Enter it.",
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
    remaining: 0,
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
  gapEntries: [],
});

export const STORAGE_KEY = "soundings.planning.v2";
export const RULES_KEY = "soundings.rules.v1";

export const hydratePlanning = (raw: Partial<PlanningState> & { obligations?: PlanningState["obligations"] }): PlanningState => {
  const base = defaultPlanning();
  const savedObs = raw.obligations ?? [];
  const obligations = base.obligations.map((o) => {
    const saved = savedObs.find((x) => x.id === o.id);
    if (!saved) return o;
    const merged = { ...o, ...saved };
    if (o.id === "october-flight" && merged.remaining === null && !raw.octoberFlightMomFronts) {
      merged.remaining = 0;
    }
    return merged;
  });
  const extras = savedObs.filter((o) => !base.obligations.some((b) => b.id === o.id));
  return {
    ...base,
    ...raw,
    obligations: [...obligations, ...extras],
    gapEntries: raw.gapEntries ?? [],
  };
};
