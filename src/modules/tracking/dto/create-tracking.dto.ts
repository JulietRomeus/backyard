import { RequestByDto } from 'src/common/interfaces/requestBy.dto';
export class CreateTrackingDto extends RequestByDto {
  name: string;
  reference_code: string;
  client_id: string;
  update_by_id: string;
  update_by: string;
  operation_id: {
    operation_id: string;
  };
}
