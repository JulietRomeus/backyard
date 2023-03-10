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
import { MaintenanceService } from './maintenance.service';
import { CreateMaintenanceDto } from './dto/create-maintenance.dto';
import { UpdateMaintenanceDto } from './dto/update-maintenance.dto';
import genPayload,{stamp,ACTIONTYPE,ForbiddenException} from 'src/utils/payload';
// import actio
// const route = 'driver';

@Controller('maintenance')
export class MaintenanceController {
  constructor(private readonly maintenanceService: MaintenanceService) {}

  // @Post()
  // async create(@Body() createDriverDto: any) {
  //   console.log('createDriverDto',createDriverDto)
  //   const data = await this.driverService.create(createDriverDto);
  //   return genPayload(data, null, ACTIONTYPE.CREATE);
  // }

  @Get()
  // @Permission({ route: route, action: 'view' })
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'ดึงข้อมูลพลขับทั้งหมด' })
  findAll() {
    return this.maintenanceService.findAll();
  }

//   @Get('option/license')
//   // @Permission({ route: route, action: 'view' })
//   @ApiBearerAuth('JWT')
//   @ApiOperation({ summary: 'ดึงข้อมูลใบขับขี่ทั้งหมด' })
//   findAllLicense() {
//     return this.driverService.findAllLicense();
//   }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.maintenanceService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateMaintenanceDto: any) {
  //   console.log('updateDriverDto',updateMaintenanceDto)
  //   return this.maintenanceService.update(+id, updateMaintenanceDto);
  // }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.driverService.remove(+id);
//   }
 }
