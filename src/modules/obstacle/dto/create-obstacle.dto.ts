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

export class CreateObstacleDto extends RequestByDto  {

    @IsString()
    @IsOptional() //
    @ApiProperty({
      example: 'ชื่ออุปสรรคเส้นทาง',
    })
    'title': string;

    @IsString()
    @IsOptional() //
    @ApiProperty({
      example: 'ประเภทอุปสรรคเส้นทาง',
    })
    'obstacle_type_id': number;

    @IsString()
    @IsOptional() //
    @ApiProperty({
      example: 'สถานะอุปสรรคเส้นทาง',
    })
    'obstacle_status': number;

    @IsString()
    @IsOptional() //
    @ApiProperty({
      example: 'วันที่เริ่ม',
    })
    'start_date': Date;

    @IsString()
    @IsOptional() //
    @ApiProperty({
      example: 'วันที่สิ้นสุด',
    })
    'end_date': Date;

    @IsString()
    @IsOptional() //
    @ApiProperty({
      example: 'รหัสจังหวัด',
    })
    'province_code': string;


    @IsString()
    @IsOptional() //
    @ApiProperty({
      example: 'รหัสอำเภอ',
    })
    'amphoe_code': string;


    @IsString()
    @IsOptional() //
    @ApiProperty({
      example: 'รหัสตำบล',
    })
    'tambon_code': string;

    @IsString()
    @IsOptional() //
    @ApiProperty({
      example: 'ชื่อจังหวัด',
    })
    'province_name': string;


    @IsString()
    @IsOptional() //
    @ApiProperty({
      example: 'ชื่ออำเภอ',
    })
    'amphoe_name': string;


    @IsString()
    @IsOptional() //
    @ApiProperty({
      example: 'ชื่อตำบล',
    })
    'tambon_name': string;

    @IsString()
    @IsOptional() //
    @ApiProperty({
      example: 'รหัสหมู่บ้าน',
    })
    'mooban_code': string;


    @IsString()
    @IsOptional() //
    @ApiProperty({
      example: 'ละจิจูด',
    })
    'lat': number;

    @IsString()
    @IsOptional() //
    @ApiProperty({
      example: 'ลองจิจูด',
    })
    'long': number;
}
