import { Logger } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { DepartmentRepository } from '../../department.repository';
import { CreateDepartmentCommand } from '../impl/create-department.command';

@CommandHandler(CreateDepartmentCommand)
export class CreateDepartmentHandler
  implements ICommandHandler<CreateDepartmentCommand>
{
  constructor(
    private readonly publisher: EventPublisher,
    private readonly repository: DepartmentRepository,
  ) {}

  async execute(command: CreateDepartmentCommand) {
    Logger.log(
      '[Command] Handle CreateDepartmentCommand...',
      'Department Module',
    );

    const { createDepartmentDto } = command;

    const department = this.publisher.mergeObjectContext(
      await this.repository.createDepartment(createDepartmentDto),
    );

    department.commit();
  }
}
