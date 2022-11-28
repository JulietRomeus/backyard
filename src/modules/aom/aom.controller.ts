import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AomService } from './aom.service';
import { CreateAomDto } from './dto/create-aom.dto';
import { UpdateAomDto } from './dto/update-aom.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Permission } from 'src/decorators/permission.decorator';

@Controller('aom')
export class AomController {
  constructor(private readonly aomService: AomService) {}

  @Post()
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'สร้างข้อมูล aom' })
  create(@Body() createAomDto: CreateAomDto) {
    console.log('data', createAomDto);
    return this.aomService.create(createAomDto);
  }

  @Get()
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'สร้างข้อมูล aom' })
  findAll() {
    return this.aomService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.aomService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAomDto: UpdateAomDto) {
    return this.aomService.update(+id, updateAomDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.aomService.remove(+id);
  }
}
