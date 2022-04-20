import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { FindOneOptions } from 'typeorm';
import { CreateUserCommand } from './commands/impl/create-user.command';
import { DeleteUserCommand } from './commands/impl/delete-user.command';
import { UpdateUserCommand } from './commands/impl/update-user.command';
import { CreateUserDto } from './interfaces/dtos/create-user.dto';
import { DeleteUserDto } from './interfaces/dtos/delete-user.dto';
import { UpdateUserDto } from './interfaces/dtos/update-user.dto';
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
  async updateUser(updateUserDto: UpdateUserDto) {
    return await this.commandBus.execute(new UpdateUserCommand(updateUserDto));
  }

  /* ------------------------------- Delete User ------------------------------ */
  async deleteUser(deleteUserDto: DeleteUserDto) {
    return await this.commandBus.execute(new DeleteUserCommand(deleteUserDto));
  }

  /* -------------------------------- Get Users ------------------------------- */

  async findUsers() {
    return this.queryBus.execute(new GetUsersQuery());
  }

  /* -------------------------------- Get User -------------------------------- */
  async findUser(condition: FindOneOptions<User>) {
    return this.queryBus.execute(new GetUserQuery(condition));
  }
}
