import { Injectable } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { HttpService } from '@nestjs/axios';
import { InjectRepository } from '@nestjs/typeorm';
import {
  trsTransaction,
  slcSupply,
  slcSupplySpec
} from '../../entities/Index';
import { Repository, Brackets, Not } from 'typeorm';
import { firstValueFrom } from 'rxjs';

Injectable()
export class VehicleService {
  constructor(
    @InjectRepository(trsTransaction, 'MSSQL_CONNECTION')
    private trsTransactionRepo: Repository<trsTransaction>,

  ) {}

  async findAll() {
      return await this.trsTransactionRepo.query(
        'select min(df.id ) as img,rrs.status_name as status,max(ta.start_date) as start_date,df.description ,ssiav.attribute_value as license,ssi.name as item,sss.name as spec,ss.supply_name as type from dbo.slc_supply_item_attribute_value ssiav left join dbo.slc_supply_item ssi on ssiav.supply_item_id = ssi.id left join dbo.slc_supply_spec sss on ssi.supply_spec_id = sss.id left join dbo.slc_supply ss on sss.supply_id = ss.id left join dbo.slc_toa st on st.id = ss.toa_id left join dbo.slc_refs_supply_sub_type srsst on st.supply_sub_type_id = srsst.id left join dbo.slc_supply_item_files_1 ssif on ssif.slc_supply_item_id = ssi.id left join dbo.directus_files df on df.id = ssif.directus_files_id left join dbo.slc_master_image_type smit on smit.id = ssif.master_image_type_id left join dbo.rep_maintenance rm on rm.supply_item_id = ssi.id left join dbo.rep_repair_status rrs on rm.repair_status_id = rrs.id left join dbo.trs_activity_vehicle_driver tavd on tavd.vehicle = ssi.id left join dbo.trs_activity ta on ta.id = tavd.activity where srsst.id = 9 and ssi.is_active = 1 group by df.description,ssiav.attribute_value,ssi.name,sss.name,ss.supply_name,rm.repair_status_id ,rrs.status_name ',
      );
    }
      
  }
     