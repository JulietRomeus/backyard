import { User } from 'src/user/entitys/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'position' })
export class Position {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  nameTh?: string;

  @Column()
  nameEn: string;

  @Column()
  abbreviation?: string;

  @Column({ type: 'int' })
  priority: number;

  @Column()
  iconUrl?: string;

  @Column()
  desc?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => User, (user) => user.positions)
  users: User[];

  departmentUuid?: string;
}
