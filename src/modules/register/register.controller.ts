import { Controller, Get, Post, Body, Patch, Param, Delete,Query} from '@nestjs/common';
import { RegisterService } from './register.service';
import { CreateRegisterDto } from './dto/create-register.dto';
import { UpdateRegisterDto } from './dto/update-register.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger'
import { Permission } from 'src/decorators/permission.decorator';
//const route = 'activity-request';

@Controller('register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post()
  create(@Body() createRegisterDto: CreateRegisterDto) {
    return this.registerService.create(createRegisterDto);
  }

  @Get()
  //@Permission({ route: route, action: 'view' })
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'ดึงข้อมูลจด/ปลดยานพาหนะ' })
  findAll(@Body() body: any, @Query() query: any)  {
    return this.registerService.findAll(query);
  }



  @Get(':id')
  //@Permission({ route: route, action: 'view' })
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'ดึงข้อมูลกิจกรรมการขนส่งเคลื่อนย้าย' })
  findOne(@Param('id') id: string, @Body() body: any, @Query() query: any) {
    return this.registerService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRegisterDto: UpdateRegisterDto) {
    return this.registerService.update(+id, updateRegisterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.registerService.remove(+id);
  }
}
