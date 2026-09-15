import { useState } from 'react';
import { useStore } from '@/state/useStore';
import { PositionPanel } from './PositionPanel';
import { PerformancePanel } from './PerformancePanel';
import { LiquidityPanel } from './LiquidityPanel';
import { SensitivityPanel } from './SensitivityPanel';
import { InvestmentsPanel } from './InvestmentsPanel';
import { StatementsPanel } from './StatementsPanel';
import styles from './Explore.module.css';

const PANELS = [
  { id: 'position', name: 'Position', detail: 'Balance sheet, product lines', Component: PositionPanel },
  { id: 'performance', name: 'Performance', detail: 'Income, expenses by nature', Component: PerformancePanel },
  { id: 'liquidity', name: 'Cash & Liquidity', detail: 'Cash flows, run-off', Component: LiquidityPanel },
  { id: 'sensitivity', name: 'Sensitivities', detail: 'Shocks, discount rates', Component: SensitivityPanel },
  { id: 'investments', name: 'Investments & Credit', detail: 'Holdings, receivables', Component: InvestmentsPanel },
  { id: 'statements', name: 'Statements', detail: 'Primary statements in full', Component: StatementsPanel },
] as const;

/**
 * The secondary experience. Deliberately calmer than the cinematic path:
 * denser, tabular-first, lighter motion. Everything cited in a movement is
 * reachable here.
 */
export function Explore() {
  const [active, setActive] = useState<(typeof PANELS)[number]['id']>('position');
  const setView = useStore((s) => s.setView);
  const Panel = PANELS.find((p) => p.id === active)!.Component;

  return (
    <main className={styles.root}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <button className={styles.back} onClick={() => setView('report')}>
            ← Return to the report
          </button>
          <h1 className={styles.title}>Explore the numbers</h1>
          <p className={styles.standfirst}>
            The complete audited detail behind the report: all four primary statements, the notes
            that carry quantitative disclosure, and every figure cited in the seven movements. Page
            references are as printed on the statement page.
          </p>
        </div>
      </header>

      <nav className={styles.tabs} aria-label="Explore sections">
        <div className={styles.tabsInner}>
          {PANELS.map((p) => (
            <button
              key={p.id}
              onClick={() => setActive(p.id)}
              className={styles.tab}
              data-active={active === p.id ? 'true' : 'false'}
              aria-current={active === p.id}
            >
              <span className={styles.tabName}>{p.name}</span>
              <span className={styles.tabDetail}>{p.detail}</span>
            </button>
          ))}
        </div>
      </nav>

      <div className={styles.panel} key={active}>
        <Panel />
      </div>
    </main>
  );
}
