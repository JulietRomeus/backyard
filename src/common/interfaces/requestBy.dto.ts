import { Exclude, Expose } from 'class-transformer';
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

export class RequestByDto {
  @IsObject()
  request_by: {
    id: string;
    displayname: string;
    email: Array<string>;
    roles: { id: string }[];
    activeUnit: { id: string; code: string; name: string };
    units: { id: string; code: string; name: string }[];
    token: string;
    filter: any;
    data_permission: any;
  };
}
