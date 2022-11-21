import { PartialType } from '@nestjs/swagger';
import { CreateAomDto } from './create-aom.dto';

export class UpdateAomDto extends PartialType(CreateAomDto) {}
