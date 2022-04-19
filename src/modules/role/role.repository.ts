import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateUserCommand } from '../user/commands/impl/create-user.command';
import { GetUserQuery } from '../user/queries/impl/get-user.query';
import { User } from '../user/user.entity';
import { CreateRoleDto } from './interfaces/dtos/create-role.dto';
import { Role } from './role.entity';

@Injectable()
export class RoleRepository {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,

    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  async createRole(payload: CreateRoleDto) {
    const role = await this.roleRepository.save(
      this.roleRepository.create(payload),
    );

    // have user relation
    if (payload.userId) {
      const user = await this.queryBus.execute(
        new GetUserQuery({
          where: { id: payload.userId },
          relations: ['roles'],
        }),
      );

      if (user) {
        user.roles = [...user.roles, role];

        // save user with role
        await this.commandBus.execute(new CreateUserCommand(user));
      }
    }

    return role;
  }

  async getRoles() {
    return await this.roleRepository.find();
  }

  async getRole(condition: FindOneOptions<Role>) {
    return await this.roleRepository.findOne(condition);
  }
}
