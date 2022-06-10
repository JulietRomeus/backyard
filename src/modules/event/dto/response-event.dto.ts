import { ApiProperty } from '@nestjs/swagger';
import { FileDto } from 'src/common/interfaces/file.dto';
import { CreateEventDto } from './create-event.dto';

export class ResponseEventDto extends CreateEventDto {}
