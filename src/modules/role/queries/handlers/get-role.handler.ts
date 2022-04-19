import { Logger } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Role } from '../../role.entity';
import { RoleRepository } from '../../role.repository';
import { GetRoleQuery } from '../impl/get-role.query';

@QueryHandler(GetRoleQuery)
export class GetUserHandler implements IQueryHandler<GetRoleQuery> {
  constructor(private readonly repository: RoleRepository) {}

  async execute(query: GetRoleQuery): Promise<Role> {
    Logger.log('[Query] GetMenuQuery...', 'User Module');

    const { findData } = query;

    const user = await this.repository.getRole(findData);
    return user;
  }
}
