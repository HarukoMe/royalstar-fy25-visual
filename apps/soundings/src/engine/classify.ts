import type { FlowKind, Necessity, RawTransaction } from "./types";

export interface ClassifyHit {
  merchant: string;
  counterparty: string;
  category: string;
  subcategory: string;
  flowKind: FlowKind;
  necessity: Necessity;
  confidence: number;
  flags: string[];
  reviewReason: string | null;
}

const textOf = (txn: RawTransaction): string =>
  `${txn.typeRaw} ${txn.originalDescription} ${txn.counterpartyRaw}`.toUpperCase();

const people: { match: string; name: string }[] = [
  { match: "[PERSON_MOM]", name: "Mom" },
  { match: "[PERSON_CB]", name: "Chrystal" },
  { match: "[PERSON_HM]", name: "Haliah" },
  { match: "[PERSON_AH]", name: "Alex" },
  { match: "[PERSON_ZR]", name: "Zakia" },
  { match: "[PERSON_BP]", name: "Britney" },
  { match: "[PERSON_TR]", name: "Trayvon" },
  { match: "[PERSON_JR]", name: "Jutonia" },
  { match: "[PERSON_JM]", name: "Jared" },
  { match: "[PERSON_PP]", name: "PayPal person" },
];

interface MerchantRule {
  match: string | RegExp;
  merchant: string;
  category: string;
  subcategory: string;
  necessity: Necessity;
  confidence?: number;
}

