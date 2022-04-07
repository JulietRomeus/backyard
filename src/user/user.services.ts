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
import { CreateUserBodyDto } from './interfaces/body/create-user-body.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  /* ------------------------------- Create User ------------------------------ */
  createUser(user: CreateUserBodyDto): Promise<User> {
    return this.userRepository.save(user);
  }

  /* -------------------------------- Find All -------------------------------- */
  getUsers(): Promise<User[]> {
    return this.userRepository.find({
      relations: {
        positions: true,
      },
    });
  }

  /* ------------------------------- Find By Id ------------------------------- */
  getUserByUuid(uuid: string) {
    return this.userRepository.findOne({
      where: { uuid: uuid },
      relations: {
        positions: true,
      },
    });
  }
}
