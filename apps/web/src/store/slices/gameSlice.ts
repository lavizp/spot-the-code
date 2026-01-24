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
    selected: null,
    score: 0,
    isPlaying: false,
    currentRound: 1,
    totalRounds: 5,
    imageUrl: null,
    roundDistance: null,
    roundScore: 0,
    isGameOver: false,

    setStartGame: (target: number[], imageUrl: string) => {
        set({
            isPlaying: true,
            currentRound: 1,
            score: 0,
            isGameOver: false,
            target,
            imageUrl,
            selected: null,
            roundDistance: null,
            roundScore: 0,
        });
    },

    setGuessResult: (point: number[], distance: number, roundScore: number) => {
        set((state) => ({
            selected: point,
            roundDistance: distance,
            roundScore: roundScore,
            score: state.score + roundScore,
        }));
    },

    setNextRound: (target: number[], imageUrl: string) => {
        set((state) => ({
            currentRound: state.currentRound + 1,
            target,
            imageUrl,
            selected: null,
            roundDistance: null,
            roundScore: 0,
        }));
    },

    setGameOver: () => {
        set({ isGameOver: true, isPlaying: false });
    },

    select: (point) => set(()=>({selected: point})),
    
    endGame: () => set(() => ({level:0, score:0, selected:[], target:[], isPlaying: false })),
})