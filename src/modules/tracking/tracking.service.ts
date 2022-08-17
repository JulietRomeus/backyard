import { Injectable } from '@nestjs/common';
import { CreateTrackingDto } from './dto/create-tracking.dto';
import { UpdateTrackingDto } from './dto/update-tracking.dto';
import { RequestByDto } from './../../common/interfaces/requestBy.dto';
import { TrackingGateway } from './tracking.gateway';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { parseISO, addHours } from 'date-fns';

// import { HttpService } from '@nestjs/axios';
import now from '../../utils/now';
import axios, { AxiosResponse } from 'axios';

@Injectable()
export class TrackingService {
  constructor(
    private configService: ConfigService,
    private readonly trackingGateway: TrackingGateway, // private readonly httpService: HttpService,
  ) {}
  axiosConfig = {
    headers: {
      Authorization: `Bearer ${this.configService.get(
        'DIRECTUS_DISASTER_ACCESS_TOKEN',
      )}`,
    },
  };

  async track(Senddata: any): Promise<AxiosResponse> {
    // console.log('TRACK : ', data);
    try {
      // updateTrackingDto.update_date = now();
      const refCodeList = Senddata.data.map((r) => r.reference_code);
      // console.log(JSON.stringify(refCodeList));
      const result = await axios.get(
        `${this.configService.get(
          'DIRECTUS_DISASTER_URI',
        )}/items/operation_device?filter={ "reference_code": { "_in": ${JSON.stringify(
          refCodeList,
        )} }}&fields=*,operation_id.event_id`,
        {
          headers: {
            ...this.axiosConfig.headers,
            'Content-Type': 'application/json',
          },
        },
        // updateTrackingDto,
      );
      // console.log(result.data.data);
      if (result.data.data.length > 0) {
        // console.log('>>>>>');
        result.data.data.map(async (d) => {
          const findIndex = Senddata.data.findIndex(
            (s) => s.reference_code === d.reference_code,
          );
          // console.log('index', findIndex);
          // console.log('DDD', Senddata.data[findIndex].update_date);
          const updateObj: any = {
            update_by: Senddata.request_by.displayname,
            update_by_id: Senddata.request_by.id,
            update_date: addHours(
              parseISO(Senddata.data[findIndex].update_date),
              7,
            ),
            online: true,
            lat: Senddata.data[findIndex].lat,
            long: Senddata.data[findIndex].long,
          };
          try {
            const res = await axios.patch(
              `${this.configService.get(
                'DIRECTUS_DISASTER_URI',
              )}/items/operation_device/${d.op_device_id}`,
              updateObj,
              {
                headers: {
                  ...this.axiosConfig.headers,
                  'Content-Type': 'application/json',
                },
              },
            );
            // console.log(
            //   'EMIT',
            //   `tracking-${d?.operation_id?.event_id || 'none_event'}`,
            // );
            this.trackingGateway.server.emit(
              `tracking-${d?.operation_id?.event_id || 'none_event'}`,
              {
                event_id: d?.operation_id?.event_id || 'none_event',
                reference_code: d.reference_code,
                device_type: 2,
                detail: 'vehicle',
                online: true,
                update_date: d.update_date,
                lat: d.lat,
                long: d.long,
              },
            );
            // console.log('>> update', res.data.data);
          } catch (error) {
            console.log(
              'er update operate device',
              error?.response?.data?.errors,
            );
            return error?.response?.data?.errors;
          }
        });
      } else {
        // create
        Senddata.data.map(async (d) => {
          const createObj: any = {
            reference_code: d.reference_code,
            name: d.reference_code,
            create_by: Senddata.request_by.displayname,
            create_by_id: Senddata.request_by.id,
            create_date: now(),
            update_by: Senddata.request_by.displayname,
            update_by_id: Senddata.request_by.id,
            update_date: d.update_date,
            online: true,
            device_type: 2,
            detail: 'vehicle',
            lat: d.lat,
            long: d.long,
          };

          this.trackingGateway.server.emit('tracking', {
            reference_code: d.reference_code,
            device_type: 2,
            detail: 'vehicle',
            online: true,
            update_date: addHours(parseISO(d.update_date), 7),
            lat: d.lat,
            long: d.long,
          });

          try {
            const res = await axios.post(
              `${this.configService.get(
                'DIRECTUS_DISASTER_URI',
              )}/items/operation_device`,
              createObj,
              {
                headers: {
                  ...this.axiosConfig.headers,
                  'Content-Type': 'application/json',
                },
              },
            );
            // console.log('>> create', res.data.data);
          } catch (error) {
            console.log('er create operate device', error);
            return error?.response?.data?.errors;
          }
        });
      }

      // console.log(result.data.data[0]);
      // if (result.data.data.length > 0) {
      //   this.update(result.data.data[0].op_device_id, updateData);
      // }

      // return result?.data?.data;
    } catch (error) {
      console.log('er track location', error);
      return error?.response?.data?.errors;
    }
  }

