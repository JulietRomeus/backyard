import { AbstractEntity } from 'src/common/entitys/abstract.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'department' })
export class Department extends AbstractEntity {
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
}
