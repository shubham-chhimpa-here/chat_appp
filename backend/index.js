
import express from 'express';
import userRouter from './routes/user.router.js';
import { connection } from './db.js';
import cors from 'cors';
import messageRouter from './routes/message.router.js';
import { createServer } from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import path from 'path';
const app = express()

dotenv.config()
const dirname = path.resolve()
const server = createServer(app);
const io = new Server(server , {
    cors: {
        origin: "*",
        methods: ['GET', 'POST']
    }
})

const port = 8080;
const url = process.env.MONGO_URI
app.use(express.static(path.join(dirname, 'client','dist')))

connection(url)

app.use(cors({
    origin: "*",
    methods: ['GET', 'POST']
}))

app.use(express.json())

io.on('connection', (socket) => {
    console.log('connected on socket')
  
    // socket.on('connect', )
    socket.emit('hello', socket.id)

    socket.on('disconnect', () => {
        console.log('disconnected')
    })
})


app.use('/api/user', userRouter);
app.use('/api/message', messageRouter(io))

app.get('*', (req, res) => {
    res.sendFile(path.join(dirname, 'client', 'dist', 'index.html'))
})
app.get('/ping',(req, res) => {
    res.send('working')
})

server.listen(port)