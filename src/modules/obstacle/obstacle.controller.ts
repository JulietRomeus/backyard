import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Permission } from 'src/decorators/permission.decorator';
import { ObstacleService } from './obstacle.service';
import { CreateObstacleDto } from './dto/create-obstacle.dto';
import { UpdateObstacleDto } from './dto/update-obstacle.dto';

// const route = 'driver'

@Controller('obstacle')
export class ObstacleController {
  constructor(private readonly obstacleService: ObstacleService) {}


  @Get('option')
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'ดึงข้อมูลoptionอุปสรรคเส้นทางทั้งหมด' })
  option() {
    return this.obstacleService.option();


  }
  @Post()
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'บันทึกข้อมูลอุปสรรคเส้นทาง' })
  create(@Body() createDriverDto: any) {
    console.log('createDriverDto',createDriverDto)
    return this.obstacleService.create(createDriverDto);
  }

  @Get('dis')
  // @Permission({ route: route, action: 'view' })
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'ดึงข้อมูลอุปสรรคเส้นทางทั้งหมดจากdisaster' })
  findAlldis() {
    return this.obstacleService.findAlldis();
  }

  @Get('j')
  // @Permission({ route: route, action: 'view' })
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'ดึงข้อมูลอุปสรรคเส้นทางทั้งหมด' })
  findAllj() {
    return this.obstacleService.findAllj();
  }

  @Get(':id')
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'บันทึกข้อมูลอุปสรรคเส้นทางรายid' })
  findOne(@Param('id') id: any) {
    return this.obstacleService.findOne(id);
  }


  @Patch(':id')
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'อัพเดตข้อมูลอุปสรรคเส้นทาง' })
  update(@Param('id') id: string, @Body() UpdateObstacleDto: any) {
    return this.obstacleService.update(+id, UpdateObstacleDto);
  }

  @Delete(':id')
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'ลบข้อมูลอุปสรรคเส้นทาง' })
  remove(@Param('id') id: any) {
    return this.obstacleService.remove(id);
  }




}
