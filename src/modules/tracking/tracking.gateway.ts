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
import { TrackingService } from './tracking.service';
import now from 'src/utils/now';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosResponse } from 'axios';
import { subHours } from 'date-fns';

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
    private configService: ConfigService, // private readonly trackingService: TrackingService,
  ) {}
  axiosConfig = {
    headers: {
      Authorization: `Bearer ${this.configService.get(
        'DIRECTUS_DISASTER_ACCESS_TOKEN',
      )}`,
    },
  };

  @WebSocketServer()
  server: Server;
  // wsClients = [];
  public handleConnection(client: Socket): void {
    console.log('client Connected...', client.id);
    // this.wsClients.push(client);
  }

  public async handleDisconnect(client: Socket): Promise<any> {
    console.log('...client Disconnected', client.id);
    this.server.emit('disconected', client.id);
    try {
      // updateTrackingDto.update_date = now();
      const result = await axios.get(
        `${this.configService.get(
          'DIRECTUS_DISASTER_URI',
        )}/items/operation_device?filter={ "client_id": { "_eq": "${
          client.id
        }" }}`,
        {
          headers: {
            ...this.axiosConfig.headers,
            'Content-Type': 'application/json',
          },
        },
      );
      const updateData: any = {
        online: false,
      };
      // console.log(result.data.data);
      if (result.data.data.length > 0) {
        // this.update(result.data.data[0].op_device_id, updateData);
        const op_device_id = result.data.data[0].op_device_id;
        try {
          updateData.update_date = now();
          const result = await axios.patch(
            `${this.configService.get(
              'DIRECTUS_DISASTER_URI',
            )}/items/operation_device/${op_device_id}`,
            updateData,
            {
              headers: {
                ...this.axiosConfig.headers,
                'Content-Type': 'application/json',
              },
            },
          );
          // console.log('result dis', result.data.data);
          if (result.data?.data?.operation_device) {
            return result.data?.data?.operation_device;
          }
        } catch (error) {
          console.log(
            'er get op_device location',
            error?.response?.data?.errors,
          );
          return error?.response?.data?.errors;
        }
      }

      return result?.data?.data;
    } catch (error) {
      console.log('er disconnect location', error?.response?.data?.errors);
      return error?.response?.data?.errors;
    }
  }

  @SubscribeMessage('ontrack')
  async onTrack(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: any,
  ): Promise<any> {
    // console.log('client...', client.id);
    // console.log('-->', data);
    const updateData: any = {
      name: data.name,
      reference_code: data.reference_code,
      client_id: client.id,
      update_by_id: data.reference_code,
      update_by: data.name,
      online: true,
      lat: data.lat,
      long: data.long,
    };
    // this.trackingService.update(data.op_device_id, updateData);
    try {
      updateData.update_date = now();
      const result = await axios.patch(
        `${this.configService.get(
          'DIRECTUS_DISASTER_URI',
        )}/items/operation_device/${data.op_device_id}`,
        updateData,
        {
          headers: {
            ...this.axiosConfig.headers,
            'Content-Type': 'application/json',
          },
        },
      );
      if (result.data?.data?.operation_device) {
        return result.data?.data?.operation_device;
      }
    } catch (error) {
      console.log('er get op_device location', error?.response?.data?.errors);
      return error?.response?.data?.errors;
    }
    this.server.emit('tracking', {
      client_id: client.id,
      online: true,
      update_date: subHours(now(), 7),
      ...data,
    });
  }

  @SubscribeMessage('send')
  async chat(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: any,
  ): Promise<any> {
    console.log('chat...', data);
    this.server.emit('chat', data);
  }

  // private updateTrack ()=>{

  // }

  // public broadcast(event, message: any) {
  //   console.log('BOARD CAST', event, message);
  //   const broadCastMessage = JSON.stringify(message);
  //   for (let c of this.wsClients) {
  //     c.emit(event, broadCastMessage);
  //   }
  // }
}
