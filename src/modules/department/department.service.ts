import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { FindOneOptions } from 'typeorm';
import { CreateDepartmentCommand } from './commands/impl/create-department.command';
import { DeleteDepartmentCommand } from './commands/impl/delete-department.command';
import { UpdateDepartmentCommand } from './commands/impl/update-department.command';
import { Department } from './department.entity';
import { CreateDepartmentDto } from './interfaces/dtos/create-department.dto';
import { DeleteDepartmentDto } from './interfaces/dtos/delete-department.dto';
import { GetDepartmentQuery } from './queries/impl/get-department.query';
import { GetDepartmentsQuery } from './queries/impl/get-departments.query';
import { GetUsersQuery } from './queries/impl/get-users.query';
@Injectable()
export class DepartmentService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  /* ------------------------------- Create Department ------------------------------ */
  async createDepartment(department: CreateDepartmentDto) {
    const response = await this.commandBus.execute(
      new CreateDepartmentCommand(department),
    );
    return response;
  }

  /* ------------------------------- Update Department ------------------------------ */
  async updateDepartment(updateDepartmentDto: CreateDepartmentDto) {
    return await this.commandBus.execute(
      new UpdateDepartmentCommand(updateDepartmentDto),
    );
  }

  /* ------------------------------- Delete Department ------------------------------ */
  async deleteDepartment(deleteDepartmentDto: DeleteDepartmentDto) {
    return await this.commandBus.execute(
      new DeleteDepartmentCommand(deleteDepartmentDto),
    );
  }

  /* -------------------------------- Get Departments ------------------------------- */

  async findDepartments() {
    return this.queryBus.execute(new GetDepartmentsQuery());
  }

  /* -------------------------------- Get Department -------------------------------- */
  async findDepartment(condition: FindOneOptions<Department>) {
    return this.queryBus.execute(new GetDepartmentQuery(condition));
  }
}
