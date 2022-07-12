import { HttpService } from '@nestjs/axios';

import { Injectable } from '@nestjs/common';
import { CreateInfoDto } from './dto/create-info.dto';
import { UpdateInfoDto } from './dto/update-info.dto';
import { firstValueFrom } from 'rxjs';
import now from '../../utils/now';
import task from '../../utils/task';
const defaultRoute = 'info';

const objResponse = `info_id
                title
                detail
                event{
                  event_id
                  event_name
                }
                disaster_type {
                    disaster_type_id
                    disaster_type_name
                }
                critical_flag 
                form_status{
                  id
                  no
                  name
                  color
                }
                status
                expect_from
                expect_to
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
                info_area{
                  id
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
                delete_by
                delete_by_id
                delete_date`;
@Injectable()
export class InfoService {
  constructor(private readonly httpService: HttpService) {}

  async create(createEventDto: CreateInfoDto) {
    let createObj: any = createEventDto;
    createObj.create_date = now();
    createObj.create_by_id = createObj.request_by.id;
    createObj.create_by = createObj.request_by.displayname;
    createObj.form_status = {
      id: '2',
    };
    try {
      const result = await firstValueFrom(
        this.httpService.post(`/items/info/`, createObj),
      );
      const resObj = result.data;

      try {
        task.create({
          token: createEventDto.request_by.token,
          route: defaultRoute,
          ref_id: resObj.data.info_id,
          data: { name: createEventDto.title },
        });
      } catch (error) {
        return error;
      }
      return result.data;
    } catch (error) {
      return error.response.data.errors;
    }
  }

  async findAll() {
    const query = `query{
      info(filter: { status: { _eq: 1 } },sort: ["-create_date"]){
        ${objResponse}
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
      console.log('err find all info', error.response.data);
      return error.response.data.errors;
    }
  }

  async findOne(id: number) {
    // console.log('first', id);
    const query = `query{
      info_by_id(id:${id}){
        ${objResponse}
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
      // console.log('find a info>', error.response.data.errors);
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

  async eventOption() {
    const query = `query{
      event(filter:{_and:[{status:{_eq:1}},
        {_or:[
          {
            event_status:{
              no:{
                _eq:"3"
              }
            }
          },
          {
            event_status:{
              no:{
                _eq:"5"
              }
            }
          }
        ]}
      ]}){
          event_id
          event_name
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
      // console.log('--->', error.response.data.errors);
      return error.response.data.errors;
    }
  }

  async formStatus() {
    const query = `query{
      form_status(filter:{status:{_eq:1}}){
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
      console.log('err form status ', error.response.data.errors);
      return error.response.data.errors;
    }
  }

  async update(id: string, updateInfoDto: UpdateInfoDto) {
    let updateObj: UpdateInfoDto = updateInfoDto;
    // console.log('---->', updateInfoDto);
    updateObj.update_date = now();
    updateObj.form_status = {
      id: updateInfoDto.form_status.no === '3' ? '3' : '2',
    };
    updateObj.update_by_id = updateObj.request_by.id;
    updateObj.update_by = updateObj.request_by.displayname;
    try {
      const result = await firstValueFrom(
        this.httpService.patch(`/items/info/${id}`, updateObj),
      );
      try {
        task.update({
          token: updateInfoDto.request_by.token,
          route: defaultRoute,
          node_order: updateInfoDto.form_status.no === '1' ? 1 : 0,
          ref_id: id,
          data: updateInfoDto,
        });
      } catch (error) {
        return error;
      }
      return result.data;
    } catch (error) {
      return error.response.data.errors;
    }
  }

  async approve(id: string, updateInfoDto: UpdateInfoDto) {
    // console.log('>>>>', id);
    let updateObj: any = updateInfoDto;
    updateObj.approve_date = now();
    updateObj.form_status = { id: '3' };
    updateObj.approve_by_id = updateObj.request_by.id;
    updateObj.approve_by = updateObj.request_by.displayname;
    try {
      const result = await firstValueFrom(
        this.httpService.patch(`/items/info/${id}`, updateObj),
      );
      // console.log('result', result);
      try {
        task.update({
          token: updateInfoDto.request_by.token,
          route: defaultRoute,
          node_order: 1,
          ref_id: id,
          data: updateInfoDto,
        });
      } catch (error) {
        return error;
      }
      return result.data;
    } catch (error) {
      return error.response.data.errors;
    }
  }

  async sendback(id: string, updateInfoDto: UpdateInfoDto) {
    // console.log('>>>>', id);
    let updateObj: any = updateInfoDto;
    updateObj.sendback_date = now();
    updateObj.form_status = { id: '4' };
    updateObj.sendback_by_id = updateObj.request_by.id;
    updateObj.sendback_by = updateObj.request_by.displayname;
    try {
      const result = await firstValueFrom(
        this.httpService.patch(`/items/info/${id}`, updateObj),
      );
      // console.log('result', result);
      try {
        task.update({
          token: updateInfoDto.request_by.token,
          route: defaultRoute,
          node_order: 0,
          ref_id: id,
          method: 'back',
          data: updateInfoDto,
          note: updateInfoDto.comment,
        });
      } catch (error) {
        return error;
      }
      return result.data;
    } catch (error) {
      return error.response.data.errors;
    }
  }

  async remove(id: string, updateInfoDto: UpdateInfoDto) {
    // console.log('>>>>', id);
    //
    let updateObj: any = updateInfoDto;
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
        task.delete({
          token: updateInfoDto.request_by.token,
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
}
