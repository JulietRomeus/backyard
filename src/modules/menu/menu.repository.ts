import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoleCommand } from '../role/commands/impl/create-role.command';
import { GetRoleQuery } from '../role/queries/impl/get-role.query';
import { CreateMenuDto } from './interfaces/dtos/create-menu.dto';
import { Menu } from './menu.entity';

@Injectable()
export class MenuRepository {
  constructor(
    @InjectRepository(Menu)
    private readonly menuRepository: Repository<Menu>,

    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  async createMenu(menuDto: CreateMenuDto) {
    const menu = await this.menuRepository.save(
      this.menuRepository.create(menuDto),
    );

    // have role relation
    if (menuDto.roleId) {
      const role = await this.queryBus.execute(
        new GetRoleQuery({
          where: { id: menuDto.roleId },
          relations: ['menus'],
        }),
      );

      if (role) {
        role.menus = [...role.menus, menu];

        // save role with menu
        await this.commandBus.execute(new CreateRoleCommand(role));
      }
    }

    return menu;
  }
}
