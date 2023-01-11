import { Injectable } from '@nestjs/common';
import { CreateRegisterDto } from './dto/create-register.dto';
import { UpdateRegisterDto } from './dto/update-register.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import {trsRegis,trsRegisStatusform,trsRegisDetail,trsRegisStatus} from '../../entities'
import { Repository, Brackets, Not } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import now from '../../utils/now';
const listFields = `*,trs_regis_statusform_no.*,trs_regis_status_no.*`;
@Injectable()
export class RegisterService {
  constructor(private readonly httpService: HttpService,
    @InjectRepository(trsRegis, 'MSSQL_CONNECTION')
    private trsRegisRepo : Repository<trsRegisStatus>
    ) {}

  async findAll(query: any) {
    //console.log('body', body?.request_by || '');
    console.log('query', query);
    let filterObj = {
      is_active: { _neq: true }, // filter ข้อมูลที่ยังไม่ถูกลบ
    };

    const filterString = JSON.stringify(filterObj);
    console.log('filterObj', filterString);
    const getQuery = `trs_regis?filter${filterString}&fields=${listFields}`;
    console.log( this.httpService.get(`/items/${getQuery}`))
    try {
      const result = await firstValueFrom(
        this.httpService.get(`/items/${getQuery}`),
       
      );
      console.log(result.data);
      return result?.data?.data || [];
    } catch (error) {
      console.log('error get status', error);
      return {};
    }
  }
  


  async findOne(id: any) {
    //console.log('body', body?.request_by || '');
    //console.log('query', query);
    let filterObj = {
      is_active: { _neq: true }, // filter ข้อมูลที่ยังไม่ถูกลบ
    };

    const filterString = JSON.stringify(filterObj);
    console.log('filterObj', filterString);
    const getQuery = `trs_regis/${id}?filter${filterString}&fields=${listFields}`;
    console.log( this.httpService.get(`/items/${getQuery}`))
    try {
      const result = await firstValueFrom(
        this.httpService.get(`/items/${getQuery}`),
       
      );
      console.log(result.data);
      return result?.data?.data || [];
    } catch (error) {
      console.log('error get status', error);
      return {};
    }
  }

  async gettype(id: any) {

  }


  async create(CreateRegisterDto: any) {

     console.log(CreateRegisterDto)
    let timeNow = now();
    let user = CreateRegisterDto.request_by
    let dataObj = CreateRegisterDto
    dataObj.create_by = CreateRegisterDto
    dataObj['create_by_id'] = user.id;
    dataObj['create_by'] = user.displayname;
    dataObj['create_date'] = timeNow;
    dataObj['update_by_id'] = user.id;
    dataObj['update_by'] = user.displayname;
    dataObj['update_date'] = timeNow;
    const finalItems = this.trsRegisRepo.create(dataObj)
    const dbRes = await this.trsRegisRepo.insert(finalItems);
    return await this.findOne(dbRes.identifiers[0].id)
  }


  async update(id: number, updateRegisterDto: any): Promise<any> {
    console.log('updateRegisterDto',updateRegisterDto)
    let timeNow = now();
    let user = updateRegisterDto.request_by
    let dataObj = updateRegisterDto
    // dataObj['update_by_id'] = user.id;
    delete dataObj.request_by
    delete dataObj.id
    dataObj['update_date'] = timeNow;
   // dataObj['update_by'] = user.displayname;

    const finalItems = dataObj

    console.log('finalItems',finalItems)
    const dbRes = await this.trsRegisRepo.update(id, finalItems);
    return await this.findOne(id)
  }

  remove(id: number) {
    return `This action removes a #${id} register`;
  }
}
