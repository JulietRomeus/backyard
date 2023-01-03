import { Injectable } from '@nestjs/common';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { RequestActivityDto } from './dto/request-activity.dto';
import { DeleteActivityDto } from './dto/delete-activity.dto';

import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import now from '../../utils/now';
import { RequestByDto } from '../../common/interfaces/requestBy.dto';

const mainDriverFields = `vehicle_driver.vehicle.main_driver.id,vehicle_driver.vehicle.main_driver.driver_id,vehicle_driver.vehicle.main_driver.driver_name`;
const vehicleFields = `vehicle_driver.vehicle.id,vehicle_driver.vehicle.vehicle_type,vehicle_driver.vehicle.is_available,vehicle_driver.vehicle.license_plate,${mainDriverFields}`;
const driverFields = `vehicle_driver.driver.id,vehicle_driver.driver.driver_id,vehicle_driver.driver.driver_name,vehicle_driver.driver.driver_license`;
const vehicleDriverFields = `vehicle_driver.controller,${vehicleFields},${driverFields}`;

const convoyMainDriverFields = `convoy.vehicle_driver.vehicle.main_driver.id,convoy.vehicle_driver.vehicle.main_driver.driver_id,convoy.vehicle_driver.vehicle.main_driver.driver_name`;
const convoyVehicleFields = `convoy.vehicle_driver.vehicle.id,convoy.vehicle_driver.vehicle.vehicle_type,convoy.vehicle_driver.vehicle.is_available,convoy.vehicle_driver.vehicle.license_plate,${convoyMainDriverFields}`;
const convoyDriverFields = `convoy.vehicle_driver.driver.id,convoy.vehicle_driver.driver.driver_id,convoy.vehicle_driver.driver.driver_name,convoy.vehicle_driver.driver.driver_license`;
const convoyVehicleDriverFields = `convoy.vehicle_driver.controller,${convoyVehicleFields},${convoyDriverFields}`;

const formFields = `*.*,${vehicleDriverFields},${convoyVehicleDriverFields},files.files.*,files.files.directus_files_id.*,convoy.route.*`;
const listFields = `*,route.*,convoy.*.*,activity_status.id,activity_status.name,activity_status.color,activity_type.id,activity_type.name`;

@Injectable()
export class ActivityService {
  constructor(private readonly httpService: HttpService) {}

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

