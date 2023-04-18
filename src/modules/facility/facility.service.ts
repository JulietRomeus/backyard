import { trsFacility } from '../../entities/Index';
import { Injectable } from '@nestjs/common';
import { CreateFacilityDto } from './dto/create-facility.dto';
import { UpdateFacilityDto } from './dto/update-facility.dto';
import { RequestByDto } from '../../common/interfaces/requestBy.dto';
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
import { HttpService } from '@nestjs/axios';
@Injectable()
export class FacilityService {
  constructor(
    @InjectRepository(trsFacility, 'MSSQL_CONNECTION')
    private trsFacilityRepo: Repository<trsFacility>,
  ) {}
  async create(CreateFacilityDto: any) {
    console.log('CreateRegisterDto', CreateFacilityDto);
    let timeNow = now();
    let user = CreateFacilityDto.request_by;
    let dataObj = CreateFacilityDto;
    dataObj.create_by = CreateFacilityDto;
    dataObj['create_by_id'] = user.id;
    dataObj['create_by'] = user.displayname;
    dataObj['create_date'] = timeNow;
    dataObj['update_by_id'] = user.id;
    dataObj['update_by'] = user.displayname;
    dataObj['update_date'] = timeNow;
    const finalItems = this.trsFacilityRepo.create(dataObj);
    console.log('finalItems', finalItems);
    //------creatsubitem---------//

    const dbRes = await this.trsFacilityRepo?.save(finalItems);
    console.log('dbRes', dbRes);
    return dbRes;
  }

  async findAll() {
    return await this.trsFacilityRepo.find({ where: { is_active: true } });
  }


  async facility() {
    return await this.trsFacilityRepo.query(
      `select mrs.id as station_id,mra.resource_attribute_name,mrav.value as facility_name,mrs.loc_x as long,mrs.loc_y as lat,mrs.province ,
      mrs.amphoe ,mrs.tambon ,mrt.group_name ,mrt.type_name_th as facility_type_name  ,mrt.id as facility_type from mob_resource_attribute mra 
      left join mob_resource_attribute_value mrav on mra.id = mrav.resource_attribute_id 
      left join mob_resource_station mrs on mrs.id = mrav.resource_station_id 
      left join mob_resource_type mrt on mrt.id = mrs.resource_type_id 
      where mra.id  in(3,13,42,45,63,84,108,136,147,192,237,282,327,372,395,420,
      447,449,469,475,488,500,506,509,517,518,521,522,554,557,577,585,587,599,613,618,636,637,659,710,718,727,813,828,875,879,914,919,930,949,960,985
      )`
    )
  } 

  async option() {
    return await this.trsFacilityRepo.query(
      `select mrt.id as id,mrt.type_name_th ,mrt.group_name from mob_resource_type mrt
      where id in (1,5,6,8,12,13,14,15,17,19,21,22,23,24,25,28,29,31,40,42,43,45,49,50,51,52,53,57,58,60,62,63)`
    )
  }

  async findOne(id: any) {
    return await this.trsFacilityRepo
      .createQueryBuilder('d')
      .where('d.id =:id', { id: id })
      .getOne();
  }

  async update(id: number, UpdateFacilityDto: any): Promise<any> {
    console.log('updateRegisterDto', UpdateFacilityDto);
    // console.log('query', query);
    let timeNow = now();
    let user = UpdateFacilityDto.request_by;
    let dataObj = UpdateFacilityDto;
    // dataObj['update_by_id'] = user.id;
    delete dataObj.request_by;
    delete dataObj.id;
    dataObj['update_date'] = timeNow;
    dataObj['update_by'] = user.displayname;
    const finalItems = dataObj;
    console.log('finalItems', finalItems);

    const dbRes = await this.trsFacilityRepo.update(id, finalItems);
    console.log('dbRes', dbRes);
    return await this.findOne(id);
  }

  async remove(id: number, UpdateFacilityDto: any, query: any): Promise<any> {
    console.log('updateRegisterDto', UpdateFacilityDto);
    let timeNow = now();
    let user = UpdateFacilityDto.request_by;
    let dataObj = UpdateFacilityDto;
    dataObj['update_by_id'] = user.id;
    delete dataObj.request_by;
    delete dataObj.id;
    dataObj['update_date'] = timeNow;
    dataObj['update_by'] = user.displayname;
    const finalItems = dataObj;
    finalItems.is_active = 0;
    const dbRes = await this.trsFacilityRepo.update(id, finalItems);
    console.log(dbRes);
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
}
