import { User } from './user.entity';
import { CreateUserDto } from './interfaces/dtos/create-user.dto';
import { EntityRepository, FindOneOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDto } from './interfaces/dtos/update-user.dto';
import { DeleteUserDto } from './interfaces/dtos/delete-user.dto';
import { use } from 'passport';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(payload: CreateUserDto | UpdateUserDto) {
    const user = await this.save(super.create(payload));
    return user;
  }

  async deleteUser(payload: DeleteUserDto) {
    const user = new User();
    user.id = payload.id;

    const result = await super.remove(user);
    return result;
  }

  async getUsers() {
    const user = await this.find({ relations: ['roles'] });
    return user;
  }

  async getUser(condition: FindOneOptions<User>) {
    return await this.findOne(condition);
  }
}
