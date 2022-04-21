import { CreateDepartmentHandler } from './create-department.handler';
import { DeleteDepartmentHandler } from './delete-department.handler';
import { UpdateDepartmentHandler } from './update-department.handler';

export const CommandHandlers = [
  CreateDepartmentHandler,
  DeleteDepartmentHandler,
  UpdateDepartmentHandler,
];
