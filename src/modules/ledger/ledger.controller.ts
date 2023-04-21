import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { LedgerService } from './ledger.service';
import { CreateLedgerDto } from './dto/create-ledger.dto';
import { UpdateLedgerDto } from './dto/update-ledger.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiOkResponse,
  ApiTags,
  ApiExcludeController,
} from '@nestjs/swagger';
import { Permission } from 'src/decorators/permission.decorator';
const route = 'trs-ledger';

@Controller('ledger')
export class LedgerController {
  constructor(private readonly ledgerService: LedgerService) {}

  @Post()
  @Permission({ route: route, action: 'create' })
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: '' })
  create(@Body() createLedgerDto: CreateLedgerDto) {
    return this.ledgerService.create(createLedgerDto);
  }

  @Get()
  findAll() {
    return this.ledgerService.findAll();
  }

  @Get('driver/:id')
  findPerson(@Param('id') id: number) {
    return this.ledgerService.findPerson(id);
  }

  @Get('option/driver')
  findPersonOption(@Query() query: any) {
    return this.ledgerService.findPersonOption(query);
  }

  @Get('supply/:id')
  findSupply(@Param('id') id: number) {
    return this.ledgerService.findSupply(id);
  }

  @Get('option/supply')
  findSupplyOption(@Query() query: any) {
    return this.ledgerService.findSupplyOption(query);
  }

  @Get('vehicle/:id')
  findVehicle(@Param('id') id: number) {
    return this.ledgerService.findVehicle(id);
  }

  @Get('option/vehicle')
  @Permission({ route: route, action: 'view' })
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'ดึงข้อมูลยานพาหนะที่ว่างอยู่' })
  findVehicleOption(@Query() query: any) {
    return this.ledgerService.findVehicleOption(query);
  }

  @Get('obstacle/:id')
  findObstacle(@Param('id') id: number) {
    return this.ledgerService.findObstacle(id);
  }

  @Get('option/obstacle')
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'ดึงข้อมูลยานพาหนะที่ว่างอยู่' })
  findObstacleOption(@Query() query: any) {
    return this.ledgerService.findObstacleOption(query);
  }

  @Get('option/obstacleType')
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'ดึงข้อมูลยานพาหนะที่ว่างอยู่' })
  findObstacleTypeOption() {
    return this.ledgerService.findObstacleTypeOption();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ledgerService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLedgerDto: UpdateLedgerDto) {
    return this.ledgerService.update(+id, updateLedgerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Body() updateLedgerDto: UpdateLedgerDto) {
    return this.ledgerService.remove(id, updateLedgerDto);
  }
}
