import { AbstractEntity } from 'src/common/entitys/abstract.entity';
import { Position } from 'src/modules/position/position.entity';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { Role } from '../role/role.entity';
import { UserCreatedEvent } from './events/impl/user-created.event';
import { UserWelcomedEvent } from './events/impl/user-welcomed.event';
import { UserDto } from './interfaces/dtos/user.dto';

@Entity({ name: 'user' })
export class User extends AbstractEntity {
  @Column({
    unique: true,
  })
  username: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  sso?: string;

  @Column()
  firstname: string;

  @Column({ nullable: true })
  lastname?: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column({ nullable: true })
  tel?: string;

  @Column({ nullable: true })
  idCard?: string;

  @Column({ nullable: true })
  avatarUrl?: string;

  /* -------------------------------- Relations ------------------------------- */
  @ManyToMany(() => Position)
  @JoinTable()
  positions: Position[];

  @ManyToMany(() => Role)
  @JoinTable()
  roles: Role[];

  /* --------------------------------- Methods -------------------------------- */
  onUserCreated() {
    this.apply(new UserCreatedEvent(this));
  }

  welcome() {
    this.apply(new UserWelcomedEvent(this));
  }
}
