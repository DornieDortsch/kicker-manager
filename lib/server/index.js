import http from 'http'
import express from 'express'
import socket from 'socket.io'

export default port => {
    const app = express()
    const server = http.Server(app)
    const io = socket(server)
    
    app.get('/', (req, res) => {
        res.sendFile(__dirname + '/index.html')
    })

    io.on('connection', socket => {
        console.log('a user connected')

        socket.emit('chat message', 'hi')

        socket.on('chat message', msg => {

            console.log('chat message: ', msg)

            io.emit('chat message', msg)
        })

        socket.on('disconnect', () => {
            console.log('user disconnected')
        })
    })
    
    server.listen(port, () => {
        console.log('The server is running: http://localhost:' + port)
    })
}