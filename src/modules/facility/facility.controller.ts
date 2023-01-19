import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Permission } from 'src/decorators/permission.decorator';
import { FacilityService } from './facility.service';
import { CreateFacilityDto } from './dto/create-facility.dto';
import { UpdateFacilityDto } from './dto/update-facility.dto';

// const route = 'driver'

@Controller('facility')
export class FacilityController {
  constructor(private readonly facilityService: FacilityService) {}

  // @Post()
  // create(@Body() createDriverDto: any) {
  //   return this.driverService.create(createDriverDto);
  // }

  @Get()
  // @Permission({ route: route, action: 'view' })
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'ดึงข้อมูลพลขับทั้งหมด' })
  findAll() {
    return this.facilityService.findAll();
  }

  // @Get('option/license')
  // // @Permission({ route: route, action: 'view' })
  // @ApiBearerAuth('JWT')
  // @ApiOperation({ summary: 'ดึงข้อมูลใบขับขี่ทั้งหมด' })
  // findAllLicense() {
  //   return this.driverService.findAllLicense();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.driverService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateDriverDto: any) {
  //   return this.driverService.update(+id, updateDriverDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.driverService.remove(+id);
  // }
}
