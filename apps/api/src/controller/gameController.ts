import type { Server } from "socket.io";
import { GameActions } from "../actions/GameActions";
import type { GameRoom } from "../types/game";
import { createGameId } from "../utils/game";


export class GameController {
    private games: Map<string, GameRoom>;

    constructor() {
        this.games = new Map();
    }
    createGame(): { success: boolean; message?: string } {
      const gameId = createGameId()
        if (this.games.has(gameId)) {
            return { success: false, message: 'Game already exists' };
        }

        this.games.set(gameId, {
            id: gameId,
          data: {
            players: [],
            round:0
          },
          answeredPlayers: new Set(),
          rounds: GameActions.createNewGame(),
          currentRound:0
        });

        console.log(`Game created: ${gameId}`);
        return { success: true };
    }

//TODO: Check if player is already joined in a game before processing next join
    joinGame(gameId: string, playerId: string): { success: boolean; message?: string } {
        const game = this.games.get(gameId);
        if (!game) {
            return { success: false, message: 'Game not found' };
        }

        game.data = {...game.data, players:[...game.data.players, {id:playerId, name:'asd', points:0}]}
        console.log(`Player ${playerId} joined game ${gameId}`);
        return { success: true };
    }
    startGame(gameId: string) {
      const game = this.games.get(gameId)
      if (!game) return;
      
      game.currentRound= 0;
    }
    
    private runRound(gameId: string, io: Server) {
      const game = this.games.get(gameId);
      if (!game || game.data.round >= 5) {
        io.to(gameId).emit('game_over', { finalScores: game?.data.players });
        return;
      }
      if (game.currentTimer) {
        clearTimeout(game.currentTimer);
      }
    
      game.data.round++;
      game.answeredPlayers.clear();
    
      io.to(gameId).emit('round_start', {
        round: game.data.round,
        roundData: game.rounds[game.data.round - 1],
        expiresIn: 15000
      });
    
      game.currentTimer = setTimeout(() => {
        this.runRound(gameId, io);
      }, 15000);
    }
    
    handleAction(gameId: string, playerId: string, action: any, io: Server): any {
        const game = this.games.get(gameId);
        if (!game) return null;
        if (action.type === 'choose_answer') {
          game.answeredPlayers.add(playerId);
        
          if (game.answeredPlayers.size === game.data.players.length) {
            this.runRound(gameId, io);
          }
        }
        
        return {
            player: playerId,
            action,
        };
    }
}