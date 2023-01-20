import { PartialType } from '@nestjs/swagger';
import { CreateRegisterDto } from './create-register.dto';
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
  
export class UpdateRegisterDto extends PartialType(CreateRegisterDto) {
    @IsString()
    @ApiProperty({
      example: 'ขอสนับสนุนรถยนต์',
    })
    'name': string;

}
