import { Logger } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { UserRepository } from '../../user.repository';
import { UpdateUserCommand } from '../impl/update-user.command';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(
    private readonly publisher: EventPublisher,
    private readonly repository: UserRepository,
  ) {}

  async execute(command: UpdateUserCommand) {
    Logger.log('[Command] Handler UpdateUserCommand...', 'User Module');

    const { updateUserDto } = command;

    const user = this.publisher.mergeObjectContext(
      await this.repository.createUser(updateUserDto),
    );

    user.commit();
  }
}
