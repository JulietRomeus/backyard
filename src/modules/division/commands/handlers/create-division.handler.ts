import { Logger } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { DivisionRepository } from '../../division.repository';
import { CreateDivisionCommand } from '../impl/create-division.command';

@CommandHandler(CreateDivisionCommand)
export class CreateDivisionHandler
  implements ICommandHandler<CreateDivisionCommand>
{
  constructor(
    private readonly publisher: EventPublisher,
    private readonly repository: DivisionRepository,
  ) {}

  async execute(command: CreateDivisionCommand) {
    Logger.log('[Command] Handle CreateUserCommand...', 'Division Module');

    const { createDivisionDto } = command;

    const result = this.publisher.mergeObjectContext(
      await this.repository.createDivision(createDivisionDto),
    );

    result.commit();
  }
}
