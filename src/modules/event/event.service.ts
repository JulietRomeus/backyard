import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { firstValueFrom } from 'rxjs';
import now from '../../utils/now';
import task from '../../utils/task';
import { StatusEnum } from '../../common/status.enum';
const defaultRoute = 'event';

const eventResponse = `event_id
                event_name
                disaster_type {
                    disaster_type_id
                    disaster_type_name
                }
                disaster_level
                event_status{
                  id
                  no
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
                  region_code
                  province_code
                  amphoe_code
                  tambon_code
                  mooban_code
                  province_name
                  amphoe_name
                  tambon_name
                  mooban_name
                  long
                  lat
                  population
                  dwellings
                  farmland
                  population_damage
                  dwellings_damage
                  farmland_damage
                  deaths
                  injury
                  lost_people
                  announce_flag
                } 
                comment
                create_by
                create_by_id
                create_date
                update_by
                update_by_id
                update_date
                sendback_by
                sendback_by_id
                sendback_date
                approve_by
                approve_by_id
                approve_date
                finish_by
                finish_by_id
                finish_date
                delete_by
                delete_by_id
                delete_date`;

@Injectable()
export class EventService {
  constructor(private readonly httpService: HttpService) {}

  async create(createEventDto: CreateEventDto) {
    let createObj: any = createEventDto;
    createObj.create_date = now();
    createObj.create_by_id = createObj.request_by.id;
    createObj.create_by = createObj.request_by.displayname;
    createObj.event_status = {
      id: '2',
    };
    try {
      const result = await firstValueFrom(
        this.httpService.post(`/items/event/`, createObj),
      );
      const resEvent = result.data;
      // console.log(result.data);
      try {
        await task.create({
          token: createEventDto.request_by.token,
          route: defaultRoute,
          ref_id: resEvent.data.event_id,
          data: { name: createEventDto.event_name },
        });
      } catch (error) {
        return error;
      }

      return resEvent;
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

  async eventStatus() {
    const query = `query{
      event_status(filter:{status:{_eq:1}}){
          id
          name
          no
          color
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

  async update(id: string, updateEventDto: UpdateEventDto) {
    let updateObj: UpdateEventDto = updateEventDto;
    const status_no = updateEventDto.event_status.no;
    const curStatus =
      updateEventDto.event_status.no === '3'
        ? '3'
        : updateEventDto.event_status.no === '5'
        ? '5'
        : '2';
    const resStatus = await firstValueFrom(
      this.httpService.get(`/items/event_status?filter[no][_eq]=${curStatus}`),
    );
    const status_id = resStatus.data.data[0].id;
    updateObj.update_date = now();
    updateObj.event_status = {
      id: status_id,
    };
    updateObj.update_by_id = updateObj.request_by.id;
    updateObj.update_by = updateObj.request_by.displayname;
    try {
      const result = await firstValueFrom(
        this.httpService.patch(`/items/event/${id}`, updateObj),
      );
      try {
        await task.update({
          token: updateEventDto.request_by.token,
          route: defaultRoute,
          node_order: status_no === '3' ? 1 : status_no === '5' ? 2 : 0,
          ref_id: id,
          data: updateEventDto,
        });
      } catch (error) {
        return error;
      }

      return result.data;
    } catch (error) {
      return error.response.data.errors;
    }
  }

  async approve(id: string, updateEventDto: UpdateEventDto) {
    // console.log('>>>>', id);
    const resStatus = await firstValueFrom(
      this.httpService.get(`/items/event_status?filter[no][_eq]=${3}`),
    );
    const status_id = resStatus.data.data[0].id;
    let updateObj: any = updateEventDto;
    updateObj.approve_date = now();
    updateObj.event_status = { id: status_id };
    updateObj.approve_by_id = updateObj.request_by.id;
    updateObj.approve_by = updateObj.request_by.displayname;
    try {
      const result = await firstValueFrom(
        this.httpService.patch(`/items/event/${id}`, updateObj),
      );
      try {
        await task.update({
          token: updateEventDto.request_by.token,
          route: defaultRoute,
          node_order: 1,
          ref_id: id,
          data: updateEventDto,
        });
      } catch (error) {
        return error;
      }
      return result.data;
    } catch (error) {
      return error.response.data.errors;
    }
  }

  async sendback(id: string, updateEventDto: UpdateEventDto) {
    // console.log('>>>>', id);
    const resStatus = await firstValueFrom(
      this.httpService.get(`/items/event_status?filter[no][_eq]=${4}`),
    );
    const status_id = resStatus.data.data[0].id;
    let updateObj: any = updateEventDto;
    updateObj.sendback_date = now();
    updateObj.event_status = { id: status_id };
    updateObj.sendback_by_id = updateObj.request_by.id;
    updateObj.sendback_by = updateObj.request_by.displayname;
    try {
      const result = await firstValueFrom(
        this.httpService.patch(`/items/event/${id}`, updateObj),
      );
      try {
        await task.update({
          token: updateEventDto.request_by.token,
          route: defaultRoute,
          node_order: 0,
          ref_id: id,
          method: 'back',
          data: updateEventDto,
          note: updateEventDto.comment,
        });
      } catch (error) {
        return error;
      }
      return result.data;
    } catch (error) {
      return error.response.data.errors;
    }
  }

  async restore(id: string, updateEventDto: UpdateEventDto) {
    // console.log('>>>>', id);
    const resStatus = await firstValueFrom(
      this.httpService.get(`/items/event_status?filter[no][_eq]=${5}`),
    );
    const status_id = resStatus.data.data[0].id;
    let updateObj: any = updateEventDto;
    updateObj.finish_date = now();
    updateObj.event_status = { id: status_id };
    updateObj.finish_by_id = updateObj.request_by.id;
    updateObj.finish_by = updateObj.request_by.displayname;
    try {
      const result = await firstValueFrom(
        this.httpService.patch(`/items/event/${id}`, updateObj),
      );
      try {
        await task.update({
          token: updateEventDto.request_by.token,
          route: defaultRoute,
          node_order: 2,
          ref_id: id,
          data: updateEventDto,
        });
      } catch (error) {
        return error;
      }
      return result.data;
    } catch (error) {
      return error.response.data.errors;
    }
  }

  async finish(id: string, updateEventDto: UpdateEventDto) {
    // console.log('>>>>', id);
    const resStatus = await firstValueFrom(
      this.httpService.get(`/items/event_status?filter[no][_eq]=${6}`),
    );
    const status_id = resStatus.data.data[0].id;
    let updateObj: any = updateEventDto;
    updateObj.finish_date = now();
    updateObj.event_status = { id: status_id };
    updateObj.finish_by_id = updateObj.request_by.id;
    updateObj.finish_by = updateObj.request_by.displayname;
    try {
      const result = await firstValueFrom(
        this.httpService.patch(`/items/event/${id}`, updateObj),
      );
      try {
        await task.update({
          token: updateEventDto.request_by.token,
          route: defaultRoute,
          node_order: 3,
          ref_id: id,
          data: updateEventDto,
        });
      } catch (error) {
        return error;
      }
      return result.data;
    } catch (error) {
      return error.response.data.errors;
    }
  }

  async remove(id: string, updateEventDto: UpdateEventDto) {
    // console.log('>>>>', id);
    //
    let updateObj: any = updateEventDto;
    updateObj.delete_date = now();
    updateObj.delete_by_id = updateObj.request_by.id;
    updateObj.delete_by = updateObj.request_by.displayname;
    updateObj.status = 0;
    try {
      const result = await firstValueFrom(
        this.httpService.patch(`/items/event/${id}`, updateObj),
      );
      // console.log('result', result);
      try {
        await task.delete({
          token: updateEventDto.request_by.token,
          route: defaultRoute,
          ref_id: id,
        });
      } catch (error) {
        return error;
      }

      return result.data;
    } catch (error) {
      return error.response.data.errors;
    }
  }

  async getLastByID(id: number) {
    const query = `query{
      event(filter:{event_id:{_eq:${id}},event_status:{no:{_in:["${StatusEnum.EVENT_APPROVAL}","${StatusEnum.EVENT_COMPLETED}"]}}}){
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
}
