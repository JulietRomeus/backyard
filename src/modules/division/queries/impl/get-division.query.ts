import { IQuery } from '@nestjs/cqrs';
import { FindOneOptions } from 'typeorm';
import { Division } from '../../division.entity';

export class GetDivisionQuery implements IQuery {
  constructor(public readonly findData: FindOneOptions<Division>) {}
}
