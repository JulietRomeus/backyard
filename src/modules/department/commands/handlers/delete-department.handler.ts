import { Logger } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { DepartmentRepository } from '../../department.repository';
import { DeleteDepartmentCommand } from '../impl/delete-department.command';

@CommandHandler(DeleteDepartmentCommand)
export class DeleteDepartmentHandler
  implements ICommandHandler<DeleteDepartmentCommand>
{
  constructor(
    private readonly publisher: EventPublisher,
    private readonly repository: DepartmentRepository,
  ) {}

  async execute(command: DeleteDepartmentCommand) {
    Logger.log(
      '[Command] Handler DeleteDepartmentCommand...',
      'Department Module',
    );

    const { deleteDepartmentDto } = command;

    const department = this.publisher.mergeObjectContext(
      await this.repository.deleteDepartment(deleteDepartmentDto),
    );

    department.commit();
  }
}
