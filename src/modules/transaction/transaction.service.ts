// import { slcSupply } from './../../entities/SlcSupply.entity';
// import { trsTransaction } from './../../entities/TrsTransaction.entity';
import { Injectable } from '@nestjs/common';
import { CreatetransactionDto } from './dto/create-transaction.dto';
import { UpdatetransactionDto } from './dto/update-transaction.dto';
import { RequestByDto } from '../../common/interfaces/requestBy.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { find } from 'rxjs';
import { HttpException, HttpStatus } from '@nestjs/common';
import now from '../../utils/now';
import genPayload, {
  stamp,
  ACTIONTYPE,
  ForbiddenException,
} from 'src/utils/payload';
import { trsTransaction, slcSupply, slcSupplySpec } from '../../entities/Index';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(trsTransaction, 'MSSQL_CONNECTION')
    private trsTransactionRepo: Repository<trsTransaction>,
    @InjectRepository(slcSupply, 'MSSQL_CONNECTION')
    private trsSupplyRepo: Repository<slcSupply>,
    @InjectRepository(slcSupplySpec, 'MSSQL_CONNECTION')
    private trsSupplyspecRepo: Repository<slcSupplySpec>,
  ) {}

  // async create(createDriverDto: any) {
  //   console.log('createDriverDtoooooo', createDriverDto);
  //   const actionType = ACTIONTYPE.CREATE;
  //   let timeNow = now();
  //   let user = createDriverDto.request_by;
  //   let dataObj = createDriverDto;
  //   dataObj = stamp(dataObj, createDriverDto, actionType);
  //   const trs_driver_license_lists: trsDriverLicenseList[] =
  //     dataObj.trs_driver_license_lists?.map((rec) => {
  //       let tempDataObj = new trsDriverLicenseList();
  //       stamp(tempDataObj, createDriverDto, actionType);
  //       Object.keys(rec)?.map((keys) => {
  //         tempDataObj[keys] = rec[keys] || null;
  //       });
  //       tempDataObj.is_active = true;

  //       return tempDataObj;
  //     });
  //   delete dataObj.request_by;
  //   const createObj = new trsDriver();
  //   Object.keys(createDriverDto)?.map((keys) => {
  //     // console.log(keys,'->',dataObj[keys])
  //     createObj[keys] = dataObj[keys] || null;
  //   });
  //   createObj.is_active = true;
  //   createObj.trs_driver_license_lists = trs_driver_license_lists;
  //   const dbRes = await this.trsDriverRepo.save(createObj);
  //   return dbRes;
  // }

  async findAll(body: any) {
    // return await this.trsTransactionRepo
    //   .createQueryBuilder('d')
    //   .where(`d.status = 1`)
    //   .leftJoinAndSelect(
    //     'd.vehicle',
    //     'dv'
    //   )
    //   .leftJoinAndSelect(
    //     'dv.supply_item',
    //     'sii'
    //   )
    //   .leftJoinAndSelect(
    //     'sii.supply_spec',
    //     'ss'
    //   )
    //   .leftJoinAndSelect(
    //     'ss.supply',
    //     's'
    //   )
    //   .leftJoinAndSelect(
    //     's.toa',
    //     't',
    //   )
    //   .leftJoinAndSelect(
    //     'd.transaction_type',
    //     'tt'
    //   )
    //   .leftJoinAndSelect(
    //     't.supply_sub_type',
    //     'sst',
    //     'sst.id =9'
    //   )
    const unit_no = body.request_by.units?.map((r: any) => `'${r.code}'`);
    console.log(unit_no);
    if(unit_no?.includes('6360000000')){
      return await this.trsTransactionRepo.query(
        `select tt.*,ttt.name,ttt.name_en,ssiav.attribute_value as license,ssi.name as item,
  sss.name as spec,ss.supply_name as type,ss.id as typeid,ssi.unit_no as unit from dbo.trs_transaction tt 
  left join dbo.slc_supply_item ssi on tt.supply_item  = ssi.id 
  left join dbo.slc_supply_spec sss on ssi.supply_spec_id = sss.id 
  LEFT join dbo.slc_supply ss on ss.id = sss.supply_id 
  left join dbo.slc_toa st on st.id = ss.toa_id 
  left join dbo.slc_refs_supply_sub_type srsst on srsst.id = st.supply_sub_type_id 
  left join dbo.trs_transaction_type ttt on tt.transaction_type = ttt.id 
  left join dbo.slc_supply_item_attribute_value ssiav on ssiav.supply_item_id = ssi.id 
  left join dbo.slc_supply_item_attribute ssia on ssiav.supply_item_attribute_id = ssia.id 
  left join dbo.slc_refs_supply_sub_detail srssd on srssd.sub_type_id = srsst.id 
  left join slc_master_attribute_keyword smak on smak.id = ssia.attribute_keyword_id 
  where srssd.[key] = 1 and srsst.id = 9 and smak.id =21 and ssi.unit_no in  (${unit_no},'6360000000')
  and tt.renewal_date <= DATEADD(day,15,GETDATE()) and tt.status = 1`,
      );

    }
    else{
    return await this.trsTransactionRepo.query(
      `select tt.*,ttt.name,ttt.name_en,ssiav.attribute_value as license,ssi.name as item,
sss.name as spec,ss.supply_name as type,ss.id as typeid,ssi.unit_no as unit from dbo.trs_transaction tt 
left join dbo.slc_supply_item ssi on tt.supply_item  = ssi.id 
left join dbo.slc_supply_spec sss on ssi.supply_spec_id = sss.id 
LEFT join dbo.slc_supply ss on ss.id = sss.supply_id 
left join dbo.slc_toa st on st.id = ss.toa_id 
left join dbo.slc_refs_supply_sub_type srsst on srsst.id = st.supply_sub_type_id 
left join dbo.trs_transaction_type ttt on tt.transaction_type = ttt.id 
left join dbo.slc_supply_item_attribute_value ssiav on ssiav.supply_item_id = ssi.id 
left join dbo.slc_supply_item_attribute ssia on ssiav.supply_item_attribute_id = ssia.id 
left join dbo.slc_refs_supply_sub_detail srssd on srssd.sub_type_id = srsst.id 
left join slc_master_attribute_keyword smak on smak.id = ssia.attribute_keyword_id 
where srssd.[key] = 1 and srsst.id = 9 and smak.id =21 and ssi.unit_no in  (${unit_no})
and tt.renewal_date <= DATEADD(day,15,GETDATE()) and tt.status = 1`,
    
    );
    }
  }

  // .getMany();

  async findOptiontype() {
    return await this.trsSupplyRepo
      .createQueryBuilder('d')
      .where('d.is_active = 1')
      .getMany();
  }
  // async finoptiongen() {
  //   return await this.trsTransactionRepo
  //   .createQueryBuilder('d')
  //   .where('d.is_active = 1')
  //   .getMany();
  // }

  async findOne(id: number) {
    return await this.trsTransactionRepo
      .createQueryBuilder('d')
      .where('d.id =:id', { id: id })
      // .where('d.status = 1')
      .getOne();
  }

  async update(UpdatetransactionDto: any): Promise<any> {
    console.log('trsTransaction', UpdatetransactionDto);
    // console.log('query', query);
    let timeNow = now();
    let user = UpdatetransactionDto.request_by;
    let dataObj = UpdatetransactionDto;
    dataObj['update_by_id'] = user.id;
    delete dataObj.request_by;
    delete dataObj.id;
    dataObj['update_date'] = `${timeNow}`;
    dataObj['update_by'] = user.displayname;
    const finalItems = dataObj;

    console.log('finalItems', finalItems);
    const dbRes = await this.trsTransactionRepo.update(
      { id: In(finalItems.set) },
      {
        ...{
          renewal_date: finalItems.date,
          update_by_id: finalItems.update_by_id,
          update_by: finalItems.update_by,
          update_date: finalItems.update_date,
        },
      },
    );
    console.log('dbResssss', dbRes);
    return await this.trsTransactionRepo.find({
      where: { id: In(finalItems.set) },
    });
  }

  async updatestatus(UpdatetransactionDto: any): Promise<any> {
    console.log('trsTransaction', UpdatetransactionDto);
    // console.log('query', query);
    let timeNow = now();
    let user = UpdatetransactionDto.request_by;
    let dataObj = UpdatetransactionDto;
    dataObj['update_by_id'] = user.id;
    delete dataObj.request_by;
    delete dataObj.id;
    dataObj['update_date'] = `${timeNow}`;
    dataObj['update_by'] = user.displayname;
    const finalItems = dataObj;

    console.log('finalItems', finalItems);
    const dbRes = await this.trsTransactionRepo.update(
      { id: In(finalItems.set) },
      { transaction_status: finalItems.data },
    );
    console.log('dbResssss', dbRes);
    // return await this.trsTransactionRepo.find({where:{id : In(finalItems.set)}});
  }

  // async update(id: any, updateDriverDto: any) {
  //   console.log('updateDriverDtoUbdate', updateDriverDto);
  //   if (!updateDriverDto?.id && !id)
  //     throw new HttpException(
  //       `Driver id ${id} not found.`,
  //       HttpStatus.FORBIDDEN,
  //     );
  //   const actionType = ACTIONTYPE.UPDATE;
  //   let timeNow = now();
  //   let user = updateDriverDto.request_by;
  //   let dataObj = updateDriverDto;
  //   const stampedObject = dataObj.trs_driver_license_lists?.map((rec) => {
  //     let tempDataObj = new trsDriverLicenseList();
  //     let action = rec?.id ? ACTIONTYPE.UPDATE : ACTIONTYPE.CREATE;
  //     stamp(tempDataObj, updateDriverDto, action);
  //     Object.keys(rec).map((keys) => {
  //       tempDataObj[keys] = rec[keys] || null;
  //     });
  //     tempDataObj.is_active = true;

  //     return tempDataObj;
  //   });
  //   const updateObj = new trsDriver();
  //   console.log(dataObj);
  //   Object.keys(dataObj).map((keys) => {
  //     updateObj[keys] = dataObj[keys] || null;
  //   });
  //   updateObj.id = id;
  //   // updateObj.driver_id = id;
  //   updateObj.unit_code = dataObj.unit_code;
  //   updateObj.trs_driver_license_lists = stampedObject;

  //   const dbRes = await this.trsDriverRepo.save(updateObj);
  //   console.log('dbRes', dbRes);
  //   const data = await this.findOne(id);
  //   console.log('data', data);
  //   return dbRes;
  // }

  // async remove(id: number) {
  //   console.log('id', id);
  //   const actionType = ACTIONTYPE.DELETE;
  //   const db = await this.trsDriverRepo.update(id, {
  //     is_active: false,
  //   });
  //   console.log(db);
  //   return db;
  // }
}

