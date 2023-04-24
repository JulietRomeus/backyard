import { Controller, Post, Get, Body, HttpStatus, Param,Query } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { DashboardService } from './dashboard.service';
import now from '../../utils/now';
import { RegisterService } from '../register/register.service';

import { Permission } from 'src/decorators/permission.decorator';

// const defaultRoute = 'operation';

@Controller('dashboard')
@ApiTags('Dashboard (ข้อมูลสำหรับ dashboards)')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService)
   {}


   @Get('mission/:id')
  //  @Permission({ route: 'activity-mission', action: 'view' })
   @ApiBearerAuth('JWT')
   @ApiOperation({ summary: 'ดึงข้อมูลกิจกรรมการขนส่งเคลื่อนย้าย' })
   missionAll(@Param('id') id: any,@Body() body: any, @Query() query: any) {
     return this.dashboardService.missionAll(id,query);
   }

  @Post('data') //
//   @Permission({ route: defaultRoute, action: 'view' })
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Get ' })
  async getdriver(
    @Body() body: any
  ): Promise<any> {
    const response: any = await this.dashboardService.getdriver(
      body
    );
    return {
      status: HttpStatus.OK,
      message: 'GET_UNIT_OK',
      data: response,
      error: null,
      timestamp: now(),
    };
  }



}
