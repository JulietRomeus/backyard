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
import { User } from './entitys/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private positionRepository: Repository<User>,
  ) {}

  /* -------------------------------- Find All -------------------------------- */
  getUsers(): Promise<User[]> {
    return this.positionRepository.find({
      relations: {
        positions: true,
      },
    });
  }

  /* ------------------------------- Find By Id ------------------------------- */
  getUserByUuid(uuid: string) {
    return this.positionRepository.findOne({
      where: { uuid: uuid },
      relations: {
        positions: true,
      },
    });
  }
}
