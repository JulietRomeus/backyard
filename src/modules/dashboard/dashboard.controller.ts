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


   @Post('missionall')
   missionAll(@Body() createdashboardDto: any) {
     console.log('createDriverDto',createdashboardDto)
     return this.dashboardService.missionAll(createdashboardDto);
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
