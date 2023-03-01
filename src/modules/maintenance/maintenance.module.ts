import { Module } from '@nestjs/common';
import { MaintenanceService } from './maintenance.service';
import { MaintenanceController } from './maintenance.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Entities from '../../entities/Index';

@Module({
  controllers: [MaintenanceController],
  providers: [MaintenanceService],

  imports: [TypeOrmModule.forFeature([...Entities], 'MSSQL_CONNECTION')],
})
export class MaintenanceModule {}
