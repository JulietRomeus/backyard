import { Logger } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Department } from '../../department.entity';
import { DepartmentRepository } from '../../department.repository';
import { GetDepartmentQuery } from '../impl/get-department.query';

@QueryHandler(GetDepartmentQuery)
export class GetDepartmentHandler implements IQueryHandler<GetDepartmentQuery> {
  constructor(private readonly repository: DepartmentRepository) {}

  async execute(query: GetDepartmentQuery): Promise<Department> {
    Logger.log('[Query] GetDepartmentQuery...', 'Department Module');

    const { findData } = query;

    const department = await this.repository.getDepartment(findData);
    return department;
  }
}
