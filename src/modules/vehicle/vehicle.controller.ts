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
