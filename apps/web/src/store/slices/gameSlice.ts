import type { StateCreator } from 'zustand';
import type { GameStore } from '../types';

export const createGameSlice: StateCreator<
  GameStore,
  [],
  [],
  GameStore
  > = (set) => ({
    id: 'game-1',
    level: 1,
    target: [],
    selected: [],
    score: 0,
    select: (point) => set(()=>({selected: point})),
    endGame: () => set(() => ({level:0, score:0, selected:[], target:[] })),
})