import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Department } from 'src/modules/department/department.entity';
import { User } from 'src/modules/user/user.entity';

@Entity({ name: 'position' })
export class Position {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  nameTh?: string;

  @Column({})
  nameEn: string;

  @Column({
    nullable: true,
    type: 'varchar',
    length: 50,
    unique: true,
  })
  abbreviation?: string;

  @Column({
    nullable: true,
    type: 'text',
  })
  iconUrl?: string;

  @Column({
    nullable: true,
    type: 'text',
  })
  desc?: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  /* -------------------------------- Relations ------------------------------- */

  @ManyToOne(() => Department, (department) => department.positions)
  department: Department;

  @ManyToMany(() => User)
  users: User[];
}
