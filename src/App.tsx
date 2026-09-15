import { useEffect, useMemo, useState } from "react";
import {
  categoryAgg,
  currentPosition,
  defaultPlanning,
  evaluatePurchase,
  buildForecast,
  makeLedger,
  merchantAgg,
  money,
  monthLabel,
  monthlySnapshots,
  paydayCycles,
  personNets,
  recurringCandidates,
  reconcileMonth,
  spendByDay,
  statementSummaries,
  todayPlan,
  nextActionsStack,
  behaviorNarrative,
  largestPurchases,
  STORAGE_KEY,
  RULES_KEY,
  type LedgerTransaction,
  type PlanningState,
  type PurchaseVerdict,
} from "./engine";
import type { CorrectionRule } from "./engine/rules";

type View = "command" | "history" | "debt" | "recurring" | "forecast" | "ledger";

const loadPlanning = (): PlanningState => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultPlanning();
    return { ...defaultPlanning(), ...JSON.parse(raw) };
  } catch {
    return defaultPlanning();
  }
};

const loadRules = (): CorrectionRule[] => {
  try {
    return JSON.parse(localStorage.getItem(RULES_KEY) || "[]");
  } catch {
    return [];
  }
};

const Depth = ({ value, certifiable }: { value: number; certifiable: boolean }) => {
  const cls = value < 0 ? "neg" : value < 120 ? "warn" : "ok";
  return (
    <div className="depth-wrap">
      <div className="ticks">
        {[0, 100, 250, 500, 1000].map((n) => (
          <span key={n} style={{ bottom: `${Math.min(90, n / 14)}%` }}>
            {n}
          </span>
        ))}
      </div>
      <div className="depth-read">
        <div className="depth-label">Actual free money</div>
        {!certifiable && <div className="uncertified">Uncertified</div>}
        <div className={`depth-num ${cls}`}>{money(value)}</div>
        <div className={`subline ${certifiable ? "" : "strong"}`}>
          {certifiable
            ? "This is spendable after spoken-for money and the B$100 floor."
            : "Uncertified. Untyped debts and the September statement gap mean this number is a floor, not a green light."}
        </div>
      </div>
    </div>
  );
};

