import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { trsActivityVehicleDriver } from "./TrsActivityVehicleDriver.entity";

@Index("PK__trs_whil__3213E83F2AE2A810", ["id"], { unique: true })
@Entity("trs_while_activity_form", { schema: "dbo" })
export class trsWhileActivityForm {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("bit", { name: "is_delete", nullable: true })
  is_delete: boolean | null;

  @Column("bit", { name: "panel", nullable: true })
  panel: boolean | null;

  @Column("bit", { name: "miles", nullable: true })
  miles: boolean | null;

  @Column("bit", { name: "fuel", nullable: true })
  fuel: boolean | null;

  @Column("bit", { name: "grease", nullable: true })
  grease: boolean | null;

  @Column("bit", { name: "heat", nullable: true })
  heat: boolean | null;

  @Column("bit", { name: "brake", nullable: true })
  brake: boolean | null;

  @Column("bit", { name: "clutch", nullable: true })
  clutch: boolean | null;

  @Column("bit", { name: "steering", nullable: true })
  steering: boolean | null;

  @Column("bit", { name: "process", nullable: true })
  process: boolean | null;

  @Column("bit", { name: "noise", nullable: true })
  noise: boolean | null;

  @Column("bit", { name: "unnormal_effect", nullable: true })
  unnormal_effect: boolean | null;

  @Column("nvarchar", { name: "remark", nullable: true })
  remark: string | null;

  @Column("datetime2", { name: "create_date", nullable: true })
  create_date: Date | null;

  @Column("nvarchar", { name: "create_by", nullable: true })
  create_by: string | null;

  @Column("nvarchar", { name: "create_by_name", nullable: true })
  create_by_name: string | null;

  @Column("datetime2", { name: "update_date", nullable: true })
  update_date: Date | null;

  @Column("nvarchar", { name: "update_by", nullable: true })
  update_by: string | null;

  @Column("nvarchar", { name: "update_by_name", nullable: true })
  update_by_name: string | null;

  @OneToMany(
    () => trsActivityVehicleDriver,
    (trs_activity_vehicle_driver) =>
      trs_activity_vehicle_driver.while_activity_form
  )
  trs_activity_vehicle_drivers: trsActivityVehicleDriver[];
}
