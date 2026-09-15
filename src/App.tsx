import { useEffect } from 'react';
import { useStore } from '@/state/useStore';
import { Controls, KeyboardShortcuts, ProgressRail } from '@/components/Chrome';
import { CommandPalette } from '@/components/CommandPalette';
import { RegistrationMarks } from '@/components/RegistrationMarks';
import { Overture } from '@/movements/Overture';
import { Growth } from '@/movements/Growth';
import { Cost } from '@/movements/Cost';
import { Proof } from '@/movements/Proof';
import { Strength } from '@/movements/Strength';
import { Capital } from '@/movements/Capital';
import { Closing } from '@/movements/Closing';
import { Explore } from '@/explore/Explore';
import styles from './App.module.css';

export function App() {
  const view = useStore((s) => s.view);

  useEffect(() => {
    if (view === 'explore') window.scrollTo({ top: 0, behavior: 'auto' });
  }, [view]);

  return (
    <>
      <div className={styles.ambient} aria-hidden="true">
        <RegistrationMarks />
      </div>

      <KeyboardShortcuts />
      <Controls />
      <ProgressRail />
      <CommandPalette />

      {view === 'report' ? (
        <main className={styles.main}>
          <Overture />
          <Growth />
          <Cost />
          <Proof />
          <Strength />
          <Capital />
          <Closing />
        </main>
      ) : (
        <Explore />
      )}
    </>
  );
}
