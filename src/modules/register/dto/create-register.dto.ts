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

export class CreateRegisterDto {
    @IsString()
    @ApiProperty({
      example: 'ขอสนับสนุนรถยนต์',
    })
    'name': string;


}
