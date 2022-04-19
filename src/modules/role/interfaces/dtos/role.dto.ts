import { Expose } from 'class-transformer';
import { AbstractDto } from 'src/common/interfaces/dto/abstract.dto';

export class RoleDto extends AbstractDto {
  @Expose()
  readonly nameTh?: string;

  @Expose()
  readonly nameEn: string;
}
