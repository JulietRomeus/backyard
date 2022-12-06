import { PartialType } from '@nestjs/swagger';
import { CreateKhiwqqDto } from './create-khiwqq.dto';

export class UpdateKhiwqqDto extends PartialType(CreateKhiwqqDto) {}
