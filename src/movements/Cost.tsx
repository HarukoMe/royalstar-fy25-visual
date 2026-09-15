import { Canvas, Movement, MOVEMENTS } from '@/components/Movement';
import { Figure } from '@/components/Figure';
import { Interpretation } from '@/components/Interpretation';
import { RevenueDecomposition } from '@/components/charts/RevenueDecomposition';
import { NetIncomeBridge } from '@/components/charts/NetIncomeBridge';
import styles from './shared.module.css';

export function Cost() {
  return (
    <Movement
      meta={MOVEMENTS[2]!}
      title={
        <>
          +15.5m in, +0.14m kept.
        </>
      }
    >
      <Canvas>
        <RevenueDecomposition />
      </Canvas>
      <Interpretation id="protectionCostlier" />

      <div className={styles.statRow}>
        <div className={styles.stat}>
          <Figure id="revenueIncrease" size="display" mode="compact" countUp />
        </div>
        <div className={styles.stat}>
          <Figure id="insuranceServiceResult" size="display" mode="compact" countUp showDelta />
        </div>
      </div>

      <Canvas label="Net income">
        <NetIncomeBridge />
      </Canvas>
      <Interpretation id="earningsAttribution" />
    </Movement>
  );
}
