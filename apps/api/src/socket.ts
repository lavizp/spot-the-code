import { Server, Socket } from 'socket.io';
import { GameController } from './controller/gameController';

export const configureSocket = (io: Server) => {
    const gameController = new GameController();

    io.on('connection', (socket: Socket) => {
        console.log(`User Connected: ${socket.id}`);

        socket.on('create_game', (gameId: string) => {
            const result = gameController.createGame();
            
            if (result.success) {
                socket.join(gameId);
                socket.emit('game_created', { gameId, success: true });
            } else {
                socket.emit('game_created', { success: false, message: result.message });
            }
        });

        socket.on('join_game', (gameId: string) => {
            const result = gameController.joinGame(gameId, socket.id);
            
            if (result.success) {
                socket.join(gameId);
                io.to(gameId).emit('player_joined', socket.id);
            } else {
                socket.emit('error', result.message);
            }
        });

        socket.on('game_action', ({ gameId, action }) => {
            // Let controller process logic
            const broadcastData = gameController.handleAction(gameId, socket.id, action, io);
            
            if (broadcastData) {
                io.to(gameId).emit('action_broadcasted', broadcastData);
            }
        });
    });
};
