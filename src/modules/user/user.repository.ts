import { User } from './user.entity';
import { CreateUserDto } from './interfaces/dtos/create-user.dto';
import { EntityRepository, FindOneOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(payload: CreateUserDto) {
    const user = await this.save(super.create(payload));
    return user;
  }

  async getUsers() {
    const user = await this.find({ relations: ['roles'] });
    return user;
  }

  async getUser(condition: FindOneOptions<User>) {
    return await this.findOne(condition);
  }
}
