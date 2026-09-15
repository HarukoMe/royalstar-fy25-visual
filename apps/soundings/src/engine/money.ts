export const round2 = (n: number): number => Math.round(n * 100) / 100;

export const money = (n: number | null | undefined): string => {
  if (n === null || n === undefined || Number.isNaN(n)) return "—";
  const abs = Math.abs(n);
  const formatted = abs.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return n < 0 ? `−B$${formatted}` : `B$${formatted}`;
};

export const moneyShort = (n: number): string => {
  const formatted = Math.abs(n).toLocaleString("en-US", {
    minimumFractionDigits: n % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  });
  return n < 0 ? `−B$${formatted}` : `B$${formatted}`;
};

export const iso = (d: Date): string => d.toISOString().slice(0, 10);

export const parseIso = (s: string): Date => {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d));
};

export const addDays = (s: string, days: number): string => {
  const d = parseIso(s);
  d.setUTCDate(d.getUTCDate() + days);
  return iso(d);
};

export const daysBetween = (a: string, b: string): number => {
  const ms = parseIso(b).getTime() - parseIso(a).getTime();
  return Math.round(ms / 86400000);
};

export const monthKey = (s: string): string => s.slice(0, 7);

export const monthLabel = (key: string): string => {
  const [y, m] = key.split("-");
  const names = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return `${names[Number(m) - 1]} ${y}`;
};

export const weekday = (s: string): string => {
  const names = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return names[parseIso(s).getUTCDay()];
};
