import { Request } from 'express';
import { Injectable, Query } from '@nestjs/common';
import { CreateMaintenanceDto } from './dto/create-maintenance.dto';
import { UpdateMaintenanceDto } from './dto/update-maintenance.dto';
import { RequestByDto } from '../../common/interfaces/requestBy.dto';
import { trsVehicle } from '../../entities/Index';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { find } from 'rxjs';
import { HttpException, HttpStatus } from '@nestjs/common';
import now from '../../utils/now';
import genPayload, {
  stamp,
  ACTIONTYPE,
  ForbiddenException,
} from 'src/utils/payload';
@Injectable()
export class MaintenanceService {
  constructor(
    @InjectRepository(trsVehicle, 'MSSQL_CONNECTION')
    private trsVehicleRepo: Repository<trsVehicle>,
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
    console.log(
      'body',
      body.request_by.units?.map((r: any) => r.code),
    );
    const unit_no = body.request_by.units?.map((r: any) => r.code);
    return await this.trsVehicleRepo.query(`
    select rm.*,ss.supply_name as supply , ss.id as supply_id ,sss.name as spec,rrrm.repair_methode ,rrmpt.period_type ,srsg.group_name
,rrs.status_name as status_name, rrs.id as status_id
from rep_maintenance rm 
left join dbo.rep_repair_status rrs on rrs.id = rm.repair_status_id 
left join dbo.rep_ref_repair_method rrrm ON repair_method_id = rrrm.id 
left join dbo.rep_ref_ma_period_type rrmpt on rrmpt.id = rm.supply_ma_period_id 
left join dbo.slc_refs_supply_group srsg on srsg.id = rm.supply_group_id 
left join dbo.slc_supply_item ssi  on ssi.id  = rm.supply_item_id 
left join slc_supply_item_attribute_value ssiav on ssiav.supply_item_id = ssi.id 
left join slc_supply_item_attribute ssia on ssia.id = ssiav.supply_item_attribute_id 
left join slc_master_attribute_keyword smak on smak.id = ssia.attribute_keyword_id 
left join slc_supply_spec sss on sss.id = ssi.supply_spec_id 
left join slc_supply ss on ss.id = sss.supply_id 
left join slc_toa st on ss.toa_id = st.id 
left join slc_refs_supply_sub_type srsst on srsst.id = st.supply_sub_type_id 
left join slc_refs_supply_sub_detail srssd on srssd.sub_type_id = srsst.id 
where srsg.id = 5 and srssd.[key] =1 and rm.is_active =1 and ssi.is_active =1 
and sss.is_active =1 and rrrm.is_active =1 and rrmpt.is_active =1 and srsg.is_active =1 and ssiav.is_active =1
and ssia.is_active =1 and smak.is_active =1 and ss.is_active =1 and srsst.is_active =1 and srssd.is_active =1
and ma_unit_no in (${unit_no})`);
  }

  // async findAllLicense() {
  //   return await this.trsDrivingLicenseTypeRepo.find();
  // }

  // async findOne(id: number) {
  //   return await this.trsVehicleRepo
  //     .createQueryBuilder('d')
  //     .where('d.id =:id', { id: id })

  //     .getOne();
  // }

  // async update(id: number, UpdatetrsVehicleDto: any): Promise<any> {
  //   console.log('updateRegisterDto', UpdatetrsVehicleDto);
  //   // console.log('query', query);
  //   let timeNow = now();
  //   let user = UpdatetrsVehicleDto.request_by;
  //   let dataObj = UpdatetrsVehicleDto;
  //   // dataObj['update_by_id'] = user.id;
  //   delete dataObj.request_by;
  //   delete dataObj.id;
  //   // dataObj['update_date'] = timeNow;
  //   // dataObj['update_by'] = user.displayname;
  //   const finalItems = dataObj;
  //   console.log('finalItems', finalItems);

  //   const dbRes = await this.trsVehicleRepo.update(id, finalItems);
  //   console.log('dbRes', dbRes);
  //   return await this.findOne(id);
  // }

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