// async update_x(id: number, updateDriverDto: any) {
//   console.log(updateDriverDto)
//   let templicenseIds = []
//   let timeNow = now();
//   let user = updateDriverDto.request_by
//   let dataObj = updateDriverDto
// dataObj = stamp(dataObj, updateDriverDto, 'create')

//   delete dataObj.request_by
//   // delete dataObj.id
//   const stampedObject = dataObj.trs_driver_license_lists.map(async (rec) => {
//     let dataObj = {
//       ...rec,
//       driver_id: id,
//       is_delete: false,
//       is_active: true
//     }
//     dataObj['create_by_id'] = user.id;
//     dataObj['create_by'] = user.displayname;
//     dataObj['create_date'] = timeNow;
//     dataObj['update_by_id'] = user.id;
//     dataObj['update_by'] = user.displayname;
//     dataObj['update_date'] = timeNow;
//     dataObj['is_delete'] = false
//     dataObj['is_active'] = true
//     const tempId = dataObj?.id
//     delete dataObj.id
//     // return dataObj
//     let dbRes: any = await (tempId ? this.trsDriverLicenseListRepo.update(tempId, dataObj) : this.trsDriverLicenseListRepo.insert({ ...dataObj, driver_id: id }))
//     templicenseIds.push(dbRes.id)
//     console.log(dbRes?.identifiers ? dbRes?.identifiers[0]?.id : tempId)
//     templicenseIds.push(dbRes?.identifiers ? dbRes?.identifiers[0]?.id : tempId)

//   })

//   // this.trsDriverLicenseListRepo.upsert(stampedObject,'id',)

//   // delete dataObj.trs_driver_license_lists
//   // console.log(stampedObject)
//   // const datas = new trsDriver()
//   // datas = {
//   //   ...dataObj,
//   //   trs_driver_license_lists:stampedObject
//   // }
//   // datas.id=id
//   // datas.unit_code
//   // datas.trs_driver_license_lists=stampedObject
//   // const dbRes = await this.trsDriverRepo.save(datas)
//   // console.log(dbRes)
//   const rawReturn = await this.findOne(id)

//   const toDelete = rawReturn.trs_driver_license_lists.filter(r => !templicenseIds.includes(r.id))

//   toDelete.map(async (rr) => {
//     await this.trsDriverLicenseListRepo.update(rr.id, { is_active: false })

//   })

//   return await this.findOne(id);
// }
