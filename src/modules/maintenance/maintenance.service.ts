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
    const unit_no = body.request_by.units?.map((r: any) => `'${r.code}'`);
    return await this.trsVehicleRepo.query(`
    SELECT rm.ma_no
    ,rm.id
    ,rm.supply_item_name
    ,rm.supply_group_name
    ,rm.repair_type_id
    ,rm.supply_ma_period_name
    ,rm.ma_period_type_id
    ,(SELECT period_type FROM rep_ref_ma_period_type WHERE id = rm.ma_period_type_id) as period_type
    ,rm.appoint_start_date
    ,rm.appoint_end_date
    ,(SELECT repair_type FROM rep_ref_repair_type WHERE id = rm.repair_type_id) as repair_type
    ,rm.ma_start_date
    ,rm.ma_end_date
    ,rm.repair_status_id
    ,rrs.status_name
    ,rm.supply_item_id
    , sp.attribute1 as spec_attribute_1 --ขื่อคุณลักษณะ 1
    , spec_attribute_value_1 = (CASE WHEN sp.data_type_1_id  = 7 OR  sp.data_type_1_id  = 10 THEN (select smatd.type from slc_master_attribute_type_detail as smatd where smatd.id = sp.attribute_value_1 ) ELSE sp.attribute_value_1  END) --ค่าคุณลักษณะ 1
    , sp.attribute2 as spec_attribute_2 --ชื่อคุณลักษณะ 2
    , spec_attribute_value_2 = (CASE WHEN sp.data_type_2_id  = 7 OR  sp.data_type_2_id  = 10 THEN (select smatd.type from slc_master_attribute_type_detail as smatd where smatd.id = sp.attribute_value_2 )  ELSE sp.attribute_value_2  END) --ค่าคุณลักษณะ 2
    , si.attribute1 as item_attribute_1     --ชื่อหมายเลขเฉพาะ 1
    , item_attribute_value_1 = (CASE WHEN si.data_type_1_id = 7 OR  si.data_type_1_id  = 10 THEN (select smatd.type from slc_master_attribute_type_detail as smatd where smatd.id = si.attribute_value1 ) ELSE si.attribute_value1  END) --ค่าหมายเลขเฉพาะ 1
    , si.attribute2 as item_attribute_2     --ชื่อหมายเลขเฉพาะ 2
    , item_attribute_value_2 = (CASE WHEN si.data_type_2_id = 7 OR  si.data_type_2_id  = 10 THEN (select smatd.type from slc_master_attribute_type_detail as smatd where smatd.id = si.attribute_value2 ) ELSE si.attribute_value2 END) --ค่าหมายเลขเฉพาะ 2
 , sp.supply_group_id,
 rm.unit_no
FROM rep_maintenance rm
    LEFT JOIN slc_supply_item as si ON rm.supply_item_id = si.id
    LEFT JOIN rep_repair_status rrs ON rrs.id = rm.repair_status_id
    LEFT JOIN slc_supply_spec as sp ON rm.supply_spec_id = sp.id --อุปกรณ์ระดับ 3 spec
    LEFT JOIN slc_supply as s ON sp.supply_id = s.id --อุปกรณ์ระดับ 2
 --LEFT JOIN slc_toa as t on s.toa_id = t.id
    LEFT JOIN slc_supply_item_attribute ssia ON ssia.id = rm.supply_item_id
    LEFT JOIN slc_master_attribute_type_detail as matd ON matd.id = ssia.master_attribute_type_id --master ข้อมูล attribute item value
WHERE rm.is_active = 1 and rm.unit_no in (${unit_no})
 AND sp.supply_group_id =5 
ORDER BY rm.id DESC`);
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
