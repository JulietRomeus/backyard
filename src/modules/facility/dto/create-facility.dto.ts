
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
export class CreateFacilityDto  extends RequestByDto {

    @IsString()
    @IsOptional() //
    @ApiProperty({
      example: 'ประเภทสิ่งอำนวยความสะดวก',
    })
    'facility_type': number;

    @IsString()
    @IsOptional() //
    @ApiProperty({
      example: 'ชื่อสิ่งอำนวยความสะดวก',
    })
    'facility_name': string;

    @IsString()
    @IsOptional() //
    @ApiProperty({
      example: 'ละจิจูด',
    })
    'lat': number;

    @IsString()
    @IsOptional() //
    @ApiProperty({
      example: 'ละจิจูด',
    })
    'long': number;

    @IsString()
    @IsOptional() //
    @ApiProperty({
      example: 'ละจิจูด',
    })
    'detail': string;

    @IsString()
    @IsOptional() //
    @ApiProperty({
      example: 'ชื่อประเภทสิ่งอำนวยความสะดวก',
    })
    'facility_type_name': string;

    // @IsString()
    // @IsOptional() //
    // @ApiProperty({
    //   example: 'สร้างโดย',
    // })
    // 'create_by': string;

    // @IsString()
    // @IsOptional() //
    // @ApiProperty({
    //   example: 'idผู้สร้าง',
    // })
    // 'create_by_id': string;

    // @IsString()
    // @IsOptional() //
    // @ApiProperty({
    //   example: 'วันที่ร้าง',
    // })
    // 'create_date': Date;

    // @IsString()
    // @IsOptional() //
    // @ApiProperty({
    //   example: 'อัพเดยโดย',
    // })
    // 'update_by': string;

    // @IsString()
    // @IsOptional() //
    // @ApiProperty({
    //   example: 'idผู้อัพเดต',
    // })
    // 'update_by_id': string;

    // @IsString()
    // @IsOptional() //
    // @ApiProperty({
    //   example: 'วันที่update',
    // })
    // 'update_date': Date;

    










}
