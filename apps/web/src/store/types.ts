export type GameState ={
  id: string
  level: number
  target: number[]
  selected: number[] | null
  score: number
  isPlaying: boolean
  currentRound: number
  totalRounds: number
  imageUrl: string | null
  roundDistance: number | null
  roundScore: number
  isGameOver: boolean
}

export type GameActions= {
  startGame: () => void
  submitGuess: (point: number[]) => void
  nextRound: () => void
  resetGame: () => void
  select:(point: number[]) => void
  endGame: () => void
}

export type GameStore = GameActions & GameState;
