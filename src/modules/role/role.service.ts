import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserCommand } from '../user/commands/impl/create-user.command';
import { CreateRoleCommand } from './commands/impl/create-role.command';
import { CreateRoleDto } from './interfaces/dtos/create-role.dto';
import { RoleDto } from './interfaces/dtos/role.dto';
import { GetRoleQuery } from './queries/impl/get-role.query';
import { GetRolesQuery } from './queries/impl/get-roles.query';

@Injectable()
export class RoleService {
  constructor(
    private readonly $command: CommandBus,
    private readonly $query: QueryBus,
  ) {}

  /* ------------------------------- Create Role ------------------------------ */
  createRole(payload: CreateRoleDto) {
    return this.$command.execute(new CreateRoleCommand(payload));
  }

  /* -------------------------------- Get Roles ------------------------------- */
  getRoles() {
    return this.$query.execute(new GetRolesQuery());
  }

  /* ----------------------------- Get Role By ID ----------------------------- */
  getRole(id: string) {
    return this.$query.execute(
      new GetRoleQuery({ where: { id }, relations: ['menus'] }),
    );
  }
}
