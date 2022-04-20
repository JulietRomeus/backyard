import { ICommand } from '@nestjs/cqrs';
import { UpdateUserDto } from '../../interfaces/dtos/update-user.dto';

export class UpdateUserCommand implements ICommand {
  constructor(public readonly updateUserDto: UpdateUserDto) {}
}
