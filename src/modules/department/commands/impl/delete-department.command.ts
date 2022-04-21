import { ICommand } from '@nestjs/cqrs';
import { DeleteDepartmentDto } from '../../interfaces/dtos/delete-department.dto';

export class DeleteDepartmentCommand implements ICommand {
  constructor(public readonly deleteDepartmentDto: DeleteDepartmentDto) {}
}
