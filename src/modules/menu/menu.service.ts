import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateMenuCommand } from './commands/impl/create-menu.command';
import { CreateMenuDto } from './interfaces/dtos/create-menu.dto';

@Injectable()
export class MenuService {
  constructor(
    private readonly $command: CommandBus,
    private readonly $query: QueryBus,
  ) {}

  /* ------------------------------- Create Menu ------------------------------ */
  createMenu(menuDto: CreateMenuDto) {
    return this.$command.execute(new CreateMenuCommand(menuDto));
  }
}
