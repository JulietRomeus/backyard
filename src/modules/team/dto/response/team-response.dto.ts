import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class TeamResponseDto {
  @ApiProperty({ example: [HttpStatus.OK, HttpStatus.CREATED] })
  status: number;

  @ApiProperty({ example: ['CREATE_TEAM_OK', 'GET_TEAM_OK'] })
  message: string;

  @ApiProperty({
    example: {
      uuid: 'b828ef62-8502-4007-86be-4633bb194840',
      nameTh: 'ทีม1',
      nameEn: 'Team1',
      abbreviation: 'TM1',
      createdAt: '2022-04-07 15:06:28.475',
      updatedAt: '2022-04-07 15:06:28.475',
    },
  })
  data: any;

  @ApiProperty({
    example: [{ code: 400, message: 'bad request message' }],
    nullable: true,
  })
  error: string;

  @ApiProperty({ example: '2022-04-07T14:28:41.169Z', nullable: true })
  timestamp: Date | string;
}
