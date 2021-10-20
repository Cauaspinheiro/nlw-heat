import { ConsoleLogger } from '@nestjs/common';
import {
  ConnectedSocket,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: { origin: '*' } })
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  handleConnection(@ConnectedSocket() socket: any) {
    const logger = new ConsoleLogger();
    logger.log(`New client connected: ${socket.id}`);
  }
}
