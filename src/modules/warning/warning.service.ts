import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { CreateWarningDto } from './dto/create-warning.dto';
import { UpdateWarningDto } from './dto/update-warning.dto';
import { RequestByDto } from '../../common/interfaces/requestBy.dto';
import { firstValueFrom } from 'rxjs';
import now from '../../utils/now';
import task from '../../utils/task';
const defaultRoute = 'warning';
const objResponse = `warning_id
                title
                note
                status
                send_unit_no
                warning_target{
                  warning_target_id
                  ack_status
                  ack_date
                  unit_no
                  note
                }
                warning_type{
                  id
                  name
                }
                warning_status{
                  id
                  name
                }
                event{
                  event_id
                  event_name
                  disaster_level
                  expect_start_date
                  expect_end_date
                }
                disaster_type {
                    disaster_type_id
                    disaster_type_name
                }
                info{
                  info_info_id{
                    info_id
                    title
                  }
                }
                warning_status{
                  id
                  name
                  color
                }
                warning_date
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
                warning_area{
                  warning_area_id
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
                review_by
                review_by_id
                review_date
                sendback_by
                sendback_by_id
                sendback_date
                approve_by
                approve_by_id
                approve_date
                complete_by
                complete_by_id
                complete_date
                delete_by
                delete_by_id
                delete_date`;
@Injectable()
export class WarningService {
  constructor(private readonly httpService: HttpService) {}

  async create(CreateWarningDto: CreateWarningDto) {
    let createObj: any = CreateWarningDto;
    createObj.create_date = now();
    createObj.create_by_id = createObj.request_by.id;
    createObj.create_by = createObj.request_by.displayname;
    createObj.warning_status = {
      id: 'pending_review',
    };
    try {
      const result = await firstValueFrom(
        this.httpService.post(`/items/warning/`, createObj),
      );
      const resObj = result.data;

      try {
        await task.create({
          token: CreateWarningDto.request_by.token,
          route: defaultRoute,
          ref_id: resObj.data.warning_id,
          data: { name: CreateWarningDto.title },
        });
      } catch (error) {
        return error;
      }
      return result.data;
    } catch (error) {
      return error.response.data.errors;
    }
  }

