import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from "typeorm";
import { trsActivity } from "./TrsActivity.entity";
import { trsActivityStatus } from "./TrsActivityStatus.entity";

@Index("PK__trs_acti__3213E83FE776A4B4", ["id"], { unique: true })
@Entity("trs_activity_unit_response", { schema: "dbo" })
export class trsActivityUnitResponse {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("bit", { name: "is_delete", nullable: true, default: () => "'0'" })
  is_delete: boolean | null;

  @Column("bit", { name: "is_manager", nullable: true, default: () => "'0'" })
  is_manager: boolean | null;

  @Column("nvarchar", { name: "update_by", nullable: true, length: 255 })
  update_by: string | null;

  @Column("nvarchar", { name: "update_by_name", nullable: true, length: 255 })
  update_by_name: string | null;

  @Column("nvarchar", { name: "review_by", nullable: true, length: 255 })
  review_by: string | null;

  @Column("nvarchar", { name: "review_by_name", nullable: true, length: 255 })
  review_by_name: string | null;

  @Column("nvarchar", { name: "approve_by", nullable: true, length: 255 })
  approve_by: string | null;

  @Column("nvarchar", { name: "approve_by_name", nullable: true, length: 255 })
  approve_by_name: string | null;

  @Column("datetime2", { name: "update_date", nullable: true })
  update_date: Date | null;

  @Column("datetime2", { name: "review_date", nullable: true })
  review_date: Date | null;

  @Column("datetime2", { name: "approve_date", nullable: true })
  approve_date: Date | null;

  @Column("nvarchar", { name: "sendback_by", nullable: true, length: 255 })
  sendback_by: string | null;

  @Column("nvarchar", { name: "sendback_by_name", nullable: true, length: 255 })
  sendback_by_name: string | null;

  @Column("nvarchar", { name: "sendback_comment", nullable: true, length: 255 })
  sendback_comment: string | null;

  @Column("datetime2", { name: "sendback_date", nullable: true })
  sendback_date: Date | null;

  @Column("nvarchar", { name: "req_unit_code", nullable: true, length: 255 })
  req_unit_code: string | null;

  @Column("nvarchar", { name: "detail", nullable: true })
  detail: string | null;

  @Column("datetime2", { name: "create_date", nullable: true })
  create_date: Date | null;

  @Column("nvarchar", { name: "create_by", nullable: true, length: 255 })
  create_by: string | null;

  @Column("nvarchar", { name: "create_by_name", nullable: true, length: 255 })
  create_by_name: string | null;

  @Column("nvarchar", { name: "unit_no", nullable: true })
  unit_no: string | null;

  @Column("nvarchar", { name: "unit_name", nullable: true, length: 255 })
  unit_name: string | null;

  // @ManyToOne(
  //   () => trsActivity,
  //   (trs_activity) => trs_activity.unit_response,
  //   { onDelete: "SET NULL" }
  // )
  @JoinColumn([{ name: "activity", referencedColumnName: "id" }])
  activity: trsActivity;

  @ManyToOne(
    () => trsActivityStatus,
    (trs_activity_status) => trs_activity_status.trs_activity_unit_responses,
    { onDelete: "SET NULL" }
  )
  @JoinColumn([{ name: "status", referencedColumnName: "id" }])
  status: trsActivityStatus;

  // @RelationId(
  //   (trs_activity_unit_response: trsActivityUnitResponse) =>
  //     trs_activity_unit_response.activity
  // )
  // activity2: number | null;

  // @RelationId(
  //   (trs_activity_unit_response: trsActivityUnitResponse) =>
  //     trs_activity_unit_response.status
  // )
  // status2: string | null;
}
