import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Position } from './entitys/position.entity';
import { PositionController } from './position.controller';
import { PositionService } from './position.services';

@Module({
  providers: [PositionService],
  imports: [TypeOrmModule.forFeature([Position])],
  controllers: [PositionController],
})
export class PositionModule {}
