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
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  @Roles('maholan_superadmin', 'admin')
  async create(@Body() createEventDto: CreateEventDto): Promise<any> {
    // console.log('>>>>> req body', req.body);
    // console.log('Body', createEventDto);

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
  @Roles('maholan_superadmin', 'admin')
  async findAll(@Req() req: any): Promise<any> {
    const response: any = await this.eventService.findAll();
    const data = { ...response.data };
    return {
      status: HttpStatus.OK,
      message: 'GET_EVENT_SUCCESS',
      data: data.data,
      error: null,
      timestamp: new Date().toISOString(),
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventService.update(+id, updateEventDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventService.remove(+id);
  }
}
