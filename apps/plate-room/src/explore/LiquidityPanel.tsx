import { disclosures, licMaturity, reported } from '@/data/reported';
import { Figure } from '@/components/Figure';
import { DataTable } from '@/components/DataTable';
import { CashFlowRibbon } from './charts/CashFlowRibbon';
import { MaturityLadder } from './charts/MaturityLadder';
import { exact } from '@/lib/format';
import styles from './panel.module.css';

export function LiquidityPanel() {
  return (
    <div className={styles.panel}>
      <section className={styles.block}>
        <div className={styles.blockHead}>
          <h2 className={styles.blockTitle}>Cash flows</h2>
          <p className={styles.blockSource}>
            Consolidated Statement of Cash Flows, printed pages 9 and 10
          </p>
        </div>
        <p className={styles.blockBody}>
          Operating cash flow of <strong>7,635,725</strong> was 40.49% below the prior year, chiefly
          because amounts due from agents absorbed 4,438,894 of cash in 2025 having released
          7,567,373 in 2024. Investing and financing outflows together exceeded operating inflows,
          so cash fell <strong>983,684</strong> — a smaller decline than the 2,481,505 recorded in
          2024.
        </p>
        <CashFlowRibbon />
      </section>

      <section className={styles.statGrid}>
        <div className={styles.statCell}>
          <Figure id="cashFromOperating" size="large" mode="compact" showDelta />
        </div>
        <div className={styles.statCell}>
          <Figure id="cashUsedInInvesting" size="large" mode="compact" showDelta />
        </div>
        <div className={styles.statCell}>
          <Figure id="cashUsedInFinancing" size="large" mode="compact" showDelta />
        </div>
        <div className={styles.statCell}>
          <Figure id="liquidAssets" size="large" mode="compact" showDelta />
        </div>
      </section>

      <section className={styles.block}>
        <div className={styles.blockHead}>
          <h2 className={styles.blockTitle}>When the incurred claims are expected to be paid</h2>
          <p className={styles.blockSource}>
            Note 19 — Risk Management, liquidity risk, printed page 62
          </p>
        </div>
        <p className={styles.blockBody}>
          The maturity profile is disclosed to the nearest thousand and sums to{' '}
          <strong>17,655</strong> thousand, which agrees with the gross liability for incurred
          claims in Note 13. The near-term bucket fell from 8,462 to 7,049 thousand while the one
          to three year bucket almost doubled.
        </p>
        <MaturityLadder />
        <blockquote className={styles.blockBody}>
          <p>“{disclosures.majorityOfClaims.text}”</p>
          <p className={styles.blockSource}>
            {disclosures.majorityOfClaims.citation.statement}, printed page{' '}
            {disclosures.majorityOfClaims.citation.printedPage}
          </p>
        </blockquote>
      </section>

      <section className={styles.block}>
        <div className={styles.blockHead}>
          <h2 className={styles.blockTitle}>Maturity profile in full</h2>
          <p className={styles.blockSource}>Amounts in thousands of Bahamian dollars, as presented</p>
        </div>
        <div className={styles.tableCard}>
          <DataTable
            rows={licMaturity}
            columns={[
              { key: 'b', head: 'Bucket', align: 'left', rowHeader: true, render: (m) => m.bucket },
              { key: 'v', head: "2025 $000's", render: (m) => m.value.toLocaleString('en-US') },
              { key: 'p', head: "2024 $000's", render: (m) => m.prior.toLocaleString('en-US') },
            ]}
            footer={
              <tr>
                <th scope="row" data-align="left">
                  Total
                </th>
                <td data-align="right">17,655</td>
                <td data-align="right">16,491</td>
              </tr>
            }
          />
        </div>
      </section>

      <section className={styles.block}>
        <div className={styles.blockHead}>
          <h2 className={styles.blockTitle}>Term deposits and restrictions</h2>
          <p className={styles.blockSource}>Note 5 — Term Deposits, printed page 32</p>
        </div>
        <p className={styles.blockBody}>
          Of <strong>27,707,155</strong> in term deposits, <strong>6,747,444</strong> is restricted:
          funds held in trust and other accounts that cannot be distributed without the permission
          of insurance regulators in the Cayman Islands, Turks and Caicos, the British Virgin
          Islands, the United States Virgin Islands and Anguilla. Included in that figure is
          2,500,000 pledged as security for the loan facility.
        </p>
        <div className={styles.tableCard}>
          <DataTable
            rows={[
              reported.termDepositsUnrestricted!,
              reported.termDepositsRestricted!,
              reported.termDeposits!,
            ]}
            columns={[
              { key: 'l', head: 'Line', align: 'left', rowHeader: true, render: (f) => f.label },
              { key: 'v', head: '2025 $', render: (f) => exact(f.value) },
              { key: 'p', head: '2024 $', render: (f) => exact(f.prior ?? 0) },
            ]}
          />
        </div>
      </section>
    </div>
  );
}
