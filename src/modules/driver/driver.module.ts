import { Module } from '@nestjs/common';
import { DriverService } from './driver.service';
import { DriverController } from './driver.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Entities from '../../entities/Index';

@Module({
  controllers: [DriverController],
  providers: [DriverService],

  imports: [TypeOrmModule.forFeature([...Entities], 'MSSQL_CONNECTION')],
})
export class DriverModule {}