const merchantRules: MerchantRule[] = [
  { match: "TROPICAL GYROS", merchant: "Tropical Gyros", category: "Dining", subcategory: "Takeout", necessity: "discretionary" },
  { match: "MARCO'S PIZZA", merchant: "Marco's Pizza", category: "Dining", subcategory: "Takeout", necessity: "discretionary" },
  { match: "MARCOS PIZZA", merchant: "Marco's Pizza", category: "Dining", subcategory: "Takeout", necessity: "discretionary" },
  { match: "DOMINO", merchant: "Domino's", category: "Dining", subcategory: "Takeout", necessity: "discretionary" },
  { match: "KFC", merchant: "KFC", category: "Dining", subcategory: "Fast food", necessity: "discretionary" },
  { match: "POPEYES", merchant: "Popeyes", category: "Dining", subcategory: "Fast food", necessity: "discretionary" },
  { match: "MCDONALD", merchant: "McDonald's", category: "Dining", subcategory: "Fast food", necessity: "discretionary" },
  { match: "BURGER KING", merchant: "Burger King", category: "Dining", subcategory: "Fast food", necessity: "discretionary" },
  { match: "WENDYS", merchant: "Wendy's", category: "Dining", subcategory: "Fast food", necessity: "discretionary" },
  { match: "WENDY", merchant: "Wendy's", category: "Dining", subcategory: "Fast food", necessity: "discretionary" },
  { match: "POLLO TROPICAL", merchant: "Pollo Tropical", category: "Dining", subcategory: "Fast food", necessity: "discretionary" },
  { match: "PANERA", merchant: "Panera", category: "Dining", subcategory: "Eating out", necessity: "discretionary" },
  { match: "DAIRY QUEEN", merchant: "Dairy Queen", category: "Dining", subcategory: "Fast food", necessity: "discretionary" },
  { match: "DUNKIN", merchant: "Dunkin'", category: "Dining", subcategory: "Cafe", necessity: "discretionary" },
  { match: "LICKETY SPLIT", merchant: "Lickety Split", category: "Dining", subcategory: "Snacks", necessity: "discretionary" },
  { match: "ISLAND POP", merchant: "Island Pop", category: "Dining", subcategory: "Snacks", necessity: "discretionary" },
  { match: "SOUTH BEACH ON THE RUN", merchant: "South Beach On The Run", category: "Dining", subcategory: "Snacks", necessity: "discretionary" },
  { match: "BAHAMAS C'BEAN DNING", merchant: "Bahamas Caribbean Dining", category: "Dining", subcategory: "Eating out", necessity: "discretionary" },
  { match: "REMELDA DAVIS", merchant: "Remelda Davis Kitchen", category: "Dining", subcategory: "Eating out", necessity: "discretionary" },
  { match: "RBDF GALLEY", merchant: "RBDF Galley", category: "Dining", subcategory: "Eating out", necessity: "discretionary" },
  { match: "ANDROS HIDEOUT", merchant: "Andros Hideout", category: "Dining", subcategory: "Eating out", necessity: "discretionary" },
  { match: "HAPPY TIMES BAR", merchant: "Happy Times Bar", category: "Alcohol", subcategory: "Bars", necessity: "discretionary" },
  { match: "357 BAR", merchant: "357 Bar & Lounge", category: "Alcohol", subcategory: "Bars", necessity: "discretionary" },
  { match: "DA CORNA POCKETS", merchant: "Da Corna Pockets Bar", category: "Alcohol", subcategory: "Bars", necessity: "discretionary" },
  { match: "GEEJAYS", merchant: "Geejays Beach Bar", category: "Alcohol", subcategory: "Bars", necessity: "discretionary" },
  { match: "CARLETON", merchant: "Carleton's Liquor", category: "Alcohol", subcategory: "Liquor store", necessity: "discretionary" },
  { match: "ATLANTIC LIQUOR", merchant: "Atlantic Liquor", category: "Alcohol", subcategory: "Liquor store", necessity: "discretionary" },
  { match: "ARAWAK BOOZE", merchant: "Arawak Booze & Tings", category: "Alcohol", subcategory: "Liquor store", necessity: "discretionary" },
  { match: "BOOTLEGGERS", merchant: "Bootleggers", category: "Alcohol", subcategory: "Liquor store", necessity: "discretionary" },
  { match: "COMMONWEALTH BREWERY", merchant: "Commonwealth Brewery", category: "Alcohol", subcategory: "Beer", necessity: "discretionary" },
  { match: "MR SMOKE", merchant: "Mr Smoke", category: "Discretionary", subcategory: "Smoke shop", necessity: "discretionary" },
  { match: "SUPER VALUE", merchant: "Super Value", category: "Groceries", subcategory: "Supermarket", necessity: "essential" },
  { match: "QUALITY SUPERMARKET", merchant: "Quality Supermarket", category: "Groceries", subcategory: "Supermarket", necessity: "essential" },
  { match: "NEW QUALITY MARKET", merchant: "New Quality Market", category: "Groceries", subcategory: "Convenience", necessity: "flexible" },
  { match: "PRATTS GROCERIES", merchant: "Pratt's Groceries", category: "Groceries", subcategory: "Market", necessity: "essential" },
  { match: "PHOENIX SUPERMARKET", merchant: "Phoenix Supermarket", category: "Groceries", subcategory: "Supermarket", necessity: "essential" },
  { match: "ABBA SUPERMARKET", merchant: "Abba Supermarket", category: "Groceries", subcategory: "Supermarket", necessity: "essential" },
  { match: "BASE ROAD WHOLESALE", merchant: "Base Road Wholesale", category: "Groceries", subcategory: "Wholesale", necessity: "flexible" },
  { match: "XTRA VALUE", merchant: "Xtra Value", category: "Groceries", subcategory: "Convenience", necessity: "flexible" },
  { match: "DOLLAR PLUS", merchant: "Dollar Plus", category: "Shopping", subcategory: "Variety", necessity: "flexible" },
  { match: "RAISEAS DRY GOODS", merchant: "Raiseas Dry Goods", category: "Shopping", subcategory: "Variety", necessity: "flexible" },
  { match: "DA LIL SHOP", merchant: "Da Lil Shop", category: "Shopping", subcategory: "Variety", necessity: "flexible" },
  { match: "EVERYTHING & MORE", merchant: "Everything & More", category: "Shopping", subcategory: "Variety", necessity: "flexible" },
  { match: "WAL-MART", merchant: "Walmart", category: "Shopping", subcategory: "General", necessity: "flexible" },
  { match: "WM SUPERCENTER", merchant: "Walmart", category: "Shopping", subcategory: "General", necessity: "flexible" },
  { match: "AMERICAN THRIFT", merchant: "American Thrift Store", category: "Shopping", subcategory: "Clothing", necessity: "flexible" },
  { match: "URBAN WEAR", merchant: "Urban Wear", category: "Shopping", subcategory: "Clothing", necessity: "discretionary" },
  { match: "HOMEGOODS", merchant: "HomeGoods", category: "Shopping", subcategory: "Home", necessity: "discretionary" },
  { match: "KELLY'S HOUSE", merchant: "Kelly's House & Home", category: "Shopping", subcategory: "Home", necessity: "flexible" },
  { match: "BEAUTYLICIOUS", merchant: "Beautylicious", category: "Shopping", subcategory: "Beauty", necessity: "discretionary" },
  { match: "TRUDYZ", merchant: "Trudyz Skincare", category: "Shopping", subcategory: "Beauty", necessity: "discretionary" },
  { match: "BEST BUY", merchant: "Best Buy", category: "Shopping", subcategory: "Electronics", necessity: "discretionary" },
  { match: "BESTBUY", merchant: "Best Buy", category: "Shopping", subcategory: "Electronics", necessity: "discretionary" },
  { match: "WIRELESS FOR ALL", merchant: "Wireless For All", category: "Shopping", subcategory: "Electronics", necessity: "flexible" },
  { match: "SECURITY DEPOT", merchant: "Security Depot", category: "Shopping", subcategory: "Home", necessity: "flexible" },
  { match: "ROADRUNNERS TECH", merchant: "Roadrunners Tech", category: "Shopping", subcategory: "Electronics", necessity: "discretionary" },
  { match: "AMC ", merchant: "AMC Theatres", category: "Entertainment", subcategory: "Movies", necessity: "discretionary" },
  { match: "WYNDHAM", merchant: "Wyndham Palm Aire", category: "Travel", subcategory: "Lodging extras", necessity: "discretionary" },
  { match: "CTLP*J & J", merchant: "Hotel vending", category: "Travel", subcategory: "Vending", necessity: "discretionary" },
  { match: "PRECISE DELIVERY", merchant: "Precise Delivery", category: "Transportation", subcategory: "Delivery", necessity: "flexible" },
  { match: "ESSO", merchant: "Esso", category: "Transportation", subcategory: "Fuel / transit", necessity: "essential" },
  { match: "SHELL", merchant: "Shell", category: "Transportation", subcategory: "Fuel / transit", necessity: "essential" },
  { match: "RUBIS", merchant: "Rubis", category: "Transportation", subcategory: "Fuel / transit", necessity: "essential" },
  { match: "BE ALIV LIMITED", merchant: "Aliv", category: "Phone", subcategory: "Bill / large top-up", necessity: "essential" },
  { match: "BE ALIV", merchant: "Aliv", category: "Phone", subcategory: "Top-up", necessity: "essential" },
  { match: "THE PRESCRIPTION PARLO", merchant: "The Prescription Parlour", category: "Health", subcategory: "Pharmacy", necessity: "essential" },
  { match: "LOWE'S PHARMACY", merchant: "Lowe's Pharmacy", category: "Health", subcategory: "Pharmacy", necessity: "essential" },
  { match: "THE PEOPLES PHARMACY", merchant: "The People's Pharmacy", category: "Health", subcategory: "Pharmacy", necessity: "essential" },
  { match: "SP FITNESS CONNECTIO", merchant: "Fitness Connection", category: "Health", subcategory: "Gym", necessity: "flexible" },
  { match: "ANTHROPIC", merchant: "Anthropic Claude", category: "Subscriptions", subcategory: "AI tools", necessity: "discretionary" },
  { match: "VENICE.AI", merchant: "Venice.ai", category: "Subscriptions", subcategory: "AI tools", necessity: "discretionary" },
  { match: "QUIZLET", merchant: "Quizlet", category: "Subscriptions", subcategory: "Learning", necessity: "flexible" },
  { match: "SPOTIFY", merchant: "Spotify", category: "Subscriptions", subcategory: "Media", necessity: "discretionary" },
  { match: "PATREON", merchant: "Patreon", category: "Subscriptions", subcategory: "Memberships", necessity: "discretionary" },
  { match: "AMAZON PRIME", merchant: "Amazon Prime", category: "Subscriptions", subcategory: "Memberships", necessity: "flexible" },
  { match: "PAYPAL *PROTON", merchant: "Proton", category: "Subscriptions", subcategory: "Privacy", necessity: "flexible" },
  { match: "PLAYSTATION", merchant: "PlayStation", category: "Subscriptions", subcategory: "Gaming", necessity: "discretionary" },
  { match: "ROBLOX", merchant: "Roblox", category: "Entertainment", subcategory: "Gaming", necessity: "discretionary" },
  { match: "SNAPCHAT", merchant: "Snapchat", category: "Subscriptions", subcategory: "Apps", necessity: "discretionary" },
  { match: "HUMBLEBUNDLE", merchant: "Humble Bundle", category: "Entertainment", subcategory: "Games/books", necessity: "discretionary" },
  { match: "MICROSOFT", merchant: "Microsoft Store", category: "Subscriptions", subcategory: "Software", necessity: "discretionary" },
  { match: "APPLE.COM", merchant: "Apple", category: "Subscriptions", subcategory: "Apps / Apple", necessity: "flexible" },
  { match: "PP*APPLE", merchant: "Apple", category: "Subscriptions", subcategory: "Apps / Apple", necessity: "flexible" },
  { match: "AMAZON MKTPL", merchant: "Amazon Marketplace", category: "Shopping", subcategory: "Online", necessity: "discretionary" },
  { match: "AMAZON RETA", merchant: "Amazon", category: "Shopping", subcategory: "Online", necessity: "discretionary" },
  { match: "6 MMM", merchant: "6 MMM's", category: "Dining", subcategory: "Eating out", necessity: "discretionary" },
];

