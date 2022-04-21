import { IQuery } from '@nestjs/cqrs';
import { FindOneOptions } from 'typeorm';
import { Department } from '../../department.entity';

export class GetDepartmentQuery implements IQuery {
  constructor(public readonly findData: FindOneOptions<Department>) {}
}
