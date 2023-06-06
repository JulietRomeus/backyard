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

export class CreateExampleDto extends RequestByDto {
  @IsString()
  @ApiProperty({
    required: true,
    example: 'ชื่อ',
  })
  firstname: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    required: false,
    example: 'นามสกุล',
  })
  lastname: string;

  @IsString()
  @ApiProperty({
    required: true,
    example: 'ชื่อผู้ใช้',
  })
  username: string;
}
