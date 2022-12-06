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

export class CreateAomDto {
  @IsString()
  @ApiProperty({
    example: 'ข้อมูล aaaa',
  })
  a: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({
    example: 'ข้อมูล bbbb',
  })
  b: string;

  @ArrayMinSize(3)
  @ApiProperty({
    example: ['1', '2', '3'],
  })
  c: string[];

  @IsObject()
  @ApiProperty({
    example: { x: 's', y: 4, z: true },
  })
  d: {
    x: string;
    y: number;
    z: boolean;
  };
}
