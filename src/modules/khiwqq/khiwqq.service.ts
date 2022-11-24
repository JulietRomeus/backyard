import { Injectable } from '@nestjs/common';
import { CreateKhiwqqDto } from './dto/create-khiwqq.dto';
import { UpdateKhiwqqDto } from './dto/update-khiwqq.dto';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';

const formFields = `*.*,vehicle_driver.vehicle.*,vehicle_driver.driver.*`;
const listFields = `*,route.*`;

@Injectable()
export class KhiwqqService {
  constructor(private readonly httpService: HttpService) {}

  create(createKhiwqqDto: CreateKhiwqqDto) {
    return 'This action adds a new khiwqq';
  }

  async findAll() {
    try {
      let filterObj = {
        is_delete: {_neq: true},
      };
      const filterString = JSON.stringify(filterObj);
      // const getQuery = 'trs_activity'

      const getQuery =
        'trs_activity?filter=${filterString}&fields={listFields}';

      const result = await firstValueFrom(
        this.httpService.get(`/items/${getQuery}`),
      );
      // console.log(result.data);
      return result?.data?.data || [];
    } catch (error) {
      console.log('error get menupage');
      return [];
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} khiwqq`;
  }

  update(id: number, updateKhiwqqDto: UpdateKhiwqqDto) {
    return `This action updates a #${id} khiwqq`;
  }

  remove(id: number) {
    return `This action removes a #${id} khiwqq`;
  }
}
