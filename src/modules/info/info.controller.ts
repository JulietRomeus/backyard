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
import { InfoService } from './info.service';
import { CreateInfoDto } from './dto/create-info.dto';
import { UpdateInfoDto } from './dto/update-info.dto';
import { ResponseInfoDto } from './dto/response-info.dto';
import { Permission } from 'src/decorators/permission.decorator';
const defaultRoute = 'info';

@Controller(defaultRoute)
@ApiTags('Info (ข้อมูลข่าวสาร)')
export class InfoController {
  constructor(private readonly infoService: InfoService) {}

  @Post()
  @Permission({ route: defaultRoute, action: 'create' })
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'สร้าง INFO ใหม่' })
  async create(@Body() createInfoDto: CreateInfoDto): Promise<any> {
    // console.log('>>>', createInfoDto);
    const response = await this.infoService.create(createInfoDto);
    const data = { ...response.data };
    return {
      status: HttpStatus.CREATED,
      message: 'CREATE_INFO_OK',
      data: data,
      error: null,
      timestamp: new Date().toISOString(),
    };
  }

  @Get()
  @Permission({ route: defaultRoute, action: 'view' })
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'ดึงข้อมูล INFO ทั้งหมด' })
  // @ApiOkResponse({
  //   description: 'INFO object',
  //   type: ResponseInfoDto,
  //   isArray: true,
  // })
  async findAll(@Body() body: any, @Query() filter: any): Promise<any> {
    // console.log('>>>>>');
    const response: any = await this.infoService.findAll({
      filter,
      body,
    });
    if (response.data) {
      return {
        status: HttpStatus.OK,
        message: 'GET_ALL_INFO_SUCCESS',
        data: response.data,
        error: null,
        timestamp: new Date().toISOString(),
      };
    } else {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'GET_ALL_INFO_FAILED',
        data: null,
        error: response,
        timestamp: new Date().toISOString(),
      };
    }
  }

  @Get('public')
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'ดึงข้อมูล INFO ทั้งหมด' })
  // @ApiOkResponse({
  //   description: 'INFO object',
  //   type: ResponseInfoDto,
  //   isArray: true,
  // })
  async public(@Query() filter: any): Promise<any> {
    // console.log('>>>>>');
    const response: any = await this.infoService.public(filter);
    if (response.data) {
      return {
        status: HttpStatus.OK,
        message: 'GET_ALL_INFO_SUCCESS',
        data: response.data,
        error: null,
        timestamp: new Date().toISOString(),
      };
    } else {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'GET_ALL_INFO_FAILED',
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
  //   description: 'INFO object',
  //   type: ResponseINFODto,
  //   isArray: true,
  // })
  async disasterType() {
    const response: any = await this.infoService.disasterType();
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

  @Get('event')
  @Permission()
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'ดึงข้อมูลประเภทของสาธารณภัย' })
  async eventOption() {
    const response: any = await this.infoService.eventOption();
    if (response.data) {
      return {
        status: HttpStatus.OK,
        message: 'GET_EVENT_OPTION_SUCCESS',
        data: response.data,
        error: null,
        timestamp: new Date().toISOString(),
      };
    } else {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'GET_EVENT_OPTION_FAILED',
        data: null,
        error: response,
        timestamp: new Date().toISOString(),
      };
    }
  }

  @Get('form_status')
  @Permission()
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'ดึงข้อมูลสถานะข่าวสาร' })
  async formStatus() {
    const response: any = await this.infoService.formStatus();
    if (response.data) {
      return {
        status: HttpStatus.OK,
        message: 'GET_INFO_STATUS_TYPE_SUCCESS',
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

  @Get('agency')
  @Permission()
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'ดึงข้อมูล Agency' })
  async agencyOption() {
    const response: any = await this.infoService.agencyOption();
    if (response.data) {
      return {
        status: HttpStatus.OK,
        message: 'GET_AGENCY_SUCCESS',
        data: response.data,
        error: null,
        timestamp: new Date().toISOString(),
      };
    } else {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'GET_AGENCY_FAILED',
        data: null,
        error: response,
        timestamp: new Date().toISOString(),
      };
    }
  }

  @Get(':id')
  @Permission({ route: defaultRoute, action: 'view' })
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'ดึงข้อมูล INFO' })
  @ApiOkResponse({
    description: 'INFO object',
    type: ResponseInfoDto,
  })
  async findOne(@Param('id') id: string) {
    const response: any = await this.infoService.findOne(+id);
    if (response.data) {
      return {
        status: HttpStatus.OK,
        message: 'GET_INFO_SUCCESS',
        data: response.data,
        error: null,
        timestamp: new Date().toISOString(),
      };
    } else {
      // console.log('>>>> error');
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'GET_INFO_ERROR',
        data: null,
        error: response,
        timestamp: new Date().toISOString(),
      };
    }
  }

  @Patch(':id')
  @Permission({ route: defaultRoute, action: 'update' })
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'อัพเดทข้อมูลข้อมูลข่าวสาร' })
  async update(@Param('id') id: string, @Body() updateInfoDto: UpdateInfoDto) {
    const response = await this.infoService.update(id, updateInfoDto);

    if (response.data) {
      return {
        status: HttpStatus.OK,
        message: 'GET_INFO_SUCCESS',
        data: response.data,
        error: null,
        timestamp: new Date().toISOString(),
      };
    } else {
      // console.log('>>>> error');
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'GET_INFO_ERROR',
        data: null,
        error: response,
        timestamp: new Date().toISOString(),
      };
    }
  }

  @Patch('/submit/:id')
  @Permission({ route: defaultRoute, action: 'update' })
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'ส่งขออนุมัติข้อมูลข่าวสาร' })
  async submit(@Param('id') id: string, @Body() updateInfoDto: UpdateInfoDto) {
    console.log('submit');
    const response = await this.infoService.submit(id, updateInfoDto);

    if (response.data) {
      return {
        status: HttpStatus.OK,
        message: 'SUBMIT_INFO_SUCCESS',
        data: response.data,
        error: null,
        timestamp: new Date().toISOString(),
      };
    } else {
      // console.log('>>>> error');
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'SUBMIT_INFO_ERROR',
        data: null,
        error: response,
        timestamp: new Date().toISOString(),
      };
    }
  }

  @Patch('/approve/:id')
  @Permission({ route: defaultRoute, action: 'approve' })
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'อนุมัติข้อมูลข่าวสาร' })
  async approve(@Param('id') id: string, @Body() updateInfoDto: UpdateInfoDto) {
    const response = await this.infoService.approve(id, updateInfoDto);

    const data = { ...response.data };
    return {
      status: HttpStatus.CREATED,
      message: 'APPROVE_INFO_OK',
      data: data,
      error: null,
      timestamp: new Date().toISOString(),
    };
  }

  @Patch('/notification/:id')
  @Permission({ route: defaultRoute, action: 'notification' })
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'อนุมัติข้อมูลข่าวสาร' })
  async notification(
    @Param('id') id: string,
    @Body() updateInfoDto: UpdateInfoDto,
    @Query() query: any,
  ) {
    const response = await this.infoService.notification(
      id,
      updateInfoDto,
      query,
    );

    const data = { ...response.data };
    return {
      status: HttpStatus.CREATED,
      message: 'NOTIFICATION_INFO_OK',
      data: data,
      error: null,
      timestamp: new Date().toISOString(),
    };
  }

  @Patch('/sendback/:id')
  @Permission({ route: defaultRoute, action: 'approve' })
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'ส่งข้อมูลข่าวสารกลับเพื่อแก้ไข' })
  async sendback(
    @Param('id') id: string,
    @Body() updateInfoDto: UpdateInfoDto,
  ) {
    const response = await this.infoService.sendback(id, updateInfoDto);
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
  @ApiOperation({ summary: 'ลบข้อมูลข่าวสาร' })
  async remove(@Param('id') id: string, @Body() updateInfoDto: UpdateInfoDto) {
    const response = await this.infoService.remove(id, updateInfoDto);
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
