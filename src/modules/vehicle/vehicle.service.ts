import { Injectable } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { HttpService } from '@nestjs/axios';
import { InjectRepository } from '@nestjs/typeorm';
import {
  trsRegis,
  trsRegisStatusform,
  trsRegisDetail,
  trsRegisStatus,
} from '../../entities/Index';
import { Repository, Brackets, Not } from 'typeorm';
import { firstValueFrom } from 'rxjs';
const listFields = `*,trs_regis_statusform_no.*,trs_regis_status_no.*,trs_regis_detail_no.*`;

@Injectable()
export class VehicleService {
  // constructor(
  //   private readonly httpService: HttpService,
  //   @InjectRepository(trsRegis, 'MSSQL_CONNECTION')
  //   private trsRegisRepo: Repository<trsRegisStatus>,
  // ) {}

  // create(createVehicleDto: CreateVehicleDto) {
  //   return 'This action adds a new vehicle';
  // }

  // async findAll() {
  //   let filterObj = {
  //     is_active: { _eq: 1 },
  //     // trs_regis_statusform_no:{id:{_in:["res_approved","approved","res_review","res_pendding_approve","res_approved","res_diapproved"]}},
  //      // filter ข้อมูลที่ยังไม่ถูกลบ
  //   };

  //   const filterString = JSON.stringify(filterObj);
  //   // console.log('filterObj', filterString);
  //   const getQuery = `slc_supply_item?filter=${filterString}`;
  //   console.log(this.httpService.get(`/items/${getQuery}`));
  //   try {
  //     const result = await firstValueFrom(
  //       this.httpService.get(`/items/${getQuery}`),
  //     );
  //     console.log(result.data);
  //     return result?.data?.data || [];
  //   } catch (error) {
  //     console.log('error get status', error);
  //     return {};
  //   }
  // }

  findOne(id: number) {
    return `This action returns a #${id} vehicle`;
  }

  update(id: number, updateVehicleDto: UpdateVehicleDto) {
    return `This action updates a #${id} vehicle`;
  }

  remove(id: number) {
    return `This action removes a #${id} vehicle`;
  }
}
