import { Roles } from './../../decorators/roles.decorator';
import { Role } from './../../entities/role.entity';
import { format, parse } from 'date-fns';
import { Injectable } from '@nestjs/common';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { RequestByDto } from '../../common/interfaces/requestBy.dto';
import {
  trsDriver,
  trsDriverLicenseList,
  trsDrivingLicenseType,
  trsDriverTemplate
} from '../../entities/Index';
import { User } from './../../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { find, firstValueFrom } from 'rxjs';
import { HttpException, HttpStatus } from '@nestjs/common';
import now from '../../utils/now';
import genPayload, {
  stamp,
  ACTIONTYPE,
  ForbiddenException,
} from 'src/utils/payload';
import { trsActivityVehicleDriver } from '../../entities/Index';
import { Unit } from 'src/entities/unit.entity';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class DriverService {
  constructor(
    @InjectRepository(trsDriver, 'MSSQL_CONNECTION')
    private trsDriverRepo: Repository<trsDriver>,
    @InjectRepository(trsDriverLicenseList, 'MSSQL_CONNECTION')
    private trsDriverLicenseListRepo: Repository<trsDriverLicenseList>,
    @InjectRepository(trsDrivingLicenseType, 'MSSQL_CONNECTION')
    private trsDrivingLicenseTypeRepo: Repository<trsDrivingLicenseType>,
    @InjectRepository(User, 'PROGRESS')
    private userRepo: Repository<User>,
    @InjectRepository(trsDriverTemplate, 'MSSQL_CONNECTION')
    private templateRepo: Repository<trsDriverTemplate>,
    @InjectRepository(trsActivityVehicleDriver, 'MSSQL_CONNECTION')
    private trsActivityVehicleDriverRepo: Repository<trsDriverTemplate>,
    @InjectRepository(Unit, 'PROGRESS')
    private UnitRepo: Repository<Unit>,
    @InjectRepository(Role,'PROGRESS')
    private roleRepo:Repository<Role>,
    private readonly httpService: HttpService,
    private readonly configService:ConfigService


  ) { }

  async create(createDriverDto: any) {
    // console.log('createDriverDtoooooo', createDriverDto);
    const actionType = ACTIONTYPE.CREATE;
    let timeNow = now();
    let user = createDriverDto.request_by;
    let dataObj = createDriverDto;
    dataObj = stamp(dataObj, createDriverDto, actionType);
    const trs_driver_license_lists: trsDriverLicenseList[] =
      dataObj.trs_driver_license_lists?.map((rec) => {
        let tempDataObj = new trsDriverLicenseList();
        stamp(tempDataObj, createDriverDto, actionType);
        Object.keys(rec)?.map((keys) => {
          tempDataObj[keys] = rec[keys] || null;
        });
        tempDataObj.is_active = true;

        return tempDataObj;
      });
    delete dataObj.request_by;
    const createObj = new trsDriver();
    Object.keys(createDriverDto)?.map((keys) => {
      // console.log(keys,'->',dataObj[keys])
      createObj[keys] = dataObj[keys] || null;
    });
    createObj.is_active = true;
    if (trs_driver_license_lists) createObj.trs_driver_license_lists = trs_driver_license_lists;
    // console.log('createObj',createObj)
    const dbRes = await this.trsDriverRepo.save(createObj);
    return dbRes;
  }

  async findAll(body: any) {
    // console.log('body', body);
    const unit_no = body.request_by.units?.map((r: any) => `'${r.code}'`);
    // console.log(unit_no);
    let data = await this.trsDriverRepo
      .createQueryBuilder('d')
      .where(`d.is_active = 1 and d.unit_no in (${unit_no})`)
      .leftJoinAndSelect(
        'd.trs_driver_license_lists',
        'tdll',
        'tdll.is_active = 1',
      )
      .leftJoinAndSelect('d.driver_status', 'tds')
      .leftJoin('d.trs_activity_vehicle_drivers', 'tavs')
      .addSelect('tavs.id')
      .leftJoin('tavs.activity', 'tavsa', 'tavsa.is_delete =0')
      .addSelect('tavsa.id')
      .addSelect('tavsa.activity_start_date')
      .addSelect('tavsa.activity_end_date')
      // .getQuery();
      .getMany();
    const finalItem = data.map(rec => ({
      ...rec,
      is_busy: rec.trs_activity_vehicle_drivers.some(r => r?.activity?.is_inprogress) || false
    }))
    return finalItem
  }


  async findBusy(body) {

    return await this
      .trsActivityVehicleDriverRepo.createQueryBuilder('atd')
      .leftJoinAndSelect('atd.activity', 'a', 'a.is_delete = 0')
      .leftJoinAndSelect('atd.driver', 'd', 'd.is_active = 1')

      .getMany();
  }


  async findAllLicense() {
    return await this.trsDrivingLicenseTypeRepo.find();
  }

  async user() {
    return await this.userRepo
      .createQueryBuilder('d')
      .where('d.status=1')
      .leftJoinAndSelect(
        'd.roles',
        'r',
        // 'r.name = "driver"'
      )
      // .where('r.name = :dri', { dri: 'driver' })
      .leftJoinAndSelect('d.units', 'u')

      .getMany();
  }

  async userbyid(id: number) {
    return await this.userRepo
      .createQueryBuilder('d')
      .where('d.status = 1')
      .leftJoinAndSelect(
        'd.roles',
        'r',
        // 'r.name = "driver"'
      )
      .where('d.id =:id', { id: id })
      .leftJoinAndSelect('d.units', 'u')

      .getOne();
  }

  async useremail(body: any) {
    const user = await this.user();
    const driver = await this.findAll(body);

    const filter = user.filter(function (r) {
      return (
        driver.filter(function (rr) {
          return rr.driver_id == r.id;
        }).length == 0
      );
    });
    return filter;
    // console.log(filter)
    // console.log(user,driver)
  }

  async findOne(id: any) {
    console.log(id);
    const data = await this.trsDriverRepo
      .createQueryBuilder('d')
      .leftJoinAndSelect(
        'd.trs_driver_license_lists',
        'tdll',
        'tdll.is_active = 1',
      )
      .where('d.id =:id', { id: id })
      .leftJoinAndSelect('d.driver_status', 'tds')
      .leftJoin('d.trs_activity_vehicle_drivers', 'tavs')
      .addSelect('tavs.id')
      .leftJoin('tavs.activity', 'tavsa', 'tavsa.is_active =1')
      .addSelect('tavsa.id')
      .addSelect('tavsa.activity_start_date')
      .addSelect('tavsa.activity_end_date')
      // .getQuery();
      .getOne();
    let finalItem: any = data
    finalItem.is_busy = data?.trs_activity_vehicle_drivers?.some(r => r?.activity?.is_inprogress) || false


    return data
  }

  async update(id: any, updateDriverDto: any) {
    console.log('updateDriverDtoUbdate', updateDriverDto);
    if (!updateDriverDto?.id && !id)
      throw new HttpException(
        `Driver id ${id} not found.`,
        HttpStatus.FORBIDDEN,
      );
    const actionType = ACTIONTYPE.UPDATE;
    let timeNow = now();
    let user = updateDriverDto.request_by;
    let dataObj = updateDriverDto;
    const stampedObject = dataObj.trs_driver_license_lists?.map((rec) => {
      let tempDataObj = new trsDriverLicenseList();
      let action = rec?.id ? ACTIONTYPE.UPDATE : ACTIONTYPE.CREATE;
      stamp(tempDataObj, updateDriverDto, action);
      Object.keys(rec).map((keys) => {
        tempDataObj[keys] = rec[keys] || null;
      });
      tempDataObj.is_active = true;

      return tempDataObj;
    });
    const updateObj = new trsDriver();
    console.log(dataObj);
    Object.keys(dataObj).map((keys) => {
      updateObj[keys] = dataObj[keys] || null;
    });
    updateObj.id = id;
    // updateObj.driver_id = id;
    updateObj.unit_code = dataObj.unit_code;
    updateObj.trs_driver_license_lists = stampedObject;

    const dbRes = await this.trsDriverRepo.save(updateObj);
    console.log('dbRes', dbRes);
    // const data = await this.findOne(id);
    // console.log('data', data);
    return dbRes;
  }

  async remove(id: number) {
    console.log('id', id);
    const actionType = ACTIONTYPE.DELETE;
    const db = await this.trsDriverRepo.update(id, {
      is_active: false,
    });
    console.log(db);
    return db;
  }

  async getTemplate() {
    return await this.templateRepo.find({ where: { is_active: true } })
  }


  async importDriver(req,body) {
    const formatString = 'ddMMyyyy';
    const unitOption = await this.UnitRepo.find()
    const dirverId = this.configService.get('DRIVER_ROLE_ID')
    // console.log(req?.headers?.authorization)

    const object = body.data.map(async (rec) => {

      rec.request_by = body.request_by
      rec.id_card = String(rec?.id_card)
      rec.unit_no = String(rec?.unit_no)
      // rec.unit_code = String(rec?.unit_no)

      // delete rec?.unit_no
      rec.driver_name = rec.firstname + ' ' + rec.lastname

      let user:any = {}
      let haveUser = false
      if (rec?.id_card){
        user = await this.userRepo.findOne({
          where:{
            // status:1,
            idCard:rec?.id_card
          },
          relations:['roles']
        })

      }

      // .createQueryBuilder('us')
      // .where(`us.idCard is not null and us.idCard = ${rec?.idp}`).getOne()


      if (user?.id && rec?.id_card ) haveUser = true
      // console.log('have user')

      console.log('user',user,rec?.id_card)

      //if user already exists
      if (haveUser) {
        console.log('update user')

        // add driver id to user
        rec.driver_id = user.id
        user.activeUnit = unitOption.find(r=>r.code===rec.unit_no)
        user.status=1
        const driverRole = new Role()
        driverRole.id = dirverId
        user.roles.push(driverRole)
        this.userRepo.save(user)
        // add role driver to user
        // 41f9b763-6d79-4927-98ee-f2abb37f99b5
        //set user's active unit
        // const res = await this.userRepo.save(user)

      }
      else if (rec?.email){
        console.log('create user with email',rec?.email)
        
        //create user
        let cUser = new User()
        // let unit = new Unit()
        let tempUnit = unitOption.find(r=>r.code===rec.unit_no)
        cUser.activeUnit = this.UnitRepo.create({...tempUnit})
        cUser.units = this.UnitRepo.create([tempUnit])
        cUser.username = rec.email
        cUser.email = rec.email
        cUser.firstname = rec?.firstname  || ''
        cUser.lastname = rec?.lastname  || ''
        cUser.status = 1
        cUser.password = '$2b$10$KSa3KWogEEbDTV0Nh5OlmuTtjz.VivJ.Ls5F03PQqb5.44d4Gc.Yy'
        cUser.idCard = rec.id_card
        // cUser.id = user.id
        const driverRole = new Role()
        driverRole.id = dirverId
        cUser.roles = [driverRole]
        console.log('cUser',cUser)

        const res = await this.userRepo.save(cUser)
        rec.driver_id = res.id
        // let res = await firstValueFrom(this.httpService.post(`/user`,user))
        console.log(res)
        //
      }
      else{
        console.log('no email provided')
      }


      const tempLicense = []


      if (typeof rec?.license_type_id1 == 'number') tempLicense.push({
        license_id: parseInt(rec?.license_type_id1),
        ...(rec?.license_issue_date1 ? { issue_date: parse(rec?.license_issue_date1, formatString, new Date()) } : {}),
        ...(rec?.license_expire_date1 ? { expire_date: parse(rec?.license_expire_date1, formatString, new Date()) } : {})

      })
      if (typeof rec?.license_type_id2 == 'number') tempLicense.push({
        license_id: parseInt(rec?.license_type_id2),
        ...(rec?.license_issue_date2 ? { issue_date: parse(rec?.license_issue_date2, formatString, new Date()) } : {}),
        ...(rec?.license_expire_date2 ? { expire_date: parse(rec?.license_expire_date2, formatString, new Date()) } : {})
      })

      rec.trs_driver_license_lists = tempLicense
      await this.create(rec)
      return rec
    })

    return object
    //Check account by idp
    //case 1 Create account as Driver and unactiveUnit as unit
    //case 2 add driver role,update licens,add activeUnit, unit,person_no, default pw 1234, ignore Email
    // return await this.templateRepo.find({ where:{is_active:true}})
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
