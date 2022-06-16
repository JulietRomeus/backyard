import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { firstValueFrom } from 'rxjs';
import now from '../../utils/now';

const eventResponse = `event_id
                event_name
                disaster_type {
                    disaster_type_id
                    disaster_type_name
                }
                disaster_level
                event_status{
                  id
                  name
                  color
                }
                status
                note
                expect_start_date
                expect_end_date
                start_date
                end_date
                files{
                  id
                  directus_files_id
                  {
                      id
                      title
                      description
                      filename_disk
                      filename_download
                  }   
                }
                event_area{
                  event_area_id
                  province_code
                  amphoe_code
                  tambon_code
                  mooban_code
                  long
                  lat
                  population
                  dwellings
                  farmland
                } 
                create_by
                create_by_id
                create_date
                update_by
                update_by_id
                update_date
                delete_by
                delete_by_id
                delete_date`;

@Injectable()
export class EventService {
  constructor(private readonly httpService: HttpService) {}

  async create(createEventDto: CreateEventDto) {
    let createObj: any = createEventDto;
    createObj.create_date = now();
    createObj.create_by = createObj.request_by.id;
    createObj.event_status = { id: '2' };
    try {
      const result = await firstValueFrom(
        this.httpService.post(`/items/event/`, createObj),
      );
      return result.data;
    } catch (error) {
      return error.response.data.errors;
    }
  }

  async findAll() {
    const query = `query{
      event(filter: { status: { _eq: 1 } },sort: ["-create_date"]){
        ${eventResponse}
      }
  }
`;
    const variables = {};
    try {
      const result = await firstValueFrom(
        this.httpService.post(`/graphql`, { query, variables }),
      );
      return result.data;
    } catch (error) {
      console.log('-->', error.response.data);
      return error.response.data.errors;
    }
  }

  async findOne(id: number) {
    const query = `query{
      event_by_id(id:${id}){
        ${eventResponse}
      }
  }
`;
    const variables = {};

    try {
      const result = await firstValueFrom(
        this.httpService.post(`/graphql`, { query, variables }),
      );
      return result.data;
    } catch (error) {
      console.log('--->', error.response.data.errors);
      return error.response.data.errors;
    }
  }

  async disasterType() {
    const query = `query{
      disaster_type(filter:{status:{_eq:1}}){
          disaster_type_id
          disaster_type_name
          disaster_type_no
      }
  }
`;
    const variables = {};
    try {
      const result = await firstValueFrom(
        this.httpService.post(`/graphql`, { query, variables }),
      );
      return result.data;
    } catch (error) {
      console.log('--->', error.response.data.errors);
      return error.response.data.errors;
    }
  }

  async update(id: number, updateEventDto: UpdateEventDto) {
    let updateObj: UpdateEventDto = updateEventDto;
    // console.log(createObj.request_by);
    updateObj.update_date = now();
    updateObj.event_status = { id: '2' };
    updateObj.update_by_id = updateObj.request_by.id;
    updateObj.update_by = updateObj.request_by.displayname;
    try {
      const result = await firstValueFrom(
        this.httpService.patch(`/items/event/${id}`, updateObj),
      );
      return result.data;
    } catch (error) {
      return error.response.data.errors;
    }
  }

  async approve(id: number, updateEventDto: UpdateEventDto) {
    console.log('>>>>', id);
    let updateObj: any = updateEventDto;
    updateObj.approve_date = now();
    updateObj.event_status = { id: '3' };
    updateObj.approve_by_id = updateObj.request_by.id;
    updateObj.approve_by = updateObj.request_by.displayname;
    try {
      const result = await firstValueFrom(
        this.httpService.patch(`/items/event/${id}`, updateObj),
      );
      console.log('result', result);
      return result.data;
    } catch (error) {
      return error.response.data.errors;
    }
  }

  remove(id: number) {
    return `This action removes a #${id} event`;
  }
}
