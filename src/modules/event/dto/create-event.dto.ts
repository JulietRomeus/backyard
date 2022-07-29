import { ApiProperty } from '@nestjs/swagger';
import { FileDto } from 'src/common/interfaces/file.dto';
import { RequestByDto } from '../../../common/interfaces/requestBy.dto';

export class CreateEventDto extends RequestByDto {
  @ApiProperty({
    example: 'สถานการณ์น้ำท่วม',
  })
  event_name: string;

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
    example: 1,
    nullable: true,
  })
  disaster_level?: number;

  @ApiProperty({
    example: 1,
    nullable: true,
  })
  event_status?: { id: string; no?: string };

  @ApiProperty({
    example: 1,
    nullable: true,
  })
  status?: number;

  @ApiProperty({
    example: 'xxxxxx',
    nullable: true,
  })
  note?: string;

  @ApiProperty({
    example: '2022-05-01 00:00:00',
    nullable: true,
  })
  expect_start_date?: Date;

  @ApiProperty({
    example: '2022-05-01 00:00:00',
    nullable: true,
  })
  expect_end_date?: Date;

  @ApiProperty({
    example: '2022-05-01 00:00:00',
    nullable: true,
  })
  start_date?: Date;

  @ApiProperty({
    example: '2022-05-01 00:00:00',
    nullable: true,
  })
  end_date?: Date;

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

  event_area?: {
    id?: string;
    province_code?: string;
    amphoe_code?: string;
    tambon_code?: string;
    mooban_code?: string;
  }[];
}
