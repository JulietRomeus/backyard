// import { Logger } from '@nestjs/common';
// import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
// import { resolve } from 'path';
// import { UserRepository } from 'src/services/user/user.repository';
// import { WelcomeUserCommand } from '../impl/welcome-user.command';

// @CommandHandler(WelcomeUserCommand)
// export class WelcomeUserHandler implements ICommandHandler<WelcomeUserCommand> {
//   constructor(
//     private readonly publisher: EventPublisher,
//     private readonly repository: UserRepository,
//   ) {}

//   async execute(command: WelcomeUserCommand) {
//     Logger.log('Async WelcomeUserHandler...', 'WelcomeUserCommand');

//     const { id } = command;
//     const user = this.publisher.mergeObjectContext(
//       await this.repository.welcomeUser({ id }),
//     );
//     user.commit();
//     resolve();
//   }
// }
