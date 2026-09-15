import { productLines, reported } from '@/data/reported';
import { productLineShares } from '@/data/calculated';
import { Figure } from '@/components/Figure';
import { DataTable } from '@/components/DataTable';
import { BalanceTreemap } from './charts/BalanceTreemap';
import { ProductLineSlope } from './charts/ProductLineSlope';
import { exact, percent } from '@/lib/format';
import styles from './panel.module.css';

const ASSETS = [
  'cash',
  'termDeposits',
  'reinsuranceContractAssets',
  'dueFromAgents',
  'prepayments',
  'investmentsFvtpl',
  'investmentsAmortised',
  'investmentInAssociate',
  'investmentProperty',
  'propertyAndEquipment',
] as const;

const EQUITY = [
  'ordinaryShares',
  'preferenceShares',
  'contributedSurplus',
  'revaluationReserve',
  'retainedEarnings',
] as const;

export function PositionPanel() {
  return (
    <div className={styles.panel}>
      <section className={styles.block}>
        <div className={styles.blockHead}>
          <h2 className={styles.blockTitle}>The balance sheet, to scale</h2>
          <p className={styles.blockSource}>
            Consolidated Balance Sheet, printed pages 5 and 6
          </p>
        </div>
        <p className={styles.blockBody}>
          Total assets of <strong>141,905,939</strong> grew 16.23%, driven by the reinsurance
          contract asset and amounts due from agents. Rectangle area is proportional to carrying
          amount. Colour follows the report's grammar: the reinsurance asset is violet because it is
          a ceded position despite being an asset, insurance contract liabilities are blue because
          they are a gross obligation, and equity is gold.
        </p>
        <BalanceTreemap />
      </section>

      <section className={styles.block}>
        <div className={styles.blockHead}>
          <h2 className={styles.blockTitle}>Assets</h2>
          <p className={styles.blockSource}>Consolidated Balance Sheet, printed page 5</p>
        </div>
        <div className={styles.tableCard}>
          <DataTable
            rows={ASSETS.map((id) => reported[id]!)}
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
              {
                key: 'd',
                head: 'Change',
                render: (f) => {
                  if (!f.prior) return '—';
                  const d = (f.value - f.prior) / f.prior;
                  return <span className={d >= 0 ? 'pos' : 'neg'}>{percent(d)}</span>;
                },
              },
            ]}
            footer={
              <tr>
                <th scope="row" data-align="left">
                  Total assets
                </th>
                <td data-align="right">{exact(reported.totalAssets!.value)}</td>
                <td data-align="right">{exact(reported.totalAssets!.prior!)}</td>
                <td data-align="right">16.23%</td>
              </tr>
            }
          />
        </div>
      </section>

      <div className={styles.split}>
        <section className={styles.block}>
          <div className={styles.blockHead}>
            <h2 className={styles.blockTitle}>Liabilities</h2>
            <p className={styles.blockSource}>Consolidated Balance Sheet, printed page 5</p>
          </div>
          <div className={styles.tableCard}>
            <DataTable
              rows={[
                reported.insuranceContractLiabilities!,
                reported.accountsPayable!,
                reported.borrowings!,
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
              footer={
                <tr>
                  <th scope="row" data-align="left">
                    Total liabilities
                  </th>
                  <td data-align="right">{exact(reported.totalLiabilities!.value)}</td>
                  <td data-align="right">{exact(reported.totalLiabilities!.prior!)}</td>
                </tr>
              }
            />
          </div>
        </section>

        <section className={styles.block}>
          <div className={styles.blockHead}>
            <h2 className={styles.blockTitle}>Equity</h2>
            <p className={styles.blockSource}>Consolidated Balance Sheet, printed page 6</p>
          </div>
          <div className={styles.tableCard}>
            <DataTable
              rows={EQUITY.map((id) => reported[id]!)}
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
              footer={
                <tr>
                  <th scope="row" data-align="left">
                    Total equity
                  </th>
                  <td data-align="right">{exact(reported.totalEquity!.value)}</td>
                  <td data-align="right">{exact(reported.totalEquity!.prior!)}</td>
                </tr>
              }
            />
          </div>
        </section>
      </div>

      <section className={styles.block}>
        <div className={styles.blockHead}>
          <h2 className={styles.blockTitle}>Net insurance contract liabilities by product line</h2>
          <p className={styles.blockSource}>
            Note 19 — Risk Management, concentrations of risk, printed page 52
          </p>
        </div>
        <p className={styles.blockBody}>
          Property dominates the gross book and is also the most heavily ceded, retaining 30.42% of
          its gross liability. Motor is the inverse: its reinsurance balance is{' '}
          <strong>negative</strong>, so the net retained liability exceeds the gross figure.
        </p>
        <ProductLineSlope />
        <div className={styles.tableCard}>
          <DataTable
            rows={productLineShares}
            columns={[
              { key: 'n', head: 'Product line', align: 'left', rowHeader: true, render: (l) => l.name },
              { key: 'g', head: 'Insurance $', render: (l) => exact(l.gross) },
              { key: 'c', head: 'Reinsurance $', render: (l) => exact(l.ceded) },
              { key: 'n2', head: 'Net $', render: (l) => exact(l.net) },
              { key: 'r', head: 'Retained', render: (l) => percent(l.netShare) },
            ]}
            footer={
              <tr>
                <th scope="row" data-align="left">
                  Total
                </th>
                <td data-align="right">{exact(productLines.reduce((s, l) => s + l.gross, 0))}</td>
                <td data-align="right">{exact(productLines.reduce((s, l) => s + l.ceded, 0))}</td>
                <td data-align="right">{exact(productLines.reduce((s, l) => s + l.net, 0))}</td>
                <td data-align="right">—</td>
              </tr>
            }
          />
        </div>
      </section>

      <section className={styles.statGrid}>
        <div className={styles.statCell}>
          <Figure id="equityToAssets" size="large" showDelta />
        </div>
        <div className={styles.statCell}>
          <Figure id="bookValuePerOrdinaryShare" size="large" showDelta />
        </div>
        <div className={styles.statCell}>
          <Figure id="liquidAssets" size="large" mode="compact" showDelta />
        </div>
        <div className={styles.statCell}>
          <Figure id="returnOnAverageEquity" size="large" showDelta />
        </div>
      </section>
    </div>
  );
}
