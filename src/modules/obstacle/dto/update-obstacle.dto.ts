import { PartialType } from '@nestjs/mapped-types';
import { CreateObstacleDto } from './create-obstacle.dto';

export class UpdateObstacleDto extends PartialType(CreateObstacleDto) {}
