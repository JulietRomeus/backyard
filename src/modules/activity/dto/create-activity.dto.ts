import { RequestByDto } from '../../../common/interfaces/requestBy.dto';
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

export class CreateActivityDto extends RequestByDto {
  @IsString()
  @ApiProperty({
    example: 'ขอสนับสนุนรถยนต์',
  })
  'name': string;
  @IsString()
  'detail': string;
  @IsString()
  'unit_request_code': string;
  'unit_request_name': string;

  @IsString()
  'unit_response_code': string;
  'unit_response_name': string;

  @IsNumber()
  'round': number;

  @IsDateString()
  'activity_start_date': Date;

  @IsDateString()
  'activity_end_date': Date;

  @IsDateString()
  @IsOptional()
  'start_date': Date;

  @IsDateString()
  @IsOptional()
  'finish_date': Date;

  @IsOptional()
  @IsBoolean()
  'is_back': boolean;

  @IsString()
  @IsOptional()
  'comment': string;

  @IsString()
  @IsOptional()
  'sendback_comment': string;

  @IsString()
  'action_type': string;

  @IsObject()
  'activity_type': { id: number };

  @IsArray()
  route: {
    id: number;
    order: number;
    start_date: Date;
    name: string;
    region_code: number;
    province_code: number;
    province_name: string;
    amphoe_code: number;
    amphoe_name: string;
    tambon_code: number;
    tambon_name: string;
    mooban_code: number;
    mooban_name: string;
    latitude: number;
    longitude: number;
  }[];

  @IsArray()
  vehicle_driver: {
    id: number;
    sort: number;
    activity: number;
    controller: string;
    vehicle: {
      id: number;
      vehicle_type: 1;
      is_available: boolean;
      license_plate: string;
      main_driver: {
        id: number;
        driver_id: string;
        driver_name: string;
      };
    };
    driver: {
      id: number;
      driver_id: string;
      driver_name: string;
      driver_license: string[];
    };
  }[];

  @IsArray()
  convoy: {
    order: number;
    controller: string;
    name: string;
    color: string;
    route: {
      id: number;
      order: number;
      start_date: Date;
      name: string;
      region_code: number;
      province_code: number;
      province_name: string;
      amphoe_code: number;
      amphoe_name: string;
      tambon_code: number;
      tambon_name: string;
      mooban_code: number;
      mooban_name: string;
      latitude: number;
      longitude: number;
    }[];
    vehicle_driver: {
      id: number;
      sort: number;
      activity: number;
      controller: string;
      unit_code: string;
      vehicle: {
        id: number;
        vehicle_type: 1;
        is_available: boolean;
        license_plate: string;
        main_driver: {
          id: number;
          driver_id: string;
          driver_name: string;
        };
      };
      driver: {
        id: number;
        driver_id: string;
        driver_name: string;
        driver_license: string[];
      };
    }[];
  }[];

  @IsArray()
  @IsOptional()
  files: {
    id: number;
    name: string;
    order: number;
    create_date: Date;
    create_by: string;
    create_by_name: string;
    files: {
      id: number;
      trs_activity_files_id: number;
      directus_files_id: {
        id: string;
        storage: string;
        filename_disk: string;
        filename_download: string;
        title: string;
        type: string;
        folder: string;
      };
    }[];
  }[];

  @IsArray()
  unit_response: {
    id: number;
    is_delete: boolean;
    is_manager: boolean;
    activity: number;
    update_by: string;
    update_by_name: string;
    review_by: string;
    review_by_name: string;
    approve_by: string;
    approve_by_name: string;
    update_date: Date;
    review_date: Date;
    approve_date: Date;
    sendback_by: string;
    sendback_by_name: string;
    sendback_comment: string;
    sendback_date: Date;
    unit_no: string;
    unit_name: string;
    req_unit_code: string;
    status: string;
    detail: string;
  }[];

  'activity_status': string;
  'req_create_date': Date;
  'req_create_by': string;
  'req_create_by_name': string;
  'req_update_date': Date;
  'req_update_by': string;
  'req_update_by_name': string;
  'req_review_date': Date;
  'req_review_by': string;
  'req_review_by_name': string;
  'req_approve_date': Date;
  'req_approve_by': string;
  'req_approve_by_name': string;
  'resp_update_date': Date;
  'resp_update_by': string;
  'resp_update_by_name': string;
  'resp_review_date': Date;
  'resp_review_by': string;
  'resp_review_by_name': string;
  'resp_approve_date': Date;
  'resp_approve_by': string;
  'resp_approve_by_name': string;
  'sendback_date': Date;
  'sendback_by': string;
  'sendback_by_name': string;
}
