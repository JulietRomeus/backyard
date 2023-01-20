import { Controller, Get, Post, Body, Patch, Param, Delete,Query} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Permission } from 'src/decorators/permission.decorator';
import { FacilityService } from './facility.service';
import { CreateFacilityDto } from './dto/create-facility.dto';
import { UpdateFacilityDto } from './dto/update-facility.dto';

// const route = 'driver'

@Controller('facility')
export class FacilityController {
  constructor(private readonly facilityService: FacilityService) {}

  @Post()
  create(@Body() CreateFacilityDto: any) {
    console.log('CreateFacilityDto',CreateFacilityDto)
    return this.facilityService.create(CreateFacilityDto);
  }

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

  @Get(':id')
  findOne(@Param('id') id: any) {
    return this.facilityService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFacilityDto: any) {
    console.log('updateFacilityDto',updateFacilityDto)
    return this.facilityService.update(+id, updateFacilityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: any, @Body() UpdateFacilityDto: any,@Query() query: any){
    console.log('id',id)
    console.log('UpdateFacilityDto',UpdateFacilityDto)
    return this.facilityService.remove(id, UpdateFacilityDto, query);
  }
}
