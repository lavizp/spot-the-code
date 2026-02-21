export interface GameRoom {
  id: string;
  data: GameStates;
  rounds: RoundStates[]
  currentTimer?: NodeJS.Timeout
  answeredPlayers: Set<string>
}

export interface PlayerState{
  id: string
  name: string
  points: string
}

export interface GameStates{
  round: number
  players: Array<PlayerState>
}

export interface RoundStates{
  snippet: string
  correctAnswer: string
}