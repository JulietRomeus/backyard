import { User } from './../../entities/user.entity';
import { Role } from './../../entities/role.entity';
import { Module } from '@nestjs/common';
import { DriverService } from './driver.service';
import { DriverController } from './driver.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Entities from '../../entities/Index';


@Module({
  controllers: [DriverController],
  providers: [DriverService],

  imports: [TypeOrmModule.forFeature([...Entities], 'MSSQL_CONNECTION'),TypeOrmModule.forFeature([User], 'PROGRESS')],


})
export class DriverModule {}
