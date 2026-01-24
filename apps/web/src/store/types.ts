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
  setStartGame: (target: number[], imageUrl: string) => void
  setGuessResult: (point: number[], distance: number, roundScore: number) => void
  setNextRound: (target: number[], imageUrl: string) => void
  setGameOver: () => void
  select: (point: number[]) => void
  endGame: () => void
}

export type GameStore = GameActions & GameState;
