import { calculated } from '@/data/calculated';
import { disclosures, reported } from '@/data/reported';
import { roleColor } from '@/data/roles';
import { compact, exact } from '@/lib/format';
import { useInView } from '@/hooks/useInView';
import { useMeasure } from './chartkit';
import styles from './CatastropheCap.module.css';

/**
 * The disclosed structural limit, drawn to scale.
 *
 * Note 19 states that reinsurance coverage is designed to limit the impact of
 * any single event or catastrophe to approximately 10% of total equity. Equity
 * is gold because it is RoyalStar's own capital; the capped band is violet
 * because it marks the boundary of what reinsurance absorbs.
 */
export function CatastropheCap() {
  const { ref, inView } = useInView<HTMLDivElement>(0.3);
  const { ref: measureRef, width } = useMeasure<HTMLDivElement>();

  const equity = reported.totalEquity!.value;
  const cap = calculated.catastropheCapAmount!.value;
  const capShare = cap / equity;

  return (
    <div ref={ref} className={styles.wrap}>
      <div ref={measureRef} className={styles.plot}>
        {width > 0 && (
          <div className={styles.stack} data-in={inView ? 'true' : 'false'}>
            <div
              className={styles.equity}
              style={{ ['--equity-color' as string]: roleColor('retained') }}
            >
              <div className={styles.equityLabel}>
                <span className={styles.eyebrowSm}>Total equity</span>
                <span className={`${styles.equityValue} num`}>${exact(equity)}</span>
              </div>

              {/* The capped band, drawn as a proportion of the equity block. */}
              <div
                className={styles.cap}
                style={{
                  height: `${capShare * 100}%`,
                  ['--cap-color' as string]: roleColor('ceded'),
                }}
              >
                <div className={styles.capLabel}>
                  <span className={styles.eyebrowSm}>
                    Approximately 10% of total equity
                  </span>
                  <span className={`${styles.capValue} num`}>${compact(cap)}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <blockquote className={styles.quote}>
        <p>{disclosures.catastropheCover.text}</p>
        <cite>
          {disclosures.catastropheCover.citation.statement}, printed page{' '}
          {disclosures.catastropheCover.citation.printedPage}
        </cite>
      </blockquote>
    </div>
  );
}
