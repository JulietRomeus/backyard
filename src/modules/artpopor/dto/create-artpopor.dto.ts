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

export class CreateArtpoporDto {
    @IsString()
    a:string ;
    @IsString()
    @IsOptional()
    @IsNotEmpty()
    b:string ;
    @ArrayMinSize(3)
    c:string[];

    @IsObject()
    d:{
        s:string;
        y:number;
        z:boolean;
    }

}
