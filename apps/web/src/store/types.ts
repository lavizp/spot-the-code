export type GameState ={
  id: string
  level: number
  target: number[]
  selected: number[]
  score: number
}

export type GameActions= {
  select:(point: number[]) => void
  endGame: () => void
}

export type GameStore = GameActions & GameState;
