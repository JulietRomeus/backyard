import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { FindOneOptions } from 'typeorm';
import { CreateDivisionCommand } from './commands/impl/create-division.command';
import { DeleteDivisionCommand } from './commands/impl/delete-division.command';
import { UpdateDivisionCommand } from './commands/impl/update-division.command';
import { Division } from './division.entity';
import { CreateDivisionDto } from './interfaces/dtos/create-division.dto';
import { DeleteDivisionDto } from './interfaces/dtos/delete-division.dto';
import { UpdateDivisionDto } from './interfaces/dtos/update-division.dto';
import { GetDivisionQuery } from './queries/impl/get-division.query';
import { GetDivisionsQuery } from './queries/impl/get-divisions.query';

@Injectable()
export class DivisionService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  async createDivision(payload: CreateDivisionDto) {
    const response = await this.commandBus.execute(
      new CreateDivisionCommand(payload),
    );
    return response;
  }

  async updateDivision(payload: UpdateDivisionDto) {
    return await this.commandBus.execute(new UpdateDivisionCommand(payload));
  }

  async deleteDivision(payload: DeleteDivisionDto) {
    return await this.commandBus.execute(new DeleteDivisionCommand(payload));
  }

  async getDivisions() {
    return this.queryBus.execute(new GetDivisionsQuery());
  }

  async getDivision(condition: FindOneOptions<Division>) {
    return this.queryBus.execute(new GetDivisionQuery(condition));
  }
}
