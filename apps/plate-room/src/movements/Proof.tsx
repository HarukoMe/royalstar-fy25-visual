import { Canvas, Movement, MOVEMENTS } from '@/components/Movement';
import { Figure } from '@/components/Figure';
import { Interpretation } from '@/components/Interpretation';
import { ClaimsTriangle } from '@/components/charts/ClaimsTriangle';
import { Collapse2019 } from '@/components/charts/Collapse2019';
import { RetentionArc } from '@/components/charts/RetentionArc';
import { RunOffMultiples } from '@/components/charts/RunOffMultiples';
import { useStore } from '@/state/useStore';
import styles from './shared.module.css';

export function Proof() {
  const basis = useStore((s) => s.basis);

  return (
    <Movement meta={MOVEMENTS[3]!} title="What reached the company.">
      <Collapse2019 />

      <div className={styles.statRow}>
        <div className={styles.stat}>
          <Figure id="ay2019GrossCurrent" size="display" mode="compact" />
        </div>
        <div className={styles.stat}>
          <Figure id="ay2019NetCurrent" size="display" mode="compact" />
        </div>
        <div className={styles.stat}>
          <Figure id="ay2019NetToGross" size="display" />
        </div>
      </div>

      <Canvas label={`${basis} development`} wide>
        <ClaimsTriangle />
      </Canvas>

      <div className={styles.twoUp}>
        <Canvas>
          <RetentionArc />
        </Canvas>
        <div className={styles.figureGrid}>
          <Figure id="cededUltimate" size="large" mode="compact" countUp />
          <Figure id="netToGrossUltimate" size="large" countUp />
        </div>
      </div>

      <Interpretation id="triangleEvidence" />

      <Canvas>
        <RunOffMultiples />
      </Canvas>
      <Interpretation id="developmentAsymmetry" />
    </Movement>
  );
}
