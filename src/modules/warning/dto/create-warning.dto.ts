import { ApiProperty } from '@nestjs/swagger';
import { FileDto } from 'src/common/interfaces/file.dto';
import { RequestByDto } from '../../../common/interfaces/requestBy.dto';

export class CreateWarningDto extends RequestByDto {
  @ApiProperty({
    example: 'สถานการณ์น้ำท่วม',
  })
  title: string;
  create_by: string;
  create_by_id: string;
  create_date: Date;
  warning_status: { id: string };
}
