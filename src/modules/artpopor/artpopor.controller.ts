import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ArtpoporService } from './artpopor.service';
import { CreateArtpoporDto } from './dto/create-artpopor.dto';
import { UpdateArtpoporDto } from './dto/update-artpopor.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Permission } from 'src/decorators/permission.decorator';
@Controller('artpopor')
export class ArtpoporController {
  constructor(private readonly artpoporService: ArtpoporService) {}

  @Post()
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'สร้างข้อมูล artpopor' })
  create(@Body() createArtpoporDto: CreateArtpoporDto) {
    console.log(createArtpoporDto)
    return this.artpoporService.create(createArtpoporDto);
  }

  @Get()
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'สร้างข้อมูล artpopor' })
  findAll() {
    return this.artpoporService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.artpoporService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArtpoporDto: UpdateArtpoporDto) {
    return this.artpoporService.update(+id, updateArtpoporDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.artpoporService.remove(+id);
  }
}
