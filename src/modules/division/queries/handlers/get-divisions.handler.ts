import { Logger } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { DivisionRepository } from '../../division.repository';
import { Division } from '../../division.entity';
import { GetDivisionsQuery } from '../impl/get-divisions.query';

@QueryHandler(GetDivisionsQuery)
export class GetDivisionsHandler implements IQueryHandler<GetDivisionsQuery> {
  constructor(private readonly repository: DivisionRepository) {}
  async execute(): Promise<Division[]> {
    Logger.log('[Query] GetDivisionsQuery...', 'User Module');
    return await this.repository.find();
  }
}
