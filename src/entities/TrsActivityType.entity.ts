import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { trsActivity } from "./TrsActivity.entity";

@Index("PK__trs_acti__3213E83F25BF0CE4", ["id"], { unique: true })
@Entity("trs_activity_type", { schema: "dbo" })
export class trsActivityType {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "sort", nullable: true })
  sort: number | null;

  @Column("nvarchar", { name: "name", nullable: true, length: 255 })
  name: string | null;

  @Column("nvarchar", { name: "description", nullable: true })
  description: string | null;

  @Column("bit", { name: "is_delete", nullable: true, default: () => "'0'" })
  is_delete: boolean | null;

  @OneToMany(() => trsActivity, (trs_activity) => trs_activity.activity_type)
  trs_activities: trsActivity[];
}
