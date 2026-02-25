import { Server, Socket } from 'socket.io';
import { GameController } from './controller/gameController';

export const configureSocket = (io: Server) => {
    const gameController = new GameController();

    io.on('connection', (socket: Socket) => {
        console.log(`User Connected: ${socket.id}`);

        socket.on('create_game', () => {
            const result = gameController.createGame();
            
            if (result.success && result.gameId) {
                socket.join(result.gameId);
                socket.emit('game_created', { gameId: result.gameId, success: true });
                console.log(`Game created and joined: ${result.gameId}`);
            } else {
                socket.emit('game_created', { success: false, message: result.message });
            }
        });

        socket.on('join_game', ({ gameId, playerName }: { gameId: string; playerName: string }) => {
            const result = gameController.joinGame(gameId, socket.id, playerName);
            
            if (result.success) {
                socket.join(gameId);

                // Send current room state to the player who joined
                socket.emit('room_state', {
                    players: result.players
                });

                // Notify everyone in the room (including the joining player)
                io.to(gameId).emit('player_joined', {
                    playerId: socket.id,
                    playerName: playerName
                });
                console.log(`Player ${playerName} joined room: ${gameId}`);
            } else {
                socket.emit('error', { message: result.message });
            }
        });

        socket.on('start_game', (gameId: string) => {
            const result = gameController.startGame(gameId, io);
            if (!result.success) {
                socket.emit('error', { message: result.message });
            }
        });

        socket.on('game_action', ({ gameId, action }: { gameId: string, action: any }) => {
            const broadcastData = gameController.handleAction(gameId, socket.id, action, io);
            
            if (broadcastData) {
                io.to(gameId).emit('action_broadcasted', broadcastData);
            }
        });

        socket.on('disconnect', () => {
            console.log(`User Disconnected: ${socket.id}`);
            // Logic for handling player leaving could be added here
        });
    });
};