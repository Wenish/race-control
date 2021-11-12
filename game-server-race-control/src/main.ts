import { Server } from 'colyseus'
import { createServer } from 'http'
import { monitor } from '@colyseus/monitor'
import express from 'express'
import logger from './services/logger.service';
import { WebSocketTransport } from '@colyseus/ws-transport';
import { MatchRoom } from './match/match.room';

const port = parseInt(process.env.PORT, 10) || 3000

const app = express()
app.use('/colyseus', monitor());
app.get('/', function (req, res) {
    res.send('200 OK')
})
const gameServer = new Server({
    transport: new WebSocketTransport({
        server: createServer(app)
    })
});

gameServer.define('match', MatchRoom)

gameServer.listen(port)
logger(`Listening on Port: ${port}`, 'GameServer')