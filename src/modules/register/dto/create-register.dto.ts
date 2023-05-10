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

export class CreateRegisterDto extends RequestByDto   {
    @IsString()
    @ApiProperty({
      example: 'ชื่อประเภทรถจดทะเบียน',
    })
    'vehicle_class_name': string;

    @IsString()
    @ApiProperty({
      example: 'วิธีการจัดซื้อ',
    })
    'purchase_method': string;

    @IsString()
    @ApiProperty({
      example: 'จัดซื้อในนาม',
    })
    'purchase_from': string;

    @IsString()
    @ApiProperty({
      example: 'จำนวนเงิน',
    })
    'purchase_price': number;

    @IsString()
    @ApiProperty({
      example: 'หมายเลขจัดซื้อ',
    })
    'purchase_no': string;


    @IsString()
    @ApiProperty({
      example: 'วันที่ส่งมอบ',
    })
    'deliver_date': Date;

    @IsString()
    @ApiProperty({
      example: 'จุดประสงค์',
    })
    'purpose': string;


    @IsString()
    @ApiProperty({
      example: 'รายละเอียดการซื้อ',
    })
    'purchase_detail': string;

    @IsString()
    @ApiProperty({
      example: 'ดำเนินการโดย',
    })
    'process_by_name': string;

    @IsString()
    @ApiProperty({
      example: 'จดทะเบียนในนาม',
    })
    'named_register': string;

    @IsString()
    @ApiProperty({
      example: 'หน่วยงาน',
    })
    'unit_no': string;

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
      example: 'ชื่อถนน',
    })
    'road': string;

    @IsString()
    @IsOptional() //
    @ApiProperty({
      example: 'หมู่',
    })
    'moo': string;

    @IsString()
    @IsOptional() //
    @ApiProperty({
      example: 'รหัสบ้าน',
    })
    'house_id': string;

    @IsString()
    @IsOptional() //
    @ApiProperty({
      example: 'รายละเอียดจดทะเบียน',
    })
    'regis_detail': string;

    @IsArray()
    @IsOptional()
    @ApiProperty({
      example: 'รายการยานพาหนะ',
    })
    trs_regis_detail_no: {
      vehicle_type: string;
      vehicle_spec: string;
      engine_no: string;
      vehicle_brand: string;
      vehicle_brand_model: string;
      car_regis_no: string;
      defined_mil_vehicle_type: string;
      mil_regis_no: string;
    }[];

    @IsNumber()
    @IsOptional() //
    @ApiProperty({
      example: 'สถานะการจดทะเบียน',
    })
    trs_regis_status_no:{
      id:number

    }

    @IsNumber()
    @IsOptional() //
    @ApiProperty({
      example: 'สถานะฟอร์มการจดททะเบียน',
    })
    trs_regis_statusform_no:{
      id:string

    }


    @IsString()
    @IsOptional() //
    @ApiProperty({
      example: 'เลขสัญญา',
    })
    'contract_id': number;



    
  


}
