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
  @IsString()
  'unit_request_name': string;
  @IsString()
  'unit_response_code': string;
  @IsString()
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
  @IsNumber()
  'activity_type': number;
  @IsArray()
  'route': {
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
  'vehicle_driver': [];

  @IsArray()
  @IsOptional()
  'files': {
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
