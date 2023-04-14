import { PartialType } from '@nestjs/swagger';
import { CreateActivityDto } from './create-activity.dto';
import {
  ArrayMinSize,
  IsObject,
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsDateString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { RequestByDto } from '../../../common/interfaces/requestBy.dto';

type BeforeActivityForm = {
  id?: number;
  is_delete?: boolean;
  fuel: boolean;
  damaged: boolean;
  engine_composition: boolean;
  vehicle_composition: boolean;
  warmup: boolean;
  process: boolean;
  panel: boolean;
  miles: boolean;
  engine_oil: boolean;
  grease: boolean;
  heat: boolean;
  wheel: boolean;
  remark?: string;
  create_date?: string;
  create_by?: string;
  create_by_name?: string;
  update_date?: Date;
  update_by?: string;
  update_by_name?: string;
  distance?: number;
};

type WhileActivityForm = {
  id?: number;
  is_delete?: boolean;
  panel: boolean;
  miles: boolean;
  fuel: boolean;
  grease: boolean;
  heat: boolean;
  brake: boolean;
  clutch: boolean;
  steering: boolean;
  process: boolean;
  noise: boolean;
  unnormal_effect: boolean;
  remark?: string;
  create_date?: string;
  create_by?: string;
  create_by_name?: string;
  update_date?: Date;
  update_by?: string;
  update_by_name?: string;
};

type AfterActivityForm = {
  id?: number;
  is_delete?: boolean;
  fuel_add?: string;
  fuel_left?: string;
  miles_last?: string;
  clutch: boolean;
  fuel: boolean;
  damaged: boolean;
  panel: boolean;
  miles: boolean;
  engine_oil: boolean;
  heat: boolean;
  engine_composition: boolean;
  vehicle_composition: boolean;
  distilled_water: boolean;
  steering: boolean;
  process: boolean;
  grease: boolean;
  warmup: boolean;
  battery: boolean;
  remark?: string;
  create_date?: Date;
  create_by?: string;
  create_by_name?: string;
  update_date?: Date;
  update_by?: string;
  update_by_name?: string;
};

type stopoverFormType = {
  id?: string | null;
  order?: number | undefined;
  stopover_date?: Date;
  name?: string | null;
  province_code?: string | null;
  amphoe_code?: string | null;
  tambon_code?: string | null;
  mooban_code?: string | null;
  lat?: number | undefined;
  long?: number | undefined;
  miles_number?: number | undefined;
  refuel?: number | undefined;
  budgets?: number | undefined;
  note?: string | undefined;
};

type helpFormType = {
  id?: string | null;
  order?: number | undefined;
  incident_date?: Date;
  name?: string | null;
  province_code?: string | null;
  amphoe_code?: string | null;
  tambon_code?: string | null;
  mooban_code?: string | null;
  lat?: number | undefined;
  long?: number | undefined;
  note?: string | undefined;
  type?: number;
  miles_number?: number | undefined;
};

type personType = {
  id: number | undefined;
  firstname?: string;
  lastname?: string;
  address?: string;
  detail?: string;
  tel?: number;
  accident_form?: number;
};

type accidentType = {
  id?: number;
  is_delete?: boolean;
  accident_date?: Date;
  accident_location?: string;
  lat?: number;
  long?: number;
  accident_location_from?: string;
  accident_location_to?: string;
  use_for?: string;
  vehicle_damage?: string;
  parties_vehicle_brand?: string;
  parties_vehicle_type?: string;
  parties_vehicle_year?: string;
  parties_vehicle_int?: string;
  parties_vehicle_license_int?: string;
  parties_driver_name?: string;
  parties_owncar_name?: string;
  parties_address?: string;
  parties_tel?: string;
  parties_damage?: string;
  thirdparties_damage?: string;
  create_date?: Date;
  create_by?: string;
  create_by_name?: string;
  update_date?: Date;
  update_by?: string;
  update_by_name?: string;
  driver_name?: string;
  parties_vehicle_speed?: number;
  gov_vehicle_speed?: number;
  road_conditions?: string;
  weather?: string;
  road_type?: string;
  environment?: string;
  accident_detail?: string;
  files?: {
    id: number;
    trs_accident_activity_form_id: number;
    directus_files_id: string;
  }[];
  person_gov?: personType[];
  person_wounded?: personType[];
  person_other?: personType[];
  person_witness?: personType[];
  person_helper?: personType[];
};

export class UpdateMissionDto extends RequestByDto {
  @IsObject()
  @IsOptional()
  before_activity_form: BeforeActivityForm;

  @IsObject()
  @IsOptional()
  while_activity_form: WhileActivityForm;

  @IsObject()
  @IsOptional()
  after_activity_form: AfterActivityForm;

  @IsObject()
  @IsOptional()
  accident_activity_form: accidentType;

  @IsArray()
  @IsOptional()
  stopover_activity_form: stopoverFormType[];

  @IsArray()
  @IsOptional()
  help_activity_form: helpFormType[];
}
