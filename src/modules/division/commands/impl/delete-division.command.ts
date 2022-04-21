import { ICommand } from '@nestjs/cqrs';
import { DeleteDivisionDto } from '../../interfaces/dtos/delete-division.dto';

export class DeleteDivisionCommand implements ICommand {
  constructor(public readonly deleteDivisionDto: DeleteDivisionDto) {}
}
