import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { trsActivityVehicleDriver } from "./TrsActivityVehicleDriver.entity";

@Index("PK__trs_acti__3213E83FB1F8CE3A", ["id"], { unique: true })
@Entity("trs_activity_help", { schema: "dbo" })
export class trsActivityHelp {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "order", nullable: true })
  order: number | null;

  @Column("datetime2", { name: "incident_date", nullable: true })
  incident_date: Date | null;

  @Column("nvarchar", { name: "name", nullable: true, length: 255 })
  name: string | null;

  @Column("nvarchar", { name: "province_code", nullable: true, length: 255 })
  province_code: string | null;

  @Column("nvarchar", { name: "amphoe_code", nullable: true, length: 255 })
  amphoe_code: string | null;

  @Column("nvarchar", { name: "tambon_code", nullable: true, length: 255 })
  tambon_code: string | null;

  @Column("nvarchar", { name: "mooban_code", nullable: true, length: 255 })
  mooban_code: string | null;

  @Column("float", { name: "lat", nullable: true, precision: 53 })
  lat: number | null;

  @Column("float", { name: "long", nullable: true, precision: 53 })
  long: number | null;

  @Column("nvarchar", { name: "note", nullable: true })
  note: string | null;

  @Column("int", { name: "type", nullable: true })
  type: number | null;

  @Column("int", { name: "miles_number", nullable: true })
  miles_number: number | null;

  @Column("int", { name: "status", nullable: true })
  status: number | null;

  @ManyToOne(
    () => trsActivityVehicleDriver,
    (trs_activity_vehicle_driver) =>
      trs_activity_vehicle_driver.help_activity_form,
    { onDelete: "SET NULL" }
  )
  @JoinColumn([{ name: "mission_form", referencedColumnName: "id" }])
  mission_form: trsActivityVehicleDriver;
}
