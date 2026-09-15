import type { LedgerTransaction } from "./types";

export interface CorrectionRule {
  id: string;
  match: string;
  merchant?: string;
  category?: string;
  subcategory?: string;
}

export const applyRules = (rows: LedgerTransaction[], rules: CorrectionRule[]): LedgerTransaction[] => {
  if (!rules.length) return rows;
  return rows.map((row) => {
    const hay = `${row.originalDescription} ${row.merchant}`.toUpperCase();
    const rule = rules.find((r) => hay.includes(r.match.toUpperCase()));
    if (!rule) return row;
    return {
      ...row,
      merchant: rule.merchant ?? row.merchant,
      category: rule.category ?? row.category,
      subcategory: rule.subcategory ?? row.subcategory,
      flags: [...row.flags, "user_rule"],
    };
  });
};
