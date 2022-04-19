import { IQuery } from '@nestjs/cqrs';
import { FindOneOptions } from 'typeorm';
import { Role } from '../../role.entity';

export class GetRoleQuery implements IQuery {
  constructor(public readonly findData: FindOneOptions<Role>) {}
}
