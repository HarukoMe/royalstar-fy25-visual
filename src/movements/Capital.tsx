import { Canvas, Movement, MOVEMENTS } from '@/components/Movement';
import { Figure } from '@/components/Figure';
import { Interpretation } from '@/components/Interpretation';
import { EquityBridge } from '@/components/charts/EquityBridge';

export function Capital() {
  return (
    <Movement
      meta={MOVEMENTS[5]!}
      title={
        <>
          More stayed in.
        </>
      }
    >
      <Canvas wide>
        <EquityBridge />
      </Canvas>

      <div style={{ display: 'grid', gap: '0.4rem', minHeight: '40vh', alignContent: 'center' }}>
        <span className="eyebrow">Retained earnings</span>
        <Figure id="retainedEarnings" size="hero" mode="compact" countUp showDelta bare />
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1px',
          background: 'var(--hairline)',
        }}
      >
        <div style={{ padding: '1.4rem', background: 'var(--abyss)' }}>
          <Figure id="totalEquity" size="display" mode="compact" countUp showDelta />
        </div>
        <div style={{ padding: '1.4rem', background: 'var(--abyss)' }}>
          <Figure id="dividendPerOrdinaryShare" size="display" countUp showDelta />
        </div>
        <div style={{ padding: '1.4rem', background: 'var(--abyss)' }}>
          <Figure id="bookValuePerOrdinaryShare" size="display" countUp showDelta />
        </div>
        <div style={{ padding: '1.4rem', background: 'var(--abyss)' }}>
          <Figure id="ordinaryPayoutRatio" size="display" countUp showDelta />
        </div>
      </div>

      <Interpretation id="capitalRetention" />
    </Movement>
  );
}
