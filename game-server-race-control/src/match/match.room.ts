import http from 'http';
import { Room, Client } from 'colyseus';
import logger from '../services/logger.service';
import { MatchState } from './match.state';

export class MatchRoom extends Room<MatchState> {

    async onCreate(options: any) {
        const mapName: string = options?.map || 'rc_default'
        logger(`Loading map: ${mapName}`, 'GameRoom')

        this.setState(new MatchState())

        logger(`onCreate ${this.roomName} ${this.roomId}`, 'GameRoom')
        this.onMessage("*", (client, type, message) => {
            logger(`onMessage Client: ${client.sessionId} sent ${type} ${JSON.stringify(message)}`, 'GameRoom')
        });
    }

    onAuth(client: Client, options: any, request: http.IncomingMessage) {
        logger(`onAuth Client: ${client.sessionId}`, 'GameRoom')
        return true;
    }

    onJoin(client: Client, options: any, auth: any) {
        logger(`onJoin Client: ${client.sessionId}`, 'GameRoom')
    }

    onLeave(client: Client, consented: boolean) {
        logger(`onLeave Client with sessionId: ${client.sessionId} consented: ${consented}`, 'GameRoom')
    }

    onDispose() {
        logger(`onDispose ${this.roomName} ${this.roomId}`, 'GameRoom')
    }
}