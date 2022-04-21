import { Module } from '@nestjs/common';
import { DivisionService } from './division.service';
import { DivisionController } from './division.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DivisionRepository } from './division.repository';
import { CommandHandlers } from './commands/handlers';
import { QueryHandlers } from './queries/handlers';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([DivisionRepository])],
  controllers: [DivisionController],
  providers: [DivisionService, ...CommandHandlers, ...QueryHandlers],
})
export class DivisionModule {}
