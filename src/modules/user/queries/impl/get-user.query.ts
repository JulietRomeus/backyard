import { IQuery } from '@nestjs/cqrs';
import { FindOneOptions } from 'typeorm';
import { User } from '../../user.entity';

export class GetUserQuery implements IQuery {
  constructor(public readonly findData: FindOneOptions<User>) {}
}
