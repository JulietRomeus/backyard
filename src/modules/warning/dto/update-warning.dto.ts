import { PartialType } from '@nestjs/swagger';
import { CreateWarningDto } from './create-warning.dto';

export class UpdateWarningDto extends PartialType(CreateWarningDto) {
  comment: string;
  update_by: string;
  update_by_id: string;
  update_date: Date;
  review_by: string;
  review_by_id: string;
  review_date: Date;
  sendback_by: string;
  sendback_by_id: string;
  sendback_date: Date;
  approve_by: string;
  approve_by_id: string;
  approve_date: Date;
  complete_by: string;
  complete_by_id: string;
  complete_date: Date;
  delete_by: string;
  delete_by_id: string;
  delete_date: Date;
}
