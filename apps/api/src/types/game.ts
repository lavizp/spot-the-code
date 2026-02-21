export interface GameRoom {
    id: string;
    players: Set<string>;
    data: any;
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