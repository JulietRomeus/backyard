import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpStatus,
} from '@nestjs/common';
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
} from '@nestjs/swagger';
import now from '../../utils/now';

import { Permission } from 'src/decorators/permission.decorator';
const route = 'register-request';

@Controller('register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Get('option/vehicle-type')
  // @Permission({ route: route, action: 'view' })
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'ดึงข้อมูลoptiontypeจด/ปลดยานพาหนะ' })
  vehicleTypeOption(@Body() body: any, @Query() query: any) {
    return this.registerService.vehicleTypeOption(body);
  }

  @Get('option/vehicle-spec/:id')
  // @Permission({ route: route, action: 'view' })
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'ดึงข้อมูลoptionspecจด/ปลดยานพาหนะรายid' })
  vehiclespecOption(@Param('id') id: any, @Body() body: any) {
    return this.registerService.vehiclespecOption(id);
  }

  @Get('option/vehicle-spec')
  // @Permission({ route: route, action: 'view' })
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'ดึงข้อมูลoptionspecจด/ปลดยานพาหนะ' })
  vehiclespecOptionall(@Body() body: any) {
    return this.registerService.vehiclespecOptionall();
  }

  @Post()
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'บันทึกข้อมูลจด/ปลดยานพาหนะ' })
  create(@Body() createRegisterDto: any) {
    console.log(
      'this.registerService.create(createRegisterDto)',
      createRegisterDto,
    );
    return this.registerService.create(createRegisterDto);
  }

  @Get()
  // @Permission({ route: route, action: 'view' })
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'ดึงข้อมูลจด/ปลดยานพาหนะ' })
  findAll(@Body() body: any, @Query() query: any) {
    return this.registerService.findAll(body, query);
  }

  @Get('vehicle/:id')
  // @Permission({ route: route, action: 'view' })
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'ดึงข้อมูลจด/ปลดยานพาหนะรายid' })
  getvehicle(@Param('id') id: any, @Body() body: any) {
    return this.registerService.getvehicle(id);
  }

  @Get('optioncontract')
  //@Permission({ route: route, action: 'view' })
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'ดึงข้อมูลสัญญา' })
  findOptioncontract(@Body() body: any, @Query() query: any) {
    console.log(body, query);
    return this.registerService.findOptioncontract();
  }

  @Get(':id')
  //@Permission({ route: route, action: 'view' })
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'ดึงข้อมูลจด/ปลดยานพาหนะรายid' })
  findOne(@Param('id') id: any, @Body() body: any, @Query() query: any) {
    return this.registerService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'อัพเดตข้อมูลจด/ปลดยานพาหนะรายid' })
  update(@Param('id') id: string, @Body() updateRegisterDto: any) {
    console.log(updateRegisterDto);
    return this.registerService.update(+id, updateRegisterDto);
  }

  @Patch('send/:id')
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'อัพเตตstatus sendข้อมูลจด/ปลดยานพาหนะรายid' })
  send(
    @Param('id') id: any,
    @Body() updateRegisterDto: any,
    @Query() query: any,
  ) {
    // console.log('id',id)
    // console.log('updateRegisterDto',updateRegisterDto)
    // console.log('query',query)

    return this.registerService.send(id, updateRegisterDto, query);
  }

  @Patch('review/:id')
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'อัพเตตstatus reviewข้อมูลจด/ปลดยานพาหนะรายid' })
  review(
    @Param('id') id: any,
    @Body() updateRegisterDto: any,
    @Query() query: any,
  ) {
    return this.registerService.review(id, updateRegisterDto, query);
  }

  @Patch('approve/:id')
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'อัพเตตstatus approveข้อมูลจด/ปลดยานพาหนะรายid' })
  approve(
    @Param('id') id: any,
    @Body() updateRegisterDto: any,
    @Query() query: any,
  ) {
    return this.registerService.approve(id, updateRegisterDto, query);
  }

  @Patch('back/:id')
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'อัพเตตstatus sendbackข้อมูลจด/ปลดยานพาหนะรายid' })
  back(
    @Param('id') id: any,
    @Body() updateRegisterDto: any,
    @Query() query: any,
  ) {
    return this.registerService.back(id, updateRegisterDto, query);
  }

  @Delete(':id')
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'ลบข้อมูลจด/ปลดยานพาหนะรายid' })
  remove(
    @Param('id') id: any,
    @Body() updateRegisterDto: any,
    @Query() query: any,
  ) {
    return this.registerService.remove(id, updateRegisterDto, query);
  }

  @Patch('disapprove/:id')
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'อัพเตตstatus disapproveข้อมูลจด/ปลดยานพาหนะรายid' })
  disapprove(
    @Param('id') id: any,
    @Body() updateRegisterDto: any,
    @Query() query: any,
  ) {
    return this.registerService.disapprove(id, updateRegisterDto, query);
  }

  //----------------getobstacle-------------------//
}
