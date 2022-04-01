import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entitys/user.entity';
import { CreateUserInput } from './interfaces/dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  /* -------------------------------- Find All -------------------------------- */
  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  /* ------------------------------- Find By Id ------------------------------- */
  findById(id: number) {
    return this.usersRepository.findOne({
      where: { id },
    });
  }

  // create(createUserData: CreateUserInput) {
  //   return this.usersRepository.save(createUserData);
  // }
}
