import { Request } from 'express';
import { VehicleService } from './../vehicle/vehicle.service';
import { Injectable } from '@nestjs/common';
import { CreateLedgerDto } from './dto/create-ledger.dto';
import { UpdateLedgerDto } from './dto/update-ledger.dto';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { slcSupplyItem, trsVehicle } from 'src/entities/Index';
import { Repository, Brackets, Not } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import now from '../../utils/now';

const personFields = `person_id.med_person_id.*`;
const listFields = `*`;

@Injectable()
export class LedgerService {
  constructor(
    private readonly httpService: HttpService,
    private readonly vehicleService: VehicleService,
    @InjectRepository(slcSupplyItem, 'MSSQL_CONNECTION')
    private supplyItem: Repository<slcSupplyItem>,
    @InjectRepository(trsVehicle, 'MSSQL_CONNECTION')
    private trsVehicleRepo: Repository<trsVehicle>,
  ) {}

  async findAll() {
    let filterObj = {
      is_active: { _eq: true }, // filter ข้อมูลที่ยังไม่ถูกลบ
    };

    const filterString = JSON.stringify(filterObj);
    const getQuery = `trs_ledger?filter=${filterString}&fields=${listFields}&sort=-create_date`;
    // return getQuery;
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

  async findPerson(id: number) {
    const getQuery = `trs_ledger/${id}?fields=driver.id,driver.trs_driver_id.*.*,driver.trs_driver_id.driver_license_list.license_id.*`;
    try {
      const result = await firstValueFrom(
        this.httpService.get(`/items/${getQuery}`),
      );
      // console.log(result.data);
      return result?.data?.data?.driver || [];
    } catch (error) {
      console.log('error get menupage');
      return error;
    }
  }

  async findPersonOption(query: any) {
    let filterObj = {
      is_active: true,
      // is_delete: false,
    };
    if (query.unit) {
      filterObj['unit_no'] = { _eq: query.unit };
    }
    const filterString = JSON.stringify(filterObj);
    const getQuery = `trs_driver?fields=*&filter=${filterString}`;
    try {
      const result = await firstValueFrom(
        this.httpService.get(`/items/${getQuery}`),
      );
      // console.log(result.data);
      return result?.data?.data || [];
    } catch (error) {
      console.log('error get menupage');
      return error;
    }
  }

  async findSupply(id: number) {
    const getQuery = `med_seperate/${id}?fields=supply.med_supply_id.*`;
    try {
      const result = await firstValueFrom(
        this.httpService.get(`/items/${getQuery}`),
      );
      // console.log(result.data);
      if (result?.data?.data?.supply?.length > 0) {
        const resSupply = Promise.all(
          result?.data?.data?.supply?.map(async (a: any) => {
            const res = await this.findSupplyId({
              item_id: a.med_supply_id.item_id,
            });
            return {
              ...a,
              detail: res[0] || {},
            };
          }),
        );
        return resSupply;
      } else {
        return [];
      }
      return result?.data?.data?.supply || [];
    } catch (error) {
      console.log('error get menupage');
      return error;
    }
  }

  async findSupplyId(query: any) {
    try {
      const result = await this.supplyItem
        .createQueryBuilder('si')
        .leftJoinAndSelect('si.supply_spec', 'supply_spec')
        .leftJoinAndSelect('si.slcSupplyItemFiles', 'files')
        .leftJoinAndSelect('supply_spec.supply', 'supply')
        .leftJoinAndSelect('supply.toa', 'toa')
        .leftJoinAndSelect('toa.supply_group', 'group')
        .leftJoinAndSelect('toa.supply_sub_group', 'sub_group')
        .where(
          `si.is_active=1
          ${(query?.unit_no && ` AND si.unit_no='${query?.unit_no}'`) || ''}
          ${
            (query?.sub_group &&
              `AND toa.supply_sub_group='${query?.sub_group}'`) ||
            ''
          }
          ${(query?.item_id && `AND si.id='${query?.item_id}'`) || ''}
          `,
        )
        .getMany();

      // console.log('rrrr', result);
      return result;
    } catch (error) {
      console.log('error', error);
      return error;
    }
  }

  async findSupplyOption(query: any) {
    try {
      const result = await this.supplyItem
        .createQueryBuilder('si')
        .leftJoinAndSelect('si.supply_spec', 'supply_spec')
        .leftJoinAndSelect('si.slcSupplyItemFiles', 'files')
        .leftJoinAndSelect('supply_spec.supply', 'supply')
        .leftJoinAndSelect('supply.toa', 'toa')
        .leftJoinAndSelect('toa.supply_group', 'group')
        .leftJoinAndSelect('toa.supply_sub_group', 'sub_group')
        .where(
          `toa.supply_group=4 AND si.is_active=1
          ${(query?.unit_no && `AND si.unit_no='${query?.unit_no}'`) || ''}
          ${
            (query?.sub_group &&
              `AND toa.supply_sub_group='${query?.sub_group}'`) ||
            ''
          }
          ${(query?.item_id && `AND si.id='${query?.item_id}'`) || ''}
          `,
        )
        .getMany();

      // console.log('rrrr', result);
      return result;
    } catch (error) {
      console.log('error', error);
      return error;
    }
  }

  async findVehicle(id: number) {
    const getQuery = `trs_ledger/${id}?fields=vehicle.id,vehicle.trs_vehicle_id.*`;
    try {
      const result = await firstValueFrom(
        this.httpService.get(`/items/${getQuery}`),
      );
      if (result?.data?.data?.vehicle?.length > 0) {
        const resVh = Promise.all(
          result?.data?.data?.vehicle?.map(async (a: any) => {
            return {
              ...a,
              // detail: await this.vehicleService.findsupply(
              //   a.med_ambulance_id.item_id,
              // ),
            };
          }),
        );
        return resVh;
      } else {
        return [];
      }
      // console.log(result.data);
      return result?.data?.data?.ambulance || [];
    } catch (error) {
      console.log('error get menupage');
      return error;
    }
  }

  async findVehicleOption(query: any) {
    return await this.trsVehicleRepo
      .query(`select  srsis.status as status,srsis.id as status_id,srst.id as source_id,srst.[type] as source,
      min(smit.id) as images,min(df.id ) as img
           ,df.description ,ssiav.attribute_value as license,
            ssi.name as item,ssi.id as item_id ,ssi.unit_no as unit_no,sss.name as spec,
            sss.id as spec_id ,ss.id as type_id, ss.supply_name as type from dbo.slc_supply_item ssi 
            left join dbo.slc_supply_spec sss on ssi.supply_spec_id = sss.id 
            left join dbo.slc_supply ss on sss.supply_id = ss.id 
            left join dbo.slc_toa st on st.id = ss.toa_id 
            left join dbo.slc_refs_supply_sub_type srsst on st.supply_sub_type_id = srsst.id 
            left join dbo.slc_supply_item_files_1 ssif on ssif.slc_supply_item_id = ssi.id 
            left join dbo.directus_files df on df.id = ssif.directus_files_id 
            left join dbo.slc_master_image_type smit on smit.id = ssif.master_image_type_id 
            left join dbo.slc_refs_supply_item_status srsis on srsis.id = ssi.supply_item_status_id 
            left join dbo.slc_supply_source sss2 on sss2.supply_item_id = ssi.id 
            left join dbo.slc_refs_source_type srst on srst.id = sss2.source_type_id 
            left join dbo.slc_refs_supply_sub_detail srssd on srssd.sub_type_id = srsst.id  
            left join dbo.slc_supply_item_attribute_value ssiav on ssiav.supply_item_id = ssi.id 
            left join dbo.slc_supply_item_attribute ssia on ssia.id = ssiav.supply_item_attribute_id 
            left join dbo.slc_master_attribute_keyword smak on smak.id = ssia.attribute_keyword_id 
            where srsst.id = 9 and ssi.is_active = 1 and srssd.[key] =1 and smak.id =21 ${
              query.unit && `and ssi.unit_no in (${[query.unit]})`
            }
            group by ssiav.attribute_name,srsis.status,srsis.id,df.description,ssiav.attribute_value,ssi.name,
            ssi.id,sss.name,sss.id,ss.id,ss.supply_name,srst.id,srst.[type] ,ssi.unit_no`);
  }

  async findOne(id: string) {
    const getQuery = `trs_ledger/${id}?ields=*}`;
    // return getQuery;
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

  async create(createLedgerDto: CreateLedgerDto) {
    const getQuery = `trs_ledger`;
    createLedgerDto.is_active = true;
    createLedgerDto.create_by_id = createLedgerDto?.request_by?.id || '';
    createLedgerDto.create_by = createLedgerDto?.request_by?.displayname || '';
    createLedgerDto.create_date = now();

    createLedgerDto.update_by_id = createLedgerDto?.request_by?.id || '';
    createLedgerDto.update_by = createLedgerDto?.request_by?.displayname || '';
    createLedgerDto.update_date = now();
    // return getQuery;
    try {
      const result = await firstValueFrom(
        this.httpService.post(`/items/${getQuery}`, createLedgerDto),
      );
      // console.log(result.data);
      return result?.data?.data || [];
    } catch (error) {
      console.log('error get menupage');
      return [];
    }
  }

  async update(id: number, updateLedgerDto: UpdateLedgerDto) {
    const getQuery = `trs_ledger/${id}`;
    updateLedgerDto.update_by_id = updateLedgerDto?.request_by?.id || '';
    updateLedgerDto.update_by = updateLedgerDto?.request_by?.displayname || '';
    updateLedgerDto.update_date = now();

    // console.log('--', updateLedgerDto);
    // return getQuery;
    try {
      const result = await firstValueFrom(
        this.httpService.patch(`/items/${getQuery}`, updateLedgerDto),
      );
      // console.log(result.data);
      return result?.data?.data || [];
    } catch (error) {
      console.log('error get menupage');
      return error;
    }
  }

  async remove(id: string, updateLedgerDto: UpdateLedgerDto) {
    const getQuery = `trs_ledger/${id}`;
    updateLedgerDto.update_by_id = updateLedgerDto?.request_by?.id || '';
    updateLedgerDto.update_by = updateLedgerDto?.request_by?.displayname || '';
    updateLedgerDto.update_date = now();
    updateLedgerDto.is_active = false;
    // console.log(updateLedgerDto.person_id);
    // return getQuery;
    try {
      const result = await firstValueFrom(
        this.httpService.patch(`/items/${getQuery}`, updateLedgerDto),
      );
      // console.log(result.data);
      return result?.data?.data || [];
    } catch (error) {
      console.log('error get menupage');
      return error;
    }
  }
}
