import { Injectable } from '@nestjs/common';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { RequestByDto } from '../../common/interfaces/requestBy.dto';
import {
  trsDriver,
  trsDriverLicenseList,
  trsDrivingLicenseType
} from '../../entities'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { find } from 'rxjs';
import { HttpException,HttpStatus } from '@nestjs/common';
import now from '../../utils/now';
import genPayload,{stamp,ACTIONTYPE,ForbiddenException} from 'src/utils/payload';
@Injectable()
export class DriverService {

  constructor(
    @InjectRepository(trsDriver, 'MSSQL_CONNECTION')
    private trsDriverRepo: Repository<trsDriver>,
    @InjectRepository(trsDriverLicenseList, 'MSSQL_CONNECTION')
    private trsDriverLicenseListRepo: Repository<trsDriverLicenseList>,
    @InjectRepository(trsDrivingLicenseType, 'MSSQL_CONNECTION')
    private trsDrivingLicenseTypeRepo: Repository<trsDrivingLicenseType>,
  ) {

  }

  async create(createDriverDto: any) {
    const actionType = ACTIONTYPE.CREATE
    let timeNow = now();
    let user = createDriverDto.request_by
    let dataObj = createDriverDto
    dataObj = stamp(dataObj, createDriverDto, actionType)
    const trs_driver_license_lists:trsDriverLicenseList[] = dataObj.trs_driver_license_lists.map(rec => {
      let tempDataObj = new trsDriverLicenseList()
      stamp(tempDataObj, createDriverDto, actionType)
      Object.keys(rec).map(keys => {
        tempDataObj[keys] = rec[keys] || null
      })
      tempDataObj.is_active=true

      return tempDataObj
    })
    delete dataObj.request_by
    const createObj = new trsDriver()
    Object.keys(createDriverDto).map(keys => {
      console.log(keys,'->',dataObj[keys])
      createObj[keys] = dataObj[keys] || null
    })
    createObj.is_active=true
    createObj.trs_driver_license_lists = trs_driver_license_lists
    const dbRes = await this.trsDriverRepo.save(createObj)
    return genPayload(dbRes,null,actionType)
  }

  async findAll() {
    return await this.trsDriverRepo.createQueryBuilder('d')
      .leftJoinAndSelect('d.trs_driver_license_lists', 'tdll', 'tdll.is_active = 1')
      .getMany()
  }

  async findAllLicense() {
    return await this.trsDrivingLicenseTypeRepo.find();
  }

  async findOne(id: number) {
    return await this.trsDriverRepo.createQueryBuilder('d')
    .leftJoinAndSelect('d.trs_driver_license_lists', 'tdll', 'tdll.is_active = 1')
    .where('d.id =:id', { id: id }).getOne()
  }

  async update(id: number, updateDriverDto: any) {
    if (!updateDriverDto?.id && !id)    throw new HttpException(`Driver id ${id} not found.`, HttpStatus.FORBIDDEN)
    const actionType = ACTIONTYPE.UPDATE
    let timeNow = now();
    let user = updateDriverDto.request_by
    let dataObj = updateDriverDto
    const stampedObject = dataObj.trs_driver_license_lists.map((rec) => {
      let tempDataObj = new trsDriverLicenseList()
      stamp(tempDataObj, updateDriverDto, actionType)
      Object.keys(rec).map(keys => {
        tempDataObj[keys] = rec[keys] || null
      })
      tempDataObj.is_active=true

      return tempDataObj
    })
    const updateObj = new trsDriver()
    console.log(dataObj)
    Object.keys(dataObj).map(keys => {
      updateObj[keys] = dataObj[keys] || null
    })
    updateObj.id = id
    updateObj.unit_code = dataObj.unit_code
    updateObj.trs_driver_license_lists = stampedObject

    const dbRes = await this.trsDriverRepo.save(updateObj)
    const data = await this.findOne(id)

    return genPayload(data,null,actionType);
  }




  async remove(id: number) {
    const actionType = ACTIONTYPE.DELETE
    await this.trsDriverRepo.update(id, {
      is_active: false
    });
    return genPayload({},null,actionType)
  }
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