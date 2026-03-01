import type { Server } from "socket.io";
import { GameActions } from "../actions/GameActions";
import type { GameRoom } from "../types/game";
import { createGameId } from "../utils/game";

export class GameController {
    private games: Map<string, GameRoom>;

    constructor() {
        this.games = new Map();
    }

    createGame(): { success: boolean; message?: string; gameId?: string } {
        const gameId = createGameId();
        if (this.games.has(gameId)) {
            return { success: false, message: 'Game already exists' };
        }

        this.games.set(gameId, {
            id: gameId,
            data: {
                players: [],
                round: 0
            },
            answeredPlayers: new Set(),
            rounds: GameActions.createNewGame(),
            currentRound: 0
        });

        console.log(`Game created: ${gameId}`);
        return { success: true, gameId };
    }

    joinGame(gameId: string, playerId: string, playerName: string): { success: boolean; message?: string; players?: any[] } {
        const game = this.games.get(gameId.toUpperCase());
        if (!game) {
            return { success: false, message: 'Game not found' };
        }

        const isAlreadyJoined = game.data.players.some(p => p.id === playerId);
        if (isAlreadyJoined) {
            return { success: false, message: 'Player already in game' };
        }

        game.data.players.push({
            id: playerId,
            name: playerName || `Player ${game.data.players.length + 1}`,
            points: 0
        });

        console.log(`Player ${playerName} (${playerId}) joined game ${gameId}`);
        return { success: true, players: game.data.players };
    }

    startGame(gameId: string, io: Server): { success: boolean; message?: string } {
        const game = this.games.get(gameId.toUpperCase());
        if (!game) {
            return { success: false, message: 'Game not found' };
        }

        if (game.data.players.length < 1) {
            return { success: false, message: 'Need at least one player to start' };
        }

        game.currentRound = 0;
        game.data.round = 0;
        this.runRound(gameId, io);
        
        return { success: true };
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
        game.currentRound = game.data.round;
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
        const game = this.games.get(gameId.toUpperCase());
        if (!game) return null;

        if (action.type === 'choose_answer') {
            if (game.answeredPlayers.has(playerId)) return null;

            game.answeredPlayers.add(playerId);

            // Simple point logic: if correct (checking against rounds data)
            const currentRoundData = game.rounds[game.data.round - 1];
            if (action.answer === currentRoundData?.correctAnswer) {
                const player = game.data.players.find(p => p.id === playerId);
                if (player) player.points += 10;
            }

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