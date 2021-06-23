import { Logger, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { HeartsGameInfo } from 'ts-card-games';
import { GamesService } from './games/games.service';
import { WSAuthGuard } from './auth/ws-auth.guard';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@WebSocketGateway()
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private gamesService: GamesService) {}

  @WebSocketServer() wss: Server;
  private logger: Logger = new Logger('AppGateway');

  afterInit(server: Server) {
    this.logger.log(`Initialized!`);
  }
  handleConnection(client: Socket) {
    this.logger.log(`Clinet connected: ${client.id}`);
  }
  handleDisconnect(client: any) {
    this.logger.log(`Clinet disconnected: ${client.id}`);
  }

  @UseGuards(WSAuthGuard)
  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, payload: string): WsResponse<string> {
    this.logger.log(`Recieved: ${payload} from ${client.user.username}`);
    // this.logger.log(
    //   `Client: ${JSON.stringify(client, getCircularReplacer(), 2)}`,
    // );
    // this.logger.log(
    //   `Request: ${JSON.stringify(req, getCircularReplacer(), 2)}`,
    // );
    return { event: 'msgToClient', data: `Hello` };
  }

  @SubscribeMessage('createHearts')
  handleCreateHearts(client: Socket, id: string): WsResponse<HeartsGameInfo[]> {
    this.logger.log(`Request to create new hearts game with id: ${id}`);
    this.gamesService.new('First Hearts Game');
    return { event: 'games', data: this.gamesService.getActiveGames() };
  }
}

const getCircularReplacer = () => {
  const seen = new WeakSet();
  return (key, value) => {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
};
