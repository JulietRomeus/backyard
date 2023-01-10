import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from "typeorm";
import { trsActivityConvoy } from "./TrsActivityConvoy.entity";
import { trsActivity } from "./TrsActivity.entity";
import { trsDriver } from "./TrsDriver.entity";
import { trsVehicle } from "./TrsVehicle.entity";

@Index("PK__trs_acti__3213E83F631C2C19", ["id"], { unique: true })
@Entity("trs_activity_vehicle_driver", { schema: "dbo" })
export class trsActivityVehicleDriver {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "sort", nullable: true })
  sort: number | null;

  @Column("nvarchar", { name: "controller", nullable: true, length: 255 })
  controller: string | null;

  @Column("nvarchar", { name: "unit_code", nullable: true, length: 255 })
  unit_code: string | null;

  @ManyToOne(
    () => trsActivityConvoy,
    (trs_activity_convoy) => trs_activity_convoy.trs_activity_vehicle_drivers,
    { onDelete: "SET NULL" }
  )
  @JoinColumn([{ name: "convoy", referencedColumnName: "id" }])
  convoy: trsActivityConvoy;

  @ManyToOne(
    () => trsActivity,
    (trs_activity) => trs_activity.vehicle_driver,
    { onDelete: "SET NULL" }
  )
  @JoinColumn([{ name: "activity", referencedColumnName: "id" }])
  activity: trsActivity;

  @ManyToOne(
    () => trsDriver,
    (trs_driver) => trs_driver.trs_activity_vehicle_drivers,
    { onDelete: "SET NULL" }
  )
  @JoinColumn([{ name: "driver", referencedColumnName: "id" }])
  driver: trsDriver;

  @ManyToOne(
    () => trsVehicle,
    (trs_vehicle) => trs_vehicle.trs_activity_vehicle_drivers,
    { onDelete: "SET NULL" }
  )
  @JoinColumn([{ name: "vehicle", referencedColumnName: "id" }])
  vehicle: trsVehicle;

  @RelationId(
    (trs_activity_vehicle_driver: trsActivityVehicleDriver) =>
      trs_activity_vehicle_driver.convoy
  )
  convoy2: number | null;

  @RelationId(
    (trs_activity_vehicle_driver: trsActivityVehicleDriver) =>
      trs_activity_vehicle_driver.activity
  )
  activity2: number | null;

  @RelationId(
    (trs_activity_vehicle_driver: trsActivityVehicleDriver) =>
      trs_activity_vehicle_driver.driver
  )
  driver2: number | null;

  @RelationId(
    (trs_activity_vehicle_driver: trsActivityVehicleDriver) =>
      trs_activity_vehicle_driver.vehicle
  )
  vehicle2: number | null;
}
