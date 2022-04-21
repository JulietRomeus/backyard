import { EntityRepository, FindOneOptions, Repository } from 'typeorm';
import { Department } from './department.entity';
import { CreateDepartmentDto } from './interfaces/dtos/create-department.dto';
import { DeleteDepartmentDto } from './interfaces/dtos/delete-department.dto';

@EntityRepository(Department)
export class DepartmentRepository extends Repository<Department> {
  async createDepartment(payload: CreateDepartmentDto) {
    const department = await this.save(super.create(payload));
    return department;
  }

  async deleteDepartment(payload: DeleteDepartmentDto) {
    const department = new Department();
    department.id = payload.id;

    const result = await super.remove(department);
    return result;
  }

  async getDepartments() {
    const department = await this.find();
    return department;
  }

  async getDepartment(condition: FindOneOptions<Department>) {
    return await this.findOne(condition);
  }
}
