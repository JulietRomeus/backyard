import { Injectable } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { HttpService } from '@nestjs/axios';
import { InjectRepository } from '@nestjs/typeorm';
import {
  trsTransaction,
  slcSupply,
  slcSupplySpec,
  trsVehicle,
} from '../../entities/Index';
import { Repository, Brackets, Not } from 'typeorm';
import { firstValueFrom } from 'rxjs';

Injectable();
export class VehicleService {
  constructor(
    @InjectRepository(trsTransaction, 'MSSQL_CONNECTION')
    private trsVehicleRepo: Repository<trsTransaction>,
    @InjectRepository(slcSupply, 'MSSQL_CONNECTION')
    private slcSupplyRepo: Repository<slcSupply>,
  ) {}

  async findAll(body: any) {
    // console.log('body', body);
    // const unit_no=body.request_by.units?.map((r:any)=>`${r.code}`)
    const unit_no = body?.request_by?.activeUnit?.code || '';

    return await this.trsVehicleRepo.query(
      `select  srsis.status as status,srsis.id as status_id,srst.id as source_id,srst.[type] as source,
      min(smit.id) as images,min(df.id ) as img
           ,df.description ,ssiav.attribute_value as license,
            ssi.name as item,ssi.id as id ,ssi.unit_no as unit_no,sss.name as spec,
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
            where srsst.id = 9 and ssi.is_active = 1 and srssd.[key] =1 and smak.id =21 and ssi.unit_no in (${unit_no})
            group by ssiav.attribute_name,srsis.status,srsis.id,df.description,ssiav.attribute_value,ssi.name,
            ssi.id,sss.name,sss.id,ss.id,ss.supply_name,srst.id,srst.[type] ,ssi.unit_no`,
    );
  }

  // async findsupply() {
  //   return await this.slcSupplyRepo
  //     .createQueryBuilder('d')
  //     .where('d.is_active = 1')
  //     .leftJoinAndSelect('d.toa', 'st', 'st.is_active = 1')
  //     .leftJoinAndSelect(
  //       'st.supply_sub_type',
  //       'srsst',
  //       'srsst.is_active = 1 and srsst.id = 9',
  //     )
  //     .leftJoinAndSelect(
  //       'srsst.slc_refs_supply_sub_details',
  //       'srssd',
  //       'srssd.key = 1 and srssd.id = 4',
  //     )
  //     .andWhere(
  //       'srsst.is_active = 1 and srsst.id = 9 and srssd.key = 1 and srssd.id = 4',
  //     )

  //     // .getQuery()
  //     .getMany();
  // }
  async findsupply() {
    return await this.trsVehicleRepo.query(
      `select ss.id ,ss.supply_name  from slc_supply ss
      left join slc_toa st on st.id = ss.toa_id
      left join slc_refs_supply_sub_type srsst on st.supply_sub_type_id = srsst.id
      left join slc_refs_supply_sub_detail srssd on srsst.id = srssd.sub_type_id
      where srssd.[key] =1 and srssd.id =4 and ss.is_active = 1 and st.is_active =1 and srsst.is_active =1 and srssd.is_active =1`,
    );
  }

  async optionbrand(id: any) {
    return await this.trsVehicleRepo.query(
      `select smat.id as att_id,smat.[type] as att_type,smatd.id as att_value_id,smatd.[type] as att_value,ss.id as supply_id,ss.supply_name as supply_name from slc_master_attribute_type smat 
        left join slc_master_attribute_type_detail smatd on smatd.master_attribute_type_id = smat.id
        left join slc_refs_supply_sub_type srsst on srsst.id = smatd.supply_sub_type_id 
        left join slc_toa st on st.supply_sub_type_id = srsst.id 
        left join slc_supply ss on ss.toa_id = st.id 
        where srsst.id = 9 and smat.id = 12 and ss.id = ${id} and smat.is_active =1 and smatd.is_active =1 and srsst.is_active =1 and st.is_active =1 and ss.is_active =1`,
    );
  }

  // async optionbrand() {
  //   return await this.slcSupplyRepo
  //     .createQueryBuilder('d')
  //     .where('d.is_active = 1')
  //     .leftJoinAndSelect('d.toa', 'st', 'st.is_active = 1')
  //     .leftJoinAndSelect(
  //       'st.supply_sub_type',
  //       'srsst',
  //       'srsst.is_active = 1 and srsst.id = 9',
  //     )
  //     .leftJoinAndSelect(
  //       'srsst.slc_refs_supply_sub_details',
  //       'srssd',
  //       'srssd.key = 1 and srssd.id = 4',
  //     )
  //     .andWhere(
  //       'srsst.is_active = 1 and srsst.id = 9 and srssd.key = 1 and srssd.id = 4',
  //     )

  //     // .getQuery()
  //     .getMany();
  // }

  async optiongen(ssid: any, parentid: any) {
    console.log(ssid, parentid);
    return await this.trsVehicleRepo.query(
      `select smat.id as att_id,smat.[type] as att_type,smatd.id as att_value_id,smatd.[type] as att_value,smatd2.id as parent_id,ss.id as supply_id,ss.supply_name as supply_name from slc_master_attribute_type smat 
      left join slc_master_attribute_type_detail smatd on smatd.master_attribute_type_id = smat.id
      left join slc_master_attribute_type_detail smatd2 on smatd2.id = smatd.parent_id 
      left join slc_refs_supply_sub_type srsst on srsst.id = smatd.supply_sub_type_id 
      left join slc_toa st on st.supply_sub_type_id = srsst.id 
      left join slc_supply ss on ss.toa_id = st.id 
      where srsst.id = 9 and smat.id = 13 and ss.id = ${ssid} and smatd.is_active = 1 and srsst.is_active = 1 and st.is_active =1 and ss.is_active =1 and smatd2.id =${parentid}`,
    );
  }

  async optionspec(id: any) {
    return await this.trsVehicleRepo.query(
      `select ss.id as supply_id,ss.supply_name as supply_name,
sss.id as spec_id,sss.name as spec_name,ssi.id as item_id,ssi.name as item_name,ssiav.attribute_value as att_value,ssia.id as att_id,ssia.attribute_name as att_name,
smak.id as att_key, smak.keyword 
from slc_supply ss 
left join slc_supply_spec sss on sss.supply_id = ss.id 
left join slc_supply_item ssi on ssi.supply_spec_id = sss.id 
left join slc_supply_item_attribute_value ssiav on ssiav.supply_item_id = ssi.id 
left join slc_supply_item_attribute ssia on ssia.id = ssiav.supply_item_attribute_id 
left join slc_master_attribute_keyword smak on ssia.attribute_keyword_id = smak.id 
where  ss.id = ${id} and smak.id =21 and ss.is_active =1 and sss.is_active =1 and ssi.is_active = 1 and ssiav.is_active =1 and ssia.is_active =1 and smak.is_active =1`,
    );
  }

  // async findbrand() {
  //   return await this.trsVehicleRepo
  //     .createQueryBuilder('d')
  //     .where('d.is_active = 1')
  //     .getMany();
  // }
}
