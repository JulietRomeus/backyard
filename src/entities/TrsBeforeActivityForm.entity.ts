import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { trsActivityVehicleDriver } from "./TrsActivityVehicleDriver.entity";

@Index("PK__trs_befo__3213E83FB6DFE8F5", ["id"], { unique: true })
@Entity("trs_before_activity_form", { schema: "dbo" })
export class trsBeforeActivityForm {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("bit", { name: "is_delete", nullable: true })
  is_delete: boolean | null;

  @Column("bit", { name: "fuel", nullable: true })
  fuel: boolean | null;

  @Column("bit", { name: "damaged", nullable: true })
  damaged: boolean | null;

  @Column("bit", { name: "engine_composition", nullable: true })
  engine_composition: boolean | null;

  @Column("bit", { name: "vehicle_composition", nullable: true })
  vehicle_composition: boolean | null;

  @Column("bit", { name: "warmup", nullable: true })
  warmup: boolean | null;

  @Column("bit", { name: "process", nullable: true })
  process: boolean | null;

  @Column("bit", { name: "panel", nullable: true })
  panel: boolean | null;

  @Column("bit", { name: "miles", nullable: true })
  miles: boolean | null;

  @Column("bit", { name: "engine_oil", nullable: true })
  engine_oil: boolean | null;

  @Column("bit", { name: "grease", nullable: true })
  grease: boolean | null;

  @Column("bit", { name: "heat", nullable: true })
  heat: boolean | null;

  @Column("bit", { name: "wheel", nullable: true })
  wheel: boolean | null;

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

  @Column("float", { name: "distance", nullable: true, precision: 53 })
  distance: number | null;

  @Column("nvarchar", { name: "fuel_left", nullable: true, length: 20 })
  fuel_left: string | null;

  @OneToMany(
    () => trsActivityVehicleDriver,
    (trs_activity_vehicle_driver) =>
      trs_activity_vehicle_driver.before_activity_form
  )
  trs_activity_vehicle_drivers: trsActivityVehicleDriver[];
}
