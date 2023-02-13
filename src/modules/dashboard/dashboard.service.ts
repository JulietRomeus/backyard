import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class DashboardService {
    constructor(
        // @InjectRepository(ActivityTimeline, 'MSSQL_CONNECTION_HOST')
        // private readonly activityTimelineepository: Repository<ActivityTimeline>,
    
    ) { }

}