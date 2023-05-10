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

export class CreateDriverDto extends RequestByDto {
  @IsString()
  @IsOptional() //
  @ApiProperty({
    example: 'รูป',
  })
  'img': string;

  @IsString()
  @IsOptional() //
  @ApiProperty({
    example: 'idคนขับ',
  })
  'driver_id': string;

  @IsString()
  @IsOptional() //
  @ApiProperty({
    example: 'ชื่อจริงพลขับ',
  })
  'firstname': string;

  @IsString()
  @IsOptional() //
  @ApiProperty({
    example: 'นามสกุลพลขับ',
  })
  'lastname': string;

  @IsString()
  @IsOptional() //
  @ApiProperty({
    example: 'อายุพลขับ',
  })
  'age': string;

  @IsString()
  @IsOptional() //
  @ApiProperty({
    example: 'ศาสนาลพลขับ',
  })
  'religion': string;

  @IsString()
  @IsOptional() //
  @ApiProperty({
    example: 'เชื้อชาติพลขับ',
  })
  'nationality': string;

  @IsString()
  @IsOptional() //
  @ApiProperty({
    example: 'สัญชาติพลขับ',
  })
  'race': string;

  @IsString()
  @IsOptional() //
  @ApiProperty({
    example: 'สังกัดพลขับ',
  })
  'organization': string;

  @IsString()
  @IsOptional() //
  @ApiProperty({
    example: 'โทรศัพท์พลขับ',
  })
  'tel': string;

  @IsString()
  @IsOptional() //
  @ApiProperty({
    example: 'หน่วยงานพลขับ',
  })
  'unit_no': string;

  @IsString()
  @IsOptional() //
  @ApiProperty({
    example: 'หน้าที่พลขับ',
  })
  'roles': string;

  @IsString()
  @IsOptional() //
  @ApiProperty({
    example: 'emailพลขับ',
  })
  'email': string;

  @IsString()
  @IsOptional() //
  @ApiProperty({
    example: 'ชื่อหน่วยพลขับ',
  })
  'unit_name': string;

  @IsArray()
  @IsOptional()
  @ApiProperty({
    example: 'รายชื่อพลขับ',
  })
  trs_driver_license_lists: {
    license_id: number;
    issue_date: Date;
    expire_date: Date;
  }[];

  @IsString()
  @IsOptional() //
  @ApiProperty({
    example: 'สถานะพลขับ',
  })
  'driver_status': {
    id: number;
  };
}
