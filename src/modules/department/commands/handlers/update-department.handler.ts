import { Logger } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { DepartmentRepository } from '../../department.repository';
import { UpdateDepartmentCommand } from '../impl/update-department.command';

@CommandHandler(UpdateDepartmentCommand)
export class UpdateDepartmentHandler
  implements ICommandHandler<UpdateDepartmentCommand>
{
  constructor(
    private readonly publisher: EventPublisher,
    private readonly repository: DepartmentRepository,
  ) {}

  async execute(command: UpdateDepartmentCommand) {
    Logger.log(
      '[Command] Handler UpdateDepartmentCommand...',
      'Department Module',
    );

    const { updateDepartmentDto } = command;

    const department = this.publisher.mergeObjectContext(
      await this.repository.createDepartment(updateDepartmentDto),
    );

    department.commit();
  }
}
