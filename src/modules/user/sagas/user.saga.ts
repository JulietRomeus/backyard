import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { delay, Observable, map } from 'rxjs';
import { WelcomeUserCommand } from '../commands/impl/welcome-user.command';
import { UserCreatedEvent } from '../events/impl/user-created.event';

@Injectable()
export class UserSaga {
  @Saga()
  userCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(UserCreatedEvent),
      delay(1000),
      map((event) => {
        Logger.log('Inside [UserSaga]', 'UserSaga');
        const id = event.userDto.id;
        return new WelcomeUserCommand(id);
      }),
    );
  };
}
