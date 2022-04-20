import { Logger } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { UserRepository } from '../../user.repository';
import { DeleteUserCommand } from '../impl/delete-user.command';

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand> {
  constructor(
    private readonly publisher: EventPublisher,
    private readonly repository: UserRepository,
  ) {}

  async execute(command: DeleteUserCommand) {
    Logger.log('[Command] Handler DeleteUserCommand...', 'User Module');

    const { deleteUserDto } = command;

    const user = this.publisher.mergeObjectContext(
      await this.repository.deleteUser(deleteUserDto),
    );

    user.commit();
  }
}
