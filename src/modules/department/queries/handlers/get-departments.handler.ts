import { Logger } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Department } from '../../department.entity';
import { DepartmentRepository } from '../../department.repository';
import { GetDepartmentsQuery } from '../impl/get-departments.query';

@QueryHandler(GetDepartmentsQuery)
export class GetDepartmentsHandler
  implements IQueryHandler<GetDepartmentsQuery>
{
  constructor(private readonly repository: DepartmentRepository) {}

  async execute(): Promise<Department[]> {
    Logger.log('[Query] GetDepartmentsQuery...', 'Department Module');
    return await this.repository.find();
  }
}
