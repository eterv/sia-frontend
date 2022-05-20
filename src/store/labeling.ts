import create from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

export type ToolMode = 'create' | 'select';

interface LabelingStore {
  mode: ToolMode;

  changeMode(mode: ToolMode): void;
}

export const useLabelingStore = create(
  subscribeWithSelector<LabelingStore>((set) => ({
    mode: 'select',

    changeMode: (mode) => set({ mode }),
  }))
);
