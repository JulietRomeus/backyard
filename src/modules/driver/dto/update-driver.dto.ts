import { PartialType } from '@nestjs/mapped-types';
import { CreateDriverDto } from './create-driver.dto';
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

export class UpdateDriverDto extends PartialType(CreateDriverDto) {
    @IsObject()
    @IsOptional()
    id: number;

    @IsArray()
    @IsOptional()
    @ApiProperty({
      example: 'รายชื่อพลขับ',
    })
    
    trs_driver_license_lists: {
        id:number;
      license_id: number;
      issue_date: Date;
      expire_date: Date;
    }[];


}
