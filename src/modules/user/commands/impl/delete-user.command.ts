import { ICommand } from '@nestjs/cqrs';
import { DeleteUserDto } from '../../interfaces/dtos/delete-user.dto';

export class DeleteUserCommand implements ICommand {
  constructor(public readonly deleteUserDto: DeleteUserDto) {}
}
