import { Module } from '@nestjs/common';
import { FacilityService } from './facility.service';
import { FacilityController } from './facility.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Entities from '../../entities/Index';

@Module({
  controllers: [FacilityController],
  providers: [FacilityService],

  imports: [TypeOrmModule.forFeature([...Entities], 'MSSQL_CONNECTION')],
})
export class FacilityModule {}
