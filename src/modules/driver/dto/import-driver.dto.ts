import { Role } from './../../../entities/role.entity';
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
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { trsDriver } from 'src/entities/TrsDriver.entity';
import { trsDriverLicenseList } from 'src/entities/TrsDriverLicenseList.entity';
import { User } from 'src/entities/user.entity';
import { Unit } from 'src/entities/unit.entity';


export class trsDriverUser extends trsDriver {
    idp:string
}
export class ImportDriverChunkDto extends RequestByDto  {


    @ValidateNested({ each: true })
    // @Type(() => ImportDriverDto)
    // @IsOptional() 
    data:ImportDriverDto[]

    static toUser(data:trsDriverUser):User{

            let tempUser  = new User()
            
            let roles = new Role()

            tempUser.idCard = data.idp
            tempUser.firstname = data.firstname
            tempUser.lastname = data.lastname
            tempUser.email = data.email
            // tempUser. = data['เลขบัตรประจำตัวประชาชน']
            // tempUser,
            // tempUser.age = data['อายุ']
            // tempUser.email = data['email']
            return tempUser

    }
    static toDriver(data:ImportDriverDto[]):trsDriverUser[]{

        return data.map((rec:ImportDriverDto)=>{
            let tempDirever  = new trsDriverUser()
            let tempLicenses = new trsDriverLicenseList() 
            tempDirever.firstname = rec['ชื่อ ']
            tempDirever.lastname = rec['นามสกุล']
            tempDirever.idp = rec['เลขบัตรประจำตัวประชาชน']
            tempDirever.age = rec['อายุ']
            tempDirever.email = rec['email']
            tempDirever.unit_no = rec['unit_no']

            const tempLicenses1 = new trsDriverLicenseList()
            tempLicenses1.license_id = rec.license_type_id1
            tempLicenses1.issue_date = new Date(rec['วันออกบัตร(ใบขับขี่หลัก)'])
            tempLicenses1.expire_date =  new Date(rec['วันหมดอายุ(ใบขับขี่หลัก)'])

            const tempLicenses2 = new trsDriverLicenseList()
            tempLicenses2.license_id = rec.license_type_id2
            tempLicenses2.issue_date = new Date(rec['วันออกบัตร(ใบขับขี่พิเศษ)'])
            tempLicenses2.expire_date =  new Date(rec['วันหมดอายุ(ใบขับขี่พิเศษ)'])

            tempLicenses[0] = tempLicenses1
            tempLicenses[1] = tempLicenses2

            tempDirever.trs_driver_license_lists = [tempLicenses1,tempLicenses2]
            
            return tempDirever

        })

    }

}



export class ImportDriverDto  {

    @IsString()
    @IsOptional() 
    firstname:string
    // 'ชื่อ ' :string
    @IsString()
    @IsOptional() 
    lastname:string
    // 'นามสกุล':string

    @IsString()
    @IsOptional() 
    id_card:string
    // 'เลขบัตรประจำตัวประชาชน':string

    @IsString()
    @IsOptional() 
    position:string
    // 'ตำแหน่ง':string

    @IsString()
    @IsOptional() 
    unit_name:string
    // 'หน่วยงาน':string

    
    @IsString()
    @IsOptional() 
    unit_no:string


    @IsString()
    @IsOptional() 
    email:string

    @IsString()
    @IsOptional() 
    age:number
    // 'อายุ':number

    @IsString()
    @IsOptional() 
    religion:string
    // 'ศาสนา':string

    @IsString()
    @IsOptional() 
    nationality:string
    // 'เชื้อชาติ':string

    @IsString()
    @IsOptional() 
    organization: string
    // 'สังกัด':string

    @IsNumber()
    @IsOptional() 
    organization_id: number

    @IsString()
    @IsOptional() 
    main_license:string

    @IsString()
    @IsOptional() 
    license_type_id1:string

    // @IsString()
    // @IsOptional() 
    // 'วันออกบัตร(ใบขับขี่หลัก)':number

    // @IsString()
    // @IsOptional() 
    // 'วันหมดอายุ(ใบขับขี่หลัก)':number

    // @IsString()
    // @IsOptional() 
    // 'ใบขับขี่พิเศษ':string

    @IsString()
    @IsOptional() 
    license_type_id2:string

    // @IsString()
    // @IsOptional() 
    // 'วันออกบัตร(ใบขับขี่พิเศษ)':number

    // @IsString()
    // @IsOptional()
    // 'วันหมดอายุ(ใบขับขี่พิเศษ)':number


}



