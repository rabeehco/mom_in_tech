import http from 'http'
import { Server } from 'socket.io'
import express from 'express'
import cors from 'cors'

let count = 0;

const app = express()
app.use(cors())
const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "*"
    }
})

io.on("connection", (socket) => {
    count++;
    console.log(`User Connected:  ${socket.id} With Count ${count}`)

    // This will listen to any socket.emit mentioning 'send_message' 
    socket.on("send_message", () => {
        // console.log('message emitted from client')
        socket.broadcast.emit("receive_message")
    })
})

server.listen(3001, () => {
    console.log('Server is running on port 3001')
})