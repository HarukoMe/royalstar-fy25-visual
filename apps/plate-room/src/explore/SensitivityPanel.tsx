import { sensitivities } from '@/data/reported';
import { Figure } from '@/components/Figure';
import { DataTable } from '@/components/DataTable';
import { SensitivityTornado } from '@/components/charts/SensitivityTornado';
import { YieldCurves } from './charts/YieldCurves';
import { exact, percent } from '@/lib/format';
import styles from './panel.module.css';

export function SensitivityPanel() {
  return (
    <div className={styles.panel}>
      <section className={styles.block}>
        <div className={styles.blockHead}>
          <h2 className={styles.blockTitle}>Sensitivity analyses in full</h2>
          <p className={styles.blockSource}>
            Note 19 — Risk Management, sensitivity analyses, printed page 64
          </p>
        </div>
        <p className={styles.blockBody}>
          The statements note that because insurance contracts are measured under the premium
          allocation approach, only the liability for incurred claims is sensitive to changes in
          underwriting risk variables. Each analysis holds all other assumptions constant, which
          the statements themselves acknowledge is unlikely in practice.
        </p>
        <SensitivityTornado />
      </section>

      <section className={styles.block}>
        <div className={styles.blockHead}>
          <h2 className={styles.blockTitle}>Impact on profit and equity, both years</h2>
          <p className={styles.blockSource}>Adverse direction shown; each factor is symmetric</p>
        </div>
        <div className={styles.tableCard}>
          <DataTable
            rows={sensitivities}
            columns={[
              { key: 'f', head: 'Factor', align: 'left', rowHeader: true, render: (s) => s.factor },
              { key: 'c', head: 'Change', align: 'left', render: (s) => s.change },
              { key: 'g', head: '2025 gross $', render: (s) => exact(s.gross) },
              { key: 'n', head: '2025 net $', render: (s) => exact(s.net) },
              {
                key: 'a',
                head: '2025 absorbed',
                render: (s) => percent(1 - Math.abs(s.net) / Math.abs(s.gross)),
              },
              { key: 'gp', head: '2024 gross $', render: (s) => exact(s.grossPrior) },
              { key: 'np', head: '2024 net $', render: (s) => exact(s.netPrior) },
              {
                key: 'ap',
                head: '2024 absorbed',
                render: (s) => percent(1 - Math.abs(s.netPrior) / Math.abs(s.grossPrior)),
              },
            ]}
          />
        </div>
        <p className={styles.blockBody}>
          The statements present each factor symmetrically: a 5% decrease in the loss ratio has an
          equal and opposite effect to a 5% increase. Only the adverse direction is charted above,
          since it is the direction that matters for resilience.
        </p>
      </section>

      <section className={styles.statGrid}>
        <div className={styles.statCell}>
          <Figure id="lossRatioShockAbsorbed" size="large" showDelta />
        </div>
        <div className={styles.statCell}>
          <Figure id="riskAdjustmentConfidence" size="large" showDelta />
        </div>
        <div className={styles.statCell}>
          <Figure id="fvtplPriceShock" size="large" mode="compact" showDelta />
        </div>
        <div className={styles.statCell}>
          <Figure id="bisxReturn" size="large" showDelta />
        </div>
      </section>

      <section className={styles.block}>
        <div className={styles.blockHead}>
          <h2 className={styles.blockTitle}>Discount rates used to measure insurance liabilities</h2>
          <p className={styles.blockSource}>
            Note 3 — Significant Judgements and Estimates in Applying IFRS 17, printed page 30
          </p>
        </div>
        <p className={styles.blockBody}>
          Bahamian dollar liabilities are discounted using a top-down approach from a reference
          portfolio of government bonds. Liabilities in other Caribbean currencies pegged to the US
          dollar use a bottom-up approach from the US treasury curve plus an illiquidity premium
          estimated by expert judgement. The Bahamian curve steepened at the short end and flattened
          at the long end; the USD-based curve fell across the short end.
        </p>
        <YieldCurves />
      </section>

      <section className={styles.block}>
        <div className={styles.blockHead}>
          <h2 className={styles.blockTitle}>Risk adjustment for non-financial risk</h2>
          <p className={styles.blockSource}>
            Note 3, printed page 31; Note 13, printed pages 46 and 47
          </p>
        </div>
        <p className={styles.blockBody}>
          The risk adjustment is determined using a margin approach, with margins calibrated to a
          target confidence level between 70% and 75%. The confidence level at 2025 is{' '}
          <strong>74%</strong>, against 75% in 2024. The gross risk adjustment carried in the
          liability for incurred claims is <strong>1,620,000</strong> and the reinsurance risk
          adjustment <strong>929,000</strong>, leaving a net risk adjustment of{' '}
          <strong>691,000</strong>.
        </p>
        <div className={styles.tableCard}>
          <DataTable
            rows={[
              { label: 'Gross risk adjustment', v: 1_620_000, p: 1_529_000 },
              { label: 'Reinsurance risk adjustment', v: 929_000, p: 818_000 },
              { label: 'Net risk adjustment', v: 691_000, p: 711_000 },
            ]}
            columns={[
              { key: 'l', head: 'Line', align: 'left', rowHeader: true, render: (r) => r.label },
              { key: 'v', head: '2025 $', render: (r) => exact(r.v) },
              { key: 'p', head: '2024 $', render: (r) => exact(r.p) },
            ]}
          />
        </div>
      </section>
    </div>
  );
}
