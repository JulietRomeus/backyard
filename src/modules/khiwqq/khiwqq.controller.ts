import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { KhiwqqService } from './khiwqq.service';
import { CreateKhiwqqDto } from './dto/create-khiwqq.dto';
import { UpdateKhiwqqDto } from './dto/update-khiwqq.dto';

import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Permission } from 'src/decorators/permission.decorator';

@Controller('khiwqq')
export class KhiwqqController {
  constructor(private readonly khiwqqService: KhiwqqService) {}

  @Get()
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'สร้างข้อมูล khiwqq' })
  findAll() {
    return this.khiwqqService.findAll();
  }

  @Post()
  create(@Body() createKhiwqqDto: CreateKhiwqqDto) {
    console.log('xxxx', createKhiwqqDto);
    return this.khiwqqService.create(createKhiwqqDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.khiwqqService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateKhiwqqDto: UpdateKhiwqqDto) {
    return this.khiwqqService.update(+id, updateKhiwqqDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.khiwqqService.remove(+id);
  }
}
