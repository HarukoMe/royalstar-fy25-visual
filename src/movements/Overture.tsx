import { thesis } from '@/data/interpretation';
import { useStore } from '@/state/useStore';
import { Movement } from '@/components/Movement';
import { Figure } from '@/components/Figure';
import { GrammarLegend } from '@/components/Chrome';
import { roleColor } from '@/data/roles';
import styles from './Overture.module.css';

const HERO: readonly { id: string; eyebrow: string }[] = [
  { id: 'insuranceRevenue', eyebrow: 'Gross' },
  { id: 'insuranceServiceResult', eyebrow: 'Retained' },
  { id: 'netIncome', eyebrow: 'Retained' },
  { id: 'totalEquity', eyebrow: 'Retained' },
  { id: 'totalAssets', eyebrow: 'Position' },
];

export function Overture() {
  const factsOnly = useStore((s) => s.factsOnly);

  return (
    <Movement meta={{ index: 0, id: 'overture', ordinal: '01', name: 'Overture' }} title="" bare>
      <div className={`${styles.hero} grain`}>
        <p className={styles.kicker}>Year ended 31 December 2025 · BSD</p>
        <h1 className={`${styles.year} monument`}>2025</h1>
        <p className={styles.name}>RoyalStar Assurance Ltd.</p>
        {!factsOnly && <p className={styles.thesis}>{thesis.headline}</p>}
        <p className={styles.scroll}>↓</p>
      </div>

      <div className={styles.monumentRow}>
        <span className="eyebrow">Insurance revenue</span>
        <Figure id="insuranceRevenue" size="hero" mode="compact" countUp showDelta bare />
      </div>

      <div className={styles.heroFigures}>
        {HERO.map((h) => (
          <div key={h.id} className={styles.heroFigure}>
            <span className={styles.heroEyebrow}>{h.eyebrow}</span>
            <Figure id={h.id} size="display" mode="compact" countUp showDelta />
          </div>
        ))}
      </div>

      <div className={styles.grammar}>
        <div className={styles.band} style={{ ['--band' as string]: roleColor('gross') }}>
          <span>Gross</span>
        </div>
        <div className={styles.band} style={{ ['--band' as string]: roleColor('ceded') }}>
          <span>Ceded</span>
        </div>
        <div className={styles.band} style={{ ['--band' as string]: roleColor('retained', 'high') }}>
          <span>Retained</span>
        </div>
      </div>
      <GrammarLegend />

      <div className={styles.standing}>
        <div>
          <span className="eyebrow">People</span>
          <Figure id="employees" size="large" bare />
        </div>
        <div>
          <span className="eyebrow">Premiums written</span>
          <Figure id="premiumsWritten" size="large" mode="compact" bare />
        </div>
        <div style={{ ['--standing-rule' as string]: roleColor('retained') }}>
          <span className="eyebrow">A.M. Best</span>
          <span className={styles.rating}>A</span>
        </div>
      </div>
    </Movement>
  );
}
