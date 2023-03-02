import { PartialType } from '@nestjs/mapped-types';
import { CreatetransactionDto } from './create-transaction.dto';

export class UpdatetransactionDto extends PartialType(CreatetransactionDto) {}
