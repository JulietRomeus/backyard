import { MinLength } from 'class-validator';
import { Field, ArgsType, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field()
  @MinLength(3)
  firstName: string;

  @Field()
  @MinLength(3)
  lastName: string;
}
