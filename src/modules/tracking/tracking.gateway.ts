import { Param } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Server, Socket } from 'socket.io';
import { HttpService } from '@nestjs/axios';
import { TrackingService } from './tracking.service';

@WebSocketGateway({
  path: '/disaster-monitoring/socket',
  cors: {
    origin: '*',
  },
})
export class TrackingGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private readonly httpService: HttpService,
    private readonly trackingService: TrackingService,
  ) {}

  @WebSocketServer()
  server: Server;
  public handleConnection(client: Socket): void {
    console.log('client Connected...', client.id);
  }

  public handleDisconnect(client: Socket): void {
    console.log('...client Disconnected', client.id);
    this.server.emit('disconected', client.id);
    this.trackingService.disconnected(client.id);
  }

  @SubscribeMessage('ontrack')
  onTrack(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: any,
  ): any {
    // console.log('client...', client.id);
    // console.log('-->', data);
    const updateData: any = {
      name: data.name,
      reference_code: data.reference_code,
      client_id: client.id,
      update_by_id: data.reference_code,
      update_by: data.name,
      online: true,
    };
    this.trackingService.update(data.op_device_id, updateData);
    this.server.emit('tracking', {
      client_id: client.id,
      online: true,
      ...data,
    });
  }

  //   @SubscribeMessage('identity')
  //   async identity(@MessageBody() data: number): Promise<number> {
  //     return data;
  //   }
}
