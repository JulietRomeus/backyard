import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { AbstractEntity } from 'src/common/entitys/abstract.entity';
import { User } from './user.entity';
// import { Menu } from '../menu_old/menu.entity';

@Entity({ name: 'role' })
export class Role extends AbstractEntity {
  @Column({ nullable: true })
  nameTh?: string;

  @Column({})
  nameEn: string;

  @Column({ default: 'viewer', type: 'varchar', unique: true })
  name: string;

  @Column({ nullable: true })
  description?: string;

  /* -------------------------------- Relations ------------------------------- */
  @ManyToMany(() => User, (user) => user.roles)
  users: User[];

  // @ManyToMany(() => Menu, (menu) => menu.roles)
  // menus: Menu[];
}