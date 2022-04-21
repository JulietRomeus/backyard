import { ICommand } from '@nestjs/cqrs';
import { CreateDepartmentDto } from '../../interfaces/dtos/create-department.dto';

export class CreateDepartmentCommand implements ICommand {
  constructor(public readonly createDepartmentDto: CreateDepartmentDto) {}
}
