import { PartialType } from '@nestjs/mapped-types';
import { CreateObstacleDto } from './create-obstacle.dto';
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
export class UpdateObstacleDto extends CreateObstacleDto {

    @IsObject()
    @IsOptional()
    id: number;








}
