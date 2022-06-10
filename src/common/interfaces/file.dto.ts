import { ApiProperty } from '@nestjs/swagger';

export class FileDto {
  // constructor(partial: Partial<FileDto>) {
  //   Object.assign(this, partial);
  // }
  @ApiProperty()
  request_id: number;
  @ApiProperty()
  file_id: string;
  @ApiProperty()
  file_name: string;
}