const Spark = ({ rows }: { rows: LedgerTransaction[] }) => {
  const points = rows.filter((r) => r.runningBalance !== null);
  if (points.length < 2) return null;
  const bals = points.map((p) => p.runningBalance as number);
  const min = Math.min(...bals, 0);
  const max = Math.max(...bals, 1);
  const w = 640;
  const h = 160;
  const d = points
    .map((p, i) => {
      const x = (i / (points.length - 1)) * w;
      const y = h - ((p.runningBalance as number) - min) / (max - min || 1) * (h - 12) - 6;
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
  return (
    <svg className="spark" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
      <path d={d} fill="none" stroke="#d7b077" strokeWidth="2" />
    </svg>
  );
};

export const App = () => {
  const [view, setView] = useState<View>("command");
  const [planning, setPlanning] = useState<PlanningState>(loadPlanning);
  const [rules, setRules] = useState<CorrectionRule[]>(loadRules);
  const [item, setItem] = useState("Tropical Gyros");
  const [price, setPrice] = useState("18.00");
  const [when, setWhen] = useState(planning.asOfDate);
  const [why, setWhy] = useState("lunch");
  const [verdict, setVerdict] = useState<PurchaseVerdict | null>(null);
  const [filter, setFilter] = useState<{ month?: string; category?: string; merchant?: string; date?: string }>({});
  const [ruleMatch, setRuleMatch] = useState("");
  const [ruleCat, setRuleCat] = useState("Dining");

  const ledger = useMemo(() => makeLedger(rules), [rules]);
  const pos = useMemo(() => currentPosition(planning), [planning]);
  const plan = useMemo(() => todayPlan(planning, pos, ledger), [planning, pos, ledger]);
  const cycles = useMemo(() => paydayCycles(ledger), [ledger]);
  const months = useMemo(() => monthlySnapshots(ledger), [ledger]);
  const merchants = useMemo(() => merchantAgg(ledger), [ledger]);
  const categories = useMemo(() => categoryAgg(ledger), [ledger]);
  const people = useMemo(() => personNets(ledger), [ledger]);
  const recurring = useMemo(() => recurringCandidates(ledger), [ledger]);
  const forecast = useMemo(() => buildForecast(planning, ledger), [planning, ledger]);
  const recon = useMemo(() => statementSummaries.map((s) => reconcileMonth(s, ledger)), [ledger]);
  const heat = useMemo(() => spendByDay(ledger), [ledger]);
  const story = useMemo(() => behaviorNarrative(ledger, cycles), [ledger, cycles]);
  const big = useMemo(() => largestPurchases(ledger), [ledger]);
  const review = ledger.filter((t) => t.reviewReason);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(planning));
  }, [planning]);
  useEffect(() => {
    localStorage.setItem(RULES_KEY, JSON.stringify(rules));
  }, [rules]);

  useEffect(() => {
    if (!verdict) return;
    setVerdict(evaluatePurchase(planning, ledger, item, Number(price) || 0, when, why));
  }, [planning, ledger]);

  const setOb = (id: string, remaining: number | null) => {
    setPlanning((p) => ({
      ...p,
      obligations: p.obligations.map((o) => (o.id === id ? { ...o, remaining } : o)),
    }));
  };

  const filtered = ledger.filter((t) => {
    if (filter.month && t.date.slice(0, 7) !== filter.month) return false;
    if (filter.category && t.category !== filter.category) return false;
    if (filter.merchant && t.merchant !== filter.merchant) return false;
    if (filter.date && t.date !== filter.date) return false;
    return true;
  });

  const maxHeat = Math.max(...heat.map((h) => h.amount), 1);

  return (
    <div className="app">
      <header className="topbar">
        <div>
          <div className="brand-kicker">Personal control room</div>
          <div className="brand">
            SOUND<i>INGS</i>
          </div>
        </div>
        <div className="asof">
          Planning date <strong>{planning.asOfDate}</strong>
          Last bank snapshot {planning.lastKnownDate} · {money(planning.lastKnownBalance)}
        </div>
        <nav className="nav">
          {(["command", "history", "debt", "recurring", "forecast", "ledger"] as View[]).map((v) => (
            <button key={v} className={view === v ? "active" : ""} onClick={() => setView(v)}>
              {v}
            </button>
          ))}
        </nav>
      </header>

      <main className="main">
        <div className="lag">
          <div className="tag">STATEMENT LAG</div>
          <div>
            Actual history is 1 March–31 August 2026. Today is 15 September. Anything spent 1–15 September is unknown.
            Historic pay was B$1,748.10. Forward pay used here is B$1,379.10 after the B$369 deduction. Protected savings
            target is B$100 — never held at a month-end in this ledger.
          </div>
        </div>

        <div className="controls">
          <label>
            Payday posted?
            <input
              type="checkbox"
              checked={planning.paydayPosted}
              onChange={(e) => setPlanning({ ...planning, paydayPosted: e.target.checked })}
            />
          </label>
          <label>
            Current balance override
            <input
              type="number"
              step="0.01"
              placeholder={String(pos.assumedBalance)}
              value={planning.currentBalanceOverride ?? ""}
              onChange={(e) =>
                setPlanning({
                  ...planning,
                  currentBalanceOverride: e.target.value === "" ? null : Number(e.target.value),
                })
              }
            />
          </label>
          <label>
            Mom fronts B$330 flight
            <input
              type="checkbox"
              checked={planning.octoberFlightMomFronts}
              onChange={(e) => {
                const on = e.target.checked;
                setPlanning({
                  ...planning,
                  octoberFlightMomFronts: on,
                  obligations: planning.obligations.map((o) =>
                    o.id === "october-flight" ? { ...o, remaining: on ? 330 : null } : o
                  ),
                });
              }}
            />
          </label>
        </div>

        {view === "command" && (
          <>
            <section className={`command`}>
              <article className={`panel ${plan.tone === "danger" ? "danger" : ""}`}>
                <div className="kicker">How much is really free</div>
                <div className="water" />
                <Depth value={pos.freeMoney} certifiable={pos.freeMoneyCertifiable} />
                <div className="spoke-list">
                  <div className="spoke-row">
                    <i className="knot" />
                    <span>Money I have (assumed)</span>
                    <b className="amt">{money(pos.assumedBalance)}</b>
                  </div>
                  <div className="spoke-row">
                    <i className="knot" />
                    <span>Already spoken for</span>
                    <b className="amt">{money(pos.spokenForKnownTotal)}</b>
                  </div>
                  <div className="spoke-row">
                    <i className="knot" />
                    <span>Protected savings</span>
                    <b className="amt">{money(pos.protected)}</b>
                  </div>
                  <div className="spoke-row">
                    <i className="knot" />
                    <span>Next payday</span>
                    <b className="amt">{pos.nextPayday}</b>
                  </div>
                  <div className="spoke-row">
                    <i className="knot" />
                    <span>Can I spend today?</span>
                    <b className="amt">{pos.canSpendToday ? "Limited" : "No"}</b>
                  </div>
                </div>
              </article>

              <article className="panel">
                <div className="kicker">Today</div>
                <div className="today">
                  <h2>{plan.headline}</h2>
                  <div className="orders">
                    <div className="order">
                      <div className="lbl">Pay</div>
                      <div className="val">{plan.pay}</div>
                    </div>
                    <div className="order">
                      <div className="lbl">Save</div>
                      <div className="val">{plan.save}</div>
                    </div>
                    <div className="order">
                      <div className="lbl">Do not touch</div>
                      <div className="val">{plan.doNotTouch}</div>
                    </div>
                    <div className="order">
                      <div className="lbl">You may spend up to</div>
                      <div className="val">{plan.spendUpTo}</div>
                    </div>
                  </div>
                  <ol className="do">
                    {plan.orders.map((o) => (
                      <li key={o}>{o}</li>
                    ))}
                  </ol>
                </div>
              </article>

              <article className="panel">
                <div className="kicker">Spoken for / unresolved</div>
                <div className="spoke-list">
                  {pos.spokenForKnown.map((s) => (
                    <div className="spoke-row" key={s.id}>
                      <i className={`knot ${s.certainty === "projected" ? "proj" : ""}`} />
                      <span>
                        {s.label}
                        <div className="fact">{s.certainty.replace("_", " ")}</div>
                      </span>
                      <b className="amt">{money(s.amount)}</b>
                    </div>
                  ))}
                  {planning.obligations
                    .filter((o) => o.remaining === null)
                    .map((o) => (
                      <div className="unresolved" key={o.id}>
                        <div className="lbl" style={{ color: "var(--stop)", letterSpacing: "0.14em", fontSize: "0.66rem" }}>
                          UNRESOLVED
                        </div>
                        <strong>{o.name}</strong>
                        <div className="subline">{o.notes}</div>
                        <input
                          type="number"
                          step="0.01"
                          placeholder="Type remaining B$"
                          onBlur={(e) => {
                            if (e.target.value !== "") setOb(o.id, Number(e.target.value));
                          }}
                        />
                      </div>
                    ))}
                </div>
              </article>
            </section>

            <section className="tape" aria-label="Payday cycles">
              <div className="tape-track">
                {cycles.map((c) => (
                  <div className="cycle" key={c.payday}>
                    <div className="when">Payday {c.payday}</div>
                    <div className="big">{money(c.paycheck)}</div>
                    <div className="subline">
                      Before {money(c.balanceBefore)} → after {money(c.balanceAfter)}
                    </div>
                    <div className="bar">
                      <i style={{ width: `${Math.min(100, (c.spent24h / c.paycheck) * 100)}%` }} />
                    </div>
                    <div className="subline">
                      24h moved {money(c.spent24h)} · ended {money(c.finalPrePayday)} ·{" "}
                      {c.sustainable ? "held" : "broke"}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="buy">
              <form
                className="panel buy-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  setVerdict(evaluatePurchase(planning, ledger, item, Number(price), when, why));
                }}
              >
                <div className="kicker">Can I buy this?</div>
                <input value={item} onChange={(e) => setItem(e.target.value)} placeholder="Item" />
                <input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" />
                <input type="date" value={when} onChange={(e) => setWhen(e.target.value)} />
                <input value={why} onChange={(e) => setWhy(e.target.value)} placeholder="Reason" />
                <button type="submit">Give me a verdict</button>
              </form>
              <article className="panel verdict">
                <div className="kicker">Verdict</div>
                {verdict ? (
                  <>
                    <div className={`stamp ${verdict.verdict}`}>{verdict.verdict.replaceAll("_", " ")}</div>
                    <p>{verdict.reason}</p>
                    <p>
                      If you buy this for {money(verdict.price)} today, true free cash falls from {money(verdict.freeBefore)}{" "}
                      to {money(verdict.freeAfter)} and safe daily spend falls from {money(verdict.dailyBefore)} to{" "}
                      {money(verdict.dailyAfter)}.
                    </p>
                    {verdict.cuts.map((c) => (
                      <div key={c}>→ {c}</div>
                    ))}
                    <div className="fact">{verdict.certainty.replace("_", " ")}</div>
                  </>
                ) : (
                  <p className="subline">Ask before you tap. The engine is opinionated on purpose.</p>
                )}
              </article>
            </section>

            <section className="grid-2" style={{ marginTop: "1.1rem" }}>
              <article className="panel">
                <div className="kicker">What the next paycheck must accomplish</div>
                <ol className="do">
                  {plan.nextPaycheckMust.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ol>
              </article>
              <article className="panel">
                <div className="kicker">Sacrifices that actually matter</div>
                <ol className="do">
                  {plan.sacrificesThatMatter.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ol>
                <div className="kicker">Not worth obsessing over</div>
                <ol className="do">
                  {plan.sacrificesThatDont.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ol>
              </article>
            </section>

            <section className="panel" style={{ marginTop: "1.1rem" }}>
              <div className="kicker">Recommended stack — YOUR RECOMMENDATION</div>
              <div className="spoke-list">
                {nextActionsStack(planning, pos).map((s) => (
                  <div className="spoke-row" key={s.rank}>
                    <i className="knot" />
                    <span>
                      {s.rank}. {s.title}
                    </span>
                    <b>{s.detail}</b>
                  </div>
                ))}
              </div>
              <p className="subline" style={{ padding: "0 1rem 1rem" }}>
                Alternative: send a round B$200 to Mom on payday before typing the remaining balance. Rejected. That is how
                the last six paychecks vanished with debts still unnamed.
              </p>
            </section>
          </>
        )}

        {view === "history" && (
          <>
            <p className="subline">{story[0]}</p>
            {story.slice(1).map((s) => (
              <p key={s} className="subline">
                {s}
              </p>
            ))}
            <div className="panel" style={{ margin: "1rem 0" }}>
              <div className="kicker">Balance curve — actual</div>
              <Spark rows={ledger} />
            </div>
            <div className="kicker">Spending heat — merchant spend by day</div>
            <div className="heat" style={{ margin: "0.6rem 0 1rem" }}>
              {heat.map((h) => (
                <i
                  key={h.date}
                  title={`${h.date} ${money(h.amount)}`}
                  onClick={() => {
                    setFilter({ date: h.date });
                    setView("ledger");
                  }}
                  style={{
                    background: `rgba(255,91,76,${0.12 + (h.amount / maxHeat) * 0.88})`,
                    cursor: "pointer",
                  }}
                />
              ))}
            </div>
            <div className="grid-2">
              <article className="panel">
                <div className="kicker">Months</div>
                <table>
                  <thead>
                    <tr>
                      <th>Month</th>
                      <th>Salary</th>
                      <th>Merchant</th>
                      <th>Disc.</th>
                      <th>Close</th>
                    </tr>
                  </thead>
                  <tbody>
                    {months.map((m) => (
                      <tr
                        className="clickable"
                        key={m.month}
                        onClick={() => {
                          setFilter({ month: m.month });
                          setView("ledger");
                        }}
                      >
                        <td>{monthLabel(m.month)}</td>
                        <td>{money(m.salary)}</td>
                        <td>{money(m.merchantSpend)}</td>
                        <td>{money(m.discretionary)}</td>
                        <td>{money(m.closingBalance)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </article>
              <article className="panel">
                <div className="kicker">Categories</div>
                <table>
                  <thead>
                    <tr>
                      <th>Category</th>
                      <th>Total</th>
                      <th>#</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.map((c) => (
                      <tr
                        className="clickable"
                        key={c.category}
                        onClick={() => {
                          setFilter({ category: c.category });
                          setView("ledger");
                        }}
                      >
                        <td>{c.category}</td>
                        <td>{money(c.total)}</td>
                        <td>{c.count}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </article>
            </div>
            <article className="panel" style={{ marginTop: "1rem" }}>
              <div className="kicker">Merchants that keep showing up</div>
              <table>
                <thead>
                  <tr>
                    <th>Merchant</th>
                    <th>Total</th>
                    <th>Visits</th>
                    <th>Months</th>
                  </tr>
                </thead>
                <tbody>
                  {merchants.slice(0, 18).map((m) => (
                    <tr
                      className="clickable"
                      key={m.merchant}
                      onClick={() => {
                        setFilter({ merchant: m.merchant });
                        setView("ledger");
                      }}
                    >
                      <td>{m.merchant}</td>
                      <td>{money(m.total)}</td>
                      <td>{m.count}</td>
                      <td>{m.months.length}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </article>
            <article className="panel" style={{ marginTop: "1rem" }}>
              <div className="kicker">Largest merchant purchases</div>
              <table>
                <tbody>
                  {big.map((t) => (
                    <tr key={t.id}>
                      <td>{t.date}</td>
                      <td>{t.merchant}</td>
                      <td>{money(t.amount)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </article>
          </>
        )}

        {view === "debt" && (
          <div className="grid-2">
            <article className="panel">
              <div className="kicker">Path out</div>
              <div className="today">
                <h2>From “the paycheck disappears” to a closing balance that exists.</h2>
                <ol className="do">
                  <li>Name remaining balances. Informal family debt still counts.</li>
                  <li>On payday: B$100 protected first. Not last. Not “if anything is left.”</li>
                  <li>Pay overdue housing/food IOUs next — those are survival, not manners.</li>
                  <li>Pay Mom on a schedule against a typed remaining number, not whatever is in the account.</li>
                  <li>Zero takeout for 14 days. That is the only optional cut large enough to matter.</li>
                  <li>First month-end at or above B$100 is the light. You have not had it in this history.</li>
                </ol>
              </div>
            </article>
            <article className="panel">
              <div className="kicker">People — actual bank flows</div>
              <table>
                <thead>
                  <tr>
                    <th>Who</th>
                    <th>Sent</th>
                    <th>Received</th>
                    <th>Net out</th>
                  </tr>
                </thead>
                <tbody>
                  {people.map((p) => (
                    <tr key={p.name}>
                      <td>{p.name}</td>
                      <td>{money(p.out)}</td>
                      <td>{money(p.in)}</td>
                      <td>{money(p.netOut)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="subline" style={{ padding: "0.8rem 1rem" }}>
                Net out is not “still owed.” It is what moved. Remaining owed must be typed above on Command.
              </p>
            </article>
            <article className="panel" style={{ gridColumn: "1 / -1" }}>
              <div className="kicker">Obligation plan</div>
              {planning.obligations.map((o) => (
                <div className="spoke-row" key={o.id}>
                  <i className="knot" />
                  <span>
                    {o.name} · priority {o.priority} · {o.kind}
                    <div className="subline">{o.notes}</div>
                  </span>
                  <label>
                    Remaining
                    <input
                      type="number"
                      step="0.01"
                      value={o.remaining ?? ""}
                      onChange={(e) => setOb(o.id, e.target.value === "" ? null : Number(e.target.value))}
                    />
                  </label>
                </div>
              ))}
            </article>
          </div>
        )}

        {view === "recurring" && (
          <article className="panel">
            <div className="kicker">Repeat charges — keep / review / cut</div>
            <table>
              <thead>
                <tr>
                  <th>Action</th>
                  <th>Merchant</th>
                  <th>/month</th>
                  <th>/year</th>
                  <th>Why</th>
                </tr>
              </thead>
              <tbody>
                {recurring.map((r) => (
                  <tr key={r.merchant}>
                    <td>
                      <span className={`chip ${r.action}`}>{r.action}</span>
                    </td>
                    <td>{r.merchant}</td>
                    <td>{money(r.monthlyEstimate)}</td>
                    <td>{money(r.annualEstimate)}</td>
                    <td>
                      {r.why} {r.impact}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </article>
        )}

        {view === "forecast" && (
          <>
            <div className="controls">
              <label>
                What if I spend this weekend
                <input
                  type="number"
                  value={planning.weekendSpendWhatIf}
                  onChange={(e) => setPlanning({ ...planning, weekendSpendWhatIf: Number(e.target.value) })}
                />
              </label>
              <label>
                Save this instead of 100
                <input
                  type="number"
                  value={planning.saveInsteadOf100}
                  onChange={(e) => setPlanning({ ...planning, saveInsteadOf100: Number(e.target.value) })}
                />
              </label>
              <label>
                Freeze discretionary days
                <input
                  type="number"
                  value={planning.freezeDiscretionaryDays}
                  onChange={(e) => setPlanning({ ...planning, freezeDiscretionaryDays: Number(e.target.value) })}
                />
              </label>
              <label>
                Pay typed family debt now
                <input
                  type="checkbox"
                  checked={planning.payAllFamilyNow}
                  onChange={(e) => setPlanning({ ...planning, payAllFamilyNow: e.target.checked })}
                />
              </label>
            </div>
            <div className="grid-3">
              <article className="panel">
                <div className="kicker">Projected pre-payday</div>
                <div className="depth-num warn" style={{ fontSize: "3rem", padding: "0.4rem 1rem" }}>
                  {money(forecast.beforeNextPayday)}
                </div>
              </article>
              <article className="panel">
                <div className="kicker">After known obligations</div>
                <div className="depth-num" style={{ fontSize: "3rem", padding: "0.4rem 1rem" }}>
                  {money(forecast.afterObligations)}
                </div>
              </article>
              <article className="panel">
                <div className="kicker">Typed debt remaining</div>
                <div className="depth-num" style={{ fontSize: "3rem", padding: "0.4rem 1rem" }}>
                  {money(forecast.outstandingTypedDebt)}
                </div>
              </article>
            </div>
            <article className="panel" style={{ marginTop: "1rem" }}>
              <div className="kicker">Next paycheck allocation — recommendation</div>
              {forecast.nextPayAllocation.map((a) => (
                <div className="spoke-row" key={a.label}>
                  <i className="knot" />
                  <span>{a.label}</span>
                  <b className="amt">{money(a.amount)}</b>
                </div>
              ))}
              {forecast.warnings.map((w) => (
                <p key={w} className="subline" style={{ padding: "0 1rem" }}>
                  {w}
                </p>
              ))}
              <div className="spoke-list">
                {forecast.points.map((p) => (
                  <div className="spoke-row" key={p.date + p.label}>
                    <i className={`knot ${p.kind === "projected" ? "proj" : ""}`} />
                    <span>
                      {p.label} · {p.date}
                      <div className="fact">{p.kind.replace("_", " ")}</div>
                    </span>
                    <b>{money(p.balance)}</b>
                  </div>
                ))}
              </div>
            </article>
          </>
        )}

        {view === "ledger" && (
          <>
            <div className="controls">
              <button className="ghost" onClick={() => setFilter({})}>
                Clear filters
              </button>
              <span className="subline">
                Showing {filtered.length} / {ledger.length}
                {filter.month ? ` · ${filter.month}` : ""}
                {filter.category ? ` · ${filter.category}` : ""}
                {filter.merchant ? ` · ${filter.merchant}` : ""}
                {filter.date ? ` · ${filter.date}` : ""}
              </span>
            </div>
            <article className="panel">
              <div className="kicker">Integrity</div>
              <table>
                <thead>
                  <tr>
                    <th>Month</th>
                    <th>Ties</th>
                    <th>Close Δ</th>
                    <th>In/Out Δ</th>
                  </tr>
                </thead>
                <tbody>
                  {recon.map((r) => (
                    <tr key={r.month}>
                      <td>{r.month}</td>
                      <td>{r.ties ? "YES" : "NO"}</td>
                      <td>{r.closingDelta}</td>
                      <td>
                        {r.depositDelta}/{r.withdrawalDelta}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </article>
            <article className="panel" style={{ marginTop: "1rem" }}>
              <div className="kicker">Review queue — {review.length} uncertain / cash / passthrough</div>
              <table>
                <tbody>
                  {review.map((t) => (
                    <tr key={t.id}>
                      <td>{t.date}</td>
                      <td>{t.merchant}</td>
                      <td>{money(t.signedAmount)}</td>
                      <td>{t.reviewReason}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </article>
            <article className="panel" style={{ marginTop: "1rem" }}>
              <div className="kicker">Correction rule (persists)</div>
              <form
                className="buy-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!ruleMatch) return;
                  setRules([
                    ...rules,
                    { id: `rule-${Date.now()}`, match: ruleMatch, category: ruleCat, merchant: ruleMatch },
                  ]);
                  setRuleMatch("");
                }}
              >
                <input value={ruleMatch} onChange={(e) => setRuleMatch(e.target.value)} placeholder="Match text" />
                <input value={ruleCat} onChange={(e) => setRuleCat(e.target.value)} placeholder="Category" />
                <button type="submit">Save rule</button>
              </form>
            </article>
            <article className="panel" style={{ marginTop: "1rem" }}>
              <div className="kicker">Transactions</div>
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Merchant</th>
                    <th>Cat</th>
                    <th>Flow</th>
                    <th>Amt</th>
                    <th>Bal</th>
                    <th>Source p.</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((t) => (
                    <tr key={t.id}>
                      <td>{t.date}</td>
                      <td title={t.originalDescription}>{t.merchant}</td>
                      <td>{t.category}</td>
                      <td>{t.flowKind}</td>
                      <td>{money(t.signedAmount)}</td>
                      <td>{money(t.runningBalance)}</td>
                      <td>{t.sourcePage}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </article>
          </>
        )}
      </main>
      <footer className="footnote">
        Soundings keeps original descriptions in the ledger. Account numbers, card numbers, and addresses are not shown.
        No analytics. Statements are not hosted on a public route. Unresolved debts are visible on purpose.
      </footer>
    </div>
  );
};
