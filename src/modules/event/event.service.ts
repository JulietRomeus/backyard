import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { firstValueFrom } from 'rxjs';
import now from '../../utils/now';
@Injectable()
export class EventService {
  constructor(private readonly httpService: HttpService) {}

  async create(createEventDto: CreateEventDto) {
    let createObj: any = createEventDto;
    createObj.create_date = now();
    createObj.create_by = createObj.request_by.id;
    const result = await firstValueFrom(
      this.httpService.post(`/items/event`, createObj),
    );
    return result;
  }

  async findAll() {
    const query = `query{
      event{
          event_id
          event_name
          disaster_type_id {
              disaster_type_id
              disaster_type_name
          }
          create_by
          create_date
          update_by
          update_date
          delete_by
          delete_date
      }
  }
`;
    const variables = {};
    // const result = await firstValueFrom(
    //   this.httpService.get(`/items/event?fields=event_id,event_name,disaster_type_id.disaster_type_name`),
    // );
    const result = await firstValueFrom(
      this.httpService.post(`/graphql`, { query, variables }),
    );
    // console.log('>>>>>>>', result);
    return result;
  }

  findOne(id: number) {
    return `This action returns a #${id} event`;
  }

  update(id: number, updateEventDto: UpdateEventDto) {
    return `This action updates a #${id} event`;
  }

  remove(id: number) {
    return `This action removes a #${id} event`;
  }
}
