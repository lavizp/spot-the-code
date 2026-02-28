export type GameState = {
  // Game State
  score: number
  isPlaying: boolean
  currentRound: number
  totalRounds: number
  isGameOver: boolean
  gameId: string | null
  
  // Round State
  currentCodeSnippet: string | null
  correctLanguage: string | null
  languageOptions: string[]
  selectedLanguage: string | null
  roundScore: number
}

export type GameActions = {
  setStartGame: (snippet: string, language: string, options: string[], gameId?: string, round?: number) => void
  setGuessResult: (selected: string, roundScore: number) => void
  setNextRound: (snippet: string, language: string, options: string[], round?: number) => void
  setGameOver: () => void
  select: (language: string) => void
  endGame: () => void
}

export type GameStore = GameActions & GameState;