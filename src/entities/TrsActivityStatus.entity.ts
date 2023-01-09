import { Column, Entity, Index, OneToMany } from "typeorm";
import { trsActivity } from "./TrsActivity.entity";
import { trsActivityUnitResponse } from "./TrsActivityUnitResponse.entity";

@Index("trs_activity_status_pkey", ["id"], { unique: true })
@Entity("trs_activity_status", { schema: "dbo" })
export class trsActivityStatus {
  @Column("nvarchar", { primary: true, name: "id", length: 255 })
  id: string;

  @Column("int", { name: "sort", nullable: true })
  sort: number | null;

  @Column("nvarchar", { name: "description", nullable: true })
  description: string | null;

  @Column("bit", { name: "is_delete", nullable: true, default: () => "'0'" })
  is_delete: boolean | null;

  @Column("nvarchar", { name: "name", nullable: true, length: 255 })
  name: string | null;

  @Column("nvarchar", { name: "color", nullable: true, length: 255 })
  color: string | null;

  @OneToMany(() => trsActivity, (trs_activity) => trs_activity.activity_status)
  trs_activities: trsActivity[];

  @OneToMany(
    () => trsActivityUnitResponse,
    (trs_activity_unit_response) => trs_activity_unit_response.status
  )
  trs_activity_unit_responses: trsActivityUnitResponse[];
}
