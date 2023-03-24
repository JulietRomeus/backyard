import { Injectable } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { HttpService } from '@nestjs/axios';
import { InjectRepository } from '@nestjs/typeorm';
import { trsTransaction, slcSupply, slcSupplySpec,trsVehicle } from '../../entities/Index';
import { Repository, Brackets, Not } from 'typeorm';
import { firstValueFrom } from 'rxjs';

Injectable();
export class VehicleService {
  constructor(
    @InjectRepository(trsTransaction, 'MSSQL_CONNECTION')
    // private trsTransactionRepo: Repository<trsTransaction>,
    private trsVehicleRepo: Repository<trsVehicle>,
  ) {}

  async findAll() {
    return await this.trsVehicleRepo.query(
      'select srsis.status as status,srsis.id as status_id,srst.id as source_id,srst.[type] as source,min(smit.id) as images,min(df.id ) as img,max(ta.start_date) as start_date,df.description ,ssiav.attribute_value as license,ssi.name as item,ssi.id as item_id ,sss.name as spec,sss.id as spec_id ,ss.id as type_id, ss.supply_name as type from dbo.slc_supply_item_attribute_value ssiav left join dbo.slc_supply_item ssi on ssiav.supply_item_id = ssi.id left join dbo.slc_supply_spec sss on ssi.supply_spec_id = sss.id left join dbo.slc_supply ss on sss.supply_id = ss.id left join dbo.slc_toa st on st.id = ss.toa_id left join dbo.slc_refs_supply_sub_type srsst on st.supply_sub_type_id = srsst.id left join dbo.slc_supply_item_files_1 ssif on ssif.slc_supply_item_id = ssi.id left join dbo.directus_files df on df.id = ssif.directus_files_id left join dbo.slc_master_image_type smit on smit.id = ssif.master_image_type_id left join dbo.slc_refs_supply_item_status srsis on srsis.id = ssi.supply_item_status_id left join dbo.trs_activity_vehicle_driver tavd on tavd.vehicle = ssi.id left join dbo.trs_activity ta on ta.id = tavd.activity left join dbo.slc_supply_source sss2 on sss2.supply_item_id = ssi.id left join dbo.slc_refs_source_type srst on srst.id = sss2.source_type_id where srsst.id = 9 and ssi.is_active = 1 group by srsis.status,srsis.id,df.description,ssiav.attribute_value,ssi.name,ssi.id,sss.name,sss.id,ss.id,ss.supply_name,srst.id,srst.[type]'
    );
  }

  // async findOptiontype() {
  //   return await this.trsVehicleRepo
  //     .createQueryBuilder('d')
  //     .where('d.is_active = 1')
  //     .getMany();
  // }
}
