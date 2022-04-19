import { IEvent } from '@nestjs/cqrs';
import { UserDto } from 'src/modules/user/interfaces/dtos/user.dto';

export class UserAbstractEvent implements IEvent {
  constructor(public readonly userDto: UserDto) {}
}
