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
export class CreateLedgerDto extends RequestByDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  unit_no: string;

  @IsArray()
  @IsOptional()
  driver: Array<any>;

  @IsArray()
  @IsOptional()
  vehicle: Array<any>;

  is_active: boolean;
  create_by: string;
  create_by_id: string;
  create_date: Date;
  update_by: string;
  update_by_id: string;
  update_date: Date;
}
