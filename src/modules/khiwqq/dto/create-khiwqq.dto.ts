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

export class CreateKhiwqqDto {
    @IsString()
    a: string;

    @IsNumber()
    @IsOptional()
    @IsNotEmpty()
    b: number;

    @ArrayMinSize(3)
    c: string[];

    @IsObject()
    @ApiProperty()
    
    d:{
        x:String,
        y:number,
        z:boolean
    }};
