import { ApiProperty } from '@nestjs/swagger';

export class IdDto {
  @ApiProperty({
    example: 'e031825a-8619-452f-927f-17ab0a6282eb',
  })
  id: string;
}
