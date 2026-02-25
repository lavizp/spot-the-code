import express from 'express';
import type { Request, Response } from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { configureSocket } from './socket';

const app = express();
const PORT = 8000;

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  }
});

configureSocket(io);

app.get('/', (_req: Request, res: Response) => {
  res.send('Hello World with TypeScript!');
});

httpServer.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});