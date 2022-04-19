import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Position } from 'src/modules/position/position.entity';

@Entity({ name: 'department' })
export class Department {
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

  @OneToMany(() => Position, (position) => position.department)
  positions: Position[];
}
