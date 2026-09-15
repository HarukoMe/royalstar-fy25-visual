import { create } from 'zustand';

export type Basis = 'gross' | 'net';
export type View = 'report' | 'explore';

interface State {
  /** The globally persistent gross/net toggle, introduced in Movement 04. */
  basis: Basis;
  /** Outline every figure by provenance tier. */
  provenanceMode: boolean;
  /** Strip the interpretation layer, leaving audited figures and defined calculations. */
  factsOnly: boolean;
  /** Which of the seven movements is currently in view. */
  activeMovement: number;
  view: View;
  paletteOpen: boolean;
  /** Accident year highlighted in the claims triangle, if any. */
  hoveredYear: number | null;

  setBasis: (b: Basis) => void;
  toggleBasis: () => void;
  toggleProvenance: () => void;
  toggleFactsOnly: () => void;
  setActiveMovement: (n: number) => void;
  setView: (v: View) => void;
  setPaletteOpen: (open: boolean) => void;
  setHoveredYear: (y: number | null) => void;
}

export const useStore = create<State>((set) => ({
  basis: 'gross',
  provenanceMode: false,
  factsOnly: false,
  activeMovement: 0,
  view: 'report',
  paletteOpen: false,
  hoveredYear: null,

  setBasis: (basis) => set({ basis }),
  toggleBasis: () => set((s) => ({ basis: s.basis === 'gross' ? 'net' : 'gross' })),
  toggleProvenance: () => set((s) => ({ provenanceMode: !s.provenanceMode })),
  toggleFactsOnly: () => set((s) => ({ factsOnly: !s.factsOnly })),
  setActiveMovement: (activeMovement) => set({ activeMovement }),
  setView: (view) => set({ view }),
  setPaletteOpen: (paletteOpen) => set({ paletteOpen }),
  setHoveredYear: (hoveredYear) => set({ hoveredYear }),
}));
