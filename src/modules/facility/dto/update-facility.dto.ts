import { PartialType } from '@nestjs/mapped-types';
import { CreateFacilityDto } from './create-facility.dto';
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

export class UpdateFacilityDto extends PartialType(CreateFacilityDto) {
    @IsObject()
    @IsOptional()
    id: number;




}
