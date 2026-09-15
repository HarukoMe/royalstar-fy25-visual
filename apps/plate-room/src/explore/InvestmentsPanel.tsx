import { reported } from '@/data/reported';
import { Figure } from '@/components/Figure';
import { DataTable } from '@/components/DataTable';
import { exact, percent } from '@/lib/format';
import styles from './panel.module.css';

const FVTPL_DEBT = ['treasuryBonds', 'sovereignBonds', 'fvtplPreferenceShares'] as const;
const FVTPL_EQUITY = ['mutualFundsUs', 'mutualFunds', 'ordinarySharesHeld'] as const;

export function InvestmentsPanel() {
  return (
    <div className={styles.panel}>
      <section className={styles.block}>
        <div className={styles.blockHead}>
          <h2 className={styles.blockTitle}>Investments at fair value through profit or loss</h2>
          <p className={styles.blockSource}>Note 7 — Investments, printed pages 33 and 35</p>
        </div>
        <p className={styles.blockBody}>
          The FVTPL portfolio grew 32.58% to <strong>27,220,722</strong>. The single largest
          movement is US fixed income treasury bonds, up 41.52% to <strong>17,114,829</strong>.
          Against a disclosed cost of <strong>23,665,233</strong>, the portfolio carries an excess
          of 3,555,489 over cost.
        </p>
        <div className={styles.split}>
          <div className={styles.tableCard}>
            <DataTable
              caption="Debt securities"
              rows={FVTPL_DEBT.map((id) => reported[id]!)}
              columns={[
                {
                  key: 'l',
                  head: 'Holding',
                  align: 'left',
                  rowHeader: true,
                  render: (f) => <span data-figure-anchor={f.id}>{f.label}</span>,
                },
                { key: 'v', head: '2025 $', render: (f) => exact(f.value) },
                { key: 'p', head: '2024 $', render: (f) => exact(f.prior ?? 0) },
              ]}
              footer={
                <tr>
                  <th scope="row" data-align="left">
                    Total debt securities
                  </th>
                  <td data-align="right">{exact(19_959_129)}</td>
                  <td data-align="right">{exact(14_430_367)}</td>
                </tr>
              }
            />
          </div>
          <div className={styles.tableCard}>
            <DataTable
              caption="Equities"
              rows={FVTPL_EQUITY.map((id) => reported[id]!)}
              columns={[
                {
                  key: 'l',
                  head: 'Holding',
                  align: 'left',
                  rowHeader: true,
                  render: (f) => <span data-figure-anchor={f.id}>{f.label}</span>,
                },
                { key: 'v', head: '2025 $', render: (f) => exact(f.value) },
                { key: 'p', head: '2024 $', render: (f) => exact(f.prior ?? 0) },
              ]}
              footer={
                <tr>
                  <th scope="row" data-align="left">
                    Total equities
                  </th>
                  <td data-align="right">{exact(7_261_593)}</td>
                  <td data-align="right">{exact(6_100_885)}</td>
                </tr>
              }
            />
          </div>
        </div>
      </section>

      <section className={styles.block}>
        <div className={styles.blockHead}>
          <h2 className={styles.blockTitle}>Fair value hierarchy</h2>
          <p className={styles.blockSource}>Note 7 — Investments, printed page 35</p>
        </div>
        <p className={styles.blockBody}>
          The whole FVTPL portfolio sits in Levels 1 and 2. The statements record that{' '}
          <strong>no Level 3 securities</strong> were held at either year end, and that there were
          no transfers between levels during the year.
        </p>
        <div className={styles.tableCard}>
          <DataTable
            rows={[reported.fvtplLevel1!, reported.fvtplLevel2!]}
            columns={[
              { key: 'l', head: 'Level', align: 'left', rowHeader: true, render: (f) => f.label },
              { key: 'v', head: '2025 $', render: (f) => exact(f.value) },
              { key: 'p', head: '2024 $', render: (f) => exact(f.prior ?? 0) },
              {
                key: 's',
                head: 'Share 2025',
                render: (f) => percent(f.value / reported.investmentsFvtpl!.value),
              },
            ]}
            footer={
              <tr>
                <th scope="row" data-align="left">
                  Total at FVTPL
                </th>
                <td data-align="right">{exact(reported.investmentsFvtpl!.value)}</td>
                <td data-align="right">{exact(reported.investmentsFvtpl!.prior!)}</td>
                <td data-align="right">100.00%</td>
              </tr>
            }
          />
        </div>
      </section>

      <section className={styles.statGrid}>
        <div className={styles.statCell}>
          <Figure id="totalInvestments" size="large" mode="compact" showDelta />
        </div>
        <div className={styles.statCell}>
          <Figure id="fvtplUnrealisedSurplus" size="large" mode="compact" showDelta />
        </div>
        <div className={styles.statCell}>
          <Figure id="netInvestmentIncome" size="large" mode="compact" showDelta />
        </div>
        <div className={styles.statCell}>
          <Figure id="notesReceivable" size="large" mode="compact" showDelta />
        </div>
      </section>

      <section className={styles.block}>
        <div className={styles.blockHead}>
          <h2 className={styles.blockTitle}>Due from agents, and its credit quality</h2>
          <p className={styles.blockSource}>
            Note 6 — Due from Agents, printed pages 32 and 33
          </p>
        </div>
        <p className={styles.blockBody}>
          Amounts due from agents grew 34.79% to <strong>16,820,729</strong>, faster than the
          premium book. The receivable got cleaner as it grew: balances over 90 days past due but
          not impaired <strong>fell</strong> from 1,268,934 to 1,001,431, and no balances were
          impaired in either year. The allowance for expected credit losses rose 97,000 to 331,000,
          covering 1.93% of the gross receivable.
        </p>
        <div className={styles.tableCard}>
          <DataTable
            rows={[
              reported.premiumsReceivableGross!,
              reported.agentEcl!,
              reported.dueFromAgents!,
              reported.agentsPastDue90!,
            ]}
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

      <section className={styles.block}>
        <div className={styles.blockHead}>
          <h2 className={styles.blockTitle}>Credit quality of financial assets</h2>
          <p className={styles.blockSource}>
            Note 19 — Risk Management, credit risk, printed pages 53 and 54
          </p>
        </div>
        <p className={styles.blockBody}>
          The statements classify <strong>74,862,087</strong> of 75,863,518 in financial assets as
          investment grade, with the balance of <strong>1,001,431</strong> non-investment grade —
          the agent balances over 90 days past due. Nothing was classified as credit impaired in
          either year.
        </p>
        <div className={styles.tableCard}>
          <DataTable
            rows={[
              { band: 'Investment grade', v: 74_862_087, p: 66_762_402 },
              { band: 'Non-investment grade', v: 1_001_431, p: 1_268_934 },
              { band: 'Credit impaired', v: 0, p: 0 },
            ]}
            columns={[
              { key: 'b', head: 'Classification', align: 'left', rowHeader: true, render: (r) => r.band },
              { key: 'v', head: '2025 $', render: (r) => exact(r.v) },
              { key: 'p', head: '2024 $', render: (r) => exact(r.p) },
            ]}
            footer={
              <tr>
                <th scope="row" data-align="left">
                  Total
                </th>
                <td data-align="right">{exact(75_863_518)}</td>
                <td data-align="right">{exact(68_031_336)}</td>
              </tr>
            }
          />
        </div>
      </section>
    </div>
  );
}
