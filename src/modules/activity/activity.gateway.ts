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
import { ActivityService } from './activity.service';
import now from 'src/utils/now';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosResponse } from 'axios';
import { subHours, format } from 'date-fns';
import { InjectRepository } from '@nestjs/typeorm';
import { trsActivity } from '../../entities/Index';
import { Repository, Brackets, Not } from 'typeorm';

type missionType = {
  id: number;
  convoy: { id: number; name: string };
  vehicle_supply_id: string;
  vehicle_license: string;
  driver_name: string;
  lat: number;
  long: number;
};

@WebSocketGateway({
  path: '/trs/socket',
  cors: {
    origin: '*', //['https://bigdata.rtarf.mi.th','http://localhost:9000'],
  },
})
export class ActivityGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private configService: ConfigService, // private readonly trackingService: TrackingService,
    @InjectRepository(trsActivity, 'MSSQL_CONNECTION')
    private trsActivityRepo: Repository<trsActivity>,
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

  public handleDisconnect(client: Socket): void {
    console.log('...client Disconnected', client.id);
    this.server.emit('disconected', client.id);
    try {
      this.trsActivityRepo.query(`UPDATE trs_activity_vehicle_driver
          SET is_online=0,client_id=null
          WHERE trs_activity_vehicle_driver.client_id='${client.id}';`);
    } catch {
      console.log('update disconnect field');
    }
  }

  @SubscribeMessage('activity-mission')
  async onTrack(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: missionType,
  ): Promise<any> {
    // console.log('client...', client.id);

    try {
      this.trsActivityRepo.query(`UPDATE trs_activity_vehicle_driver
        SET is_online=1, lat=${data?.lat || 0}, long=${
        data?.long || 0
      }, client_id='${client.id}', last_location_date='${format(
        subHours(now(), 0),
        'yyyy-MM-dd HH:mm:ss',
      )}'
        WHERE trs_activity_vehicle_driver.id = ${data?.id};`);
    } catch (error) {
      console.log('error', error);
    }
    // console.log('----->', `mission-convoy-${data.convoy.id}`, data);

    this.server.emit(`mission-convoy-${data.convoy.id}`, {
      client_id: client.id,
      online: true,
      //   last_location_date: subHours(now(), 0),
      last_location_date: format(subHours(now(), 0), 'yyyy-MM-dd HH:mm:ss'),
      ...data,
    });
  }

  @SubscribeMessage('help')
  async chat(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: any,
  ): Promise<any> {
    // console.log('help...', `help-convoy-${data.convoy.id}`, data);
    this.server.emit(`help-convoy-${data.convoy.id}`, data);
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
