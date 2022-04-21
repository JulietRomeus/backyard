import { Logger } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { DivisionRepository } from '../../division.repository';
import { DeleteDivisionCommand } from '../impl/delete-division.command';

@CommandHandler(DeleteDivisionCommand)
export class DeleteDivisionHandler
  implements ICommandHandler<DeleteDivisionCommand>
{
  constructor(
    private readonly publisher: EventPublisher,
    private readonly repository: DivisionRepository,
  ) {}

  async execute(command: DeleteDivisionCommand) {
    Logger.log('[Command] Handler DeleteDivisionCommand...', 'Division Module');

    const { deleteDivisionDto } = command;

    const result = this.publisher.mergeObjectContext(
      await this.repository.deleteDivision(deleteDivisionDto),
    );

    result.commit();
  }
}
