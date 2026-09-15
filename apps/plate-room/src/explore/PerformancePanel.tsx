import { reported } from '@/data/reported';
import { Figure } from '@/components/Figure';
import { DataTable } from '@/components/DataTable';
import { ExpensesByNature } from './charts/ExpensesByNature';
import { exact, percent } from '@/lib/format';
import styles from './panel.module.css';

const INCOME_ROWS = [
  'insuranceRevenue',
  'insuranceServiceExpenses',
  'netReinsuranceExpenses',
  'insuranceServiceResult',
  'interestRevenue',
  'fvtplGains',
  'creditImpairmentReversal',
  'netInvestmentIncome',
  'netInsuranceFinanceExpenses',
  'netInsuranceAndInvestmentResult',
  'rentalAndOtherIncome',
  'otherIncome',
  'otherOperatingExpenses',
  'interestExpense',
  'netIncome',
] as const;

const SUBTOTALS = new Set([
  'insuranceServiceResult',
  'netInvestmentIncome',
  'netInsuranceAndInvestmentResult',
  'netIncome',
]);

export function PerformancePanel() {
  return (
    <div className={styles.panel}>
      <section className={styles.block}>
        <div className={styles.blockHead}>
          <h2 className={styles.blockTitle}>Consolidated statement of comprehensive income</h2>
          <p className={styles.blockSource}>Printed page 7</p>
        </div>
        <p className={styles.blockBody}>
          Every subtotal here is asserted by the integrity suite: the insurance service result ties
          to its three components, net investment income to its three, and net income down from the
          net insurance and investment result — in both years. There was no other comprehensive
          income in either year, so total comprehensive income equals net income.
        </p>
        <div className={styles.tableCard}>
          <DataTable
            rows={INCOME_ROWS.map((id) => reported[id]!)}
            columns={[
              {
                key: 'l',
                head: 'Line',
                align: 'left',
                rowHeader: true,
                render: (f) => (
                  <span
                    data-figure-anchor={f.id}
                    className={styles.anchor}
                    style={SUBTOTALS.has(f.id) ? { fontWeight: 500 } : undefined}
                  >
                    {f.label}
                  </span>
                ),
              },
              { key: 'v', head: '2025 $', render: (f) => exact(f.value) },
              { key: 'p', head: '2024 $', render: (f) => exact(f.prior ?? 0) },
              {
                key: 'd',
                head: 'Change',
                render: (f) => {
                  if (f.prior === undefined || f.prior === 0) return '—';
                  const d = (f.value - f.prior) / Math.abs(f.prior);
                  return <span className={d >= 0 ? 'pos' : 'neg'}>{percent(d)}</span>;
                },
              },
            ]}
          />
        </div>
      </section>

      <section className={styles.statGrid}>
        <div className={styles.statCell}>
          <Figure id="serviceResultMargin" size="large" showDelta />
        </div>
        <div className={styles.statCell}>
          <Figure id="reinsuranceToRevenue" size="large" showDelta />
        </div>
        <div className={styles.statCell}>
          <Figure id="serviceExpenseToRevenue" size="large" showDelta />
        </div>
        <div className={styles.statCell}>
          <Figure id="earningsPerOrdinaryShare" size="large" showDelta />
        </div>
      </section>

      <section className={styles.block}>
        <div className={styles.blockHead}>
          <h2 className={styles.blockTitle}>Expenses by nature and by allocation</h2>
          <p className={styles.blockSource}>Note 14 — Expenses by Nature, printed page 48</p>
        </div>
        <p className={styles.blockBody}>
          Note 14 presents the same total twice: once by the nature of the expense and once by how
          it is allocated between acquisition cash flows, other directly attributable expenses, and
          other operating expenses. Total expenses rose 18.24% to <strong>7,786,153</strong>, with
          general and administrative costs up 40.02%.
        </p>
        <ExpensesByNature />
      </section>

      <section className={styles.block}>
        <div className={styles.blockHead}>
          <h2 className={styles.blockTitle}>The line that moved net income</h2>
          <p className={styles.blockSource}>
            Note 14 — Expenses by Nature, printed page 48; Consolidated Statement of Comprehensive
            Income, printed page 7
          </p>
        </div>
        <p className={styles.blockBody}>
          Other operating expenses rose <strong>513,287</strong>, the largest single movement in the
          net income bridge. Within Note 14, the general and administrative component of other
          operating expenses rose from 419,386 to <strong>863,045</strong> — an increase of 443,659,
          which accounts for 86.4% of the total movement in the line.
        </p>
        <div className={styles.tableCard}>
          <DataTable
            rows={[
              reported.generalAdminOtherOperating!,
              reported.expOtherOperating!,
              reported.otherOperatingExpenses!,
            ]}
            columns={[
              { key: 'l', head: 'Line', align: 'left', rowHeader: true, render: (f) => f.label },
              { key: 'v', head: '2025 $', render: (f) => exact(f.value) },
              { key: 'p', head: '2024 $', render: (f) => exact(f.prior ?? 0) },
              {
                key: 'd',
                head: 'Change $',
                render: (f) => (
                  <span className="neg">{exact(Math.abs(f.value) - Math.abs(f.prior ?? 0))}</span>
                ),
              },
            ]}
          />
        </div>
      </section>

      <section className={styles.block}>
        <div className={styles.blockHead}>
          <h2 className={styles.blockTitle}>Other disclosures</h2>
          <p className={styles.blockSource}>Notes 14 and 17, printed pages 48 and 50</p>
        </div>
        <div className={styles.statGrid}>
          <div className={styles.statCell}>
            <Figure id="auditFees" size="body" />
          </div>
          <div className={styles.statCell}>
            <Figure id="pensionCosts" size="body" showDelta />
          </div>
          <div className={styles.statCell}>
            <Figure id="employees" size="body" />
          </div>
          <div className={styles.statCell}>
            <Figure id="directorsCosts" size="body" showDelta />
          </div>
        </div>
      </section>
    </div>
  );
}
