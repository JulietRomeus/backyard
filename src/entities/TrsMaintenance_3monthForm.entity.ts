import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK__trs_main__3213E83FC853121A", ["id"], { unique: true })
@Entity("trs_maintenance_3month_form", { schema: "dbo" })
export class trsMaintenance_3monthForm {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("nvarchar", { name: "name", nullable: true })
  name: string | null;

  @Column("bit", { name: "belt", nullable: true })
  belt: boolean | null;

  @Column("bit", { name: "pump_oil", nullable: true })
  pump_oil: boolean | null;

  @Column("bit", { name: "paddle", nullable: true })
  paddle: boolean | null;

  @Column("bit", { name: "engine", nullable: true })
  engine: boolean | null;

  @Column("bit", { name: "battery", nullable: true })
  battery: boolean | null;

  @Column("bit", { name: "gravity", nullable: true })
  gravity: boolean | null;

  @Column("bit", { name: "distributor", nullable: true })
  distributor: boolean | null;

  @Column("bit", { name: "coil", nullable: true })
  coil: boolean | null;

  @Column("bit", { name: "clutch", nullable: true })
  clutch: boolean | null;

  @Column("bit", { name: "clutch_oil", nullable: true })
  clutch_oil: boolean | null;

  @Column("bit", { name: "steering", nullable: true })
  steering: boolean | null;

  @Column("bit", { name: "hand_brake", nullable: true })
  hand_brake: boolean | null;

  @Column("bit", { name: "foot_brake", nullable: true })
  foot_brake: boolean | null;

  @Column("bit", { name: "bumper_rubber", nullable: true })
  bumper_rubber: boolean | null;

  @Column("bit", { name: "shockup", nullable: true })
  shockup: boolean | null;

  @Column("bit", { name: "spring_shackle_rubber", nullable: true })
  spring_shackle_rubber: boolean | null;

  @Column("bit", { name: "engine_oil", nullable: true })
  engine_oil: boolean | null;

  @Column("bit", { name: "gear_oil", nullable: true })
  gear_oil: boolean | null;

  @Column("bit", { name: "differential_gear_oil", nullable: true })
  differential_gear_oil: boolean | null;

  @Column("bit", { name: "steering_oil", nullable: true })
  steering_oil: boolean | null;

  @Column("bit", { name: "oil_filter", nullable: true })
  oil_filter: boolean | null;

  @Column("bit", { name: "engine_seal", nullable: true })
  engine_seal: boolean | null;

  @Column("bit", { name: "gear_seal", nullable: true })
  gear_seal: boolean | null;

  @Column("bit", { name: "differential_gear_seal", nullable: true })
  differential_gear_seal: boolean | null;

  @Column("bit", { name: "tyre_seal", nullable: true })
  tyre_seal: boolean | null;

  @Column("bit", { name: "oil_fule", nullable: true })
  oil_fule: boolean | null;

  @Column("bit", { name: "water", nullable: true })
  water: boolean | null;

  @Column("bit", { name: "grease", nullable: true })
  grease: boolean | null;

  @Column("bit", { name: "door_grease", nullable: true })
  door_grease: boolean | null;

  @Column("bit", { name: "lock_knot", nullable: true })
  lock_knot: boolean | null;

  @Column("bit", { name: "exhaustpipe_knot", nullable: true })
  exhaustpipe_knot: boolean | null;

  @Column("bit", { name: "pump_knot", nullable: true })
  pump_knot: boolean | null;

  @Column("bit", { name: "joint_knot", nullable: true })
  joint_knot: boolean | null;

  @Column("bit", { name: "dycharge_knot", nullable: true })
  dycharge_knot: boolean | null;

  @Column("bit", { name: "steering_knot", nullable: true })
  steering_knot: boolean | null;

  @Column("bit", { name: "xoil_service", nullable: true })
  xoil_service: boolean | null;

  @Column("int", { name: "engineoil_service", nullable: true })
  engineoil_service: number | null;

  @Column("int", { name: "roteraoil_service", nullable: true })
  roteraoil_service: number | null;

  @Column("int", { name: "autogearoil_service", nullable: true })
  autogearoil_service: number | null;

  @Column("int", { name: "gearoil_service", nullable: true })
  gearoil_service: number | null;

  @Column("int", { name: "etebreakoil_service", nullable: true })
  etebreakoil_service: number | null;

  @Column("int", { name: "lockeatoil_service", nullable: true })
  lockeatoil_service: number | null;

  @Column("int", { name: "distilled_water_service", nullable: true })
  distilled_water_service: number | null;

  @Column("int", { name: "fat", nullable: true })
  fat: number | null;

  @Column("int", { name: "remark", nullable: true })
  remark: number | null;

  @Column("nvarchar", { name: "create_by", nullable: true })
  create_by: string | null;

  @Column("nvarchar", { name: "create_by_name", nullable: true })
  create_by_name: string | null;

  @Column("nvarchar", { name: "create_date", nullable: true })
  create_date: string | null;

  @Column("nvarchar", { name: "control_by", nullable: true })
  control_by: string | null;

  @Column("nvarchar", { name: "control_by_name", nullable: true })
  control_by_name: string | null;
}
