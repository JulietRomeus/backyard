import { PartialType } from '@nestjs/mapped-types';
import { CreatetransactionDto } from './create-transaction.dto';
import { RequestByDto } from '../../../common/interfaces/requestBy.dto';
import {
  ArrayMinSize,
  IsObject,
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsDateString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatetransactionDto extends PartialType(CreatetransactionDto) {






    
}
