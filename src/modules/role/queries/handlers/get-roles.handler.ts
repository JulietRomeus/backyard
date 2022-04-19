import { Logger } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Role } from '../../role.entity';
import { RoleRepository } from '../../role.repository';
import { GetRolesQuery } from '../impl/get-roles.query';

@QueryHandler(GetRolesQuery)
export class GetUsersHandler implements IQueryHandler<GetRolesQuery> {
  constructor(private readonly repository: RoleRepository) {}
  async execute(): Promise<Role[]> {
    Logger.log('[Query] GetUsersQuery...', 'User Module');
    return await this.repository.getRoles();
  }
}
