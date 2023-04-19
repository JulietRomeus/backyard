import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { trsActivityVehicleDriver } from "./TrsActivityVehicleDriver.entity";

@Index("PK__trs_acti__3213E83F8B947BC6", ["id"], { unique: true })
@Entity("trs_activity_stopover", { schema: "dbo" })
export class trsActivityStopover {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "order", nullable: true })
  order: number | null;

  @Column("datetime2", { name: "stopover_date", nullable: true })
  stopover_date: Date | null;

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

  @Column("int", { name: "miles_number", nullable: true })
  miles_number: number | null;

  @Column("int", { name: "refuel", nullable: true })
  refuel: number | null;

  @Column("float", { name: "budgets", nullable: true, precision: 53 })
  budgets: number | null;

  @Column("nvarchar", { name: "note", nullable: true })
  note: string | null;

  // @ManyToOne(
  //   () => trsActivityVehicleDriver,
  //   (trs_activity_vehicle_driver) =>
  //     trs_activity_vehicle_driver.trs_activity_stopovers,
  //   { onDelete: "SET NULL" }
  // )
  // @JoinColumn([{ name: "mission_form", referencedColumnName: "id" }])
  // mission_form: trsActivityVehicleDriver;
}
