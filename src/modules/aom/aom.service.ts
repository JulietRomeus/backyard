import { Injectable } from '@nestjs/common';
import { CreateAomDto } from './dto/create-aom.dto';
import { UpdateAomDto } from './dto/update-aom.dto';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';

const formFields = `*.*,vehicle_driver.vehicle.*,vehicle_driver.driver.*`;
const listFields = `*,route.*`;

@Injectable()
export class AomService {
  constructor(private readonly httpService: HttpService) {}

  create(createAomDto: CreateAomDto) {
    return 'This action adds a new aom';
  }

  async findAll() {
    try {
      let filterObj = {
        is_delete: { _neq: true },
      };
      const filterString = JSON.stringify(filterObj);
      // console.log('x', filterString);
      const getQuery = `trs_activity?filter=${filterString}&fields=${listFields}`;
      const result = await firstValueFrom(
        this.httpService.get(`/items/${getQuery}`),
      );
      // console.log(result.data);
      return result?.data?.data || [];
    } catch (error) {
      console.log('error get menupage');
      // return error;
      return [];
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} aom`;
  }

  update(id: number, updateAomDto: UpdateAomDto) {
    return `This action updates a #${id} aom`;
  }

  remove(id: number) {
    return `This action removes a #${id} aom`;
  }
}
