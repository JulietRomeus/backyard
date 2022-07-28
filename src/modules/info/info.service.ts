import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { CreateInfoDto } from './dto/create-info.dto';
import { UpdateInfoDto } from './dto/update-info.dto';
import { firstValueFrom } from 'rxjs';
import now from '../../utils/now';
import task from '../../utils/task';
import notification from '../../utils/notification';
const defaultRoute = 'info';

const objResponse = `info_id
                title
                detail
                agency{
                  agency_id
                  agency_name
                }
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
                publish_date
                update_by
                update_by_id
                update_date
                sendback_by
                sendback_by_id
                sendback_date
                approve_by
                approve_by_id
                approve_date
                notification_by
                notification_by_id
                notification_date
                delete_by
                delete_by_id
                delete_date
                is_notification`;
@Injectable()
export class InfoService {
  constructor(private readonly httpService: HttpService) {}

  async create(createEventDto: CreateInfoDto) {
    let createObj: any = createEventDto;
    createObj.create_date = now();
    createObj.publish_date = createEventDto.publish_date
      ? createEventDto.publish_date
      : now();
    createObj.create_by_id = createObj.request_by.id;
    createObj.create_by = createObj.request_by.displayname;
    createObj.status = 1;
    createObj.form_status = {
      id:
        createEventDto?.agency?.agency_id === '2' ||
        createEventDto?.agency?.agency_id === '3' ||
        createEventDto?.agency?.agency_id === '4'
          ? '6'
          : '2',
    };
    try {
      const result = await firstValueFrom(
        this.httpService.post(`/items/info/`, createObj),
      );
      const resObj = result.data;
      if (
        createEventDto?.agency?.agency_id !== '2' &&
        createEventDto?.agency?.agency_id !== '3' &&
        createEventDto?.agency?.agency_id !== '4'
      ) {
        try {
          await task.create({
            token: createEventDto.request_by.token,
            route: defaultRoute,
            ref_id: resObj.data.info_id,
            data: { name: createEventDto.title },
          });
        } catch (error) {
          return error;
        }
      }
      if (createEventDto.critical_flag >= 3) {
        try {
          await notification.create({
            token: createEventDto.request_by.token,
            ref_id: resObj.data.info_id,
            title: createEventDto.title,
            message: createEventDto.detail,
            type: 3,
            category: 'info',
            url: `disaster/info/form/${resObj.data.info_id}`,
          });
        } catch (error) {
          return error;
        }
      }

      return result.data;
    } catch (error) {
      return error.response.data.errors;
    }
  }

  async findAll(filter) {
    let allFilter: any = [{ status: { _eq: 1 } }];
    if (filter.form_status) {
      allFilter.push({
        form_status: { id: { _in: [...filter.form_status.split(',')] } },
      });
    }
    const query = `query{
      info(filter:{_and:${JSON.stringify(allFilter).replace(
        /"([^"]+)":/g,
        '$1:',
      )} },sort: ["-create_date"]){
        ${objResponse}
      }
  }
`;
    const variables = {};
    try {
      const result = await firstValueFrom(
        this.httpService.post(`/graphql`, { query, variables }),
      );
      // console.log('>>>>>', result.data);
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

  async agencyOption() {
    const query = `query{
      agency(filter:{_and:[{status:{_eq:1}},
      ]}){
          agency_id
          agency_no
          agency_name
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
        await task.update({
          token: updateInfoDto.request_by.token,
          route: defaultRoute,
          node_order: updateInfoDto.form_status.no === '1' ? 1 : 0,
          ref_id: id,
          data: updateInfoDto,
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

  async approve(id: string, updateInfoDto: UpdateInfoDto) {
    // console.log('>>>>', id);
    let updateObj: any = updateInfoDto;
    const token = updateInfoDto.request_by.token;
    updateObj.approve_date = now();
    updateObj.form_status = { id: '2' }; //5
    updateObj.approve_by_id = updateObj.request_by.id;
    updateObj.approve_by = updateObj.request_by.displayname;
    try {
      const result = await firstValueFrom(
        this.httpService.patch(`/items/info/${id}`, updateObj),
      );
      // console.log('result', result);
      const resObj = result.data.data;
      try {
        await task.update({
          token: updateInfoDto.request_by.token,
          route: defaultRoute,
          node_order: 1,
          ref_id: id,
          data: updateInfoDto,
        });
      } catch (error) {
        return error;
      }
      // console.log('-->', result.data);
      if (
        result.data.data.critical_flag >= 3 &&
        result?.data?.data.is_notification === true
      ) {
        // console.log('>>> แจ้งเตือน', updateInfoDto.request_by);
        try {
          await notification.create({
            token: token,
            ref_id: id,
            title: resObj.title,
            message: resObj.detail,
            type: 3,
            category: 'info',
            url: `disaster/info/form/${id}`,
          });
          // console.log('res noti', res);
        } catch (error) {
          console.log(error);
          return error;
        }
      }
      return result.data;
    } catch (error) {
      console.log(error);
      return error.response.data.errors;
    }
  }

  async notification(id: string, updateInfoDto: UpdateInfoDto) {
    // console.log('>>>>', id);
    let updateObj: any = updateInfoDto;
    updateObj.notification_date = now();
    updateObj.form_status = { id: '5' };
    updateObj.notification_by_id = updateObj.request_by.id;
    updateObj.notification_by = updateObj.request_by.displayname;
    try {
      const result = await firstValueFrom(
        this.httpService.patch(`/items/info/${id}`, updateObj),
      );
      // console.log('result', result);
      try {
        await task.update({
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
        await task.update({
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
        this.httpService.patch(`/items/info/${id}`, updateObj),
      );
      // console.log('result', result);
      try {
        await task.delete({
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