  async findAll({ request_by }: RequestByDto) {
    // console.log('--', request_by.data_permission);
    const query = `query{
      warning(filter: {_and:[{ status: { _eq: 1 } },]},sort: ["-create_date"]){
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
      warning_by_id(id:${id}){
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

  async warningStatus() {
    const query = `query{
      warning_status(filter:{status:{_eq:1}}){
          id
          name
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

  async warningType() {
    const query = `query{
      warning_type(filter:{status:{_eq:1}}){
          id
          name
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

  async infoOption() {
    const query = `query{
      info(filter:{_and:[{status:{_eq:1}},
      {form_status:{id:{_eq:"3"}}}
      ]} ){
          info_id
          title
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

  async eventOption() {
    const query = `query{
      event(filter:{_and:[{status:{_eq:1}},
      {event_status:{id:{_eq:3}}}
      ]} ){
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
      console.log('err form status ', error.response.data.errors);
      return error.response.data.errors;
    }
  }

  async update(id: string, updateWarningDto: UpdateWarningDto) {
    let updateObj: UpdateWarningDto = updateWarningDto;
    // console.log('---->', updateInfoDto);
    updateObj.update_date = now();
    updateObj.warning_status = {
      id:
        updateWarningDto.warning_status.id === 'draft' ||
        updateWarningDto.warning_status.id === 'sendback'
          ? 'pending_review'
          : updateWarningDto.warning_status.id,
    };
    updateObj.update_by_id = updateObj.request_by.id;
    updateObj.update_by = updateObj.request_by.displayname;
    try {
      const result = await firstValueFrom(
        this.httpService.patch(`/items/warning/${id}`, updateObj),
      );
      try {
        await task.update({
          token: updateWarningDto.request_by.token,
          route: defaultRoute,
          node_order:
            updateWarningDto.warning_status.id === 'draft' ||
            updateWarningDto.warning_status.id === 'sendback' ||
            updateWarningDto.warning_status.id === 'pending_review'
              ? 0
              : updateWarningDto.warning_status.id === 'pending_approval'
              ? 1
              : updateWarningDto.warning_status.id === 'pending_acknowledge'
              ? 2
              : 3,
          ref_id: id,
          data: updateWarningDto,
        });
        // console.log(resTask);
      } catch (error) {
        // console.log('EEE', error);
        return error;
      }
      return result.data;
    } catch (error) {
      return error.response.data.errors;
    }
  }

  async review(id: string, updateWarningDto: UpdateWarningDto) {
    // console.log('>>>>', id);
    let updateObj: any = updateWarningDto;
    updateObj.approve_date = now();
    updateObj.warning_status = { id: 'pending_approval' };
    updateObj.approve_by_id = updateObj.request_by.id;
    updateObj.approve_by = updateObj.request_by.displayname;
    try {
      const result = await firstValueFrom(
        this.httpService.patch(`/items/warning/${id}`, updateObj),
      );
      // console.log('result', result);
      try {
        await task.update({
          token: updateWarningDto.request_by.token,
          route: defaultRoute,
          node_order: 1,
          ref_id: id,
          data: updateWarningDto,
        });
      } catch (error) {
        return error;
      }
      return result.data;
    } catch (error) {
      return error.response.data.errors;
    }
  }

  async approve(id: string, updateWarningDto: UpdateWarningDto) {
    // console.log('>>>>', id);
    let updateObj: any = updateWarningDto;
    updateObj.approve_date = now();
    updateObj.warning_status = { id: 'pending_acknowledge' };
    updateObj.approve_by_id = updateObj.request_by.id;
    updateObj.approve_by = updateObj.request_by.displayname;
    try {
      const result = await firstValueFrom(
        this.httpService.patch(`/items/warning/${id}`, updateObj),
      );
      // console.log('result', result);
      try {
        await task.update({
          token: updateWarningDto.request_by.token,
          route: defaultRoute,
          node_order: 2,
          ref_id: id,
          data: updateWarningDto,
        });
      } catch (error) {
        return error;
      }
      return result.data;
    } catch (error) {
      return error.response.data.errors;
    }
  }

  async complete(id: string, updateWarningDto: UpdateWarningDto) {
    // console.log('>>>>', id);
    let updateObj: any = updateWarningDto;
    updateObj.complete_date = now();
    updateObj.complete_status = { id: 'complete' };
    updateObj.complete_by_id = updateObj.request_by.id;
    updateObj.complete_by = updateObj.request_by.displayname;
    try {
      const result = await firstValueFrom(
        this.httpService.patch(`/items/warning/${id}`, updateObj),
      );
      // console.log('result', result);
      try {
        await task.update({
          token: updateWarningDto.request_by.token,
          route: defaultRoute,
          node_order: 3,
          ref_id: id,
          data: updateWarningDto,
        });
      } catch (error) {
        return error;
      }
      return result.data;
    } catch (error) {
      return error.response.data.errors;
    }
  }

  async sendback(id: string, updateWarningDto: UpdateWarningDto) {
    // console.log('>>>>', id);
    let updateObj: any = updateWarningDto;
    updateObj.sendback_date = now();
    updateObj.warning_status = { id: 'sendback' };
    updateObj.sendback_by_id = updateObj.request_by.id;
    updateObj.sendback_by = updateObj.request_by.displayname;
    try {
      const result = await firstValueFrom(
        this.httpService.patch(`/items/warning/${id}`, updateObj),
      );
      // console.log('result', result);
      try {
        await task.update({
          token: updateWarningDto.request_by.token,
          route: defaultRoute,
          node_order: 0,
          ref_id: id,
          method: 'back',
          data: updateWarningDto,
          note: updateWarningDto.comment,
        });
      } catch (error) {
        return error;
      }
      return result.data;
    } catch (error) {
      return error.response.data.errors;
    }
  }

  async recieve(id: string, updateWarningDto: UpdateWarningDto) {
    // console.log('>>>>', id);
    let updateObj: any = updateWarningDto;
    updateObj.approve_date = now();
    updateObj.warning_status = { id: 'pending_acknowledge' };
    updateObj.approve_by_id = updateObj.request_by.id;
    updateObj.approve_by = updateObj.request_by.displayname;
    try {
      const result = await firstValueFrom(
        this.httpService.patch(`/items/warning/${id}`, updateObj),
      );
      // console.log('result', result);
      try {
        await task.update({
          token: updateWarningDto.request_by.token,
          route: defaultRoute,
          node_order: 3,
          ref_id: id,
          data: updateWarningDto,
        });
      } catch (error) {
        return error;
      }
      return result.data;
    } catch (error) {
      return error.response.data.errors;
    }
  }

  async remove(id: string, updateWarningDto: UpdateWarningDto) {
    // console.log('>>>>', id);
    //
    let updateObj: any = updateWarningDto;
    updateObj.delete_date = now();
    updateObj.delete_by_id = updateObj.request_by.id;
    updateObj.delete_by = updateObj.request_by.displayname;
    updateObj.status = 0;
    try {
      const result = await firstValueFrom(
        this.httpService.patch(`/items/warning/${id}`, updateObj),
      );
      // console.log('result', result);
      try {
        await task.delete({
          token: updateWarningDto.request_by.token,
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
