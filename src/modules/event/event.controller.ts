import { Response } from 'express';
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

@Controller('event')
@ApiTags('Event (เหตุการณ์ภัยพิบัติ)')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  @Roles()
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
  // @Roles('maholan_superadmin', 'admin')
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'ดึงข้อมูล event ทั้งหมด' })
  @ApiOkResponse({
    description: 'Event object',
    type: ResponseEventDto,
    isArray: true,
  })
  async findAll(@Req() req: any): Promise<any> {
    const response: any = await this.eventService.findAll();
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

  @Get(':id')
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
  @Roles()
  async update(
    @Param('id') id: string,
    @Body() updateEventDto: UpdateEventDto,
  ) {
    const response = await this.eventService.update(+id, updateEventDto);
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
  @Roles()
  async approve(
    @Param('id') id: string,
    @Body() updateEventDto: UpdateEventDto,
  ) {
    const response = await this.eventService.approve(+id, updateEventDto);
    const data = { ...response.data };
    return {
      status: HttpStatus.CREATED,
      message: 'APPROVE_EVENT_OK',
      data: data,
      error: null,
      timestamp: new Date().toISOString(),
    };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventService.remove(+id);
  }
}