const ruleMatch = (hay: string, match: string | RegExp): boolean =>
  typeof match === "string" ? hay.includes(match) : match.test(hay);

export const classifyRaw = (txn: RawTransaction): ClassifyHit => {
  const hay = textOf(txn);
  const flags: string[] = [];

  if (txn.typeRaw === "SERVICE CHARGE" || txn.typeRaw === "GCT/GOVT TAX" || txn.typeRaw === "STAMP DUTY TAX") {
    return {
      merchant: txn.typeRaw === "STAMP DUTY TAX" ? "Stamp duty" : txn.typeRaw === "GCT/GOVT TAX" ? "VAT on fees" : "Scotiabank fee",
      counterparty: "Scotiabank",
      category: "Fees",
      subcategory: txn.typeRaw,
      flowKind: "fee",
      necessity: "essential",
      confidence: 0.99,
      flags: ["fee"],
      reviewReason: null,
    };
  }

  if (txn.typeRaw === "ABM WITHDRAWAL") {
    return {
      merchant: "ATM cash",
      counterparty: "Cash",
      category: "Cash",
      subcategory: "ATM withdrawal",
      flowKind: "atm",
      necessity: "not_spend",
      confidence: 0.99,
      flags: ["cash", "use_unknown"],
      reviewReason: "Cash withdrawn — use is unknown. Not treated as a merchant category.",
    };
  }

  if (txn.typeRaw === "OCT POS TSF" || (txn.direction === "in" && hay.includes("OCT POS"))) {
    let merchant = "Card refund";
    for (const rule of merchantRules) {
      if (ruleMatch(hay, rule.match)) {
        merchant = rule.merchant;
        break;
      }
    }
    return {
      merchant,
      counterparty: merchant,
      category: "Refunds",
      subcategory: "POS refund",
      flowKind: "refund",
      necessity: "not_spend",
      confidence: 0.95,
      flags: ["refund"],
      reviewReason: null,
    };
  }

  if (hay.includes("[EMPLOYER]") || hay.includes("ROYAL STAR") || hay.includes("ROYALSTAR")) {
    return {
      merchant: "Employer payroll",
      counterparty: "Employer payroll",
      category: "Income",
      subcategory: "Salary",
      flowKind: "salary",
      necessity: "not_spend",
      confidence: 0.99,
      flags: ["salary"],
      reviewReason: null,
    };
  }

  const person = people.find((p) => hay.includes(p.match));
  if (person) {
    const isIn = txn.direction === "in";
    return {
      merchant: person.name,
      counterparty: person.name,
      category: "Personal transfers",
      subcategory: isIn ? "Incoming personal" : "Outgoing personal",
      flowKind: isIn ? "personal_in" : "personal_out",
      necessity: "not_spend",
      confidence: 0.97,
      flags: ["personal_transfer", person.name === "Mom" ? "family" : "person"],
      reviewReason: null,
    };
  }

  if (txn.typeRaw.startsWith("THIRD PARTY")) {
    return {
      merchant: "Unknown person",
      counterparty: txn.counterpartyRaw || "Unknown person",
      category: "Personal transfers",
      subcategory: txn.direction === "in" ? "Incoming personal" : "Outgoing personal",
      flowKind: txn.direction === "in" ? "personal_in" : "personal_out",
      necessity: "not_spend",
      confidence: 0.6,
      flags: ["personal_transfer", "unknown_person"],
      reviewReason: "Personal transfer with an unrecognized counterparty.",
    };
  }

  for (const rule of merchantRules) {
    if (ruleMatch(hay, rule.match)) {
      return {
        merchant: rule.merchant,
        counterparty: rule.merchant,
        category: rule.category,
        subcategory: rule.subcategory,
        flowKind: "merchant",
        necessity: rule.necessity,
        confidence: rule.confidence ?? 0.9,
        flags,
        reviewReason: null,
      };
    }
  }

  const trimmed = txn.counterpartyRaw.split("|")[0]?.trim() || txn.originalDescription;
  return {
    merchant: trimmed.slice(0, 40) || "Unclassified merchant",
    counterparty: trimmed || "Unknown",
    category: "Unclassified",
    subcategory: "Needs review",
    flowKind: "ambiguous",
    necessity: "flexible",
    confidence: 0.4,
    flags: ["unclassified"],
    reviewReason: "Merchant not in the classification table.",
  };
};
