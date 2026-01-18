import {create} from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import type { GameStore } from './types';
import { createGameSlice } from './slices/gameSlice';


export const useGameStore = create<GameStore>()(
  devtools(
    persist(
      immer((...a) => ({
        ...createGameSlice(...a)
      })),
      {
        name: 'app-storage',
        partialize: (state) => ({
          
        })
      }
    )
  )
)