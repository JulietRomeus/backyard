import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ExampleService } from './example.service';
import { CreateExampleDto } from './dto/create-example.dto';
import { UpdateExampleDto } from './dto/update-example.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Permission } from 'src/decorators/permission.decorator';

@Controller('example')
export class ExampleController {
  constructor(private readonly exampleService: ExampleService) {}

  @Post()
  @Permission()
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'การสร้างข้อมูลตัวอย่าง' })
  create(@Body() createExampleDto: CreateExampleDto) {
    console.log('first', createExampleDto);
    return this.exampleService.create(createExampleDto);
  }

  @Get()
  @Permission()
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'การเรียกข้อมูลตัวอย่างทั้งหมด' })
  findAll() {
    return this.exampleService.findAll();
  }

  @Get(':id')
  @Permission()
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'การเรียกข้อมูลตัวอย่างด้วย id' })
  findOne(@Param('id') id: string) {
    return this.exampleService.findOne(+id);
  }

  @Patch(':id')
  @Permission()
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'การอัพเดทข้อมูลตัวอย่างทั้งหมด' })
  update(@Param('id') id: string, @Body() updateExampleDto: UpdateExampleDto) {
    return this.exampleService.update(+id, updateExampleDto);
  }

  @Delete(':id')
  @Permission()
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'การลบข้อมูลตัวอย่างด้วย id' })
  remove(@Param('id') id: string) {
    return this.exampleService.remove(+id);
  }
}
