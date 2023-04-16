import { Injectable } from '@nestjs/common';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { RequestActivityDto } from './dto/request-activity.dto';
import { DeleteActivityDto } from './dto/delete-activity.dto';
import { UpdateMissionDto } from './dto/update-mission.dto';

import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import now from '../../utils/now';
import { RequestByDto } from '../../common/interfaces/requestBy.dto';
import {
  trsActivity,
  trsActivityType,
  trsVehicleType,
  trsVehicleStatus,
  trsDriver,
  trsVehicle,
} from '../../entities/Index';
import { Repository, Brackets, Not } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  mapDirectusFieldsToTypeORM,
  mapDirectusQueryToTypeORM,
  genMultiRelations,
  mapGraph,
} from 'src/utils/genQuery';
const mainDriverFields = `vehicle_driver.vehicle.main_driver.id,vehicle_driver.vehicle.main_driver.driver_id,vehicle_driver.vehicle.main_driver.driver_name`;
const vehicleFields = `vehicle_driver.vehicle.id,vehicle_driver.vehicle.vehicle_type,vehicle_driver.vehicle.is_available,vehicle_driver.vehicle.license_plate,${mainDriverFields}`;
const driverFields = `vehicle_driver.driver.id,vehicle_driver.driver.driver_id,vehicle_driver.driver.driver_name,vehicle_driver.driver.driver_license,vehicle_driver.driver.firstname,vehicle_driver.driver.lastname`;
const vehicleDriverFields = `vehicle_driver.unit_code,vehicle_driver.unit_name,vehicle_driver.controller,${vehicleFields},${driverFields}`;

const convoyMainDriverFields = `convoy.vehicle_driver.vehicle.main_driver.id,convoy.vehicle_driver.vehicle.main_driver.driver_id,convoy.vehicle_driver.vehicle.main_driver.driver_name`;
const convoyVehicleFields = `convoy.vehicle_driver.vehicle.id,convoy.vehicle_driver.vehicle.vehicle_type,convoy.vehicle_driver.vehicle.is_available,convoy.vehicle_driver.vehicle.license_plate,${convoyMainDriverFields}`;
const convoyDriverFields = `convoy.vehicle_driver.driver.id,convoy.vehicle_driver.driver.driver_id,convoy.vehicle_driver.driver.driver_name,convoy.vehicle_driver.driver.driver_license`;
const convoyVehicleDriverFields = `convoy.vehicle_driver.id,convoy.vehicle_driver.controller,convoy.vehicle_driver.oil_type,convoy.vehicle_driver.oil_coupon,convoy.vehicle_driver.vehicle_license,convoy.vehicle_driver.vehicle_item_id,${convoyVehicleFields},${convoyDriverFields}`;

const unitResFields = `unit_response.status.*`;
const formFields = `*.*,${vehicleDriverFields},${convoyVehicleDriverFields},files.files.*,files.files.directus_files_id.*,convoy.route.*,${unitResFields}`;
const listFields = `*,route.*,convoy.*.*,activity_status.id,activity_status.name,activity_status.color,activity_type.id,activity_type.name`;

