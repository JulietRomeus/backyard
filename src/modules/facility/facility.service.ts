
import { trsFacility } from '../../entities'
import { Injectable } from '@nestjs/common';
import { CreateFacilityDto } from './dto/create-facility.dto';
import { UpdateFacilityDto } from './dto/update-facility.dto';
import { RequestByDto } from '../../common/interfaces/requestBy.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { find } from 'rxjs';
import { HttpException,HttpStatus } from '@nestjs/common';
import now from '../../utils/now';
import genPayload,{stamp,ACTIONTYPE,ForbiddenException} from 'src/utils/payload';
import { HttpService } from '@nestjs/axios';
@Injectable()
export class FacilityService {

  constructor(
    @InjectRepository(trsFacility, 'MSSQL_CONNECTION')
    private trsFacilityRepo: Repository<trsFacility>,
  ) {

  }
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
  
    const dbRes = await this.trsFacilityRepo.save(finalItems);
    console.log('dbRes', dbRes);
    return dbRes
  }


  async findAll() {
    return await this.trsFacilityRepo.find({where:{is_active:true}});
  }


  async findOne(id: any) {
    return await this.trsFacilityRepo.createQueryBuilder('d')
    .where('d.id =:id', { id: id }).getOne()
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
  console.log(dbRes)
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