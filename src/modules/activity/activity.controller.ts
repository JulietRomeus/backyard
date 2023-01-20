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
import { ActivityService } from './activity.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { RequestActivityDto } from './dto/request-activity.dto';
import { DeleteActivityDto } from './dto/delete-activity.dto';

import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Permission } from 'src/decorators/permission.decorator';
const route = 'activity-request';

@Controller('activity')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Get()
  @Permission({ route: route, action: 'view' })
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'ดึงข้อมูลกิจกรรมการขนส่งเคลื่อนย้าย' })
  findAll(@Body() body: any, @Query() query: any) {
    return this.activityService.findAll(body, query);
  }

  // @Get('orm')
  // @Permission({ route: route, action: 'view' })
  // @ApiBearerAuth('JWT')
  // @ApiOperation({ summary: 'ดึงข้อมูลกิจกรรมการขนส่งเคลื่อนย้าย' })
  // findAllORM(@Body() body: any, @Query() query: any) {
  //   return this.activityService.findAllORM(body, query);
  // }

  @Get('status')
  @Permission({ route: route, action: 'view' })
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'ดึงข้อมูลสถานะกิจกรรมการขนส่งเคลื่อนย้าย' })
  status(@Query() query: any) {
    return this.activityService.status(query);
  }

  @Get('type')
  @Permission({ route: route, action: 'view' })
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'ดึงข้อมูลประเภทกิจกรรมการขนส่งเคลื่อนย้าย' })
  type(@Query() query: any) {
    return this.activityService.type(query);
  }

  @Get('option/vehicle')
  @Permission({ route: route, action: 'view' })
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'ดึงข้อมูลยานพาหนะที่ว่างอยู่' })
  vehicle(@Query() query: any, @Body() body: any) {
    return this.activityService.vehicle(query, body);
  }

  @Get('option/vehicle-type')
  @Permission({ route: route, action: 'view' })
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'ดึงข้อมูลประเภทยานพาหนะ' })
  vehicleType(@Query() query: any, @Body() body: any) {
    return this.activityService.vehicleType(query, body);
  }

  @Get('option/driver')
  @Permission({ route: route, action: 'view' })
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'ดึงข้อมูลพลขับที่ว่างอยู่' })
  driver(@Query() query: any, @Body() body: any) {
    return this.activityService.driver(query, body);
  }

  @Get(':id')
  // @Permission({ route: route, action: 'view' })
  // @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'ดึงข้อมูลกิจกรรมการขนส่งเคลื่อนย้าย' })
  findOne(@Param('id') id: string, @Body() body: any, @Query() query: any) {
    return this.activityService.findOne(id, body, query);
  }

  @Post()
  @Permission({ route: route, action: 'create' })
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'สร้างข้อมูลกิจกรรมการขนส่งเคลื่อนย้าย' })
  create(@Body() createActivityDto: CreateActivityDto) {
    return this.activityService.create(createActivityDto);
  }

  @Patch(':id')
  @Permission({ route: route, action: 'update' })
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'อัพเดทข้อมูลกิจกรรมการขนส่งเคลื่อนย้าย' })
  update(
    @Param('id') id: string,
    @Body() updateActivityDto: UpdateActivityDto,
    @Query() query: any,
  ) {
    return this.activityService.update(id, updateActivityDto, query);
  }

  @Patch('send/:id')
  @Permission({ route: route, action: 'update' })
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'ส่งขอตรวจสอบข้อมูลกิจกรรมการขนส่งเคลื่อนย้าย' })
  send(
    @Param('id') id: string,
    @Body() updateActivityDto: UpdateActivityDto,
    @Query() query: any,
  ) {
    return this.activityService.send(id, updateActivityDto, query);
  }

  @Patch('request/:id')
  @Permission({ route: route, action: 'update' })
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'ขอสนับสนุนรถหน่วยอื่นเพิ่มเติม' })
  request(
    @Param('id') id: string,
    @Body() requestActivityDto: RequestActivityDto,
    @Query() query: any,
  ) {
    return this.activityService.request(id, requestActivityDto, query);
  }

  @Delete('request/:id')
  @Permission({ route: route, action: 'update' })
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'ขอสนับสนุนรถหน่วยอื่นเพิ่มเติม' })
  cancelReq(@Param('id') id: string) {
    return this.activityService.cancel_request(id);
  }

  @Patch('review/:id')
  @Permission({ route: route, action: 'review' })
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'ตรวจสอบข้อมูลกิจกรรมการขนส่งเคลื่อนย้าย' })
  review(
    @Param('id') id: string,
    @Body() updateActivityDto: UpdateActivityDto,
    @Query() query: any,
  ) {
    return this.activityService.review(id, updateActivityDto, query);
  }

  @Patch('approve/:id')
  @Permission({ route: route, action: 'approve' })
  @ApiBearerAuth('JWT')
  @ApiOperation({
    summary: 'อนุมัติอนุมัติข้อมูลกิจกรรมการขนส่งเคลื่อนย้าย',
  })
  approve(
    @Param('id') id: string,
    @Body() updateActivityDto: UpdateActivityDto,
    @Query() query: any,
  ) {
    return this.activityService.approve(id, updateActivityDto, query);
  }

  @Patch('disapprove/:id')
  @Permission({ route: route, action: 'approve' })
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'ไม่อนุมัติข้อมูลกิจกรรมการขนส่งเคลื่อนย้าย' })
  disApprove(
    @Param('id') id: string,
    @Body() updateActivityDto: UpdateActivityDto,
    @Query() query: any,
  ) {
    return this.activityService.disApprove(id, updateActivityDto, query);
  }

  @Patch('back/:id')
  @Permission({ route: route, action: 'approve' })
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'อนุมัติข้อมูลกิจกรรมการขนส่งเคลื่อนย้าย' })
  back(
    @Param('id') id: string,
    @Body() updateActivityDto: UpdateActivityDto,
    @Query() query: any,
  ) {
    return this.activityService.back(id, updateActivityDto, query);
  }

  @Delete(':id')
  @Permission({ route: route, action: 'delete' })
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'ลบข้อมูลกิจกรรมการขนส่งเคลื่อนย้าย' })
  remove(
    @Param('id') id: string,
    @Body() deleteActivityDto: DeleteActivityDto,
  ) {
    return this.activityService.delete(id, deleteActivityDto);
  }

  @Patch('restore/:id')
  @Permission({ route: route, action: 'delete' })
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'คืนค่าข้อมูลกิจกรรมการขนส่งเคลื่อนย้าย' })
  restore(
    @Param('id') id: string,
    @Body() deleteActivityDto: DeleteActivityDto,
  ) {
    return this.activityService.restore(id, deleteActivityDto);
  }
}