@Injectable()
export class ActivityService {
  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(trsActivity, 'MSSQL_CONNECTION')
    private trsActivityRepo: Repository<trsActivity>,
    @InjectRepository(trsActivityType, 'MSSQL_CONNECTION')
    private trsActivityTypeRepo: Repository<trsActivityType>,
    @InjectRepository(trsVehicleType, 'MSSQL_CONNECTION')
    private trsVehicleTypeRepo: Repository<trsVehicleType>,
    @InjectRepository(trsVehicleStatus, 'MSSQL_CONNECTION')
    private trsVehicleStatusRepo: Repository<trsVehicleStatus>,
    @InjectRepository(trsDriver, 'MSSQL_CONNECTION')
    private trsDriverRepo: Repository<trsDriver>,
    @InjectRepository(trsVehicle, 'MSSQL_CONNECTION')
    private trsVehicleRepo: Repository<trsVehicle>,
  ) {}

  async findAll(body: any, query: any) {
    // console.log('body', body?.request_by || '');
    // console.log('query', query);
    let filterObj = {
      is_delete: { _neq: true }, // filter ข้อมูลที่ยังไม่ถูกลบ
      is_test: { _neq: true }, // filter ข้อมูลที่ยังไม่ใช่ข้อมูลทดสอบ
      //   { roles: { role_id: { id: { _in: rolesIdArr } } } },
    };

    if (query.type === 'res') {
      // รายการตอบรับ
      // console.log('res');
      // filter ในฐานะผู้ตอบรับคำขอ
      filterObj['action_type'] = { _eq: 'request' };
      // filter exclude
      filterObj['_and'] = [
        { activity_status: { _neq: 'draft' } },
        { activity_status: { _neq: 'req_edit' } },
        { activity_status: { _neq: 'pending_req_review' } },
        { activity_status: { _neq: 'pending_req_approve' } },
      ];
    } else if (query.type === 'cmd') {
      // รายการสั่งการ
      // console.log('cmd');
      // filter คำสั่งการ
      filterObj['action_type'] = { _eq: 'command' };
      //  filter status ไม่ใช่ draft หรือ draft status ที่ผู้เรียกเป็นผู้สร้างฟอร์ม และ action type = command
      filterObj['_or'] = [
        { activity_status: { _neq: 'draft' } },
        {
          _and: [
            { activity_status: { _eq: 'draft' } },
            { action_type: { _eq: 'command' } },
            { req_create_by: body?.request_by?.id || '' },
          ],
        },
      ];
    } else {
      // รายการร้องขอ
      // console.log('req');
      //  filter status ไม่ใช่ draft หรือ draft status ที่ผู้เรียกเป็นผู้สร้างฟอร์ม และ action type = request
      filterObj['action_type'] = { _eq: 'request' };
      filterObj['_or'] = [
        { activity_status: { _neq: 'draft' } },
        {
          _and: [
            { activity_status: { _eq: 'draft' } },
            { action_type: { _eq: 'request' } },
            { req_create_by: body?.request_by?.id || '' },
          ],
        },
      ];
    }
    // filter type = res(ตอบรับ) ให้ unit_response_code = unit ของ user หรือ unit_request_code = unit ของ user
    filterObj[
      query.type === 'res' ? 'unit_response_code' : 'unit_request_code'
    ] = {
      _eq:
        body?.request_by?.activeUnit?.code ||
        body?.request_by?.units[0]?.code ||
        '',
    };
    // console.log('filterObj', filterObj);
    const filterString = JSON.stringify(filterObj);
    const getQuery = `trs_activity?filter=${filterString}&fields=${listFields}&sort=-req_create_date`;
    try {
      const result = await firstValueFrom(
        this.httpService.get(`/items/${getQuery}`),
      );
      // console.log(result.data);
      return result?.data?.data || [];
    } catch (error) {
      console.log('error get menupage');
      return [];
    }
  }

  async findAllORM(body: any, query: any) {
    const actionTypeDict = {
      req: 'requests',
      cmd: 'command',
    };

    let queryBuilder = this.trsActivityRepo
      .createQueryBuilder('ta')
      .leftJoinAndSelect('ta.route', 'route')
      .leftJoinAndSelect('ta.convoy', 'convoy')
      .leftJoinAndSelect('ta.unit_response', 'unit_response')
      .leftJoinAndSelect('ta.vehicle_driver', 'vehicle_driver')
      .leftJoinAndSelect('ta.activity_type', 'activity_type')
      .leftJoinAndSelect('ta.files', 'files')
      .leftJoinAndSelect('ta.activity_status', 'activity_status')
      //Must select primary key!
      // .select(['ta.id','ta.comment','activity_status.color'])
      .where('ta.is_test != :is_test', { is_test: true })
      .andWhere('ta.is_delete != :is_delete', { is_delete: true })
      .andWhere('ta.activity_type = :activity_type', { activity_type: 1 })
      .andWhere(`ta.action_type = :action_type`, {
        action_type: query.type === 'cmd' ? 'command' : 'request',
      });

    if (query.type === 'res') {
      // รายการตอบรับ
      console.log('res');
      // filter ในฐานะผู้ตอบรับคำขอ
      // filterObj['action_type'] = { _eq: 'request' };
      // filter exclude
      queryBuilder = queryBuilder
        .andWhere('ta.activity_status != :draft', { draft: 'draft' })
        .andWhere('ta.activity_status != :req_edit', { req_edit: 'req_edit' })
        .andWhere('ta.activity_status != :pending_req_review', {
          pending_req_review: 'pending_req_review',
        })
        .andWhere('ta.activity_status != :pending_req_approve', {
          pending_req_approve: 'pending_req_approve',
        });
    } else if (query.type === 'cmd') {
      // รายการสั่งการ
      // console.log('cmd');
      // filter คำสั่งการ
      // filterObj['action_type'] = { _eq: 'command' };
      //  filter status ไม่ใช่ draft หรือ draft status ที่ผู้เรียกเป็นผู้สร้างฟอร์ม และ action type = command
      queryBuilder = queryBuilder.andWhere(
        new Brackets((qb) =>
          qb.where('activity_status != :draft', { draft: 'draft' }).orWhere(
            new Brackets((qbb) =>
              qbb
                .where('activity_status = :draft', { draft: 'draft' })
                .andWhere('action_type = :request', { request: 'request' })
                .andWhere('req_create_by = :req_create_by', {
                  req_create_by: body?.request_by?.id || '',
                }),
            ),
          ),
        ),
      );
    } else {
      queryBuilder = queryBuilder.andWhere(
        new Brackets((qb) =>
          qb.where('activity_status != :draft', { draft: 'draft' }).orWhere(
            new Brackets((qbb) =>
              qbb
                .where('activity_status = :draft', { draft: 'draft' })
                .andWhere('action_type = :command', { command: 'command' })
                .andWhere('req_create_by = :req_create_by', {
                  req_create_by: body?.request_by?.id || '',
                }),
            ),
          ),
        ),
      );
    }

    // .andWhere(`ta.${query.type === 'res' ? 'unit_response_code' : 'unit_request_code'} = :unit_no`, { unit_no: body?.request_by?.activeUnit?.code ||body?.request_by?.units[0]?.code ||'' })
    queryBuilder = queryBuilder.orderBy('ta.req_create_date', 'DESC');
    return await queryBuilder.getMany();
  }

  async findOne(id: string, body: any, query: any) {
    // console.log('body', body?.request_by || '');
    // console.log('BODY,,,,,', body.request_by.data_permission);
    // console.log('query', query);
    let filterObj = {
      is_delete: { _neq: true }, // filter ข้อมูลที่ยังไม่ถูกลบ
      is_test: { _neq: true }, // filter ข้อมูลที่ยังไม่ใช่ข้อมูลทดสอบ
      //  filter status ไม่ใช่ draft หรือ draft status ที่ผู้เรียกเป็นผู้สร้างฟอร์ม
      _or: [
        {
          _and: [
            { activity_status: { _neq: 'draft' } },
            { is_delete: { _neq: true } },
            { is_test: { _neq: true } },
          ],
        },
        {
          _and: [
            { activity_status: { _eq: 'draft' } },
            { req_create_by: body?.request_by?.id || '' },
          ],
        },
      ],
      //   { roles: { role_id: { id: { _in: rolesIdArr } } } },
    };
    // filter type = res(ตอบรับ) ให้ unit_response_code = unit ของ user หรือ unit_request_code = unit ของ user
    filterObj[
      query.type === 'res' ? 'unit_response_code' : 'unit_request_code'
    ] = {
      _eq:
        body?.request_by?.activeUnit?.code ||
        body?.request_by?.units[0]?.code ||
        '',
    };

    const filterString = JSON.stringify(filterObj);
    // console.log('filterObj', filterString);
    const getQuery = `trs_activity/${id}?${filterString}&fields=${formFields}`;
    try {
      const result = await firstValueFrom(
        this.httpService.get(`/items/${getQuery}`),
      );
      // console.log('----', getQuery);
      if (result.data.data.is_delete === true) {
        // console.log('>>', result.data.data.is_delete);
        return { is_delete: true };
      } else {
        return result?.data?.data || {};
      }
    } catch (error) {
      // console.log('error get activity id', error);
      return error;
      return {};
    }
  }

  async missionAll(body: any, query: any) {
    // console.log('>>>mission id ', body.request_by.data_permission);

    const activityField = `activity.*,activity.activity_status.*,activity.activity_type.*`;
    const driverField = `driver.id,driver.driver_id,driver.firstname,driver.lastname`;
    const vehicleField = `vehicle.id,vehicle.vehicle_type.id,vehicle.vehicle_type.name,vehicle.vehicle_id,vehicle.license_plate,vehicle.unit_code`;
    const convoyField = `convoy.*,convoy.route.*`;
    const beforeForm = `before_activity_form.*`;
    const afterForm = `after_activity_form.*`;
    const whileForm = `while_activity_form.*`;
    const stopoverForm = `stopover_activity_form.*`;
    const helpForm = `help_activity_form.*`;
    const accidentForm = `accident_activity_form.*.*`;
    const missionFormField = `${activityField},${driverField},${vehicleField},${convoyField},*`;
    // console.log('body', body?.request_by || '');
    // console.log('BODY,,,,,', body.request_by.data_permission);
    // console.log('query', query);
    let filterObj = {
      // is_delete: { _neq: true }, // filter ข้อมูลที่ยังไม่ถูกลบ
      // is_test: { _neq: true }, // filter ข้อมูลที่ยังไม่ใช่ข้อมูลทดสอบ
      // //  filter status ไม่ใช่ draft หรือ draft status ที่ผู้เรียกเป็นผู้สร้างฟอร์ม
      driver: { driver_id: { _eq: body?.request_by?.id } },
      convoy: { _nnull: true },
      activity: { activity_status: { _neq: 'draft' } },
      // _or: [
      //   {
      //     _and: [
      //       { activity_status: { _neq: 'draft' } },
      //       { is_delete: { _neq: true } },
      //       { is_test: { _neq: true } },
      //     ],
      //   },
      //   {
      //     _and: [
      //       { activity_status: { _eq: 'draft' } },
      //       { req_create_by: body?.request_by?.id || '' },
      //     ],
      //   },
      // ],
      //   { roles: { role_id: { id: { _in: rolesIdArr } } } },
    };

    const filterString = JSON.stringify(filterObj);
    // console.log('filterObj', filterString);
    const getQuery = `trs_activity_vehicle_driver?filter=${filterString}&fields=${missionFormField}`;
    try {
      const result = await firstValueFrom(
        this.httpService.get(`/items/${getQuery}`),
      );
      // console.log('----', result?.data?.data);
      return result?.data?.data || {};
    } catch (error) {
      // console.log('error get activity id', error);
      return error;
      // return {};
    }
  }

  async mission(id: string, body: any, query: any) {
    // console.log('>>>mission id ', id);
    const activityField = `activity.*,activity.activity_status.*,activity.vehicle_driver.*.*,activity.activity_type.*,activity.files.*,activity.files.files.*.*`;
    const driverField = `driver.id,driver.driver_id,driver.firstname,driver.lastname`;
    const vehicleField = `vehicle.id,vehicle.vehicle_type.id,vehicle.vehicle_type.name,vehicle.vehicle_id,vehicle.license_plate,vehicle.unit_code`;
    const convoyField = `convoy.*,convoy.route.*,convoy.vehicle_driver.*.*`;
    const beforeForm = `before_activity_form.*`;
    const afterForm = `after_activity_form.*`;
    const whileForm = `while_activity_form.*`;
    const stopoverForm = `stopover_activity_form.*`;
    const helpForm = `help_activity_form.*`;
    const accidentForm = `accident_activity_form.*.*`;
    const missionFormField = `${activityField},${driverField},${vehicleField},${convoyField},${beforeForm},${afterForm},${whileForm},${stopoverForm},${helpForm},${accidentForm},*`;
    // console.log('body', body?.request_by || '');
    // console.log('BODY,,,,,', body.request_by.data_permission);
    // console.log('query', query);
    let filterObj = {
      // is_delete: { _neq: true }, // filter ข้อมูลที่ยังไม่ถูกลบ
      // is_test: { _neq: true }, // filter ข้อมูลที่ยังไม่ใช่ข้อมูลทดสอบ
      // //  filter status ไม่ใช่ draft หรือ draft status ที่ผู้เรียกเป็นผู้สร้างฟอร์ม
      // _or: [
      //   {
      //     _and: [
      //       { activity_status: { _neq: 'draft' } },
      //       { is_delete: { _neq: true } },
      //       { is_test: { _neq: true } },
      //     ],
      //   },
      //   {
      //     _and: [
      //       { activity_status: { _eq: 'draft' } },
      //       { req_create_by: body?.request_by?.id || '' },
      //     ],
      //   },
      // ],
      //   { roles: { role_id: { id: { _in: rolesIdArr } } } },
    };

    const filterString = JSON.stringify(filterObj);
    // console.log('filterObj', filterString);
    const getQuery = `trs_activity_vehicle_driver/${id}?${filterString}&fields=${missionFormField}`;
    try {
      const result = await firstValueFrom(
        this.httpService.get(`/items/${getQuery}`),
      );
      // console.log('----', result?.data?.data);
      return result?.data?.data || {};
    } catch (error) {
      // console.log('error get activity id', error);
      return error;
      // return {};
    }
  }

  // async findOne(id: string, body: any, query: any) {

  //   // let filterObj = {
  //   //   is_delete: false, // filter ข้อมูลที่ยังไม่ถูกลบ
  //   //   is_test: false,
  //   // }
  //   // filterObj[
  //   //   query.type === 'res' ? 'unit_response_code' : 'unit_request_code'
  //   // ] = body?.request_by?.activeUnit?.code ||body?.request_by?.units[0]?.code ||'',
  //   let filterObj = {
  //     is_delete: { _neq: true }, // filter ข้อมูลที่ยังไม่ถูกลบ
  //     is_test: { _neq: true }, // filter ข้อมูลที่ยังไม่ใช่ข้อมูลทดสอบ
  //     //  filter status ไม่ใช่ draft หรือ draft status ที่ผู้เรียกเป็นผู้สร้างฟอร์ม
  //     _or: [
  //       {
  //         _and: [
  //           { activity_status: { _neq: 'draft' } },
  //           { is_delete: { _neq: true } },
  //           { is_test: { _neq: true } },
  //         ],
  //       },
  //       {
  //         _and: [
  //           { activity_status: { _eq: 'draft' } },
  //           { req_create_by: body?.request_by?.id || '' },
  //         ],
  //       },
  //     ],
  //     //   { roles: { role_id: { id: { _in: rolesIdArr } } } },
  //   };
  //   // filter type = res(ตอบรับ) ให้ unit_response_code = unit ของ user หรือ unit_request_code = unit ของ user
  //   filterObj[
  //     query.type === 'res' ? 'unit_response_code' : 'unit_request_code'
  //   ] = {
  //     _eq:
  //       body?.request_by?.activeUnit?.code ||
  //       body?.request_by?.units[0]?.code ||
  //       '',
  //   };

  //   filterObj['id'] = {_eq:id}

  //   // console.log(JSON.stringify(filterObj))

  // const where =mapDirectusQueryToTypeORM({filter:filterObj})
  // console.log(  this.trsActivityRepo.metadata.propertiesMap
  //   )

  //   // let queryBuilder = this.trsActivityRepo.createQueryBuilder('ta')
  //   // .leftJoinAndSelect('ta.convoy','convoy')
  //   // .leftJoinAndSelect('ta.vehicle_driver','driver')

  //   // console.log(mapGraph(formFields.split(','),queryBuilder,trsActivity))
  //   // console.log(genMultiRelations(formFields))

  //   // const data = queryBuilder.where("id = :id", {id: id}).getOne();

  // // this.trsActivityRepo.metadata

  // return this.trsActivityRepo.findOne({
  //   where:{
  //     id:parseInt(id)
  //   },
  //   relations:{
  //     vehicle_driver:{driver:true},
  //     convoy:true,
  //     files:true
  //     // vehicle_driver: { driver: { driver_license: true } },
  //     // convoy: { route: true },
  //     // files: { files: { directus_files_id: true } }
  //   },
  //   // select:mapDirectusFieldsToTypeORM(formFields)
  // })

  // }

  async create(createActivityDto: CreateActivityDto) {
    createActivityDto.activity_status = 'draft';
    createActivityDto['req_create_by'] =
      createActivityDto?.request_by?.id || '';
    createActivityDto['req_create_by_name'] =
      createActivityDto?.request_by?.displayname || '';
    createActivityDto['req_create_date'] = now();

    delete createActivityDto.request_by;
    try {
      const result = await firstValueFrom(
        this.httpService.post(`/items/trs_activity`, createActivityDto),
      );
      console.log(result);
      return result?.data?.data || [];
    } catch (error) {
      console.log('error update menupage id', error);
      return error.response.data.errors;
    }
  }

  async updateMission(id: string, updateMissionDto: UpdateMissionDto) {
    // console.log("--->",updateActivityDto);

    if (updateMissionDto.accident_activity_form) {
      updateMissionDto.accident_activity_form.update_by =
        updateMissionDto.request_by.id || '';
      updateMissionDto.accident_activity_form.update_by_name =
        updateMissionDto.request_by.displayname || '';
      updateMissionDto.accident_activity_form.update_date = now();
    }

    if (updateMissionDto.before_activity_form) {
      updateMissionDto.before_activity_form.update_by =
        updateMissionDto.request_by.id || '';
      updateMissionDto.before_activity_form.update_by_name =
        updateMissionDto.request_by.displayname || '';
      updateMissionDto.before_activity_form.update_date = now();
    }

    if (updateMissionDto.while_activity_form) {
      updateMissionDto.while_activity_form.update_by =
        updateMissionDto.request_by.id || '';
      updateMissionDto.while_activity_form.update_by_name =
        updateMissionDto.request_by.displayname || '';
      updateMissionDto.while_activity_form.update_date = now();
    }

    if (updateMissionDto.after_activity_form) {
      updateMissionDto.after_activity_form.update_by =
        updateMissionDto.request_by.id || '';
      updateMissionDto.after_activity_form.update_by_name =
        updateMissionDto.request_by.displayname || '';
      updateMissionDto.after_activity_form.update_date = now();
    }

    delete updateMissionDto.request_by;
    try {
      const result = await firstValueFrom(
        this.httpService.patch(
          `/items/trs_activity_vehicle_driver/${id}`,
          updateMissionDto,
        ),
      );
      // console.log(result);
      return result?.data?.data || [];
    } catch (error) {
      console.log('error update mission id', error);
      return error.response.data.errors;
    }
  }

  async update(id: string, updateActivityDto: UpdateActivityDto, query: any) {
    // console.log("--->",updateActivityDto);
    const userUnit =
      updateActivityDto?.request_by?.activeUnit?.code ||
      updateActivityDto?.request_by?.units[0].code;
    if (query.type === 'res') {
      updateActivityDto.unit_response?.map((u) => {
        // console.log('u..', u.unit_code, userUnit);
        if (u.unit_no === userUnit) {
          u.update_by = updateActivityDto?.request_by?.id || '';
          u.update_by_name = updateActivityDto?.request_by?.displayname || '';
          u.update_date = now();
        }
      });
      updateActivityDto['resp_update_by'] =
        updateActivityDto?.request_by?.id || '';
      updateActivityDto['resp_update_by_name'] =
        updateActivityDto?.request_by?.displayname || '';
      updateActivityDto['resp_update_date'] = now();
    } else {
      updateActivityDto['req_update_by'] =
        updateActivityDto?.request_by?.id || '';
      updateActivityDto['req_update_by_name'] =
        updateActivityDto?.request_by?.displayname || '';
      updateActivityDto['req_update_date'] = now();
    }

    delete updateActivityDto.request_by;
    try {
      const result = await firstValueFrom(
        this.httpService.patch(`/items/trs_activity/${id}`, updateActivityDto),
      );
      // console.log(result);
      return result?.data?.data || [];
    } catch (error) {
      console.log('error update menupage id', error);
      return error.response.data.errors;
    }
  }

  async send(id: string, updateActivityDto: UpdateActivityDto, query: any) {
    // console.log(updateActivityDto.request_by);
    const userUnit =
      updateActivityDto?.request_by?.activeUnit?.code ||
      updateActivityDto?.request_by?.units[0].code;
    if (query.type === 'res') {
      updateActivityDto.unit_response?.map((u) => {
        // console.log('u..', u.unit_code, userUnit);
        if (u.unit_no === userUnit) {
          u.status = 'pending_res_review';
          u.update_by = updateActivityDto?.request_by?.id || '';
          u.update_by_name = updateActivityDto?.request_by?.displayname || '';
          u.update_date = now();
        }
      });
      updateActivityDto.activity_status = 'pending_res_review';
      updateActivityDto['resp_update_by'] =
        updateActivityDto?.request_by?.id || '';
      updateActivityDto['resp_update_by_name'] =
        updateActivityDto?.request_by?.displayname || '';
      updateActivityDto['resp_update_date'] = now();
    } else {
      delete updateActivityDto.unit_response;
      updateActivityDto.activity_status = 'pending_req_review';
      updateActivityDto['req_update_by'] =
        updateActivityDto?.request_by?.id || '';
      updateActivityDto['req_update_by_name'] =
        updateActivityDto?.request_by?.displayname || '';
      updateActivityDto['req_update_date'] = now();
    }

    delete updateActivityDto.request_by;
    try {
      const result = await firstValueFrom(
        this.httpService.patch(`/items/trs_activity/${id}`, updateActivityDto),
      );
      // console.log(result);
      return result?.data?.data || [];
    } catch (error) {
      console.log('error send menupage id', error);
      return error.response.data.errors;
    }
  }

  async request(
    id: string,
    requestActivityDto: RequestActivityDto,
    query: any,
  ) {
    // console.log(updateActivityDto.request_by);

    const unitResponse = requestActivityDto?.unit_response?.map((u) => {
      return {
        ...u,
        activity: id,
        status: 'pending_res_draft',
        req_unit_code:
          requestActivityDto?.request_by?.activeUnit?.code ||
          requestActivityDto?.request_by?.units[0].code ||
          '',
        create_by_name: requestActivityDto?.request_by?.displayname || '',
        create_by: requestActivityDto?.request_by?.id || '',
        create_date: now(),
      };
    });
    // console.log(unitResponse);

    try {
      const result = await firstValueFrom(
        this.httpService.post(
          `/items/trs_activity_unit_response`,
          unitResponse,
        ),
      );
      // console.log(result);
      return result?.data?.data || [];
    } catch (error) {
      console.log('error send menupage id', error);
      return error.response.data.errors;
    }
  }

  async cancel_request(id: string) {
    // console.log(updateActivityDto.request_by);
    // console.log(unitResponse);

    try {
      const result = await firstValueFrom(
        this.httpService.delete(`/items/trs_activity_unit_response/${id}`),
      );
      // console.log(result);
      return result?.data?.data || [];
    } catch (error) {
      console.log('error delete unit res id', error);
      return error.response.data.errors;
    }
  }

  async review(id: string, updateActivityDto: UpdateActivityDto, query: any) {
    // console.log(updateActivityDto.request_by);
    const userUnit =
      updateActivityDto?.request_by?.activeUnit?.code ||
      updateActivityDto?.request_by?.units[0].code;
    if (query.type === 'res') {
      // console.log('xxxx');
      updateActivityDto.unit_response?.map((u) => {
        // console.log('u..', u.unit_code, userUnit);
        if (u.unit_no === userUnit) {
          u.status = 'pending_res_approve';
          u.review_by = updateActivityDto?.request_by?.id || '';
          u.review_by_name = updateActivityDto?.request_by?.displayname || '';
          u.review_date = now();
        }
      });
      updateActivityDto.activity_status = 'pending_res_approve';
      updateActivityDto['resp_review_by'] =
        updateActivityDto?.request_by?.id || '';
      updateActivityDto['resp_review_by_name'] =
        updateActivityDto?.request_by?.displayname || '';
      updateActivityDto['resp_review_date'] = now();
    } else {
      delete updateActivityDto.unit_response;
      updateActivityDto.activity_status = 'pending_req_approve';
      updateActivityDto['req_review_by'] =
        updateActivityDto?.request_by?.id || '';
      updateActivityDto['req_review_by_name'] =
        updateActivityDto?.request_by?.displayname || '';
      updateActivityDto['req_review_date'] = now();
    }

    delete updateActivityDto.request_by;
    try {
      const result = await firstValueFrom(
        this.httpService.patch(`/items/trs_activity/${id}`, updateActivityDto),
      );
      // console.log(result);
      return result?.data?.data || [];
    } catch (error) {
      console.log('error review menupage id', error);
      return error.response.data.errors;
    }
  }

  async approve(id: string, updateActivityDto: UpdateActivityDto, query: any) {
    // console.log(updateActivityDto.request_by);
    const userUnit =
      updateActivityDto?.request_by?.activeUnit?.code ||
      updateActivityDto?.request_by?.units[0].code;
    if (query.type === 'res') {
      updateActivityDto.unit_response?.map((u) => {
        // console.log('u..', u.unit_code, userUnit);
        if (u.unit_no === userUnit) {
          u.status = 'approved';
          u.approve_by = updateActivityDto?.request_by?.id || '';
          u.approve_by_name = updateActivityDto?.request_by?.displayname || '';
          u.approve_date = now();
        }
      });
      updateActivityDto.activity_status = 'approved';
      updateActivityDto['resp_approve_by'] =
        updateActivityDto?.request_by?.id || '';
      updateActivityDto['resp_approve_by_name'] =
        updateActivityDto?.request_by?.displayname || '';
      updateActivityDto['resp_approve_date'] = now();
    } else if (query.type === 'cmd') {
      delete updateActivityDto.unit_response;
      updateActivityDto.activity_status = 'approved';
      updateActivityDto['resp_approve_by'] =
        updateActivityDto?.request_by?.id || '';
      updateActivityDto['resp_approve_by_name'] =
        updateActivityDto?.request_by?.displayname || '';
      updateActivityDto['resp_approve_date'] = now();
    } else {
      delete updateActivityDto.unit_response;
      updateActivityDto.activity_status = 'pending_res_draft';
      updateActivityDto['req_approve_by'] =
        updateActivityDto?.request_by?.id || '';
      updateActivityDto['req_approve_by_name'] =
        updateActivityDto?.request_by?.displayname || '';
      updateActivityDto['req_approve_date'] = now();
    }

    delete updateActivityDto.request_by;
    try {
      const result = await firstValueFrom(
        this.httpService.patch(`/items/trs_activity/${id}`, updateActivityDto),
      );
      // console.log(result);
      return result?.data?.data || [];
    } catch (error) {
      console.log('error approve menupage id', error);
      return error.response.data.errors;
    }
  }

  async disApprove(
    id: string,
    updateActivityDto: UpdateActivityDto,
    query: any,
  ) {
    // console.log(updateActivityDto.request_by);
    const userUnit =
      updateActivityDto?.request_by?.activeUnit?.code ||
      updateActivityDto?.request_by?.units[0].code;
    if (query.type === 'res') {
      updateActivityDto.unit_response?.map((u) => {
        // console.log('u..', u.unit_code, userUnit);
        if (u.unit_no === userUnit) {
          u.status = 'disapproved';
          u.approve_by = updateActivityDto?.request_by?.id || '';
          u.approve_by_name = updateActivityDto?.request_by?.displayname || '';
          u.approve_date = now();
        }
      });
    } else {
      delete updateActivityDto.unit_response;
      updateActivityDto.activity_status = 'disapproved';
      updateActivityDto['resp_approve_by'] =
        updateActivityDto?.request_by?.id || '';
      updateActivityDto['resp_approve_by_name'] =
        updateActivityDto?.request_by?.displayname || '';
      updateActivityDto['resp_approve_date'] = now();
    }

    delete updateActivityDto.request_by;
    try {
      const result = await firstValueFrom(
        this.httpService.patch(`/items/trs_activity/${id}`, updateActivityDto),
      );
      // console.log(result);
      return result?.data?.data || [];
    } catch (error) {
      console.log('error approve menupage id', error);
      return error.response.data.errors;
    }
  }

  async back(id: string, updateActivityDto: UpdateActivityDto, query: any) {
    // console.log(updateActivityDto.request_by);
    updateActivityDto['sendback_by'] = updateActivityDto?.request_by?.id || '';
    updateActivityDto['sendback_by_name'] =
      updateActivityDto?.request_by?.displayname || '';
    updateActivityDto['sendback_date'] = now();
    const userUnit =
      updateActivityDto?.request_by?.activeUnit?.code ||
      updateActivityDto?.request_by?.units[0].code;
    if (query.type === 'res') {
      updateActivityDto.unit_response?.map((u) => {
        // console.log('u..', u.unit_code, userUnit);
        if (u.unit_no === userUnit) {
          u.status = 'res_edit';
          u.sendback_by = updateActivityDto?.request_by?.id || '';
          u.sendback_by_name = updateActivityDto?.request_by?.displayname || '';
          u.sendback_date = now();
          u.sendback_comment = updateActivityDto.sendback_comment;
        }
      });
      updateActivityDto.activity_status = 'res_edit';
    } else if (query.type === 'cmd') {
      delete updateActivityDto.unit_response;
      updateActivityDto.activity_status = 'cmd_edit';
    } else {
      delete updateActivityDto.unit_response;
      updateActivityDto.activity_status = 'req_edit';
    }

    delete updateActivityDto.request_by;
    try {
      const result = await firstValueFrom(
        this.httpService.patch(`/items/trs_activity/${id}`, updateActivityDto),
      );
      // console.log(result);
      return result?.data?.data || [];
    } catch (error) {
      console.log('error approve menupage id', error);
      return error.response.data.errors;
    }
  }

  async delete(id: string, deleteActivityDto: DeleteActivityDto) {
    deleteActivityDto.is_delete = true;
    deleteActivityDto['delete_by'] = deleteActivityDto?.request_by?.id || '';
    deleteActivityDto['delete_by_name'] =
      deleteActivityDto?.request_by?.displayname || '';
    deleteActivityDto['delete_date'] = now();

    delete deleteActivityDto.request_by;
    try {
      const result = await firstValueFrom(
        this.httpService.patch(`/items/trs_activity/${id}`, deleteActivityDto),
      );
      return result?.data?.data || [];
    } catch (error) {
      console.log('error delete menupage id', error);
      return error.response.data.errors;
    }
  }

  async restore(id: string, deleteActivityDto: DeleteActivityDto) {
    deleteActivityDto.is_delete = false;

    delete deleteActivityDto.request_by;
    try {
      const result = await firstValueFrom(
        this.httpService.patch(`/items/trs_activity/${id}`, deleteActivityDto),
      );
      return result?.data?.data || [];
    } catch (error) {
      console.log('error delete menupage id', error);
      return error.response.data.errors;
    }
  }

  // async status(query: any) {
  //   // console.log('body', body?.request_by || '');
  //   // console.log('query', query);
  //   let filterObj = {
  //     is_delete: { _neq: true }, // filter ข้อมูลที่ยังไม่ถูกลบ
  //   };

  //   const filterString = JSON.stringify(filterObj);
  //   // console.log('filterObj', filterString);
  //   const getQuery = `trs_activity_status?filter=${filterString}&sort=sort`;
  //   try {
  //     const result = await firstValueFrom(
  //       this.httpService.get(`/items/${getQuery}`),
  //     );
  //     // console.log(result.data);
  //     return result?.data?.data || [];
  //   } catch (error) {
  //     console.log('error get status', error);
  //     return {};
  //   }
  // }

  async status(q: any) {
    return this.trsVehicleStatusRepo.find({
      where: {
        is_delete: false,
      },
    });
  }

  // async type(query: any) {
  //   // console.log('body', body?.request_by || '');
  //   // console.log('query', query);
  //   let filterObj = {
  //     is_delete: { _neq: true }, // filter ข้อมูลที่ยังไม่ถูกลบ
  //   };

  //   const filterString = JSON.stringify(filterObj);
  //   // console.log('filterObj', filterString);
  //   const getQuery = `trs_activity_type?filter=${filterString}&sort=sort`;
  //   try {
  //     const result = await firstValueFrom(
  //       this.httpService.get(`/items/${getQuery}`),
  //     );
  //     // console.log(result.data);
  //     return result?.data?.data || [];
  //   } catch (error) {
  //     console.log('error get status', error);
  //     return {};
  //   }
  // }

  async type(query: any) {
    const queryBuilder = this.trsActivityTypeRepo
      .createQueryBuilder('t')
      .where('t.is_delete != :is_delete', { is_delete: true });
    return await queryBuilder.getMany();
  }

  // async vehicle(query: any, body: RequestByDto) {
  //   // console.log('body', body?.request_by || '');
  //   // console.log('query', query);
  //   // const resfields = `id,license_plate,vehicle_status.id,vehicle_status.name,main_driver.driver_id,main_driver.driver_name`;
  //   const resfields = `id,license_plate,main_driver.id,main_driver.driver_id,main_driver.driver_name`;
  //   let filterObj = {
  //     is_delete: { _neq: true }, // filter ข้อมูลที่ยังไม่ถูกลบ
  //     is_available: { _eq: true },
  //   };
  //   if (query.unit) {
  //     filterObj['unit_code'] = {
  //       _eq: query.unit,
  //     };
  //   } else {
  //     filterObj['unit_code'] = {
  //       _eq:
  //         body?.request_by?.activeUnit?.code || body.request_by.units[0].code,
  //     };
  //   }
  //   if (query.type) {
  //     filterObj['vehicle_type'] = query.type;
  //   }

  //   const filterString = JSON.stringify(filterObj);
  //   // console.log('filterObj', filterString);
  //   const getQuery = `trs_vehicle?fields=${resfields}&filter=${filterString}`;
  //   try {
  //     const result = await firstValueFrom(
  //       this.httpService.get(`/items/${getQuery}`),
  //     );
  //     // console.log(result.data);
  //     return result?.data?.data || [];
  //   } catch (error) {
  //     console.log('error get vehicle', error);
  //     return error;
  //   }
  // }

  async vehicle(query: any, body: RequestByDto) {
    const resfields = `id,license_plate,main_driver.id,main_driver.driver_id,main_driver.driver_name,main_driver.firstname,main_driver.lastname`;
    // const selectedFields = resfields.split(',')

    let filterObj = {
      is_delete: false, // filter ข้อมูลที่ยังไม่ถูกลบ
      is_available: true,
    };
    if (query.unit) {
      filterObj['unit_code'] = query.unit;
    } else {
      filterObj['unit_code'] =
        body?.request_by?.activeUnit?.code || body.request_by.units[0].code;
    }
    if (query.type) {
      filterObj['vehicle_type'] = parseInt(query.type);
    }

    // console.log(mapDirectusFieldsToTypeORM(resfields))
    // console.log(filterObj)

    return await this.trsVehicleRepo.find({
      select: mapDirectusFieldsToTypeORM(resfields),
      where: filterObj,
      relations: {
        main_driver: true,
      },
    });
  }

  async vehicleOption(query: any, body: RequestByDto) {
    return await this.trsVehicleRepo
      .query(`select ss.id as supply_id,ss.supply_name  as supply_name ,sss.name  as spec_name,ssi.id as item_id,
    ssi.name as item_name,ssia.attribute_name as att_name,ssia.id ,ssi.unit_no as unit
    ,ssiav.attribute_value as license
     from slc_supply ss 
    left join slc_toa st on ss.toa_id = st.id 
    left join slc_refs_supply_sub_type srsst on srsst.id = st.supply_sub_type_id 
    left join slc_supply_spec sss on sss.supply_id = ss.id 
    left join slc_supply_item ssi on ssi.supply_spec_id = sss.id 
    left join slc_supply_item_attribute_value ssiav on ssiav.supply_item_id = ssi.id 
    left join slc_supply_item_attribute ssia on ssia.id = ssiav.supply_item_attribute_id 
    left join slc_master_attribute_keyword smak on smak.id = ssia.attribute_keyword_id 
    where srsst.id =9 and smak.id =21 ${
      (query.unit && `and ssi.unit_no ='${query.unit}'`) ||
      `and ssi.unit_no ='${
        body?.request_by?.activeUnit?.code ||
        body?.request_by?.units[0]?.code ||
        ''
      }'`
    } ${(query.type && `and ss.id =${query.type}`) || ''}`);
  }

  async vehicleTypeOption(query: any, body: RequestByDto) {
    return await this.trsVehicleRepo
      .query(`select ss.id ,ss.supply_name  from  slc_supply ss 
      left join slc_toa st on ss.toa_id = st.id 
      left join slc_refs_supply_sub_type srsst on srsst.id = st.supply_sub_type_id 
      left join slc_refs_supply_sub_detail srssd on srssd.sub_type_id = srsst.id 
      where srsst.id = 9 and srssd.[key] =1`);
  }

  async oilType() {
    return await this.trsVehicleRepo.query(`SELECT 
      (CASE 
       when sog.name = N'ภาคพื้น' then sss.name
       else sss.name +N' ('+ sog.name+')'
      END
      )
      as name,
      sog.name as group_name,
      sog.id as grop_id,
      sot.[type] as oil_type_name,
      sssot.oil_type_id,
      (CASE 
       when sog.name = N'ภาคพื้น' then sss.name
       else sss.name +N' ('+ sog.name+')'
      END
      )
      as oil_name,
      sssot.supply_spec_id,
      sssot.id as id,
      sss.api_code
      FROM 
      slc_supply_spec_oil_type sssot 
      left join 
      slc_oil_type sot on sot.id = sssot.oil_type_id 
      left join 
      slc_supply_spec sss on sss.id= sssot.supply_spec_id 
      left join 
      slc_oil_group sog on sog.id =  sot.group_no
      where sog.id =1`);
  }

  // async vehicleType(query: any, body: RequestByDto) {
  //   // console.log('body', body?.request_by || '');
  //   // console.log('query', query);
  //   // const resfields = `id,license_plate,vehicle_status.id,vehicle_status.name,main_driver.driver_id,main_driver.driver_name`;
  //   const resfields = `*`;
  //   let filterObj = {
  //     is_delete: { _neq: true }, // filter ข้อมูลที่ยังไม่ถูกลบ
  //   };

  //   const filterString = JSON.stringify(filterObj);
  //   // console.log('filterObj', filterString);
  //   const getQuery = `trs_vehicle_type?fields=${resfields}&filter=${filterString}&sort=order`;
  //   try {
  //     const result = await firstValueFrom(
  //       this.httpService.get(`/items/${getQuery}`),
  //     );
  //     // console.log(result.data);
  //     return result?.data?.data || [];
  //   } catch (error) {
  //     console.log('error get vehicle', error);
  //     return error;
  //   }
  // }

  async vehicleType(query: any, body: RequestByDto) {
    // const queryBuilder = this.trsVehicleTypeRepo.createQueryBuilder('vt')
    // .where('vt.is_delete != :is_delete',{is_delete:true})
    return await this.trsVehicleTypeRepo.find({
      where: {
        is_delete: false,
      },
    });
  }

  // async driver(query: any, body: RequestByDto) {
  //   // console.log('body', body?.request_by || '');
  //   // console.log('query', query);
  //   const resfields = `id,driver_id,driver_name,driver_license`;
  //   let filterObj = {
  //     is_delete: { _neq: true }, // filter ข้อมูลที่ยังไม่ถูกลบ
  //     is_available: { _eq: true },
  //   };
  //   if (query.unit) {
  //     filterObj['unit_code'] = {
  //       _eq: query.unit,
  //     };
  //   } else {
  //     filterObj['unit_code'] = {
  //       _eq:
  //         body?.request_by?.activeUnit?.code || body.request_by.units[0].code,
  //     };
  //   }
  //   if (query.type) {
  //     filterObj['vehicle_type'] = query.type;
  //   }

  //   const filterString = JSON.stringify(filterObj);
  //   // console.log('filterObj', filterString);
  //   const getQuery = `trs_driver?fields=${resfields}&filter=${filterString}`;
  //   try {
  //     const result = await firstValueFrom(
  //       this.httpService.get(`/items/${getQuery}`),
  //     );
  //     // console.log(result.data);
  //     return result?.data?.data || [];
  //   } catch (error) {
  //     console.log('error get driver', error);
  //     return error;
  //   }
  // }

  async driver(query: any, body: RequestByDto): Promise<trsDriver[]> {
    // 1. use createQueryBuilder
    // let queryBuilder = this.trsDriverRepo.createQueryBuilder('d')
    // // .leftJoinAndSelect('d.driver_license','driver_license')
    // .select(['d.id','d.driver_id','d.driver_name','d.driver_license'])
    // .where('d.is_delete != :is_delete', { is_delete:true })
    // if (query.unit) {
    //   queryBuilder = queryBuilder
    //   .andWhere('d.unit_code = :unit_code', { unit_code:query.unit })
    // }
    // else {
    //   queryBuilder = queryBuilder
    //   .andWhere('d.unit_code = :unit_code', { unit_code: body?.request_by?.activeUnit?.code || body.request_by.units[0].code })
    // }
    // if (query.type) {
    //   queryBuilder = queryBuilder
    //   .andWhere('d.vehicle_type = :vehicle_type', { vehicle_type:query.type })
    // }
    // queryBuilder = queryBuilder
    // .andWhere('d.is_available = :is_available', { is_available:true })
    // return await queryBuilder.getMany()

    //2. use Repo
    let filterObj = {
      is_delete: false, // filter ข้อมูลที่ยังไม่ถูกลบ
      // is_available: true,
    };
    if (query.unit) {
      filterObj['unit_no'] = query.unit;
    } else {
      filterObj['unit_no'] =
        body?.request_by?.activeUnit?.code || body.request_by.units[0].code;
    }
    if (query.type) {
      filterObj['vehicle_type'] = query.type;
    }
    return await this.trsDriverRepo.find({
      select: [
        'id',
        'driver_id',
        'driver_name',
        'driver_license',
        'firstname',
        'lastname',
      ],
      where: filterObj,
    });
  }
}
