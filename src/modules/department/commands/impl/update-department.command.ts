import { ICommand } from '@nestjs/cqrs';
import { CreateDepartmentDto } from '../../interfaces/dtos/create-department.dto';

export class UpdateDepartmentCommand implements ICommand {
  constructor(public readonly updateDepartmentDto: CreateDepartmentDto) {}
}
