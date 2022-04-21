import { ICommand } from '@nestjs/cqrs';
import { CreateDivisionDto } from '../../interfaces/dtos/create-division.dto';

export class CreateDivisionCommand implements ICommand {
  constructor(public readonly createDivisionDto: CreateDivisionDto) {}
}
