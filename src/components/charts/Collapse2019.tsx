import { reported } from '@/data/reported';
import { calculated } from '@/data/calculated';
import { roleColor } from '@/data/roles';
import { compact, exact, percent } from '@/lib/format';
import { useStore } from '@/state/useStore';
import styles from './Collapse2019.module.css';

export function Collapse2019() {
  const basis = useStore((s) => s.basis);
  const toggleBasis = useStore((s) => s.toggleBasis);

  const gross = reported.ay2019GrossCurrent!.value;
  const net = reported.ay2019NetCurrent!.value;
  const assets = reported.totalAssets!.value;
  const netShare = net / gross;
  const isNet = basis === 'net';
  const shown = isNet ? net : gross;
  const fill = isNet ? netShare : 1;

  return (
    <div className={styles.wrap}>
      <div className={styles.barWell} aria-hidden="true">
        <div
          className={styles.bar}
          style={{
            height: `${fill * 100}%`,
            background: isNet ? roleColor('retained') : roleColor('gross'),
          }}
        />
        <span className={styles.assetMark} style={{ bottom: `${(assets / gross) * 100}%` }}>
          assets
        </span>
      </div>
      <div className={styles.copy}>
        <p className={styles.kicker}>Accident year 2019 · Note 13</p>
        <p className={styles.amount} style={{ color: isNet ? roleColor('retained', 'high') : roleColor('gross') }}>
          ${exact(shown)}
        </p>
        <p className={styles.basisLabel}>{isNet ? 'Net of reinsurance' : 'Gross of reinsurance'}</p>
        <dl className={styles.meta}>
          <div>
            <dt>Ceded</dt>
            <dd style={{ color: roleColor('ceded') }}>${compact(calculated.ay2019Ceded!.value)}</dd>
          </div>
          <div>
            <dt>Net / gross</dt>
            <dd>{percent(netShare)}</dd>
          </div>
          <div>
            <dt>Gross / assets</dt>
            <dd>{calculated.ay2019GrossToAssets!.value.toFixed(2)}×</dd>
          </div>
        </dl>
        <button className={styles.toggle} onClick={toggleBasis}>
          {isNet ? 'Restore gross' : 'Collapse to net'} <kbd>G</kbd>
        </button>
      </div>
    </div>
  );
}
