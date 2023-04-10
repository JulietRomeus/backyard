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
const route = 'register-request';

@Controller('register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post()
  create(@Body() createRegisterDto: any) {
    console.log('this.registerService.create(createRegisterDto)',createRegisterDto)
    return this.registerService.create(createRegisterDto);
    
  }

  @Get()
  // @Permission({ route: route, action: 'view' })
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'ดึงข้อมูลจด/ปลดยานพาหนะ' })
  findAll(@Body() body: any, @Query() query: any)  {
    return this.registerService.findAll(body,query);
  }

  @Get('optioncontract')
  //@Permission({ route: route, action: 'view' })
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'ดึงข้อมูล' })
  findOptioncontract(@Body() body: any, @Query() query: any)  {
    console.log(body,query)
    return this.registerService.findOptioncontract();
  }

 
  @Get(':id')
  //@Permission({ route: route, action: 'view' })
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'ดึงข้อมูลกิจกรรมการขนส่งเคลื่อนย้าย' })
  findOne(@Param('id') id: any, @Body() body: any, @Query() query: any) {
    return this.registerService.findOne(id);
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRegisterDto: any) {
    console.log(updateRegisterDto)
    return this.registerService.update(+id, updateRegisterDto);
  }

  @Patch('send/:id')
  send(@Param('id') id: any, @Body() updateRegisterDto: any,@Query() query: any)
  {
    // console.log('id',id)
    // console.log('updateRegisterDto',updateRegisterDto)
    // console.log('query',query)

    return this.registerService.send(id, updateRegisterDto, query);
  }

  @Patch('review/:id')
  review(@Param('id') id: any, @Body() updateRegisterDto: any,@Query() query: any)
  {
    return this.registerService.review(id, updateRegisterDto, query);
  }


  @Patch('approve/:id')
  approve(@Param('id') id: any, @Body() updateRegisterDto: any,@Query() query: any)
  {
    return this.registerService.approve(id, updateRegisterDto, query);
  }

  @Delete(':id')
  remove(@Param('id') id: any, @Body() updateRegisterDto: any,@Query() query: any){
    return this.registerService.remove(id, updateRegisterDto, query);
  }
//----------------getobstacle-------------------//


}
