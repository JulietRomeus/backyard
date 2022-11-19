import { RequestByDto } from '../../../common/interfaces/requestBy.dto';

export class DeleteActivityDto extends RequestByDto {
  'is_delete': boolean;
  'delete_date': Date;
  'delete_by': string;
  'delete_by_name': string;
}
