import { Logger } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { MenuRepository } from '../../menu.repository';
import { CreateMenuCommand } from '../impl/create-menu.command';

@CommandHandler(CreateMenuCommand)
export class CreateMenuHandler implements ICommandHandler<CreateMenuCommand> {
  constructor(
    private readonly publisher: EventPublisher,
    private readonly menuRepository: MenuRepository,
  ) {}

  async execute(command: CreateMenuCommand) {
    Logger.log('[Command] Handle CreateMenuCommand...', 'Menu Module');

    const { createMenuDto } = command;
    const menu = this.publisher.mergeObjectContext(
      await this.menuRepository.createMenu(createMenuDto),
    );

    menu.commit();
  }
}
