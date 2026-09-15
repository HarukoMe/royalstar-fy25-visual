import { disclosures, reported } from '@/data/reported';
import { grossTriangle, netTriangle, triangleReconciliation } from '@/data/claims';
import { accidentYears } from '@/data/claims';
import { DataTable } from '@/components/DataTable';
import { exact } from '@/lib/format';
import { figures } from '@/data';
import styles from './panel.module.css';
import local from './StatementsPanel.module.css';

const CASH_FLOW = [
  'netIncome',
  'depreciation',
  'cashFromOperating',
  'cashUsedInInvesting',
  'ordinaryDividendsPaidCash',
  'repaymentOfBorrowings',
  'cashUsedInFinancing',
  'netDecreaseInCash',
  'cashOpening',
  'cash',
] as const;

const EQUITY_MOVEMENTS = [
  { label: 'Balance as at 31 December 2023', value: 58_514_540, kind: 'balance' },
  { label: 'Net income 2024', value: 10_963_305, kind: 'movement' },
  { label: 'Dividends — preference shares 2024', value: -312_500, kind: 'movement' },
  { label: 'Dividends — ordinary shares 2024', value: -9_122_861, kind: 'movement' },
  { label: 'Balance as at 31 December 2024', value: 60_042_484, kind: 'balance' },
  { label: 'Net income 2025', value: 10_639_546, kind: 'movement' },
  { label: 'Dividends — preference shares 2025', value: -312_500, kind: 'movement' },
  { label: 'Dividends — ordinary shares 2025', value: -3_000_000, kind: 'movement' },
  { label: 'Balance as at 31 December 2025', value: 67_369_530, kind: 'balance' },
] as const;

