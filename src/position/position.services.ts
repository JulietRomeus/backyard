import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
  UseFilters,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Position } from './entitys/position.entity';

@Injectable()
export class PositionService {
  constructor(
    @InjectRepository(Position)
    private positionRepository: Repository<Position>,
  ) {}

  /* -------------------------------- Find All -------------------------------- */
  getPositions(): Promise<Position[]> {
    return this.positionRepository.find({
      relations: {
        users: true,
      },
    });
  }

  /* ------------------------------- Find By Id ------------------------------- */
  getPositionByUuid(uuid: string) {
    return this.positionRepository.findOne({
      where: { uuid: uuid },
      relations: {
        users: true,
      },
    });
  }
}
