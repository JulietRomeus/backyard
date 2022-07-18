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
import { WarningService } from './warning.service';
import { CreateWarningDto } from './dto/create-warning.dto';
import { UpdateWarningDto } from './dto/update-warning.dto';
import { Permission } from 'src/decorators/permission.decorator';
const defaultRoute = 'warning';

@Controller(defaultRoute)
export class WarningController {
  constructor(private readonly warningService: WarningService) {}

  @Post()
  @Permission({ route: defaultRoute, action: 'create' })
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'สร้าง INFO ใหม่' })
  async create(@Body() createWarningDto: CreateWarningDto): Promise<any> {
    // console.log('>>>', createInfoDto);
    const response = await this.warningService.create(createWarningDto);
    const data = { ...response.data };
    return {
      status: HttpStatus.CREATED,
      message: 'CREATE_WARNING_OK',
      data: data,
      error: null,
      timestamp: new Date().toISOString(),
    };
  }

  @Get()
  @Permission({ route: defaultRoute, action: 'view' })
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'ดึงข้อมูล WARNING ทั้งหมด' })
  async findAll(@Body() body: any): Promise<any> {
    const response: any = await this.warningService.findAll(body);
    if (response.data) {
      return {
        status: HttpStatus.OK,
        message: 'GET_ALL_WARNING_SUCCESS',
        data: response.data,
        error: null,
        timestamp: new Date().toISOString(),
      };
    } else {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'GET_ALL_WARNING_FAILED',
        data: null,
        error: response,
        timestamp: new Date().toISOString(),
      };
    }
  }

  @Get('warning_status')
  @Permission()
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'ดึงข้อมูลสถานะการแจ้งเตือน' })
  async formStatus() {
    const response: any = await this.warningService.warningStatus();
    if (response.data) {
      return {
        status: HttpStatus.OK,
        message: 'GET_WARNING_STATUS_TYPE_SUCCESS',
        data: response.data,
        error: null,
        timestamp: new Date().toISOString(),
      };
    } else {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'GET_INFO_STATUS_FAILED',
        data: null,
        error: response,
        timestamp: new Date().toISOString(),
      };
    }
  }

  @Get('warning_type')
  @Permission()
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'ดึงข้อมูลประเภทการแจ้งเตือน' })
  async warningType() {
    const response: any = await this.warningService.warningType();
    if (response.data) {
      return {
        status: HttpStatus.OK,
        message: 'GET_WARNING_STATUS_TYPE_SUCCESS',
        data: response.data,
        error: null,
        timestamp: new Date().toISOString(),
      };
    } else {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'GET_INFO_STATUS_FAILED',
        data: null,
        error: response,
        timestamp: new Date().toISOString(),
      };
    }
  }

  @Get('info')
  @Permission()
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'ดึงข้อมูลข่าวสาร' })
  async info() {
    const response: any = await this.warningService.infoOption();
    if (response.data) {
      return {
        status: HttpStatus.OK,
        message: 'GET_INFO_SUCCESS',
        data: response.data,
        error: null,
        timestamp: new Date().toISOString(),
      };
    } else {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'GET_INFO_FAILED',
        data: null,
        error: response,
        timestamp: new Date().toISOString(),
      };
    }
  }

  @Get('event')
  @Permission()
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'ดึงข้อมูล EVENT' })
  async eventOption() {
    const response: any = await this.warningService.eventOption();
    if (response.data) {
      return {
        status: HttpStatus.OK,
        message: 'GET_EVENT_SUCCESS',
        data: response.data,
        error: null,
        timestamp: new Date().toISOString(),
      };
    } else {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'GET_EVENT_FAILED',
        data: null,
        error: response,
        timestamp: new Date().toISOString(),
      };
    }
  }

  @Get(':id')
  @Permission({ route: defaultRoute, action: 'view' })
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'ดึงข้อมูล WARNING' })
  // @ApiOkResponse({
  //   description: 'WARNING object',
  //   type: ResponseInfoDto,
  // })
  async findOne(@Param('id') id: string) {
    const response: any = await this.warningService.findOne(+id);
    if (response.data) {
      return {
        status: HttpStatus.OK,
        message: 'GET_WARNING_SUCCESS',
        data: response.data,
        error: null,
        timestamp: new Date().toISOString(),
      };
    } else {
      // console.log('>>>> error');
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'GET_WARNING_ERROR',
        data: null,
        error: response,
        timestamp: new Date().toISOString(),
      };
    }
  }

  @Patch(':id')
  @Permission({ route: defaultRoute, action: 'update' })
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'อัพเดทข้อมูลการแจ้งเตือน' })
  async update(
    @Param('id') id: string,
    @Body() updateWarningDto: UpdateWarningDto,
  ) {
    const response = await this.warningService.update(id, updateWarningDto);
    const data = { ...response.data };
    return {
      status: HttpStatus.CREATED,
      message: 'UPDATE_INFO_OK',
      data: data,
      error: null,
      timestamp: new Date().toISOString(),
    };
  }

  @Patch('/review/:id')
  @Permission({ route: defaultRoute, action: 'review' })
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'อนุมัติการแจ้งเตือน' })
  async review(
    @Param('id') id: string,
    @Body() updateWarningDto: UpdateWarningDto,
  ) {
    const response = await this.warningService.review(id, updateWarningDto);

    const data = { ...response.data };
    return {
      status: HttpStatus.CREATED,
      message: 'APPROVE_INFO_OK',
      data: data,
      error: null,
      timestamp: new Date().toISOString(),
    };
  }

  @Patch('/acknowledge/:id')
  @Permission({ route: defaultRoute, action: 'acknowledge' })
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'อนุมัติการแจ้งเตือน' })
  async recieve(
    @Param('id') id: string,
    @Body() updateWarningDto: UpdateWarningDto,
  ) {
    const response = await this.warningService.recieve(id, updateWarningDto);

    const data = { ...response.data };
    return {
      status: HttpStatus.CREATED,
      message: 'APPROVE_INFO_OK',
      data: data,
      error: null,
      timestamp: new Date().toISOString(),
    };
  }

  @Patch('/approve/:id')
  @Permission({ route: defaultRoute, action: 'approve' })
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'อนุมัติการแจ้งเตือน' })
  async approve(
    @Param('id') id: string,
    @Body() updateWarningDto: UpdateWarningDto,
  ) {
    const response = await this.warningService.approve(id, updateWarningDto);

    const data = { ...response.data };
    return {
      status: HttpStatus.CREATED,
      message: 'APPROVE_INFO_OK',
      data: data,
      error: null,
      timestamp: new Date().toISOString(),
    };
  }

  @Patch('/sendback/:id')
  @Permission({ route: defaultRoute, action: 'approve' })
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'ส่งการแจ้งเตือนกลับเพื่อแก้ไข' })
  async sendback(
    @Param('id') id: string,
    @Body() updateWarningDto: UpdateWarningDto,
  ) {
    const response = await this.warningService.sendback(id, updateWarningDto);
    const data = { ...response.data };
    return {
      status: HttpStatus.CREATED,
      message: 'SENDBACK_INFO_OK',
      data: data,
      error: null,
      timestamp: new Date().toISOString(),
    };
  }

  @Patch('/complete/:id')
  @Permission({ route: defaultRoute, action: 'approve' })
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'ส่งการแจ้งเตือนกลับเพื่อแก้ไข' })
  async complete(
    @Param('id') id: string,
    @Body() updateWarningDto: UpdateWarningDto,
  ) {
    const response = await this.warningService.complete(id, updateWarningDto);
    const data = { ...response.data };
    return {
      status: HttpStatus.CREATED,
      message: 'SENDBACK_INFO_OK',
      data: data,
      error: null,
      timestamp: new Date().toISOString(),
    };
  }

  @Delete(':id')
  @Permission({ route: defaultRoute, action: 'delete' })
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'ลบการแจ้งเตือน' })
  async remove(
    @Param('id') id: string,
    @Body() updateWarningDto: UpdateWarningDto,
  ) {
    const response = await this.warningService.remove(id, updateWarningDto);
    const data = { ...response.data };
    return {
      status: HttpStatus.CREATED,
      message: 'REMOVE_INFO_OK',
      data: data,
      error: null,
      timestamp: new Date().toISOString(),
    };
  }
}
