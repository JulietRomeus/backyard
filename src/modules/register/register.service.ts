import { Injectable } from '@nestjs/common';
import { CreateRegisterDto } from './dto/create-register.dto';
import { UpdateRegisterDto } from './dto/update-register.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import {
  trsRegis,
  trsRegisStatusform,
  trsRegisDetail,
  trsRegisStatus,
} from '../../entities';
import { Repository, Brackets, Not } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import now from '../../utils/now';
const listFields = `*,trs_regis_statusform_no.*,trs_regis_status_no.*,trs_regis_detail_no.*`;
@Injectable()
export class RegisterService {
  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(trsRegis, 'MSSQL_CONNECTION')
    private trsRegisRepo: Repository<trsRegisStatus>,
    @InjectRepository(trsRegisDetail, 'MSSQL_CONNECTION')
    private trsRegisDetailRepo: Repository<trsRegisDetail>,
    @InjectRepository(trsRegisStatusform, 'MSSQL_CONNECTION')
    private trsRegisStatusformRepo: Repository<trsRegisStatusform>,
    @InjectRepository(trsRegisStatus, 'MSSQL_CONNECTION')
    private trsRegisStatusRepo: Repository<trsRegisStatus>,
  ) {}

  async findAll(query: any) {
    //console.log('body', body?.request_by || '');
    console.log('query', query);
    let filterObj = {
      is_active: { _eq: 1 }, // filter ข้อมูลที่ยังไม่ถูกลบ
    };

    const filterString = JSON.stringify(filterObj);
    console.log('filterObj', filterString);
    const getQuery = `trs_regis?filter=${filterString}&fields=${listFields}`;
    console.log(this.httpService.get(`/items/${getQuery}`));
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

 
  // async findAllActive(): Promise<mobResourceRequirement[]> {
  //   return await this.mobResourceRequirementRepository.find(
  //     {
  //       where: {
  //         is_active: 1
  //       },
  //       // relations: ['plan', 'account_type'],
  //       // select: {
  //       //   plan: { id: true },
  //       //   account_type: { id: true }
  //       // }
  //     }
  //   )
  // }

  async findOne(id: any) {
    //console.log('body', body?.request_by || '');
    //console.log('query', query);
    let filterObj = {
      is_active: { _eq: 1 }, // filter ข้อมูลที่ยังไม่ถูกลบ
    };

    const filterString = JSON.stringify(filterObj);
    console.log('filterObj', filterString);
    const getQuery = `trs_regis/${id}?filter=${filterString}&fields=${listFields}`;
    console.log(this.httpService.get(`/items/${getQuery}`));
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

  async create(CreateRegisterDto: any) {
    console.log(CreateRegisterDto);
    let timeNow = now();
    let user = CreateRegisterDto.request_by;
    let dataObj = CreateRegisterDto;
    dataObj.create_by = CreateRegisterDto;
    dataObj['create_by_id'] = user.id;
    dataObj['create_by'] = user.displayname;
    dataObj['create_date'] = timeNow;
    dataObj['update_by_id'] = user.id;
    dataObj['update_by'] = user.displayname;
    dataObj['update_date'] = timeNow;
    const finalItems = this.trsRegisRepo.create(dataObj);
    const dbRes = await this.trsRegisRepo.insert(finalItems);
    return await this.findOne(dbRes.identifiers[0].id);
  }

  async update(id: number, updateRegisterDto: any): Promise<any> {
    console.log('updateRegisterDto', updateRegisterDto);
    let timeNow = now();
    let user = updateRegisterDto.request_by;
    let dataObj = updateRegisterDto;
    // dataObj['update_by_id'] = user.id;
    delete dataObj.request_by;
    delete dataObj.id;
    dataObj['update_date'] = timeNow;
    dataObj['update_by'] = user.displayname;
    const finalItems = dataObj;
    console.log('finalItems', finalItems);
    dataObj.trs_regis_detail_no.map((d: trsRegisDetail) =>
      this.trsRegisDetailRepo.save({ ...d, regis_no: id }),
    );
    delete dataObj.trs_regis_detail_no;
    const dbRes = await this.trsRegisRepo.update(id, finalItems);

    return await this.findOne(id);
  }

  async send(id: number, updateRegisterDto: any, query: any): Promise<any> {
    console.log('updateRegisterDto', updateRegisterDto);
    console.log('query', query);
    let timeNow = now();
    let user = updateRegisterDto.request_by;
    let dataObj = updateRegisterDto;
    // dataObj['update_by_id'] = user.id;
    delete dataObj.request_by;
    delete dataObj.id;
    dataObj['update_date'] = timeNow;
    dataObj['update_by'] = user.displayname;
    const finalItems = dataObj;
    finalItems.trs_regis_statusform_no.id = 'review';
    console.log('finalItems', finalItems);
    dataObj.trs_regis_detail_no.map((d: trsRegisDetail) =>
      this.trsRegisDetailRepo.save({ ...d, regis_no: id }),
    );

    delete dataObj.trs_regis_detail_no;
    const dbRes = await this.trsRegisRepo.update(id, finalItems);
    console.log('dbRes', dbRes);
    return await this.findOne(id);
  }

  async approve(id: number, updateRegisterDto: any, query: any): Promise<any> {
    console.log('updateRegisterDto', updateRegisterDto);
    console.log('query', query);
    let timeNow = now();
    let user = updateRegisterDto.request_by;
    let dataObj = updateRegisterDto;
    dataObj['update_by_id'] = user.id;
    delete dataObj.request_by;
    delete dataObj.id;
    dataObj['update_date'] = timeNow;
    dataObj['update_by'] = user.displayname;

    const finalItems = dataObj;
    finalItems.trs_regis_statusform_no.id = 'approved';
    console.log('query.typejaa', query.type);
    dataObj.trs_regis_detail_no.map((d: trsRegisDetail) =>
      this.trsRegisDetailRepo.save({ ...d, regis_no: id }),
    );

    delete dataObj.trs_regis_detail_no;
    const dbRes = await this.trsRegisRepo.update(id, finalItems);
    return await this.findOne(id);
  }

  async remove(id: number, updateRegisterDto: any, query: any): Promise<any> {
    console.log('updateRegisterDto', updateRegisterDto);
    let timeNow = now();
    let user = updateRegisterDto.request_by;
    let dataObj = updateRegisterDto;
    dataObj['update_by_id'] = user.id;
    delete dataObj.request_by;
    delete dataObj.id;
    dataObj['update_date'] = timeNow;
    dataObj['update_by'] = user.displayname;
    const finalItems = dataObj;
    finalItems.is_active = 0;
    const dbRes = await this.trsRegisRepo.update(id, finalItems);
  }
}
