import { ICommand } from '@nestjs/cqrs';
import { UpdateDivisionDto } from '../../interfaces/dtos/update-division.dto';
export class UpdateDivisionCommand implements ICommand {
  constructor(public readonly updateDivisionDto: UpdateDivisionDto) {}
}
