import http from 'http'
import express from 'express'
import socket from 'socket.io'

import config from '../config'

import Controller from './Controller'

export default async () => {
    const app = express()
    const server = http.Server(app)
    const io = socket(server)
    const controller = Controller(app, io, config)

    await controller.init()
    
    app.get('/', (req, res) => {
        res.sendFile(__dirname + '/index.html')
    })

    server.listen(config.port, () => {
        console.log('The server is running: http://localhost:' + config.port)
    })
}