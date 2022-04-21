import { Logger } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { DivisionRepository } from '../../division.repository';
import { UpdateDivisionCommand } from '../impl/update-division.command';

@CommandHandler(UpdateDivisionCommand)
export class UpdateDivisionHandler
  implements ICommandHandler<UpdateDivisionCommand>
{
  constructor(
    private readonly publisher: EventPublisher,
    private readonly repository: DivisionRepository,
  ) {}

  async execute(command: UpdateDivisionCommand) {
    Logger.log('[Command] Handler UpdateDivisionCommand...', 'Division Module');

    const { updateDivisionDto } = command;

    const result = this.publisher.mergeObjectContext(
      await this.repository.createDivision(updateDivisionDto),
    );

    result.commit();
  }
}
