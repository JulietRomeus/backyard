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
import now from '../../utils/now';

@Injectable()
export class DriverService {

  constructor(
    @InjectRepository(trsDriver, 'MSSQL_CONNECTION')
    private trsDriverRepo : Repository<trsDriver>,
    @InjectRepository(trsDriverLicenseList, 'MSSQL_CONNECTION')
    private trsDriverLicenseListRepo : Repository<trsDriverLicenseList>,
    @InjectRepository(trsDrivingLicenseType, 'MSSQL_CONNECTION')
    private trsDrivingLicenseTypeRepo : Repository<trsDrivingLicenseType>,
  ){

  }

  async create(createDriverDto: any) {
    // console.log(createDriverDto)

    let timeNow = now();
    let user = createDriverDto.request_by
    let dataObj = createDriverDto
    dataObj['create_by_id'] = user.id;
    dataObj['create_by'] = user.displayname;
    dataObj['create_date'] = timeNow;
    dataObj['update_by_id'] = user.id;
    dataObj['update_by'] = user.displayname;
    dataObj['update_date'] = timeNow;
    // dataObj['is_delete'] = false
    dataObj['is_active'] = true

    delete dataObj.request_by

    const dbRes = await this.trsDriverRepo.insert(dataObj)
    const id = dbRes?.identifiers[0].id
    dataObj.trs_driver_license_lists.map(rec=>{
      let dataObj ={
        ...rec,
        driver_id:parseInt(id),
        // is_delete:false,
        is_active:true
      }
      dataObj['create_by_id'] = user.id;
      dataObj['create_by'] = user.displayname;
      dataObj['create_date'] = timeNow;
      dataObj['update_by_id'] = user.id;
      dataObj['update_by'] = user.displayname;
      dataObj['update_date'] = timeNow;
      dataObj['is_active'] = true
      this.trsDriverLicenseListRepo.insert(dataObj)

    })
    
    return await this.findOne(id);
  }

  async findAll() {
    return await this.trsDriverRepo.find({
      where:{
        // is_delete:false,
        is_active:true
      },
      relations:{
        trs_driver_license_lists:{
          license:true
        }
      }
    });
  }

  async findAllLicense() {
    return await this.trsDrivingLicenseTypeRepo.find();
  }

  async findOne(id: number) {
    return await this.trsDriverRepo.findOne({
      where:{
        id:id,
        // is_delete:false
        is_active:true
      },
      relations:{
        trs_driver_license_lists:{
          license:true
        }
      }
    })
  }

  async update(id: number, updateDriverDto: any) {
    console.log(updateDriverDto)


    let timeNow = now();
    let user = updateDriverDto.request_by
    let dataObj = updateDriverDto
    dataObj['create_by_id'] = user.id;
    dataObj['create_by'] = user.displayname;
    dataObj['create_date'] = timeNow;
    dataObj['update_by_id'] = user.id;
    dataObj['update_by'] = user.displayname;
    dataObj['update_date'] = timeNow;
    dataObj['is_delete'] = false

    delete dataObj.request_by
    
    const dbRes = await this.trsDriverRepo.update(id,dataObj)
    dataObj.trs_driver_license_lists.map(rec=>{
      let dataObj ={
        ...rec,
        driver_id:id,
        is_delete:false,
        is_active:true
      }
      dataObj['create_by_id'] = user.id;
      dataObj['create_by'] = user.displayname;
      dataObj['create_date'] = timeNow;
      dataObj['update_by_id'] = user.id;
      dataObj['update_by'] = user.displayname;
      dataObj['update_date'] = timeNow;
      dataObj['is_delete'] = false
      dataObj['is_active'] = true
      dataObj.id?this.trsDriverLicenseListRepo.update(dataObj.id,dataObj):this.trsDriverLicenseListRepo.insert(dataObj)

    })

    return `This action updates a #${id} driver`;
  }

  async remove(id: number) {
    return await this.trsDriverRepo.update(id,{
      is_delete:true
    });
  }
}
