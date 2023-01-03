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

export class RequestActivityDto extends RequestByDto {
  @IsArray()
  unit_response: {
    id: number;
    is_delete: boolean;
    is_manager: boolean;
    activity: number;
    create_by: string;
    create_by_name: string;
    update_by: string;
    update_by_name: string;
    review_by: string;
    review_by_name: string;
    approve_by: string;
    approve_by_name: string;
    create_date: Date;
    update_date: Date;
    review_date: Date;
    approve_date: Date;
    sendback_by: string;
    sendback_by_name: string;
    sendback_comment: string;
    sendback_date: Date;
    unit_code: string;
    req_unit_code: string;
    status: string;
    detail: string;
  }[];
}
