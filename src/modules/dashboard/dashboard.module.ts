import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Entities from '../../entities'

@Module({
  controllers: [DashboardController],
  providers: [DashboardService],

  imports:[
    TypeOrmModule.forFeature([...Entities],'MSSQL_CONNECTION')
  ]
})
export class DriverModule {}
