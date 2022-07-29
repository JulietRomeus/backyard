import { ApiProperty } from '@nestjs/swagger';
import { FileDto } from 'src/common/interfaces/file.dto';
import { RequestByDto } from '../../../common/interfaces/requestBy.dto';

export class CreateInfoDto extends RequestByDto {
  @ApiProperty({
    example: 'สถานการณ์น้ำท่วม',
  })
  title: string;

  @ApiProperty({
    example: {
      disaster_type_id: 'xxxxx',
      disaster_type_name: 'น้ำท่วม',
    },
    nullable: true,
  })
  
  disaster_type?: {
    disaster_type_id: string;
    disaster_type_name: string | null;
  };

  @ApiProperty({
    example: {
      agency_id: 'xxxxx',
      agency_name: 'ไทยรัฐ',
    },
    nullable: true,
  })
  agency?: {
    agency_id: number;
    agency_name: string | null;
  };

  @ApiProperty({
    example: 1,
    nullable: true,
  })
  critical_flag?: number;

  @ApiProperty({
    example: 1,
    nullable: true,
  })
  form_status?: { id: string; no?: string };

  @ApiProperty({
    example: 1,
    nullable: true,
  })
  status?: number;

  @ApiProperty({
    example: 'xxxxxx',
    nullable: true,
  })
  detail?: string;

  @ApiProperty({
    example: '2022-05-01 00:00:00',
    nullable: true,
  })
  publish_date?: Date;

  @ApiProperty({
    example: '2022-05-01 00:00:00',
    nullable: true,
  })
  expect_form?: Date;

  @ApiProperty({
    example: '2022-05-01 00:00:00',
    nullable: true,
  })
  expect_to?: Date;

  files?: FileDto[];

  @ApiProperty({
    example: 'xxxxxx',
    nullable: true,
  })
  create_by?: string;

  @ApiProperty({
    example: 'xxxxxx',
    nullable: true,
  })
  create_by_id?: string;

  @ApiProperty({
    example: '2022-05-01 00:00:00',
    nullable: true,
  })
  create_date?: Date;
  @ApiProperty({
    example: 'xxxxxx',
    nullable: true,
  })
  update_by?: string;
  @ApiProperty({
    example: 'xxxxxx',
    nullable: true,
  })
  update_by_id?: string;

  @ApiProperty({
    example: '2022-05-01 00:00:00',
    nullable: true,
  })
  update_date?: Date;
  @ApiProperty({
    example: 'xxxxxx',
    nullable: true,
  })
  delete_by?: string;
  @ApiProperty({
    example: 'xxxxxx',
    nullable: true,
  })
  delete_by_id?: string;

  @ApiProperty({
    example: '2022-05-01 00:00:00',
    nullable: true,
  })
  delete_date?: Date;

  @ApiProperty({
    example: true,
    nullable: true,
  })
  is_notification?: boolean;
}
