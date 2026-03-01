import type { StateCreator } from 'zustand';
import type { GameStore } from '../types';

export const createGameSlice: StateCreator<
  GameStore,
  [],
  [],
  GameStore
> = (set) => ({
  // Game State
  score: 0,
  isPlaying: false,
  currentRound: 1,
  totalRounds: 5,
  isGameOver: false,
  gameId: null,
  roundEndTime: null,
  finalScores: null,
  
  // Round State
  currentCodeSnippet: null,
  correctLanguage: null,
  languageOptions: [],
  selectedLanguage: null,
  roundScore: 0,

  setStartGame: (snippet: string, language: string, options: string[], gameId?: string, round?: number, roundEndTime?: number) => {
    set({
      isPlaying: true,
      currentRound: round || 1,
      score: 0,
      isGameOver: false,
      gameId: gameId || null,
      roundEndTime: roundEndTime || null,
      currentCodeSnippet: snippet,
      correctLanguage: language,
      languageOptions: options,
      selectedLanguage: null,
      roundScore: 0,
    });
  },

  setGameId: (gameId: string | null) => {
    set({ gameId });
  },

  setGuessResult: (selected: string, roundScore: number) => {
    set((state) => ({
      selectedLanguage: selected,
      roundScore: roundScore,
      score: state.score + roundScore,
    }));
  },

  setNextRound: (snippet: string, language: string, options: string[], round?: number, roundEndTime?: number) => {
    set((state) => ({
      currentRound: round || state.currentRound + 1,
      roundEndTime: roundEndTime || null,
      currentCodeSnippet: snippet,
      correctLanguage: language,
      languageOptions: options,
      selectedLanguage: null,
      roundScore: 0,
    }));
  },

  setGameOver: (scores) => {
    set({ isGameOver: true, isPlaying: false, finalScores: scores || null });
  },

  select: (language: string) => set(() => ({ selectedLanguage: language })),

  endGame: () => set(() => ({
    score: 0,
    isPlaying: false,
    currentRound: 1,
    currentCodeSnippet: null,
    correctLanguage: null,
    languageOptions: [],
    selectedLanguage: null,
    roundScore: 0,
    isGameOver: false,
    gameId: null,
    roundEndTime: null,
    finalScores: null
  })),
});