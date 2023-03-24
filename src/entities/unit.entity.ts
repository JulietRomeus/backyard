import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  TreeChildren,
  TreeParent,
} from 'typeorm';
import { AbstractEntity } from 'src/common/entitys/abstract.entity';
import { User } from './user.entity';

@Entity({ name: 'unit' })
export class Unit extends AbstractEntity {
  @Column({ unique: true, nullable: true })
  code: string;

  @Column()
  nameTh: string;

  @Column({ nullable: true })
  nameEn: string;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  org_id: number;

  @Column({ default: 1 })
  status: number;

  @ManyToMany(() => User, (user) => user.units)
  users: User[];

  @ManyToMany(() => Unit)
  @JoinTable()
  parents: Unit[];

  @Column({ default: false })
  is_commandcenter: boolean;

  //Tree
  // @TreeParent()
  // parent: Unit[];

  // @TreeChildren()
  // children: Unit[];
}