import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { FindOneOptions } from 'typeorm';
import { CreateUserCommand } from './commands/impl/create-user.command';
import { CreateUserDto } from './interfaces/dtos/create-user.dto';
import { GetUserQuery } from './queries/impl/get-user.query';
import { GetUsersQuery } from './queries/impl/get-users.query';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  /* ------------------------------- Create User ------------------------------ */
  async createUser(user: CreateUserDto) {
    const response = await this.commandBus.execute(new CreateUserCommand(user));
    return response;
  }

  /* ------------------------------- Update User ------------------------------ */
  // TODO Update user

  /* ------------------------------- Delete User ------------------------------ */
  // TODO Delete user

  /* -------------------------------- Get Users ------------------------------- */

  async findUsers() {
    return this.queryBus.execute(new GetUsersQuery());
  }

  /* -------------------------------- Get User -------------------------------- */
  async findUser(condition: FindOneOptions<User>) {
    return this.queryBus.execute(new GetUserQuery(condition));
  }
}
