import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { trsActivityConvoy } from "./TrsActivityConvoy.entity";
import { trsActivity } from "./TrsActivity.entity";

@Index("PK__trs_acti__3213E83F8BB9FDD9", ["id"], { unique: true })
@Entity("trs_activity_route", { schema: "dbo" })
export class trsActivityRoute {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "order", nullable: true })
  order: number | null;

  @Column("nvarchar", { name: "name", nullable: true })
  name: string | null;

  @Column("nvarchar", { name: "region_code", nullable: true, length: 255 })
  region_code: string | null;

  @Column("nvarchar", { name: "province_code", nullable: true, length: 255 })
  province_code: string | null;

  @Column("nvarchar", { name: "amphoe_code", nullable: true, length: 255 })
  amphoe_code: string | null;

  @Column("nvarchar", { name: "tambon_code", nullable: true, length: 255 })
  tambon_code: string | null;

  @Column("nvarchar", { name: "mooban_code", nullable: true, length: 255 })
  mooban_code: string | null;

  @Column("datetime2", { name: "start_date", nullable: true })
  start_date: Date | null;

  @Column("float", { name: "lat", nullable: true, precision: 53 })
  lat: number | null;

  @Column("float", { name: "long", nullable: true, precision: 53 })
  long: number | null;

  @Column("nvarchar", { name: "polyline", nullable: true })
  polyline: string | null;

  @Column("datetime2", { name: "end_date", nullable: true })
  end_date: Date | null;

  @Column("nvarchar", { name: "est_distance", nullable: true, length: 20 })
  est_distance: string | null;

  @ManyToOne(
    () => trsActivityConvoy,
    (trs_activity_convoy) => trs_activity_convoy.route,
    { onDelete: "SET NULL" }
  )
  @JoinColumn([{ name: "convoy", referencedColumnName: "id" }])
  convoy: trsActivityConvoy;

  @ManyToOne(
    () => trsActivity,
    (trs_activity) => trs_activity.trs_activity_routes,
    { onDelete: "SET NULL" }
  )
  @JoinColumn([{ name: "activity", referencedColumnName: "id" }])
  activity: trsActivity;
}