export function StatementsPanel() {
  const reportedCount = Object.values(figures).filter(
    (f) => f.provenance.tier === 'reported',
  ).length;
  const calculatedCount = Object.values(figures).filter(
    (f) => f.provenance.tier === 'calculated',
  ).length;

  return (
    <div className={styles.panel}>
      <section className={styles.block}>
        <div className={styles.blockHead}>
          <h2 className={styles.blockTitle}>Independent auditors' report</h2>
          <p className={styles.blockSource}>
            {disclosures.auditOpinion.citation.statement}
          </p>
        </div>
        <blockquote className={local.opinion}>
          <p>{disclosures.auditOpinion.text}</p>
        </blockquote>
      </section>

      <section className={styles.block}>
        <div className={styles.blockHead}>
          <h2 className={styles.blockTitle}>Statement of changes in equity</h2>
          <p className={styles.blockSource}>Printed page 8</p>
        </div>
        <div className={styles.tableCard}>
          <DataTable
            rows={EQUITY_MOVEMENTS}
            columns={[
              {
                key: 'l',
                head: 'Movement',
                align: 'left',
                rowHeader: true,
                render: (r) => (
                  <span style={r.kind === 'balance' ? { fontWeight: 500 } : undefined}>
                    {r.label}
                  </span>
                ),
              },
              {
                key: 'v',
                head: 'Total equity $',
                render: (r) =>
                  r.kind === 'balance' ? (
                    <strong>{exact(r.value)}</strong>
                  ) : (
                    <span className={r.value >= 0 ? 'pos' : 'neg'}>{exact(r.value)}</span>
                  ),
              },
            ]}
          />
        </div>
        <p className={styles.blockBody}>
          Dividends per ordinary share were <strong>$0.30</strong> (2024: $0.91) and per preference
          share <strong>$0.63</strong> (2024: $0.63).
        </p>
      </section>

      <section className={styles.block}>
        <div className={styles.blockHead}>
          <h2 className={styles.blockTitle}>Statement of cash flows</h2>
          <p className={styles.blockSource}>Printed pages 9 and 10</p>
        </div>
        <div className={styles.tableCard}>
          <DataTable
            rows={CASH_FLOW.map((id) => reported[id]!)}
            columns={[
              {
                key: 'l',
                head: 'Line',
                align: 'left',
                rowHeader: true,
                render: (f) => <span data-figure-anchor={f.id}>{f.label}</span>,
              },
              { key: 'v', head: '2025 $', render: (f) => exact(f.value) },
              { key: 'p', head: '2024 $', render: (f) => exact(f.prior ?? 0) },
            ]}
          />
        </div>
      </section>

      <TriangleTable basis="gross" />
      <TriangleTable basis="net" />

      <section className={styles.block}>
        <div className={styles.blockHead}>
          <h2 className={styles.blockTitle}>Methodology and provenance</h2>
          <p className={styles.blockSource}>How to check anything in this report</p>
        </div>
        <div className={local.methodology}>
          <div>
            <h3>Reported figures</h3>
            <p>
              {reportedCount} figures transcribed from the audited statements. Each is authored once
              in the data layer with its statement and page, and no component in this application
              contains a financial literal. Hover any figure for its citation.
            </p>
          </div>
          <div>
            <h3>Calculated figures</h3>
            <p>
              {calculatedCount} metrics computed at runtime from reported inputs. Each carries a
              prose definition, a human-readable expression, and the list of inputs it consumes, so
              a formula and its displayed result cannot drift apart. Hover for all three.
            </p>
          </div>
          <div>
            <h3>What is deliberately absent</h3>
            <p>
              No conventional combined ratio, because the IFRS 17 presentation in these statements
              does not support one without a construction the statements themselves do not make. No
              premium cession rate. No forecasts, peer comparisons or estimates of any kind.
            </p>
          </div>
          <div>
            <h3>Integrity testing</h3>
            <p>
              The data layer is covered by an automated suite asserting the arithmetic the
              statements assert of themselves: every subtotal, both Note 12 roll-forwards in both
              years, the equity bridge, both claims triangles, and the two bridges presented in
              Movement 03.
            </p>
          </div>
          <div>
            <h3>Page references</h3>
            <p>
              Cited as printed on the statement page. The source PDF runs exactly one page ahead
              throughout, and the test suite asserts that relationship for every citation.
            </p>
          </div>
          <div>
            <h3>Source</h3>
            <p>
              RoyalStar Assurance Ltd., Consolidated Financial Statements, 31 December 2025.
              Expressed in Bahamian dollars. Audited by PricewaterhouseCoopers, Nassau, Bahamas;
              unqualified opinion dated 17 April 2026.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

function TriangleTable({ basis }: { basis: 'gross' | 'net' }) {
  const rows = basis === 'gross' ? grossTriangle : netTriangle;
  const recon = basis === 'gross' ? triangleReconciliation.gross : triangleReconciliation.net;
  const maxRevisions = Math.max(...rows.map((r) => r.revisions.length));

  return (
    <section className={styles.block}>
      <div className={styles.blockHead}>
        <h2 className={styles.blockTitle}>
          Claims development — {basis} of reinsurance
        </h2>
        <p className={styles.blockSource}>
          Note 13 — Claims Development, printed page {basis === 'gross' ? 46 : 47}
        </p>
      </div>
      <div className={styles.tableCard}>
        <table className={local.triangle}>
          <caption>
            Estimate of ultimate claims cost, {basis} of reinsurance, by accident year
          </caption>
          <thead>
            <tr>
              <th scope="col">Development</th>
              {accidentYears.map((y) => (
                <th key={y} scope="col">
                  {y}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: maxRevisions }, (_, dev) => (
              <tr key={dev}>
                <th scope="row">
                  {dev === 0 ? 'At end of accident year' : `${dev} year${dev > 1 ? 's' : ''} later`}
                </th>
                {rows.map((r) => (
                  <td key={r.year}>
                    {r.revisions[dev] !== undefined ? exact(r.revisions[dev]!) : ''}
                  </td>
                ))}
              </tr>
            ))}
            <tr className={local.emphasis}>
              <th scope="row">Current estimate</th>
              {rows.map((r) => (
                <td key={r.year}>{exact(r.currentEstimate)}</td>
              ))}
            </tr>
            <tr>
              <th scope="row">Cumulative payments to date</th>
              {rows.map((r) => (
                <td key={r.year}>({exact(r.cumulativePayments)})</td>
              ))}
            </tr>
            <tr className={local.emphasis}>
              <th scope="row">Liability included in provision</th>
              {rows.map((r) => (
                <td key={r.year}>{exact(r.liabilityInProvision)}</td>
              ))}
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <th scope="row">Liability in respect of prior years</th>
              <td colSpan={accidentYears.length}>{exact(recon.priorYears)}</td>
            </tr>
            <tr>
              <th scope="row">Effect of discounting</th>
              <td colSpan={accidentYears.length}>{exact(recon.discounting)}</td>
            </tr>
            <tr>
              <th scope="row">Effect of risk adjustment for non-financial risk</th>
              <td colSpan={accidentYears.length}>{exact(recon.riskAdjustment)}</td>
            </tr>
            <tr>
              <th scope="row">Expense accruals and payables included in the LIC</th>
              <td colSpan={accidentYears.length}>{exact(recon.expenseAccruals)}</td>
            </tr>
            <tr className={local.emphasis}>
              <th scope="row">Liability for incurred claims for contracts originated</th>
              <td colSpan={accidentYears.length}>{exact(recon.licOriginated)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </section>
  );
}
