import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import genPayload,{stamp,ACTIONTYPE,ForbiddenException} from 'src/utils/payload';

@Controller('vehicle')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  // @Post()
  // create(@Body() createVehicleDto: CreateVehicleDto) {
  //   return this.vehicleService.create(createVehicleDto);
  // }

  @Get()
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'ดึงข้อมูลพลขับทั้งหมด' })
  findAll() {
    return this.vehicleService.findAll();
  }

  @Get('optionsupply')
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'ดึงข้อมูลoptionVehicle_type' })
  findsupply() {
    return this.vehicleService.findsupply();
  }

  @Get('optionbrand/:id')
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'ดึงข้อมูลoptionVehicle_brand' })
  optionbrand(@Param('id') id: any) {
    return this.vehicleService.optionbrand(id);
  }

  @Get('optiongen/:id')
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'ดึงข้อมูลoptionVehicle_brand' })
  optiongen(@Param('id') id: any) {
    return this.vehicleService.optiongen(id);
  }

  @Get('optionspec/:id')
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'ดึงข้อมูลoptionVehicle_brand' })
  optionspec(@Param('id') id: any) {
    return this.vehicleService.optionspec(id);
  }

  // @Get()
  // @ApiBearerAuth('JWT')
  // @ApiOperation({ summary: 'ดึงข้อมูลoptionVehicle_type' })
  // findbrand() {
  //   return this.vehicleService.findbrand();
  // }


  // @Get('option')
  // // @Permission({ route: route, action: 'view' })
  // @ApiBearerAuth('JWT')
  // @ApiOperation({ summary: 'ดึงข้อมูล' })
  // findOptiontype() {
  //   return this.vehicleService.findOptiontype();
  // }
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.vehicleService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateVehicleDto: UpdateVehicleDto) {
  //   return this.vehicleService.update(+id, updateVehicleDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.vehicleService.remove(+id);
  // }
}
