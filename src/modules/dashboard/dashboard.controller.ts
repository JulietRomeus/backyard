import {
    Controller,
    Post,
    Get,
    Body,
    HttpStatus,
    Param,
} from '@nestjs/common';
import {
    ApiTags,
    ApiBearerAuth,
    ApiOperation
} from '@nestjs/swagger';
import { DashboardService } from './dashboard.service';
import now from '../../utils/now';

import { Permission } from 'src/decorators/permission.decorator';


@Controller('dashboard')
@ApiTags('Dashboard (ข้อมูลสำหรับ dashboards)')
export class DashboardController {
    constructor(private readonly dashboardService: DashboardService) { }

    // @Get('//:id')
    // @Permission({ route: defaultRoute, action: 'view' })
    // @ApiBearerAuth('JWT')
    // @ApiOperation({ summary: 'Get EventMember count by org' })
    // async getEventMember(@Param('id') id: string, @Body() request_by: any): Promise<any> {
    //     const response: any = await this.dashboardService.getEventMember(id,request_by)
    //     // console.log("response---------->",response)
    //     return {
    //         status: HttpStatus.OK,
    //         message: 'GET_ACTIVITY_TIMELINE_OK',
    //         data: response.data,
    //         error: null,
    //         timestamp: now(),
    //     };
    // }


}