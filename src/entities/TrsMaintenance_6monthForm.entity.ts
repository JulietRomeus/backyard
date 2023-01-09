import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK__trs_main__3213E83F1414BBBE", ["id"], { unique: true })
@Entity("trs_maintenance_6month_form", { schema: "dbo" })
export class trsMaintenance_6monthForm {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("nvarchar", { name: "name", nullable: true })
  name: string | null;

  @Column("datetime2", { name: "start_date", nullable: true })
  start_date: Date | null;

  @Column("datetime2", { name: "finished_date", nullable: true })
  finished_date: Date | null;

  @Column("nvarchar", { name: "cylinder_head", nullable: true })
  cylinder_head: string | null;

  @Column("nvarchar", { name: "valve", nullable: true })
  valve: string | null;

  @Column("nvarchar", { name: "sparkplug", nullable: true })
  sparkplug: string | null;

  @Column("int", { name: "compression", nullable: true })
  compression: number | null;

  @Column("nvarchar", { name: "oil_filter", nullable: true })
  oil_filter: string | null;

  @Column("nvarchar", { name: "air_filter", nullable: true })
  air_filter: string | null;

  @Column("nvarchar", { name: "boiler_pipe", nullable: true })
  boiler_pipe: string | null;

  @Column("nvarchar", { name: "fan_belt", nullable: true })
  fan_belt: string | null;

  @Column("nvarchar", { name: "cooler_belt", nullable: true })
  cooler_belt: string | null;

  @Column("nvarchar", { name: "oil_basin_knot", nullable: true })
  oil_basin_knot: string | null;

  @Column("nvarchar", { name: "pipe", nullable: true })
  pipe: string | null;

  @Column("nvarchar", { name: "boiler_fan", nullable: true })
  boiler_fan: string | null;

  @Column("nvarchar", { name: "carburettor", nullable: true })
  carburettor: string | null;

  @Column("nvarchar", { name: "distributor", nullable: true })
  distributor: string | null;

  @Column("nvarchar", { name: "fuel_pipe", nullable: true })
  fuel_pipe: string | null;

  @Column("nvarchar", { name: "clutch", nullable: true })
  clutch: string | null;

  @Column("nvarchar", { name: "gearshift", nullable: true })
  gearshift: string | null;

  @Column("nvarchar", { name: "joint", nullable: true })
  joint: string | null;

  @Column("nvarchar", { name: "gear", nullable: true })
  gear: string | null;

  @Column("nvarchar", { name: "bearinig", nullable: true })
  bearinig: string | null;

  @Column("nvarchar", { name: "pedal", nullable: true })
  pedal: string | null;

  @Column("nvarchar", { name: "brake_cloth", nullable: true })
  brake_cloth: string | null;

  @Column("nvarchar", { name: "brake_system", nullable: true })
  brake_system: string | null;

  @Column("nvarchar", { name: "hand_brake", nullable: true })
  hand_brake: string | null;

  @Column("nvarchar", { name: "brake_oil", nullable: true })
  brake_oil: string | null;

  @Column("nvarchar", { name: "brake_powering", nullable: true })
  brake_powering: string | null;

  @Column("nvarchar", { name: "violin_bow", nullable: true })
  violin_bow: string | null;

  @Column("nvarchar", { name: "mainsteering", nullable: true })
  mainsteering: string | null;

  @Column("nvarchar", { name: "jointsteering", nullable: true })
  jointsteering: string | null;

  @Column("nvarchar", { name: "engine_oil", nullable: true })
  engine_oil: string | null;

  @Column("nvarchar", { name: "gear_oil", nullable: true })
  gear_oil: string | null;

  @Column("nvarchar", { name: "supported_gear_oil", nullable: true })
  supported_gear_oil: string | null;

  @Column("nvarchar", { name: "joint_oil", nullable: true })
  joint_oil: string | null;

  @Column("nvarchar", { name: "winch_oil", nullable: true })
  winch_oil: string | null;

  @Column("nvarchar", { name: "steering_gear_housing", nullable: true })
  steering_gear_housing: string | null;

  @Column("nvarchar", { name: "door_hinge", nullable: true })
  door_hinge: string | null;

  @Column("nvarchar", { name: "speed_joint", nullable: true })
  speed_joint: string | null;

  @Column("nvarchar", { name: "gearshift_joint", nullable: true })
  gearshift_joint: string | null;

  @Column("nvarchar", { name: "steering_system_grease", nullable: true })
  steering_system_grease: string | null;

  @Column("nvarchar", { name: "joint_grease", nullable: true })
  joint_grease: string | null;

  @Column("nvarchar", { name: "winch_grease", nullable: true })
  winch_grease: string | null;

  @Column("nvarchar", { name: "spring_shackle_grease", nullable: true })
  spring_shackle_grease: string | null;

  @Column("nvarchar", { name: "switching_tyre", nullable: true })
  switching_tyre: string | null;

  @Column("nvarchar", { name: "tyre_pressure", nullable: true })
  tyre_pressure: string | null;

  @Column("nvarchar", { name: "roof_cover", nullable: true })
  roof_cover: string | null;

  @Column("nvarchar", { name: "sling", nullable: true })
  sling: string | null;

  @Column("nvarchar", { name: "batteries", nullable: true })
  batteries: string | null;

  @Column("nvarchar", { name: "generator", nullable: true })
  generator: string | null;

  @Column("nvarchar", { name: "motor", nullable: true })
  motor: string | null;

  @Column("nvarchar", { name: "light", nullable: true })
  light: string | null;

  @Column("nvarchar", { name: "horn_wiper", nullable: true })
  horn_wiper: string | null;

  @Column("nvarchar", { name: "coil_guage", nullable: true })
  coil_guage: string | null;

  @Column("nvarchar", { name: "gear_rubber", nullable: true })
  gear_rubber: string | null;

  @Column("nvarchar", { name: "shockup_rubber", nullable: true })
  shockup_rubber: string | null;

  @Column("nvarchar", { name: "u_bolt", nullable: true })
  u_bolt: string | null;

  @Column("nvarchar", { name: "shackle_bolt", nullable: true })
  shackle_bolt: string | null;

  @Column("nvarchar", { name: "remark", nullable: true })
  remark: string | null;

  @Column("nvarchar", { name: "suggestion", nullable: true })
  suggestion: string | null;

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
