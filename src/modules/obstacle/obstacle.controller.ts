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
  @ApiOperation({ summary: 'ดึงข้อมูลพลขับทั้งหมด' })
  option() {
    return this.obstacleService.option();


  }
  @Post()
  create(@Body() createDriverDto: any) {
    console.log('createDriverDto',createDriverDto)
    return this.obstacleService.create(createDriverDto);
  }

  @Get('dis')
  // @Permission({ route: route, action: 'view' })
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'ดึงข้อมูลพลขับทั้งหมด' })
  findAlldis() {
    return this.obstacleService.findAlldis();
  }

  @Get('j')
  // @Permission({ route: route, action: 'view' })
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'ดึงข้อมูลพลขับทั้งหมด' })
  findAllj() {
    return this.obstacleService.findAllj();
  }

  @Get(':id')
  findOne(@Param('id') id: any) {
    return this.obstacleService.findOne(id);
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() UpdateObstacleDto: any) {
    return this.obstacleService.update(+id, UpdateObstacleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: any) {
    return this.obstacleService.remove(id);
  }




}
