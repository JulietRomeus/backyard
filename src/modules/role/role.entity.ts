import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { AbstractEntity } from 'src/common/entitys/abstract.entity';
import { User } from '../user/user.entity';
import { Menu } from '../menu/menu.entity';

@Entity({ name: 'role' })
export class Role extends AbstractEntity {
  @Column({ nullable: true })
  nameTh?: string;

  @Column({})
  nameEn: string;

  /* -------------------------------- Relations ------------------------------- */
  @ManyToMany(() => User, (user) => user.roles)
  users: User[];

  @ManyToMany(() => Menu, (menu) => menu.roles)
  @JoinTable()
  menus: Menu[];
}
