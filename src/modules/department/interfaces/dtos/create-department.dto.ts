import { Department } from '../../department.entity';

export class CreateDepartmentDto {
  id?: string;
  nameTh?: string;
  nameEn: string;
  abbreviation?: string;
  iconUrl?: string;
  desc?: string;
}
