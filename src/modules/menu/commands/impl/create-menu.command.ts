import { ICommand } from '@nestjs/cqrs';
import { CreateMenuDto } from '../../interfaces/dtos/create-menu.dto';

export class CreateMenuCommand implements ICommand {
  constructor(public readonly createMenuDto: CreateMenuDto) {}
}
