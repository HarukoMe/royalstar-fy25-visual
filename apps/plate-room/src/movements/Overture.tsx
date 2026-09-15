import { thesis } from '@/data/interpretation';
import { useStore } from '@/state/useStore';
import { Movement } from '@/components/Movement';
import { Figure } from '@/components/Figure';
import { GrammarLegend } from '@/components/Chrome';
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
      <div className={styles.plate}>
        <p className={styles.kicker}>Consolidated statements · 31 December 2025 · BSD</p>
        <h1 className={styles.name}>RoyalStar Assurance Ltd.</h1>
        <p className={styles.year}>FY 2025</p>
        {!factsOnly && <p className={styles.thesis}>{thesis.headline}</p>}
      </div>

      <div className={styles.heroFigures}>
        {HERO.map((h) => (
          <div key={h.id} className={styles.heroFigure}>
            <span className={styles.heroEyebrow}>{h.eyebrow}</span>
            <Figure id={h.id} size="display" mode="compact" countUp showDelta />
          </div>
        ))}
      </div>

      <GrammarLegend />
    </Movement>
  );
}
