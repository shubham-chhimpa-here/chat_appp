
import express from 'express';
import userRouter from './routes/user.router.js';
import { connection } from './db.js';
import cors from 'cors';
import messageRouter from './routes/message.router.js';
import { createServer } from 'http';
import { Server } from 'socket.io';
const app = express()

const server = createServer(app);
const io = new Server(server , {
    cors: {
        origin: "*",
        methods: ['GET', 'POST']
    }
})

const port = 8080;
const url = `mongodb://localhost:27017/chatapp`

connection(url)
app.use(cors())

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
app.get('/ping',(req, res) => {
    res.send('working')
})

server.listen(port)