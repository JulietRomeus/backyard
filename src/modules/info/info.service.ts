import { RequestByDto } from './../../common/interfaces/requestBy.dto';
import { CreateEventDto } from './../event/dto/create-event.dto';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { CreateInfoDto } from './dto/create-info.dto';
import { UpdateInfoDto } from './dto/update-info.dto';
import { firstValueFrom } from 'rxjs';
import now from '../../utils/now';
import task from '../../utils/task';
import notification from '../../utils/notification';
import { AnyRecord } from 'dns';
import { getConfigToken } from '@nestjs/config';
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
                  action
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
                unit_no
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

  async create(createInfoDto: CreateInfoDto) {
    // console.log('.....', createEventDto.agency);
    let createObj: any = createInfoDto;
    createObj.create_date = now();
    createObj.publish_date = createInfoDto.publish_date
      ? createInfoDto.publish_date
      : now();
    createObj.create_by_id = createObj.request_by.id;
    createObj.create_by = createObj.request_by.displayname;
    createObj.status = 1;
    createObj.unit_no =
      createInfoDto.request_by?.activeUnit?.code ||
      createInfoDto.request_by?.units[0]?.code ||
      '';
    createObj.form_status = {
      id:
        (createInfoDto?.agency?.agency_id == '2' ||
          createInfoDto?.agency?.agency_id == '3' ||
          createInfoDto?.agency?.agency_id == '4') &&
        createInfoDto.critical_flag < 2
          ? '6'
          : (createInfoDto?.agency?.agency_id == '2' ||
              createInfoDto?.agency?.agency_id == '3' ||
              createInfoDto?.agency?.agency_id == '4') &&
            createInfoDto.critical_flag >= 2
          ? '5'
          : '1',
    };
    createObj.is_notification =
      (createInfoDto?.agency?.agency_id == '2' ||
        createInfoDto?.agency?.agency_id == '3' ||
        createInfoDto?.agency?.agency_id == '4') &&
      createInfoDto.critical_flag < 2
        ? false
        : (createInfoDto?.agency?.agency_id == '2' ||
            createInfoDto?.agency?.agency_id == '3' ||
            createInfoDto?.agency?.agency_id == '4') &&
          createInfoDto.critical_flag >= 2
        ? true
        : createInfoDto.is_notification;
    try {
      const result = await firstValueFrom(
        this.httpService.post(`/items/info/`, createObj),
      );
      const resObj = result.data;
      // ======= TASK CONDITION ========
      if (
        createInfoDto?.agency?.agency_id != '2' &&
        createInfoDto?.agency?.agency_id != '3' &&
        createInfoDto?.agency?.agency_id != '4'
      ) {
        task.create({
          token: createInfoDto.request_by.token,
          route: defaultRoute,
          ref_id: resObj.data.info_id,
          data: {
            name: createInfoDto.title,
            perm: [
              { order: 0, users: [createInfoDto.request_by.id], units: [] },
              {
                order: 1,
                users: [createInfoDto.request_by.id],
                units: [
                  createInfoDto.request_by.activeUnit.code ||
                    createInfoDto.request_by.units[0].code,
                ],
              },
              {
                order: 2,
                users: [],
                units: [
                  createInfoDto.request_by.activeUnit.code ||
                    createInfoDto.request_by.units[0].code,
                ],
              },
            ],
          },
        });
      }
      // ======= TASK CONDITION ========

      // ======= NOTIFICATION CONDITION ========
      if (
        (createInfoDto?.agency?.agency_id == '2' ||
          createInfoDto?.agency?.agency_id == '3' ||
          createInfoDto?.agency?.agency_id == '4') &&
        createInfoDto.critical_flag >= 2
      ) {
        // ======= Unit Area CONDITION ========
        let units: any = [];
        if (createInfoDto?.info_area && createInfoDto?.info_area?.length > 0) {
          units = await this.unitRespArea(createInfoDto.info_area);
        }
        notification.create({
          token: createInfoDto.request_by.token,
          ref_id: resObj.data.info_id,
          title: resObj.data.title,
          message: resObj.data.detail,
          type: 3,
          category: 'info',
          url: `disaster/info/form/${resObj.data.info_id}`,
          units: units,
        });
        // ======= Unit Area CONDITION ========
      }
      // ======= NOTIFICATION CONDITION ========

      return result.data;
    } catch (error) {
      return error.response.data.errors;
    }
  }

  async unitRespArea(areas: any) {
    // const areaName = 'info_area';
    // console.log('area', areas);
    let units = [];
    const variables = {};
    await Promise.all(
      areas.map(async (a) => {
        // ----- query Amphoe code ----- //
        if (a.amphoe_code) {
          try {
            const query = `query{
              unit_resp_area(filter:{_and:[{
                amphoe_code:{
                  _eq:"${a.amphoe_code}"
                }
              }]}){
                unit_no
                unit_name
              }
            }`;
            const result = await firstValueFrom(
              this.httpService.post(`/graphql`, { query, variables }),
            );
            // console.log('>>>>>', result.data.data.unit_resp_area);
            if (
              result?.data?.data?.unit_resp_area &&
              result?.data?.data?.unit_resp_area?.length > 0
            ) {
              result?.data?.data?.unit_resp_area.map((u) => {
                units.push(u.unit_no);
              });
            }
          } catch (error) {
            error?.response?.data?.errors[0]?.extensions?.graphqlErrors?.map(
              (e) => {
                console.log(e);
              },
            );
            // return error.response.data.errors;
          }
          // ----- query Amphoe code ----- //
        } else if (a.province_code) {
          // ----- query Province code ----- //
          try {
            const query = `query{
              unit_resp_area(filter:{_and:[{
                province_code:{
                  _eq:"${a.province_code}"
                }
              }]}){
                unit_no
                unit_name
              }
            }`;
            const result = await firstValueFrom(
              this.httpService.post(`/graphql`, { query, variables }),
            );
            // console.log('>>>>>', result.data.data.unit_resp_area);
            if (
              result?.data?.data?.unit_resp_area &&
              result?.data?.data?.unit_resp_area?.length > 0
            ) {
              result?.data?.data?.unit_resp_area.map((u) => {
                units.push(u.unit_no);
              });
            }
          } catch (error) {
            error?.response?.data?.errors[0]?.extensions?.graphqlErrors?.map(
              (e) => {
                console.log(e);
              },
            );
            // return error.response.data.errors;
          }
          // ----- query Province code ----- //
        }
      }),
    );

    const uniqueUnit = [...new Set(units)];
    // console.log('UNIT', uniqueUnit);
    return uniqueUnit;
  }

  async findAll({ filter, body }: { filter: any; body: RequestByDto }) {
    // console.log('f', filter, 'req', request_by);
    // console.log(body.request_by.filter);
    let allFilter: any = [{ status: { _eq: 1 } }];
    if (body.request_by.filter) {
      allFilter.push(body.request_by.filter);
    }

    if (filter.form_status) {
      allFilter.push({
        form_status: { id: { _in: [...filter.form_status.split(',')] } },
      });
    }
    console.log(allFilter);

    const query = `query{
      info(filter:{_and:${JSON.stringify(allFilter).replace(
        /"([^"]+)":/g,
        '$1:',
      )} },sort: ["-create_date"]){
        ${objResponse}
      }
  }
`;
    // console.log(query);
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

  async public(filter: any) {
    // console.log('f', filter, 'req', request_by);
    // console.log(body.request_by.filter);
    let allFilter: any = [{ status: { _eq: 1 } }];
    let page = 1;
    allFilter.push({
      form_status: { id: { _in: ['5', '6'] } },
    });

    if (filter.page) {
      page = filter.page;
    }
    const query = `query{
      info(filter:{_and:${JSON.stringify(allFilter).replace(
        /"([^"]+)":/g,
        '$1:',
      )} },page:${page},sort: ["-create_date"]){
        ${objResponse}
      }
  }
`;
    // console.log(query);
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
    let updateObj: any = updateInfoDto;
    const token = updateInfoDto.request_by.token;
    const formStatus = updateInfoDto.form_status.no;
    // console.log('----> form status', updateInfoDto.form_status.no);
    updateObj.update_date = now();
    updateObj.form_status = {
      id:
        updateInfoDto.form_status.no === 'approve'
          ? '3'
          : updateInfoDto.form_status.no === 'pending_notification'
          ? '6'
          : updateInfoDto.form_status.no === 'create'
          ? '1'
          : updateInfoDto.form_status.no === 'sendback'
          ? '4'
          : '2',
    };
    updateObj.update_by_id = updateObj.request_by.id;
    updateObj.update_by = updateObj.request_by.displayname;
    delete updateObj.request_by;
    try {
      // console.log('update', id, updateObj);
      const result = await firstValueFrom(
        this.httpService.patch(`/items/info/${id}`, updateObj),
      );
      // console.log('res info ', result.data);
      console.log('---->2 form status', updateInfoDto.form_status.no);

      // try {
      task.update({
        token: token,
        route: defaultRoute,
        node_order:
          formStatus === 'complete' || formStatus === 'approve'
            ? 2
            : formStatus === 'pending'
            ? 1
            : formStatus === 'sendback'
            ? 0
            : 0,
        ref_id: id,
        data: updateInfoDto,
      });
      // } catch (error) {
      //   console.log('errr', error);
      // }

      // console.log(resTask);

      return result.data;
    } catch (error) {
      // console.log('err ->', error.response.data.errors);
      // console.log('err save info', error);
      return error;
    }
  }

  async submit(id: string, updateInfoDto: UpdateInfoDto) {
    let updateObj: any = updateInfoDto;
    const token = updateInfoDto.request_by.token;
    // console.log('----> form status', updateInfoDto.form_status.no);
    updateObj.update_date = now();
    updateObj.form_status = {
      id: '2',
    };
    updateObj.update_by_id = updateObj.request_by.id;
    updateObj.update_by = updateObj.request_by.displayname;
    delete updateObj.request_by;
    try {
      // console.log('update', id, updateObj);
      const result = await firstValueFrom(
        this.httpService.patch(`/items/info/${id}`, updateObj),
      );
      // console.log('res info 1', result.data);
      // console.log('token', token);
      // try {
      task.update({
        token: token,
        route: defaultRoute,
        node_order: 1,
        ref_id: id,
        data: updateInfoDto,
      });
      // console.log(resTask);
      // } catch (error) {
      //   // console.log('EEE', error);
      //   return error;
      // }
      // console.log('res info 2', result.data);
      return result.data;
    } catch (error) {
      // console.log('err ->', error.response.data.errors);
      // console.log('err save info', error);
      return error;
    }
  }

  async approve(id: string, updateInfoDto: UpdateInfoDto) {
    // console.log('>>>>', id);
    let updateObj: any = updateInfoDto;
    const token = updateInfoDto.request_by.token;
    const files = updateInfoDto.files;
    // console.log('FILES', files);
    updateObj.approve_date = now();
    updateObj.form_status = { id: '5' }; //5
    updateObj.approve_by_id = updateObj.request_by.id;
    updateObj.approve_by = updateObj.request_by.displayname;
    try {
      const result = await firstValueFrom(
        this.httpService.patch(`/items/info/${id}`, updateObj),
      );
      // console.log('result', result);
      const resObj = result.data;
      // console.log(updateInfoDto.files[0]);
      try {
        task.update({
          token: token,
          route: defaultRoute,
          node_order: 2,
          ref_id: id,
          data: updateInfoDto,
        });
      } catch (error) {
        console.log('err approve info task', error);
      }

      // console.log('-->', result.data);
      if (
        // result.data.data.critical_flag >= 3 ||
        resObj?.data.is_notification === true
      ) {
        // console.log('>>> แจ้งเตือน', updateInfoDto.request_by);
        let units: any = [];
        if (resObj?.data?.info_area && resObj?.data?.info_area?.length > 0) {
          units = await this.unitRespArea(updateInfoDto.info_area);
        }

        console.log('>>>');
        try {
          notification.create({
            token: token,
            ref_id: id,
            title: resObj.data.title,
            message: resObj.data.detail,
            type: 3,
            category: 'info',
            url: `disaster/info/form/${resObj.data.info_id}`,
            units: units,
            img_url:
              files.length > 0
                ? `${process.env.DIRECTUS_DISASTER_URI}/assets/${files[0]?.directus_files_id?.id}`
                : undefined,
          });
        } catch (error) {
          console.log('error info aprove noti', error);
        }
      }
      return resObj;
    } catch (error) {
      console.log(error);
      return error.response.data.errors;
    }
  }

  async notification(id: string, updateInfoDto: UpdateInfoDto, query: any) {
    // console.log('>>>>', query);
    let updateObj: any = updateInfoDto;
    const files = updateInfoDto.files;
    updateObj.form_status = { id: '5' }; // 5
    updateObj.is_notification = query.complete ? false : true;
    updateObj.notification_date = now();
    updateObj.notification_by_id = updateObj.request_by.id;
    updateObj.notification_by = updateObj.request_by.displayname;
    try {
      const result = await firstValueFrom(
        this.httpService.patch(`/items/info/${id}`, updateObj),
      );
      // console.log(result);
      const resObj = result.data;
      if (!query.complete || resObj.data.is_notification === true) {
        let units: any = [];
        if (resObj?.data?.info_area && resObj?.data?.info_area?.length > 0) {
          // console.log('info_area...');
          units = await this.unitRespArea(updateInfoDto.info_area);
          // console.log('unit noti ::: ', units);
        }
        try {
          notification.create({
            token: updateInfoDto.request_by.token,
            ref_id: id,
            title: resObj.data.title,
            message: resObj.data.detail,
            type: 3,
            category: 'info',
            url: `disaster/info/form/${resObj.data.info_id}`,
            units: units,
            img_url:
              files.length > 0
                ? `${process.env.DIRECTUS_DISASTER_URI}/assets/${files[0]?.directus_files_id?.id}`
                : undefined,
          });
        } catch (error) {
          console.log('error', error);
        }
      }
      // console.log('res info', resObj);
      return resObj;
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
          node_order: 1,
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