  async findOne(id: string, body: any, query: any) {
    // console.log('body', body?.request_by || '');
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
      // return error;
      return {};
    }
  }

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
      // console.log(result);
      return result?.data?.data || [];
    } catch (error) {
      console.log('error update menupage id', error);
      return error.response.data.errors;
    }
  }

  async update(id: string, updateActivityDto: UpdateActivityDto, query: any) {
    // console.log(updateActivityDto.request_by);
    if (query.type === 'res') {
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
    if (query.type === 'res') {
      updateActivityDto.activity_status = 'pending_res_review';
      updateActivityDto['resp_update_by'] =
        updateActivityDto?.request_by?.id || '';
      updateActivityDto['resp_update_by_name'] =
        updateActivityDto?.request_by?.displayname || '';
      updateActivityDto['resp_update_date'] = now();
    } else {
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
        unit_code:
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

  async review(id: string, updateActivityDto: UpdateActivityDto, query: any) {
    // console.log(updateActivityDto.request_by);
    const userUnit =
      updateActivityDto?.request_by?.activeUnit?.code ||
      updateActivityDto?.request_by?.units[0].code;
    if (query.type === 'res') {
      // console.log('xxxx');
      updateActivityDto.unit_response.map((u) => {
        // console.log('u..', u.unit_code, userUnit);
        if (u.unit_code === userUnit) {
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

    if (query.type === 'res') {
      updateActivityDto.activity_status = 'approved';
      updateActivityDto['resp_approve_by'] =
        updateActivityDto?.request_by?.id || '';
      updateActivityDto['resp_approve_by_name'] =
        updateActivityDto?.request_by?.displayname || '';
      updateActivityDto['resp_approve_date'] = now();
    } else if (query.type === 'cmd') {
      updateActivityDto.activity_status = 'approved';
      updateActivityDto['resp_approve_by'] =
        updateActivityDto?.request_by?.id || '';
      updateActivityDto['resp_approve_by_name'] =
        updateActivityDto?.request_by?.displayname || '';
      updateActivityDto['resp_approve_date'] = now();
    } else {
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

    updateActivityDto.activity_status = 'disapproved';
    updateActivityDto['resp_approve_by'] =
      updateActivityDto?.request_by?.id || '';
    updateActivityDto['resp_approve_by_name'] =
      updateActivityDto?.request_by?.displayname || '';
    updateActivityDto['resp_approve_date'] = now();

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
    if (query.type === 'res') {
      updateActivityDto.activity_status = 'res_edit';
    } else if (query.type === 'cmd') {
      updateActivityDto.activity_status = 'cmd_edit';
    } else {
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

  async status(query: any) {
    // console.log('body', body?.request_by || '');
    // console.log('query', query);
    let filterObj = {
      is_delete: { _neq: true }, // filter ข้อมูลที่ยังไม่ถูกลบ
    };

    const filterString = JSON.stringify(filterObj);
    // console.log('filterObj', filterString);
    const getQuery = `trs_activity_status?filter=${filterString}&sort=sort`;
    try {
      const result = await firstValueFrom(
        this.httpService.get(`/items/${getQuery}`),
      );
      // console.log(result.data);
      return result?.data?.data || [];
    } catch (error) {
      console.log('error get status', error);
      return {};
    }
  }

  async type(query: any) {
    // console.log('body', body?.request_by || '');
    // console.log('query', query);
    let filterObj = {
      is_delete: { _neq: true }, // filter ข้อมูลที่ยังไม่ถูกลบ
    };

    const filterString = JSON.stringify(filterObj);
    // console.log('filterObj', filterString);
    const getQuery = `trs_activity_type?filter=${filterString}&sort=sort`;
    try {
      const result = await firstValueFrom(
        this.httpService.get(`/items/${getQuery}`),
      );
      // console.log(result.data);
      return result?.data?.data || [];
    } catch (error) {
      console.log('error get status', error);
      return {};
    }
  }

  async vehicle(query: any, body: RequestByDto) {
    // console.log('body', body?.request_by || '');
    // console.log('query', query);
    // const resfields = `id,license_plate,vehicle_status.id,vehicle_status.name,main_driver.driver_id,main_driver.driver_name`;
    const resfields = `id,license_plate,main_driver.id,main_driver.driver_id,main_driver.driver_name`;
    let filterObj = {
      is_delete: { _neq: true }, // filter ข้อมูลที่ยังไม่ถูกลบ
      is_available: { _eq: true },
    };
    if (query.unit) {
      filterObj['unit_code'] = {
        _eq: query.unit,
      };
    } else {
      filterObj['unit_code'] = {
        _eq:
          body?.request_by?.activeUnit?.code || body.request_by.units[0].code,
      };
    }
    if (query.type) {
      filterObj['vehicle_type'] = query.type;
    }

    const filterString = JSON.stringify(filterObj);
    // console.log('filterObj', filterString);
    const getQuery = `trs_vehicle?fields=${resfields}&filter=${filterString}`;
    try {
      const result = await firstValueFrom(
        this.httpService.get(`/items/${getQuery}`),
      );
      // console.log(result.data);
      return result?.data?.data || [];
    } catch (error) {
      console.log('error get vehicle', error);
      return error;
    }
  }

  async vehicleType(query: any, body: RequestByDto) {
    // console.log('body', body?.request_by || '');
    // console.log('query', query);
    // const resfields = `id,license_plate,vehicle_status.id,vehicle_status.name,main_driver.driver_id,main_driver.driver_name`;
    const resfields = `*`;
    let filterObj = {
      is_delete: { _neq: true }, // filter ข้อมูลที่ยังไม่ถูกลบ
    };

    const filterString = JSON.stringify(filterObj);
    // console.log('filterObj', filterString);
    const getQuery = `trs_vehicle_type?fields=${resfields}&filter=${filterString}&sort=order`;
    try {
      const result = await firstValueFrom(
        this.httpService.get(`/items/${getQuery}`),
      );
      // console.log(result.data);
      return result?.data?.data || [];
    } catch (error) {
      console.log('error get vehicle', error);
      return error;
    }
  }

  async driver(query: any, body: RequestByDto) {
    // console.log('body', body?.request_by || '');
    // console.log('query', query);
    const resfields = `id,driver_id,driver_name,driver_license`;
    let filterObj = {
      is_delete: { _neq: true }, // filter ข้อมูลที่ยังไม่ถูกลบ
      is_available: { _eq: true },
    };
    if (query.unit) {
      filterObj['unit_code'] = {
        _eq: query.unit,
      };
    } else {
      filterObj['unit_code'] = {
        _eq:
          body?.request_by?.activeUnit?.code || body.request_by.units[0].code,
      };
    }
    if (query.type) {
      filterObj['vehicle_type'] = query.type;
    }

    const filterString = JSON.stringify(filterObj);
    // console.log('filterObj', filterString);
    const getQuery = `trs_driver?fields=${resfields}&filter=${filterString}`;
    try {
      const result = await firstValueFrom(
        this.httpService.get(`/items/${getQuery}`),
      );
      // console.log(result.data);
      return result?.data?.data || [];
    } catch (error) {
      console.log('error get driver', error);
      return error;
    }
  }
}
