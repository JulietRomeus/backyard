import { ApiProperty } from '@nestjs/swagger';

export class CreateTeamDto {
  @ApiProperty({
    example: 'ทีม1',
  })
  nameTh: string;

  @ApiProperty({
    example: 'Team1',
    nullable: true,
  })
  nameEn: string;

  @ApiProperty({
    example: 'TM1',
    nullable: true,
  })
  abbreviation?: string;
}
