import { ApiProperty } from '@nestjs/swagger';
import { FileDto } from 'src/common/interfaces/file.dto';
import { CreateInfoDto } from './create-info.dto';

export class ResponseInfoDto extends CreateInfoDto {}
