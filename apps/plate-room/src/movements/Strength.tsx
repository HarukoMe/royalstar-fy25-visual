import { Canvas, Movement, MOVEMENTS } from '@/components/Movement';
import { Figure } from '@/components/Figure';
import { RatingLadder } from '@/components/charts/RatingLadder';
import { CatastropheCap } from '@/components/charts/CatastropheCap';
import { SensitivityTornado } from '@/components/charts/SensitivityTornado';
import styles from './shared.module.css';

export function Strength() {
  return (
    <Movement meta={MOVEMENTS[4]!} title="A defensive system.">
      <div className={styles.statRow}>
        <div className={styles.stat}>
          <Figure id="reinsuranceContractAssets" size="display" mode="compact" countUp showDelta />
        </div>
        <div className={styles.stat}>
          <Figure id="insuranceContractLiabilities" size="display" mode="compact" countUp showDelta />
        </div>
      </div>

      <Canvas wide>
        <RatingLadder />
      </Canvas>
      <Canvas>
        <CatastropheCap />
      </Canvas>
      <Canvas>
        <SensitivityTornado />
      </Canvas>
    </Movement>
  );
}
