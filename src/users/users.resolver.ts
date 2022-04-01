import {
  Args,
  Mutation,
  Query,
  Resolver,
  ResolveReference,
} from '@nestjs/graphql';
import { User } from './entitys/user.entity';
import { CreateUserInput } from './interfaces/dto/create-user.dto';
import { UserService } from './users.services';

@Resolver((of) => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  /* -------------------------------- Get User -------------------------------- */
  @Query((returns) => User)
  async user(@Args({ name: 'id' }) id: number): Promise<User> {
    return await this.userService.findById(id);
  }

  /* -------------------------------- Get Users ------------------------------- */
  @Query((returns) => [User])
  async users() {
    return await this.userService.findAll();
  }

  @ResolveReference()
  async resolveReference(reference: {
    __typename: string;
    id: number;
  }): Promise<User> {
    return await this.userService.findById(reference.id);
  }

  // @Mutation((returns) => User)
  // createUser(@Args('createUserData') createUserData: CreateUserInput) {
  //   return this.userService.create(createUserData);
  // }
}
