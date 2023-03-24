import { Exclude } from 'class-transformer';
import { AbstractEntity } from 'src/common/entitys/abstract.entity';
// import { Position } from 'src/modules/position/position.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { Role } from './role.entity';
import { Unit } from './unit.entity';

@Entity({ name: 'user' })
export class User extends AbstractEntity {
  @Column({
    unique: true,
    nullable: true,
  })
  username: string;

  @Column()
  @Exclude({ toPlainOnly: true })
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
  lineNotify?: string;

  @Column({ nullable: true })
  avatarUrl?: string;

  @Column({ default: 1 })
  status: number;

  @Column({ nullable: true })
  user_line_id?: string;

  /* -------------------------------- Relations ------------------------------- */
  // @ManyToMany(() => Position)
  // @JoinTable()
  // positions: Position[];

  @ManyToMany(() => Role)
  @JoinTable()
  roles: Role[];

  @ManyToMany(() => Unit)
  @JoinTable()
  units: Unit[];

  @ManyToOne(() => Unit)
  @JoinTable()
  activeUnit: Unit;
}