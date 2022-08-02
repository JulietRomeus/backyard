import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { firstValueFrom } from 'rxjs';
import now from '../../utils/now';
import task from '../../utils/task';
import notification from '../../utils/notification';
import { StatusEnum } from '../../common/status.enum';
import { RequestByDto } from './../../common/interfaces/requestBy.dto';

const defaultRoute = 'event';

const eventResponse = `event_id
                event_name
                disaster_type {
                    disaster_type_id
                    disaster_type_no
                    disaster_type_name
                    image{
                      id
                    }
                }
                disaster_level
                event_status{
                  id
                  no
                  name
                  color
                  action
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

  async create(createEventDto: CreateEventDto) {
    let createObj: any = createEventDto;
    createObj.create_date = now();
    createObj.create_by_id = createObj.request_by.id;
    createObj.create_by = createObj.request_by.displayname;
    createObj.event_status = {
      id: '2',
    };
    createObj.unit_no =
      createEventDto.request_by?.activeUnit?.code ||
      createEventDto.request_by.units[0].code ||
      '';
    delete createObj.update_date;
    delete createObj.delete_date;
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

  async findAll({ filter, body }: { filter: any; body: RequestByDto }) {
    let allFilter: any = [{ status: { _eq: 1 } }];
    if (body.request_by.filter) {
      allFilter.push(body.request_by.filter);
    }
    if (filter.event_status) {
      allFilter.push({
        event_status: { no: { _in: [...filter.event_status.split(',')] } },
      });
    }
    if (filter.start_date) {
      allFilter.push({ start_date: { _lte: `${filter.start_date}` } });
    }
    if (filter.end_date) {
      allFilter.push({ end_date: { _gte: `${filter.end_date}` } });
    }
    // console.log(JSON.stringify(allFilter));
    const query = `query{
      event(filter:
        {_and: ${JSON.stringify(allFilter).replace(/"([^"]+)":/g, '$1:')}}
       ,sort: ["-create_date"]){
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

  async public() {
    let allFilter: any = [{ status: { _eq: 1 } }];

    allFilter.push({
      event_status: { no: { _in: ['3', '5','6'] } },
    });

    // console.log(JSON.stringify(allFilter));
    const query = `query{
      event(filter:
        {_and: ${JSON.stringify(allFilter).replace(/"([^"]+)":/g, '$1:')}}
       ,sort: ["-create_date"]){
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

  async findAllorActive(filter) {
    let allFilter: any = [{ status: { _eq: 1 } }];
    let event_status;
    // console.log('>', filter);
    if (filter.event_status) {
      // allFilter.push({
      //   event_status: { no: { _in: [...filter.event_status.split(',')] } },
      // });
      event_status = filter.event_status.split(',');
      console.log(event_status);
    }
    // if (filter.start_date) {
    //   allFilter.push({ start_date: { _lte: `${filter.start_date}T23:59:59` } });
    // }
    // if (filter.end_date) {
    //   allFilter.push({ end_date: { _gte: `${filter.end_date}T00:00:00` } });
    // }
    // console.log(JSON.stringify(allFilter));
    //     const query = `query{
    //       event(filter:{_or:[{event_status:{no:{_eq:"3"}}}
    //         {_and: ${JSON.stringify(allFilter).replace(/"([^"]+)":/g, '$1:')}}
    //       ]} ,sort: ["-create_date"]){
    //         ${eventResponse}
    //       }
    //   }
    // `;
    const query = `query{
      event(filter:
        {  _and:[
            {status:{_eq:1}},
            {event_status:{no:{_in:${JSON.stringify(event_status)}}}},
            {_or:[
                {_and:[
                    {start_date:{_lte:"${filter.end_date}T23:59:59"}},
                    {end_date:{_gte:"${filter.start_date}T00:00:00"}}
                    ]},
                {event_status:{no:{_eq:"3"}}}
          ]}
        ]},limit:-1){
          ${eventResponse}
        }
    }`;
    // console.log('query', query);
    const variables = {};
    try {
      const result = await firstValueFrom(
        this.httpService.post(`/graphql`, { query, variables }),
      );

      // console.log('xxx', result.data);
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
    const token = updateEventDto.request_by.token;
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
      // try {

      const resEvent = result.data;
      task.update({
        token: token,
        route: defaultRoute,
        node_order: status_no === '3' ? 1 : status_no === '5' ? 2 : 0,
        ref_id: id,
        data: updateEventDto,
      });
      // } catch (error) {
      //   return error;
      // }

      // console.log('>', status_no);
      if (status_no === '3') {
        let units: any = [];
        if (
          updateEventDto?.event_area &&
          updateEventDto?.event_area?.length > 0
        ) {
          units = await this.unitRespArea(updateEventDto.event_area);
        }
        // console.log('_____noti');
        // ======= Unit Area CONDITION ========
        // try {

        // console.log('notification ::', token);
        notification.create({
          token: token,
          ref_id: id,
          title: resEvent.data.event_name,
          message: resEvent.data.note,
          type: 1,
          category: 'event',
          url: `disaster/event/form/${id}`,
          units: units,
        });
      }

      return resEvent;
    } catch (error) {
      return error.response.data.errors;
    }
  }

  async approve(id: string, updateEventDto: UpdateEventDto) {
    // console.log('>>>>', updateEventDto);
    const resStatus = await firstValueFrom(
      this.httpService.get(`/items/event_status?filter[no][_eq]=${3}`),
    );
    const status_id = resStatus.data.data[0].id;
    let updateObj: any = updateEventDto;
    const token: any = updateEventDto.request_by.token;
    updateObj.approve_date = now();
    updateObj.event_status = { id: status_id }; //status_id
    updateObj.approve_by_id = updateObj.request_by.id;
    updateObj.approve_by = updateObj.request_by.displayname;
    delete updateObj.update_date;
    delete updateObj.delete_date;
    try {
      const result = await firstValueFrom(
        this.httpService.patch(`/items/event/${id}`, updateObj),
      );
      const resEvent = result.data;

      task.update({
        token: updateEventDto.request_by.token,
        route: defaultRoute,
        node_order: 1,
        ref_id: id,
        data: updateEventDto,
      });

      // console.log('taskUpdate ::', taskUpdate);

      // ======= Notification condition ========

      // ======= Unit Area CONDITION ========
      let units: any = [];
      if (
        updateEventDto?.event_area &&
        updateEventDto?.event_area?.length > 0
      ) {
        units = await this.unitRespArea(updateEventDto.event_area);
      }
      // ======= Unit Area CONDITION ========
      // try {

      // console.log('notification ::', token);
      notification.create({
        token: token,
        ref_id: resEvent.data.event_id,
        title: resEvent.data.event_name,
        message: resEvent.data.note,
        type: 1,
        category: 'event',
        url: `disaster/event/form/${resEvent.data.event_id}`,
        units: units,
      });

      // console.log('noti noti noti noti :::', noti);

      // } catch (error) {
      //   return error;
      // }

      // ======= Notification condition ========
      // console.log("")
      // console.log('resEvent :::', resEvent);
      return resEvent;
    } catch (error) {
      console.log('error', error);
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
