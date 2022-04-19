import { Logger } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { RoleRepository } from '../../role.repository';
import { CreateRoleCommand } from '../impl/create-role.command';

@CommandHandler(CreateRoleCommand)
export class CreateRoleHandler implements ICommandHandler<CreateRoleCommand> {
  constructor(
    private readonly publisher: EventPublisher,
    private readonly roleRepository: RoleRepository,
  ) {}

  async execute(command: CreateRoleCommand): Promise<any> {
    Logger.log('[Command] Handdle CreateRoleCommand...', 'RoleModule');

    const { createRoleDto } = command;
    const result = this.publisher.mergeObjectContext(
      await this.roleRepository.createRole(createRoleDto),
    );

    result.commit();
  }
}
