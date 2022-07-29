import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  Req,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { ResponseEventDto } from './dto/response-event.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { Permission } from 'src/decorators/permission.decorator';
import { event } from '../../perm-Config';
const defaultRoute = 'event';

@Controller(defaultRoute)
@ApiTags('Event (เหตุการณ์ภัยพิบัติ)')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  @Permission({ route: defaultRoute, action: 'create' })
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'สร้าง event ใหม่' })
  async create(@Body() createEventDto: CreateEventDto): Promise<any> {
    // console.log('>>>', createEventDto);
    const response = await this.eventService.create(createEventDto);
    const data = { ...response.data };
    return {
      status: HttpStatus.CREATED,
      message: 'CREATE_EVENT_OK',
      data: data,
      error: null,
      timestamp: new Date().toISOString(),
    };
  }

  @Get()
  @Permission({ route: defaultRoute, action: 'view' })
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'ดึงข้อมูล event ทั้งหมด' })
  @ApiOkResponse({
    description: 'Event object',
    type: ResponseEventDto,
    isArray: true,
  })
  async findAll(@Req() req: any, @Query() filter: any): Promise<any> {
    const response: any = await this.eventService.findAll(filter);
    if (response.data) {
      return {
        status: HttpStatus.OK,
        message: 'GET_ALL_EVENT_SUCCESS',
        data: response.data,
        error: null,
        timestamp: new Date().toISOString(),
      };
    } else {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'GET_ALL_EVENT_FAILED',
        data: null,
        error: response,
        timestamp: new Date().toISOString(),
      };
    }
  }

  @Get('active')
  @Permission({ route: defaultRoute, action: 'view' })
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'ดึงข้อมูล event ทั้งหมด' })
  @ApiOkResponse({
    description: 'Event object',
    type: ResponseEventDto,
    isArray: true,
  })
  async findAllorActive(@Req() req: any, @Query() filter: any): Promise<any> {
    const response: any = await this.eventService.findAllorActive(filter);
    if (response.data) {
      return {
        status: HttpStatus.OK,
        message: 'GET_ALL_EVENT_SUCCESS',
        data: response.data,
        error: null,
        timestamp: new Date().toISOString(),
      };
    } else {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'GET_ALL_EVENT_FAILED',
        data: null,
        error: response,
        timestamp: new Date().toISOString(),
      };
    }
  }

  @Get('disaster_type')
  @Permission()
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'ดึงข้อมูลประเภทของสาธารณภัย' })
  // @ApiOkResponse({
  //   description: 'Event object',
  //   type: ResponseEventDto,
  //   isArray: true,
  // })
  async disasterType() {
    const response: any = await this.eventService.disasterType();
    if (response.data) {
      return {
        status: HttpStatus.OK,
        message: 'GET_DISASTER_TYPE_SUCCESS',
        data: response.data,
        error: null,
        timestamp: new Date().toISOString(),
      };
    } else {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'GET_DISASTER_TYPE_FAILED',
        data: null,
        error: response,
        timestamp: new Date().toISOString(),
      };
    }
  }

  @Get('event_status')
  @Permission()
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'ดึงข้อมูลสถานะของสาธารณภัย' })
  async eventStatus() {
    const response: any = await this.eventService.eventStatus();
    if (response.data) {
      return {
        status: HttpStatus.OK,
        message: 'GET_EVENT_STATUS_TYPE_SUCCESS',
        data: response.data,
        error: null,
        timestamp: new Date().toISOString(),
      };
    } else {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'GET_EVENT_STATUS_FAILED',
        data: null,
        error: response,
        timestamp: new Date().toISOString(),
      };
    }
  }

  @Get(':id')
  @Permission({ route: defaultRoute, action: 'view' })
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'ดึงข้อมูล event' })
  @ApiOkResponse({
    description: 'Event object',
    type: ResponseEventDto,
  })
  async findOne(@Param('id') id: string) {
    const response: any = await this.eventService.findOne(+id);
    if (response.data) {
      return {
        status: HttpStatus.OK,
        message: 'GET_EVENT_SUCCESS',
        data: response.data,
        error: null,
        timestamp: new Date().toISOString(),
      };
    } else {
      // console.log('>>>> error');
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'GET_EVENT_ERROR',
        data: null,
        error: response,
        timestamp: new Date().toISOString(),
      };
    }
  }

  @Patch(':id')
  @Permission({ route: defaultRoute, action: 'update' })
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'อัพเดทข้อมูลเหตุการณ์สาธารณภัย' })
  async update(
    @Param('id') id: string,
    @Body() updateEventDto: UpdateEventDto,
  ) {
    const response = await this.eventService.update(id, updateEventDto);
    const data = { ...response.data };
    return {
      status: HttpStatus.CREATED,
      message: 'UPDATE_EVENT_OK',
      data: data,
      error: null,
      timestamp: new Date().toISOString(),
    };
  }

  @Patch('/approve/:id')
  @Permission({ route: defaultRoute, action: 'approve' })
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'อนุมัติเหตุการณ์สาธารณภัย' })
  async approve(
    @Param('id') id: string,
    @Body() updateEventDto: UpdateEventDto,
  ) {
    const response = await this.eventService.approve(id, updateEventDto);

    const data = { ...response.data };
    return {
      status: HttpStatus.CREATED,
      message: 'APPROVE_EVENT_OK',
      data: data,
      error: null,
      timestamp: new Date().toISOString(),
    };
  }

  @Patch('/sendback/:id')
  @Permission({ route: defaultRoute, action: 'approve' })
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'ปิดสถานการณ์สาธารณภัย' })
  async sendback(
    @Param('id') id: string,
    @Body() updateEventDto: UpdateEventDto,
  ) {
    const response = await this.eventService.sendback(id, updateEventDto);
    const data = { ...response.data };
    return {
      status: HttpStatus.CREATED,
      message: 'SENDBACK_EVENT_OK',
      data: data,
      error: null,
      timestamp: new Date().toISOString(),
    };
  }

  @Patch('/finish/:id')
  @Permission({ route: defaultRoute, action: 'finish' })
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'ปิดสถานการณ์สาธารณภัย' })
  async finish(
    @Param('id') id: string,
    @Body() updateEventDto: UpdateEventDto,
  ) {
    const response = await this.eventService.finish(id, updateEventDto);
    const data = { ...response.data };
    return {
      status: HttpStatus.CREATED,
      message: 'FINISH_EVENT_OK',
      data: data,
      error: null,
      timestamp: new Date().toISOString(),
    };
  }

  @Patch('/restore/:id')
  @Permission({ route: defaultRoute, action: 'finish' })
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'ปิดสถานการณ์สาธารณภัย' })
  async restore(
    @Param('id') id: string,
    @Body() updateEventDto: UpdateEventDto,
  ) {
    const response = await this.eventService.restore(id, updateEventDto);
    const data = { ...response.data };
    return {
      status: HttpStatus.CREATED,
      message: 'FINISH_EVENT_OK',
      data: data,
      error: null,
      timestamp: new Date().toISOString(),
    };
  }

  @Delete(':id')
  @Permission({ route: defaultRoute, action: 'delete' })
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'ลบเหตุการณ์สาธารณภัย' })
  async remove(
    @Param('id') id: string,
    @Body() updateEventDto: UpdateEventDto,
  ) {
    const response = await this.eventService.remove(id, updateEventDto);
    const data = { ...response.data };
    return {
      status: HttpStatus.CREATED,
      message: 'REMOVE_EVENT_OK',
      data: data,
      error: null,
      timestamp: new Date().toISOString(),
    };
  }
  @Get('get-last/:id')
  @Permission({ route: defaultRoute, action: 'view' })
  @ApiBearerAuth('JWT')
  @ApiOperation({
    summary: 'ดึงข้อมูล event by id และที่เผชิญเหตุ กับยุติแล้ว',
  })
  @ApiOkResponse({
    description: 'Event object',
    type: ResponseEventDto,
  })
  async getLastByID(@Param('id') id: string) {
    const response: any = await this.eventService.getLastByID(+id);
    if (response.data) {
      return {
        status: HttpStatus.OK,
        message: 'GET_EVENT_SUCCESS',
        data: response.data,
        error: null,
        timestamp: new Date().toISOString(),
      };
    } else {
      // console.log('>>>> error');
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'GET_EVENT_ERROR',
        data: null,
        error: response,
        timestamp: new Date().toISOString(),
      };
    }
  }
}
