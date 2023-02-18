import { Module } from '@nestjs/common';
import { ObstacleService } from './obstacle.service';
import { ObstacleController } from './obstacle.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Entities from '../../entities/Index';

@Module({
  controllers: [ObstacleController],
  providers: [ObstacleService],

  imports: [TypeOrmModule.forFeature([...Entities], 'MSSQL_CONNECTION')],
})
export class ObstacleModule {}
