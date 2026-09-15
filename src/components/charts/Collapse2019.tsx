import { useEffect } from 'react';
import { reported } from '@/data/reported';
import { calculated } from '@/data/calculated';
import { roleColor } from '@/data/roles';
import { compact, exact, percent } from '@/lib/format';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { useScrollScene } from '@/hooks/useScrollScene';
import { useStore } from '@/state/useStore';
import styles from './Collapse2019.module.css';

/**
 * Accident year 2019 at true linear scale.
 * Gross $324,887,116 occupies the viewport; scroll drains the ceded mass
 * until the gold remainder $8,459,703 is all that remains.
 */

function clamp01(n: number) {
  return Math.min(1, Math.max(0, n));
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function Collapse2019() {
  const { progress, ref: trackRef, node: trackNode } = useScrollScene();
  const setBasis = useStore((s) => s.setBasis);
  const toggleBasis = useStore((s) => s.toggleBasis);
  const reduced = usePrefersReducedMotion();

  const gross = reported.ay2019GrossCurrent!.value;
  const net = reported.ay2019NetCurrent!.value;
  const assets = reported.totalAssets!.value;
  const netShare = net / gross;
  const assetsLine = assets / gross;

  const collapseT = reduced ? 1 : clamp01((progress - 0.28) / 0.48);
  const eased =
    collapseT < 0.4 ? 2.4 * collapseT * collapseT : 1 - Math.pow(1 - collapseT, 2.6);
  const fill = lerp(1, netShare, eased);
  const shown = Math.round(lerp(gross, net, eased));
  const isNet = eased > 0.92;

  useEffect(() => {
    if (eased > 0.55) setBasis('net');
    else if (eased < 0.2) setBasis('gross');
  }, [eased, setBasis]);

  const floodColor =
    eased < 0.15 ? roleColor('gross') : eased < 0.85 ? roleColor('ceded') : roleColor('retained', 'high');

  const goNet = () => {
    const el = trackNode;
    if (!el) {
      toggleBasis();
      return;
    }
    const travel = el.offsetHeight - window.innerHeight;
    const top = window.scrollY + el.getBoundingClientRect().top + travel * 0.88;
    window.scrollTo({ top, behavior: reduced ? 'auto' : 'smooth' });
    setBasis('net');
  };

  const goGross = () => {
    const el = trackNode;
    if (!el) return;
    const top = window.scrollY + el.getBoundingClientRect().top;
    window.scrollTo({ top, behavior: reduced ? 'auto' : 'smooth' });
    setBasis('gross');
  };

  return (
    <div ref={trackRef} className={styles.track}>
      <div className={styles.sticky}>
        <div
          className={styles.flood}
          style={{
            height: `${fill * 100}%`,
            ['--flood' as string]: floodColor,
            ['--ceded' as string]: roleColor('ceded'),
            ['--gross' as string]: roleColor('gross'),
            ['--net' as string]: roleColor('retained', 'high'),
            ['--net-share' as string]: String(netShare),
          }}
          data-phase={isNet ? 'net' : 'gross'}
        >
          <span className={styles.cededVeil} />
          <span className={styles.netCore} />
        </div>

        <div className={styles.assets} style={{ bottom: `${assetsLine * fill * 100}%` }}>
          <span>Total assets {compact(assets)}</span>
        </div>

        <div className={styles.copy}>
          <p className={styles.kicker}>Accident year 2019 · Note 13</p>
          <p
            className={`${styles.amount} monument`}
            style={{ color: isNet ? roleColor('retained', 'high') : roleColor('gross') }}
          >
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
              <dd style={{ color: roleColor('retained', 'high') }}>{percent(netShare)}</dd>
            </div>
            <div>
              <dt>Gross / assets</dt>
              <dd style={{ color: roleColor('gross') }}>
                {calculated.ay2019GrossToAssets!.value.toFixed(2)}×
              </dd>
            </div>
          </dl>
          <div className={styles.actions}>
            {isNet ? (
              <button className={styles.toggle} onClick={goGross}>
                Restore gross
              </button>
            ) : (
              <button className={styles.toggle} onClick={goNet}>
                Collapse to net <kbd>scroll</kbd>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
