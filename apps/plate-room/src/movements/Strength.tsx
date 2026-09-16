import { Canvas, Movement, MOVEMENTS } from '@/components/Movement';
import { Figure } from '@/components/Figure';
import { Interpretation } from '@/components/Interpretation';
import { RatingLadder } from '@/components/charts/RatingLadder';
import { CatastropheCap } from '@/components/charts/CatastropheCap';
import { SensitivityTornado } from '@/components/charts/SensitivityTornado';
import { disclosures } from '@/data/reported';
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

      <Interpretation id="climateContext" defaultOpen />

      <Canvas wide>
        <RatingLadder />
      </Canvas>
      <blockquote className={styles.pullQuote}>
        <p>{disclosures.reinsurerPolicy.text}</p>
        <cite>
          {disclosures.reinsurerPolicy.citation.statement}, printed page{' '}
          {disclosures.reinsurerPolicy.citation.printedPage}
        </cite>
      </blockquote>
      <Canvas>
        <CatastropheCap />
      </Canvas>
      <blockquote className={styles.pullQuote}>
        <p>{disclosures.climate.text}</p>
        <cite>
          {disclosures.climate.citation.statement}, printed page {disclosures.climate.citation.printedPage}
        </cite>
      </blockquote>
      <Canvas>
        <SensitivityTornado />
      </Canvas>
    </Movement>
  );
}
