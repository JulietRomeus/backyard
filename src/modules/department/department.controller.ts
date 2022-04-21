import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Department } from './department.entity';
import { DepartmentService } from './department.service';
import { CreateDepartmentDto } from './interfaces/dtos/create-department.dto';
import { DeleteDepartmentDto } from './interfaces/dtos/delete-department.dto';

@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  /* ------------------------------- Create Department ------------------------------ */
  @MessagePattern('CREATE_DEPARTMENT')
  public async createUser(user: CreateDepartmentDto) {
    await this.departmentService.createDepartment(user);
    return {
      status: HttpStatus.CREATED,
      message: 'CREATE_DEPARTMENT_OK',
      data: null,
      errors: null,
      timestamp: new Date().toISOString(),
    };
  }

  /* ------------------------------- Update Department ------------------------------ */
  @MessagePattern('UPDATE_DEPARTMENT')
  public async updateUser(payload: CreateDepartmentDto) {
    const result = await this.departmentService.updateDepartment(payload);
    return {
      status: HttpStatus.OK,
      message: 'UPDATE_USER_OK',
      data: result,
      errors: null,
      timestamp: new Date().toISOString(),
    };
  }

  /* ------------------------------- Delete Department ------------------------------ */
  @MessagePattern('DELETE_DEPARTMENT')
  public async deleteDepartment(payload: DeleteDepartmentDto) {
    const result = await this.departmentService.deleteDepartment(payload);
    return {
      status: HttpStatus.OK,
      message: 'DELETE_DEPARTMENT_OK',
      data: result,
      errors: null,
      timestamp: new Date().toISOString(),
    };
  }

  /* -------------------------------- Get Departments ------------------------------- */
  @MessagePattern('GET_DEPARTMENTS')
  public async getDepartment() {
    const result = await this.departmentService.findDepartments();
    return {
      status: HttpStatus.OK,
      message: 'GET_DEPARTMENTS_OK',
      data: result,
      errors: null,
      timestamp: new Date().toISOString(),
    };
  }

  /* ----------------------------- Get Department By ID ----------------------------- */
  @MessagePattern('GET_DEPARTMENT_BY_ID')
  public async getUserById(params: { id: string }) {
    const result = await this.departmentService.findDepartment({
      where: { id: params.id },
    });
    return {
      status: HttpStatus.OK,
      message: 'GET_USER_BY_ID_OK',
      data: result,
      errors: null,
      timestamp: new Date().toISOString(),
    };
  }
}
