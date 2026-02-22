export interface GameRoom {
  id: string;
  data: GameStates;
  rounds: RoundStates[]
  currentTimer?: NodeJS.Timeout
  answeredPlayers: Set<string>
  currentRound: number
}

export interface PlayerState{
  id: string
  name: string
  points: number
}

export interface GameStates{
  round: number
  players: Array<PlayerState>
}

export interface RoundStates{
  snippet: string[]
  correctAnswer: string
}