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
          //TODO: Add round data when game starts
          rounds: []
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

    handleAction(gameId: string, playerId: string, action: any): any {
        const game = this.games.get(gameId);
        if (!game) return null;

        // --- ACTUAL GAME LOGIC HERE ---
        // Example: Update game.data based on the action
        // game.data.score += action.points;
        
        console.log(`Action in ${gameId} by ${playerId}:`, action);
        
        // Return the new state or the action to be broadcasted
        return {
            player: playerId,
            action,
            // gameState: game.data // Optionally send updated state
        };
    }
}