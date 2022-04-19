import { Column, Entity, ManyToMany, TreeChildren, TreeParent } from 'typeorm';
import { AbstractEntity } from 'src/common/entitys/abstract.entity';
import { User } from '../user/user.entity';
import { Role } from '../role/role.entity';

@Entity({ name: 'menu' })
export class Menu extends AbstractEntity {
  @Column({ nullable: true })
  nameTh?: string;

  @Column()
  nameEn: string;

  @Column({ default: 0, type: 'int' })
  priority: number;

  @Column({
    nullable: true,
    type: 'text',
  })
  iconUrl?: string;

  /* -------------------------------- Relations ------------------------------- */
  @ManyToMany(() => Role, (role) => role.menus)
  roles: Role[];

  // Tree Entity
  @TreeParent()
  parent: Menu;

  @TreeChildren()
  children: Menu[];
}