  async create(createTrackingDto: CreateTrackingDto): Promise<AxiosResponse> {
    try {
      // updateTrackingDto.update_date = now();
      const result = await axios.get(
        `${this.configService.get(
          'DIRECTUS_DISASTER_URI',
        )}/items/operation_device?filter={ "reference_code": { "_eq": "${
          createTrackingDto.reference_code
        }" }}`,
        {
          headers: {
            ...this.axiosConfig.headers,
            'Content-Type': 'application/json',
          },
        },
      );
      if (result.data.data.length > 0) {
        // console.log('>...have', result.data.data);
        const updateObj: any = {
          // create_by: createTrackingDto.request_by.displayname,
          // create_by_id: createTrackingDto.request_by.id,
          // create_date: now(),
          update_by: createTrackingDto.request_by.displayname,
          update_by_id: createTrackingDto.request_by.id,
          update_date: now(),
          online: true,
          operation_id: createTrackingDto.operation_id.operation_id,
        };
        return await this.update(result.data.data[0].op_device_id, updateObj);
      } else {
        const createObj: any = {
          reference_code: createTrackingDto.reference_code,
          create_by: createTrackingDto.request_by.displayname,
          create_by_id: createTrackingDto.request_by.id,
          create_date: now(),
          update_by: createTrackingDto.request_by.displayname,
          update_by_id: createTrackingDto.request_by.id,
          update_date: now(),
          online: true,
          operation_id: createTrackingDto.operation_id.operation_id,
          device_type: 1,
          detail: 'user',
        };
        try {
          return await axios.post(
            `${this.configService.get(
              'DIRECTUS_DISASTER_URI',
            )}/items/operation_device`,
            createObj,
            {
              headers: {
                ...this.axiosConfig.headers,
                'Content-Type': 'application/json',
              },
            },
          );
        } catch (error) {
          console.log(
            'er create operate device',
            error?.response?.data?.errors,
          );
          return error?.response?.data?.errors;
        }
      }
      // const updateData: any = {
      //   online: false,
      // };
      // // console.log(result.data.data[0]);
      // if (result.data.data.length > 0) {
      //   this.update(result.data.data[0].op_device_id, updateData);
      // }

      // return result?.data?.data;
    } catch (error) {
      console.log('er disconnect location', error?.response?.data?.errors);
      return error?.response?.data?.errors;
    }
  }

  async findAll(event_id: string): Promise<AxiosResponse> {
    const query = `query{
      operation_device(filter:{
        
        status:{_eq:1},
        online:{_eq:true},
        _or:[
          {operation_id:{
              event_id:{
                event_id:{_eq:${event_id}}
              }
            }
          },
          {operation_id:{operation_id:{_null:true}}}
        ]
        
      }){
          op_device_id
          operation_id{
            operation_id
            title
            event_id{
              event_id
              event_name
            }
            action_type_id{
              action_type_name
            }
            operation_unit{
              unit_name
            }
          }
          name
          detail
          device_type
          reference_code
          client_id
          long
          lat
          online
          update_date
      }
  }
`;

    try {
      const result = await axios.post(
        `${this.configService.get('DIRECTUS_DISASTER_URI')}/graphql`,
        { query, variables: {} },
        {
          headers: {
            ...this.axiosConfig.headers,
            'Content-Type': 'application/json',
          },
        },
      );
      return result.data.data.operation_device;
    } catch (error) {
      console.log('er get op_device', error.response.data.errors);
      return error.response.data.errors;
    }
  }

  async findOne(id: string): Promise<AxiosResponse> {
    // console.log('Id', id);
    const query = `query{
      operation_device(filter:{status:{_eq:1},reference_code:{_eq:"${id}"}}){
          op_device_id
          operation_id{
            operation_id
            title
            event_id{
              event_id
              event_name
            }
            action_type_id{
              action_type_name
            }
            operation_unit{
              unit_name
            }
          }
          name
          detail
          device_type
          reference_code
          client_id
          long
          lat
          online
          update_date
      }
  }
`;
    // return query;
    try {
      const result = await axios.post(
        `${this.configService.get('DIRECTUS_DISASTER_URI')}/graphql`,
        { query, variables: {} },
        {
          headers: {
            ...this.axiosConfig.headers,
            'Content-Type': 'application/json',
          },
        },
      );
      if (result?.data?.data?.operation_device) {
        return result?.data?.data?.operation_device;
      }
    } catch (error) {
      console.log('er getlist op_device', error);
      return error?.response?.data?.errors;
    }
  }

  async update(
    id: string,
    updateTrackingDto: UpdateTrackingDto,
  ): Promise<AxiosResponse> {
    try {
      updateTrackingDto.update_date = now();
      const result = await axios.patch(
        `${this.configService.get(
          'DIRECTUS_DISASTER_URI',
        )}/items/operation_device/${id}`,
        updateTrackingDto,
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
  }

  async disconnected(client_id: string): Promise<AxiosResponse> {
    try {
      // updateTrackingDto.update_date = now();
      const result = await axios.get(
        `${this.configService.get(
          'DIRECTUS_DISASTER_URI',
        )}/items/operation_device?filter={ "client_id": { "_eq": "${client_id}" }}`,
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
      // console.log(result.data.data[0]);
      if (result.data.data.length > 0) {
        this.update(result.data.data[0].op_device_id, updateData);
      }

      return result?.data?.data;
    } catch (error) {
      console.log('er disconnect location', error?.response?.data?.errors);
      return error?.response?.data?.errors;
    }
  }

  remove(id: number) {
    return `This action removes a #${id} tracking`;
  }
}
