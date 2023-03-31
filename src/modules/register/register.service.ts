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
} from '../../entities/Index';
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

  async findAll(query) {
    //console.log('body', body?.request_by || '');
    console.log('query', query);
    if(query.type == "req")
    {let filterObj = {
      is_active: { _eq: 1 },
      trs_regis_statusform_no:{id:{_in:["approved","draft","review","pendding_approve","approved","diapproved","res_approved"]}},
       // filter ข้อมูลที่ยังไม่ถูกลบ
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
    }}
    else{
      let filterObj = {
        is_active: { _eq: 1 },
        trs_regis_statusform_no:{id:{_in:["res_approved","approved","res_review","res_pendding_approve","res_approved","res_diapproved"]}},
         // filter ข้อมูลที่ยังไม่ถูกลบ
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
  }

  // async findAll(query) {
  //   console.log('query',query)
  //   if(query.type == "req")
  //  { return await this.trsRegisRepo
  //     .createQueryBuilder('d')
  //     .where('d.is_active = 1')
  //     .leftJoinAndSelect('d.trs_regis_detail_no', 'tdll', 'tdll.is_active = 1')
  //     .leftJoinAndSelect('d.trs_regis_status_no', 'trsn', 'trsn.is_active=1')
  //     .leftJoinAndSelect(
  //       'd.trs_regis_statusform_no',
  //       'trsfn',
  //       'trsfn.is_active=1',
  //     )
  //     .getMany()
  //   }
  //     else{
  //       return await this.trsRegisRepo
  //     .createQueryBuilder('d')
  //     .where('d.is_active = 1')
  //     .leftJoinAndSelect('d.trs_regis_detail_no', 'tdll', 'tdll.is_active = 1')
  //     .leftJoinAndSelect('d.trs_regis_status_no', 'trsn', 'trsn.is_active=1')
  //     .leftJoinAndSelect(
  //       'd.trs_regis_statusform_no',
  //       'trsfn',
  //       'trsfn.is_active=1'
  //     )
  //     .getMany()
  //     }
  // }

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

  async findOptioncontract() {
    console.log('first')
    return await this.trsRegisRepo.query
    (
      `select sc.name as contract_name,sc.id as contract_id ,sc2.name as company_name ,sc2.id as contract_item_id,
      sci.total_price,sci.supply_spec_id,sss.name as spec ,sss.id as spec_id from slc_contract sc 
      left join slc_contract_item sci on sci.contact_id = sc.id 
      left join slc_company sc2 on sc2.id = sc.company_id 
      left join slc_supply_spec sss on sss.id = sci.supply_spec_id 
      where sc.is_active = 1   
      `)}
  
  async findOne(id: any) {
    //console.log('body', body?.request_by || '');
    //console.log('query', query);
    let filterObj = {
      is_active: { _eq: 1 }, // filter ข้อมูลที่ยังไม่ถูกลบ
    };

    const filterString = JSON.stringify(filterObj);
    // console.log('filterObj', filterString);
    const getQuery = `trs_regis/${id}?filter=${filterString}&fields=${listFields}`;
    try {
      const result = await firstValueFrom(
        this.httpService.get(`/items/${getQuery}`),
      );
      // console.log(result.data);
      return result?.data?.data || [];
    } catch (error) {
      console.log('error get status', error);
      return {};
    }
  }

  // async findOne(id: any) {
  //   return this.trsRegisRepo
  //     .createQueryBuilder('d')
  //     .where('d.id =:id', { id: id })
  //     .leftJoinAndSelect('d.trs_regis_detail_no', 'tdll', 'tdll.is_active = 1')
  //     .leftJoinAndSelect('d.trs_regis_status_no', 'trsn', 'trsn.is_active=1')
  //     .leftJoinAndSelect(
  //       'd.trs_regis_statusform_no',
  //       'trsfn',
  //       'trsfn.is_active=1',
  //     )
  //     .getOne();
  // }

  async create(CreateRegisterDto: any) {
    // console.log('CreateRegisterDto', CreateRegisterDto);
    let timeNow = now();
    let user = CreateRegisterDto.request_by;
    let dataObj = CreateRegisterDto;
    dataObj.create_by = CreateRegisterDto;
    dataObj['create_by_id'] = user.id;
    dataObj['create_by'] = user.displayname;
    dataObj['create_date'] = timeNow;
    // dataObj['update_by_id'] = user.id;
    // dataObj['update_by'] = user.displayname;
    // dataObj['update_date'] = timeNow;
    const finalItems = this.trsRegisRepo.create(dataObj);
    console.log('finalItems', finalItems);
    //------creatsubitem---------//
    let subItems = new trsRegis();
    Object.keys(dataObj)?.map((keys) => {
      subItems[keys] = dataObj[keys] || null;
    });
    console.log('subItems', subItems);
    console.log('dataObj.trs_regis_detail_no', dataObj.trs_regis_detail_no);
    const trs_regis_detail_no = dataObj.trs_regis_detail_no?.map(
      (rec: trsRegisDetail) => {
        let temDetail = new trsRegisDetail();

        Object.keys(rec)?.map((keys) => {
          temDetail[keys] = rec[keys] || null;
        });
        return temDetail;
      },
    );
    subItems.trs_regis_detail_no = trs_regis_detail_no;
    console.log(trs_regis_detail_no);

    const dbRes = await this.trsRegisRepo.save(subItems);
    console.log('dbRes', dbRes);
    return await this.findOne(dbRes.id);
  }

  async update(id: number, updateRegisterDto: any): Promise<any> {
    console.log('updateRegisterDto', updateRegisterDto);
    let timeNow = now();
    let user = updateRegisterDto.request_by;
    let dataObj = updateRegisterDto;
    dataObj['update_by_id'] = user.id;
    delete dataObj.request_by;
    delete dataObj.id;
    dataObj['update_date'] = timeNow;
    dataObj['update_by'] = user.displayname;
    let finalItems = new trsRegis();

    Object.keys(dataObj).map((keys) => {
      finalItems[keys] = dataObj[keys] || null;
    });
    console.log('finalItems', finalItems);
    console.log('dataObj.trs_regis_detail_no', dataObj.trs_regis_detail_no);
    const trs_regis_detail_no = dataObj.trs_regis_detail_no.map(
      (rec: trsRegisDetail) => {
        let temDetail = new trsRegisDetail();

        Object.keys(rec).map((keys) => {
          temDetail[keys] = rec[keys] || null;
        });
        return temDetail;
        // regis_no: id
        // this.trsRegisDetailRepo.save({ ...d, regis_no: id })
      },
    );
    // delete dataObj.trs_regis_detail_no;
    finalItems.trs_regis_detail_no = trs_regis_detail_no;
    console.log(trs_regis_detail_no);
    const dbRes = await this.trsRegisRepo.save(finalItems);

    return await this.findOne(id);
  }

  async send(id: number, updateRegisterDto: any, query: any): Promise<any> {
    console.log('updateRegisterDto', updateRegisterDto);
    console.log('query', query);
    let timeNow = now();
    let user = updateRegisterDto.request_by;
    let dataObj = updateRegisterDto;
    // dataObj['update_by_id'] = user.id;
    if(query.type=="req")
   { dataObj['review_by_id'] = user.id;
    delete dataObj.request_by;
    delete dataObj.id;
    dataObj['review_date'] = timeNow;
    dataObj['review_by'] = user.displayname}
    else{
      dataObj['res_update_by_id'] = user.id;
    delete dataObj.request_by;
    delete dataObj.id;
    dataObj['res_update_date'] = timeNow;
    dataObj['res_update_by'] = user.displayname

    }

    const finalItems = dataObj;
    if (query.type == "req") {
      finalItems.trs_regis_statusform_no.id = 'review';
    }
    else{
      finalItems.trs_regis_statusform_no.id = 'res_review';
    }
   
    console.log('finalItems', finalItems);
    dataObj.trs_regis_detail_no.map((d: trsRegisDetail) =>
      this.trsRegisDetailRepo.save({ ...d, regis_no: id }),
    );

    delete dataObj.trs_regis_detail_no;
    const dbRes = await this.trsRegisRepo.update(id, finalItems);
    console.log('dbRes', dbRes);
    return await this.findOne(id);
  }

  async review(id: number, updateRegisterDto: any, query: any): Promise<any> {
    console.log('updateRegisterDto', updateRegisterDto);
    console.log('query', query);
    let timeNow = now();
    let user = updateRegisterDto.request_by;
    let dataObj = updateRegisterDto;
   
    const finalItems = dataObj;
    if (query.type == "req") {
      finalItems.trs_regis_statusform_no.id = 'pending_approve';
      dataObj['approve_by_id'] = user.id;
      delete dataObj.request_by;
      delete dataObj.id;
      dataObj['approve_date'] = timeNow;
      dataObj['approve_by'] = user.displayname;
    }
    else{
      finalItems.trs_regis_statusform_no.id = 'res_pending_approve';
      dataObj['res_review_by_id'] = user.id;
      delete dataObj.request_by;
      delete dataObj.id;
      dataObj['res_review_date'] = timeNow;
      dataObj['res_review_by'] = user.displayname;
    }
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
    // dataObj['update_by_id'] = user.id;
    delete dataObj.request_by;
    delete dataObj.id;
    // dataObj['update_date'] = timeNow;
    // dataObj['update_by'] = user.displayname;

    const finalItems = dataObj;
    if (query.type == "req") {
      finalItems.trs_regis_statusform_no.id = 'approved';
      dataObj['res_approve_by_id'] = user.id;
      delete dataObj.request_by;
      delete dataObj.id;
      dataObj['res_approve_date'] = timeNow;
      dataObj['res_approve_by'] = user.displayname;
    }
    else{
      finalItems.trs_regis_statusform_no.id = 'res_approved';
    }
    // console.log('query.typejaa', query.type);
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
    dataObj['delete_by_id'] = user.id;
    delete dataObj.request_by;
    delete dataObj.id;
    dataObj['delete_date'] = timeNow;
    dataObj['delete_by'] = user.displayname;
    const finalItems = dataObj;
    finalItems.is_active = 0;
    const dbRes = await this.trsRegisRepo.update(id, finalItems);
  }
}
