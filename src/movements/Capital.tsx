import { Canvas, Movement, MOVEMENTS } from '@/components/Movement';
import { Figure } from '@/components/Figure';
import { Interpretation } from '@/components/Interpretation';
import { EquityBridge } from '@/components/charts/EquityBridge';
import styles from './shared.module.css';

export function Capital() {
  return (
    <Movement meta={MOVEMENTS[5]!} title="More stayed in.">
      <Canvas>
        <EquityBridge />
      </Canvas>
      <div className={styles.statRow}>
        <div className={styles.stat}>
          <Figure id="retainedEarnings" size="display" mode="compact" countUp showDelta />
        </div>
        <div className={styles.stat}>
          <Figure id="totalEquity" size="display" mode="compact" countUp showDelta />
        </div>
        <div className={styles.stat}>
          <Figure id="dividendPerOrdinaryShare" size="display" countUp showDelta />
        </div>
        <div className={styles.stat}>
          <Figure id="bookValuePerOrdinaryShare" size="display" countUp showDelta />
        </div>
      </div>
      <Interpretation id="capitalRetention" />
    </Movement>
  );
}
