import { ApiProperty } from '@nestjs/swagger';

export class CreateEventDto {
  @ApiProperty({
    example: 'สถานการณ์น้ำท่วม',
  })
  event_name: string;

  @ApiProperty({
    example: 1,
  })
  disaster_level: number;

  @ApiProperty({
    example: 1,
  })
  disaster_type_id: number;

  @ApiProperty({
    example: '2018-09-19T14:00:43+00:00',
    nullable: true,
  })
  create_date: Date;

  @ApiProperty({
    example: '2018-09-19T14:00:43+00:00',
    nullable: true,
  })
  start_date: Date;

  @ApiProperty({
    example: '2018-09-19T14:00:43+00:00',
    nullable: true,
  })
  end_date: Date;

  @ApiProperty({
    example: '2018-09-19T14:00:43+00:00',
    nullable: true,
  })
  expect_start_date: Date;

  @ApiProperty({
    example: 1,
  })
  status: number;

  @ApiProperty({
    example: 'aom',
    nullable: true,
  })
  create_by: string;
}
