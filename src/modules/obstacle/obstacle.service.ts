import { trsObstacle } from './../../entities';
import { Injectable } from '@nestjs/common';
import { CreateObstacleDto } from './dto/create-obstacle.dto';
import { UpdateObstacleDto } from './dto/update-obstacle.dto';
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
export class ObstacleService {

  constructor(
    @InjectRepository(trsObstacle, 'MSSQL_CONNECTION')
    private trsObstacleRepo: Repository<trsObstacle>,
    // @InjectRepository(trsObstacle, 'MSSQL_CONNECTION')
    // private trsObstacleby: Repository<trsDriverLicenseList>,
    // @InjectRepository(trsDrivingLicenseType, 'MSSQL_CONNECTION')
    // private trsDrivingLicenseTypeRepo: Repository<trsDrivingLicenseType>,
  ) {

  }

  async create(CreateObstacleDto: any) {
    console.log('CreateRegisterDto', CreateObstacleDto);
    let timeNow = now();
    let user = CreateObstacleDto.request_by;
    let dataObj = CreateObstacleDto;
    dataObj.create_by = CreateObstacleDto;
    // dataObj['create_by_id'] = user.id;
    dataObj['create_by'] = user.displayname;
    dataObj['create_date'] = timeNow;
    // dataObj['update_by_id'] = user.id;
    // dataObj['update_by'] = user.displayname;
    // dataObj['update_date'] = timeNow;
    console.log('dataObj',dataObj)
    const finalItems = this.trsObstacleRepo.create(dataObj);
    console.log('finalItems', finalItems);
    //------creatsubitem---------//
  
    const dbRes = await this.trsObstacleRepo?.save(finalItems);
    console.log('dbRes', dbRes);
    return dbRes
  }

  async findAlldis() {
    return await this.trsObstacleRepo.query('select * from Prevent_Disaster.dbo.obstacle where status=1')
  }

  async findAllj() {
    return await this.trsObstacleRepo.find({where:{is_active:true}});
  }

  async findOne(id: number) {
    console.log('id',id)
    return await this.trsObstacleRepo.createQueryBuilder('d')
    .where('d.id =:id', { id: id })
    .getOne()
  }

  async update(id: number, UpdateObstacleDto: any): Promise<any> {
    console.log('updateRegisterDto', UpdateObstacleDto);
    // console.log('query', query);
    let timeNow = now();
    let user = UpdateObstacleDto.request_by;
    let dataObj = UpdateObstacleDto;
    // dataObj['update_by_id'] = user.id;
    delete dataObj.request_by;
    delete dataObj.id;
    // dataObj['update_date'] = timeNow;
    // dataObj['update_by'] = user.displayname;
    const finalItems = dataObj;
    console.log('finalItems', finalItems);

    const dbRes = await this.trsObstacleRepo.update(id, finalItems);
    console.log('dbRes', dbRes);
    return await this.findOne(id);
  }




  async remove(id: number) {
    const actionType = ACTIONTYPE.DELETE
    await this.trsObstacleRepo.update(id, {
      is_active: false
    });
    return genPayload({},null,actionType)
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