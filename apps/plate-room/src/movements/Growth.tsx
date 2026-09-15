import { Canvas, Movement, MOVEMENTS } from '@/components/Movement';
import { Figure } from '@/components/Figure';
import { Interpretation } from '@/components/Interpretation';
import { Archipelago } from '@/components/charts/Archipelago';
import styles from './shared.module.css';

export function Growth() {
  return (
    <Movement
      meta={MOVEMENTS[1]!}
      title="Six licences."
      standfirst={
        <>
          <Figure id="premiumsWritten" size="inline" bare /> written
        </>
      }
    >
      <Canvas>
        <Archipelago />
      </Canvas>
      <Interpretation id="growthConcentrated" />
      <div className={styles.statRow}>
        <div className={styles.stat}>
          <Figure id="insuranceRevenue" size="display" mode="compact" countUp showDelta />
        </div>
        <div className={styles.stat}>
          <Figure id="premiumPerEmployee" size="display" mode="compact" countUp showDelta />
        </div>
      </div>
    </Movement>
  );
}
