import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Permission } from 'src/decorators/permission.decorator';
import { DriverService } from './driver.service';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import genPayload,{stamp,ACTIONTYPE,ForbiddenException} from 'src/utils/payload';
// import actio
// const route = 'driver';

@Controller('driver')
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  @Post()
  async create(@Body() createDriverDto: any) {
    console.log('createDriverDto',createDriverDto)
    const data = await this.driverService.create(createDriverDto);
    return genPayload(data, null, ACTIONTYPE.CREATE);
  }



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
  @ApiOperation({ summary: 'ดึงข้อมูลพลขับทั้งหมด' })
  busy(@Body() body: any) {

    return this.driverService.findBusy(body);
  }

  @Get('useremail')
  // @Permission({ route: route, action: 'view' })
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'ดึงข้อมูลพลขับทั้งหมด' })
  useremail(@Body() body: any) {
    return this.driverService.useremail(body);
  }

  @Get('user')
  // @Permission({ route: route, action: 'view' })
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'ดึงข้อมูลพลขับทั้งหมด' })
  user() {
    return this.driverService.user();
  }

  @Get('user/:id')
  // @Permission({ route: route, action: 'view' })
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'ดึงข้อมูลพลขับทั้งหมด' })
  userbyid(@Param('id') id: any) {
    return this.driverService.userbyid(id);
  }

  @Get('template')
  // @Permission({ route: route, action: 'view' })
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'ดึงข้อมูลพลขับทั้งหมด' })
  getDriverTemplate() {
    return this.driverService.getTemplate()
  }


  @Get('option/license')
  // @Permission({ route: route, action: 'view' })
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'ดึงข้อมูลใบขับขี่ทั้งหมด' })
  findAllLicense() {
    return this.driverService.findAllLicense();
  }

  @Get(':id')
  @ApiOperation({ summary: 'ดึงข้อมูลพลขับทั้งหมด' })
  @ApiBearerAuth('JWT')
  findOne(@Param('id') id: number) {
    // console.log(id)
    return this.driverService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDriverDto: any) {
    console.log('updateDriverDto',updateDriverDto)
    return this.driverService.update(+id, updateDriverDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.driverService.remove(+id);
  }
}
