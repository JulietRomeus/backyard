import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { DepartmentRepository } from './department.repository';
import { DepartmentController } from './department.controller';
import { DepartmentService } from './department.service';
import { CommandHandlers } from './commands/handlers';
import { QueryHandlers } from './queries/handlers';
import { DepartmentSaga } from './sagas/department.saga';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([DepartmentRepository])],
  controllers: [DepartmentController],
  providers: [
    DepartmentService,
    DepartmentSaga,
    ...CommandHandlers,
    ...QueryHandlers,
  ],
})
export class DepartmentModule {}
