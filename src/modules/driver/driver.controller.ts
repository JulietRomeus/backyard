import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Req
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Permission } from 'src/decorators/permission.decorator';
import { DriverService } from './driver.service';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import genPayload,{stamp,ACTIONTYPE,ForbiddenException} from 'src/utils/payload';
// import { ImportDriverChunkDto } from './dto/import-driver.dto';
import { Response,Request } from 'express';
import { HttpException } from '@nestjs/common';
// import actio
// const route = 'driver';

@Controller('driver')
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  @Post()
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'บันทึกข้อมูลพลขับ' })
  async create(@Body() createDriverDto: any) {
    console.log('createDriverDto',createDriverDto)
    const data = await this.driverService.create(createDriverDto);
    return genPayload(data, null, ACTIONTYPE.CREATE);
  }



  // @Get('activity')
  // // @Permission({ route: route, action: 'view' })
  // @ApiBearerAuth('JWT')
  // @ApiOperation({ summary: 'ดึงข้อมูลพลขับทั้งหมด' })
  // findactivity(@Body() body: any) {
  //   return this.driverService.findactivity(body);
  // }

  @Get()
  // @Permission({ route: route, action: 'view' })
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'ดึงข้อมูลพลขับทั้งหมด' })
  findAll(@Body() body: any) {

    return this.driverService.findAll(body);
  }

  @Get('busy')
  // @Permission({ route: route, action: 'view' })
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'ดึงข้อมูลพลขับและความพร้อมทั้งหมด' })
  busy(@Body() body: any) {

    return this.driverService.findBusy(body);
  }

  @Get('useremail')
  // @Permission({ route: route, action: 'view' })
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'ดึงข้อมูลพลขับemailทั้งหมด' })
  useremail(@Body() body: any) {
    return this.driverService.useremail(body);
  }

  @Get('user')
  // @Permission({ route: route, action: 'view' })
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'ดึงข้อมูลพลขับจากuserทั้งหมด' })
  user() {
    return this.driverService.user();
  }

  @Get('user/:id')
  // @Permission({ route: route, action: 'view' })
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'ดึงข้อมูลพลขับรายidทั้งหมด' })
  userbyid(@Param('id') id: any) {
    return this.driverService.userbyid(id);
  }

  @Get('template')
  // @Permission({ route: route, action: 'view' })
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'ดึงข้อมูลพลขับtemplateทั้งหมด' })
  getDriverTemplate() {
    return this.driverService.getTemplate()
  }


  @Post('import')
  // @Permission({ route: route, action: 'view' })
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'บันทึกข้อมูลพลขับimportทั้งหมด' })
  async importDriver(@Res({passthrough:true}) res:Response,@Req() req:Request, @Body() body: any) {
    // try{

      const data = await this.driverService.importDriver(req,body)
      return {
        // data:data,
        message:`Import success`
      }
      
    // }

    
    // catch (e){
    //   res.status(500)
      
    //   return {
    //     message:`Import Fail, ${e}`
    //   }
      
    // }

  }

  @Get('option/license')
  // @Permission({ route: route, action: 'view' })
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'ดึงข้อมูลใบขับขี่ทั้งหมด' })
  findAllLicense() {
    return this.driverService.findAllLicense();
  }

  @Get(':id')
  @ApiOperation({ summary: 'ดึงข้อมูลพลขับรายid' })
  @ApiBearerAuth('JWT')
  findOne(@Param('id') id: number) {
    // console.log(id)
    return this.driverService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'อัพเดตข้อมูลพลขับรายid' })
  @ApiBearerAuth('JWT')
  update(@Param('id') id: string, @Body() updateDriverDto: any) {
    console.log('updateDriverDto',updateDriverDto)
    return this.driverService.update(+id, updateDriverDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'ลบข้อมูลพลขับรายid' })
  @ApiBearerAuth('JWT')
  remove(@Param('id') id: string) {
    return this.driverService.remove(+id);
  }
}
