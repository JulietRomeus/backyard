import { Logger } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { UserRepository } from 'src/modules/user/user.repository';
import { CreateUserCommand } from '../impl/create-user.command';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    private readonly publisher: EventPublisher,
    private readonly repository: UserRepository,
  ) {}

  async execute(command: CreateUserCommand) {
    Logger.log('[Command] Handle CreateUserCommand...', 'User Module');

    const { createUserDto } = command;

    const user = this.publisher.mergeObjectContext(
      await this.repository.createUser(createUserDto),
    );

    user.commit();
  }
}
