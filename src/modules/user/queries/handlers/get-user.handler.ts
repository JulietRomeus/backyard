import { Logger } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { User } from '../../user.entity';
import { UserRepository } from '../../user.repository';
import { GetUserQuery } from '../impl/get-user.query';

@QueryHandler(GetUserQuery)
export class GetUserHandler implements IQueryHandler<GetUserQuery> {
  constructor(private readonly repository: UserRepository) {}

  async execute(query: GetUserQuery): Promise<User> {
    Logger.log('[Query] GetUserQuery...', 'User Module');

    const { findData } = query;

    const user = await this.repository.getUser(findData);
    return user;
  }
}
