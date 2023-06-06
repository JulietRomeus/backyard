import { Injectable } from '@nestjs/common';
import { CreateExampleDto } from './dto/create-example.dto';
import { UpdateExampleDto } from './dto/update-example.dto';
import { HttpService } from '@nestjs/axios';
import { RequestByDto } from '../../common/interfaces/requestBy.dto';
import now from '../../utils/now';
import { firstValueFrom } from 'rxjs';
import userStamp from '../../utils/userStamp';

@Injectable()
export class ExampleService {
  constructor(private readonly httpService: HttpService) {}

  async create(createExampleDto: CreateExampleDto) {
    const query = `example/`;
    try {
      createExampleDto = {
        ...createExampleDto,
        ...userStamp(createExampleDto, 'create'),
      };
      delete createExampleDto.request_by;

      const result = await firstValueFrom(
        this.httpService.post(`/items/${query}`, createExampleDto),
      );
      return result?.data?.data || [];
    } catch (error) {
      return error;
    }
  }

  async findAll() {
    const listFields = `*`;
    const filterObj = {};
    const filterString = JSON.stringify(filterObj);
    // console.log('filterObj', filterString);
    const query = `example?filter=${filterString}&fields=${listFields}`;
    // const query = `example`;
    try {
      const result = await firstValueFrom(
        this.httpService.get(`/items/${query}`),
      );
      // console.log(result.data);
      return result?.data?.data || [];
    } catch (error) {
      return error;
    }
  }

  async findOne(id: number) {
    const query = `example/${id}`;
    try {
      const result = await firstValueFrom(
        this.httpService.get(`/items/${query}`),
      );
      // console.log(result.data);
      return result?.data?.data || [];
    } catch (error) {
      return error;
    }
  }

  async update(id: number, updateExampleDto: UpdateExampleDto) {
    updateExampleDto = {
      ...updateExampleDto,
      ...userStamp(updateExampleDto, 'update'),
    };
    delete updateExampleDto.request_by;

    const query = `example/${id}`;
    try {
      const result = await firstValueFrom(
        this.httpService.patch(`/items/${query}`, updateExampleDto),
      );
      // console.log(result.data);
      return result?.data?.data || [];
    } catch (error) {
      return error;
    }
  }

  async remove(id: number) {
    const query = `example/${id}`;
    try {
      const result = await firstValueFrom(
        this.httpService.delete(`/items/${query}`),
      );
      // console.log(result.data);
      return result?.data?.data || [];
    } catch (error) {
      return error;
    }
  }
}
