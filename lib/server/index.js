import http from 'http'
import express from 'express'
import socket from 'socket.io'

import Controller from './Controller'

export default async port => {
    const app = express()
    const server = http.Server(app)
    const io = socket(server)

    const controller = await Controller()

    controller.init(io)
    
    app.get('/', (req, res) => {
        res.sendFile(__dirname + '/index.html')
    })

    server.listen(port, () => {
        console.log('The server is running: http://localhost:' + port)
    })
}