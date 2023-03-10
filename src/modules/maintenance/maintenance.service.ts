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

  async findAll() {
    return await this.trsVehicleRepo.query('select supply_group_id ,rm.unit_no,supply_group_name , rrrm.repair_methode,ssiav.attribute_value as license ,supply_item_name,rm.supply_item_id as item,rrmpt.period_type,ma_start_date ,ma_end_date,item_status,rm.update_by_id ,rm.update_by ,rm.update_date ,rm.create_by_id ,rm.create_by ,rm.create_date ,rm.delete_by_id, rm.delete_by ,rm.delete_date  from rep_maintenance rm left join dbo.rep_ref_repair_method rrrm ON repair_method_id = rrrm.id left join dbo.rep_ref_ma_period_type rrmpt on rrmpt.id = rm.supply_ma_period_id left join dbo.slc_refs_supply_group srsg on srsg.id = rm.supply_group_id left join dbo.slc_supply_item ssi  on ssi.id  = rm.supply_item_id left join dbo.slc_supply_item_attribute_value ssiav on ssiav.supply_item_id = ssi.id where srsg.id = 5'
    )
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
