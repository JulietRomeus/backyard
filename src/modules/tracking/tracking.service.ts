import { Injectable } from '@nestjs/common';
import { CreateTrackingDto } from './dto/create-tracking.dto';
import { UpdateTrackingDto } from './dto/update-tracking.dto';
import { RequestByDto } from './../../common/interfaces/requestBy.dto';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import now from '../../utils/now';

@Injectable()
export class TrackingService {
  constructor(private readonly httpService: HttpService) {}

  create(createTrackingDto: CreateTrackingDto) {
    return 'This action adds a new tracking';
  }

  async findAll() {
    const query = `query{
      operation_device(filter:{status:{_eq:1}}){
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
      }
  }
`;

    try {
      const result = await firstValueFrom(
        this.httpService.post(`/graphql`, { query, variables: {} }),
      );
      return result.data.data.operation_device;
    } catch (error) {
      console.log('er get op_device', error.response.data.errors);
      return error.response.data.errors;
    }
  }

  async findOne(id: string) {
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
      }
  }
`;
    // return query;
    try {
      const result = await firstValueFrom(
        this.httpService.post(`/graphql`, { query, variables: {} }),
      );
      if (result?.data?.data?.operation_device) {
        return result?.data?.data?.operation_device;
      }
    } catch (error) {
      console.log('er getlist op_device', error);
      return error?.response?.data?.errors;
    }
  }

  async update(id: string, updateTrackingDto: UpdateTrackingDto) {
    try {
      updateTrackingDto.update_date = now();
      const result = await firstValueFrom(
        this.httpService.patch(
          `/items/operation_device/${id}`,
          updateTrackingDto,
        ),
      );
      if (result.data?.data?.operation_device) {
        return result.data?.data?.operation_device;
      }
    } catch (error) {
      console.log('er get op_device location', error);
      return error?.response?.data?.errors;
    }
  }

  async disconnected(client_id: string) {
    try {
      // updateTrackingDto.update_date = now();
      const result = await firstValueFrom(
        this.httpService.get(
          `/items/operation_device?filter={ "client_id": { "_eq": "${client_id}" }}`,
          // updateTrackingDto,
        ),
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
      console.log('er disconnect location', error);
      return error?.response?.data?.errors;
    }
  }

  remove(id: number) {
    return `This action removes a #${id} tracking`;
  }
}
