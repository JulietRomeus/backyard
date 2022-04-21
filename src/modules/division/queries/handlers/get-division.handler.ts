import { Logger } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { DivisionRepository } from '../../division.repository';
import { Division } from '../../division.entity';
import { GetDivisionQuery } from '../impl/get-division.query';

@QueryHandler(GetDivisionQuery)
export class GetDivisionHandler implements IQueryHandler<GetDivisionQuery> {
  constructor(private readonly repository: DivisionRepository) {}

  async execute(query: GetDivisionQuery): Promise<Division> {
    Logger.log('[Query] GetDivisionQuery...', 'Division Module');

    const { findData } = query;

    const result = await this.repository.getDivision(findData);
    return result;
  }
}
