import express from 'express';
import userRouter from './routes/user.router.js';
import { connection } from './db.js';
import cors from 'cors';
import messageRouter from './routes/message.router.js';
import { createServer } from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();
const dirname = path.resolve();

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ['GET', 'POST']
  }
});

// store online users: { userId: socketId }
const onlineUsers = new Map();

const port = 8080;
const url = process.env.MONGO_URI;

// middlewares
app.use(cors({
  origin: "*",
  methods: ['GET', 'POST']
}));
app.use(express.json());

// static frontend
app.use(express.static(path.join(dirname, 'client', 'dist')));

// connect DB
connection(url);

// socket.io
io.on('connection', (socket) => {
  console.log('connected on socket', socket.id);

  // frontend should send userId after login
  socket.on('register', (userId) => {
    onlineUsers.set(userId, socket.id);
    console.log(`User ${userId} registered with socket ${socket.id}`);
  });

  socket.on('disconnect', () => {
    console.log('disconnected', socket.id);
    for (let [userId, id] of onlineUsers) {
      if (id === socket.id) {
        onlineUsers.delete(userId);
        break;
      }
    }
  });
});

// routes
app.use('/api/user', userRouter);
app.use('/api/message', messageRouter(io, onlineUsers));

app.get('/ping', (req, res) => res.send('working'));

// for SPA frontend (React/Vite etc.)
app.get('*', (req, res) => {
  res.sendFile(path.join(dirname, 'client', 'dist', 'index.html'));
});

// start server
server.listen(port, () => console.log(`Server running on port ${port}`));
