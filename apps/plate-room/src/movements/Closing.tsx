import { Movement, MOVEMENTS } from '@/components/Movement';
import { Figure } from '@/components/Figure';
import { disclosures } from '@/data/reported';
import { thesis } from '@/data/interpretation';
import { useStore } from '@/state/useStore';
import { ROLE_TOKENS, roleColor } from '@/data/roles';
import type { SemanticRole } from '@/data/types';
import styles from './Closing.module.css';

export function Closing() {
  const factsOnly = useStore((s) => s.factsOnly);
  const setView = useStore((s) => s.setView);
  const toggleProvenance = useStore((s) => s.toggleProvenance);

  return (
    <Movement meta={MOVEMENTS[6]!} title="The year, held.">
      {!factsOnly && <p className={styles.thesisText}>{thesis.headline}</p>}

      <div className={styles.threeClaims}>
        <ClaimPanel
          ordinal="01"
          heading="Grew"
          role="gross"
          figureIds={['premiumsWritten', 'insuranceRevenue']}
        />
        <ClaimPanel
          ordinal="02"
          heading="Protected"
          role="ceded"
          figureIds={['netReinsuranceExpenses', 'reinsuranceToRevenue']}
        />
        <ClaimPanel
          ordinal="03"
          heading="Kept"
          role="retained"
          figureIds={['retainedEarningsIncrease', 'totalEquity']}
        />
      </div>

      <div className={styles.provenance}>
        <div>
          <p className="eyebrow">Ledger</p>
          <h3 className={styles.provTitle}>Every figure is traceable.</h3>
          <div className={styles.provActions}>
            <button onClick={toggleProvenance}>Provenance</button>
            <button onClick={() => setView('explore')}>Explore the numbers</button>
          </div>
        </div>
        <dl className={styles.tiers}>
          <div data-tier="reported">
            <dt>Reported</dt>
            <dd>From the audited statements. Hover for page.</dd>
          </div>
          <div data-tier="calculated">
            <dt>Calculated</dt>
            <dd>Runtime from reported inputs. Marked ƒ.</dd>
          </div>
          <div data-tier="interpretation">
            <dt>Reading</dt>
            <dd>Editorial. Hidden by Facts only.</dd>
          </div>
        </dl>
      </div>

      <div className={styles.footerGrid}>
        <div className={styles.footerNote}>
          <p className="eyebrow">Subsequent</p>
          <p>
            Series B preference dividend{' '}
            <Figure id="subsequentPreferenceDividend" size="inline" bare />
          </p>
        </div>
        <div className={styles.footerNote}>
          <p className="eyebrow">Strength</p>
          <p>{disclosures.amBest.text}</p>
        </div>
        <div className={styles.footerNote}>
          <p className="eyebrow">Source</p>
          <p>PwC Nassau · 17 April 2026 · IFRS · unaudited interactive reading</p>
        </div>
      </div>
    </Movement>
  );
}

function ClaimPanel({
  ordinal,
  heading,
  role,
  figureIds,
}: {
  ordinal: string;
  heading: string;
  role: SemanticRole;
  figureIds: readonly string[];
}) {
  return (
    <div className={styles.claim} style={{ ['--claim-rule' as string]: roleColor(role) }}>
      <span className={styles.claimOrdinal}>{ordinal}</span>
      <h3 className={styles.claimHeading}>{heading}</h3>
      <div className={styles.claimFigures}>
        {figureIds.map((id) => (
          <Figure key={id} id={id} size="body" mode="compact" />
        ))}
      </div>
      <span className={styles.claimRole}>{ROLE_TOKENS[role].label}</span>
    </div>
  );
}
