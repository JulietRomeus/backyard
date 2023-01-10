import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Transform } from 'class-transformer';

import { trsActivityVehicleDriver } from "./TrsActivityVehicleDriver.entity";
import { trsDriverFiles } from "./TrsDriverFiles.entity";
import { trsDriverFiles_1 } from "./TrsDriverFiles_1.entity";
import { trsVehicle } from "./TrsVehicle.entity";

@Index("PK__trs_driv__3213E83FE61B5A1A", ["id"], { unique: true })
@Entity("trs_driver", { schema: "dbo" })
export class trsDriver {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "sort", nullable: true })
  sort: number | null;

  @Column("nvarchar", { name: "driver_id", nullable: true, length: 255 })
  driver_id: string | null;

  @Column("nvarchar", { name: "driver_name", nullable: true, length: 255 })
  driver_name: string | null;

  @Column("nvarchar", { name: "driver_license", nullable: true,
  transformer: {
    to(value) {
      // Transform 'invoiceNumber'
      return value
    },
    from(value) {
      // Do nothing
      return JSON.parse(value);
    }
  },
 })
  driver_license: string[] | null;
  

  @Column("nvarchar", { name: "unit_code", nullable: true, length: 255 })
  unit_code: string | null;

  @Column("nvarchar", { name: "unit_name", nullable: true, length: 255 })
  unit_name: string | null;

  @Column("bit", { name: "is_delete", nullable: true, default: () => "'0'" })
  is_delete: boolean | null;

  @Column("bit", { name: "is_available", nullable: true, default: () => "'1'" })
  is_available: boolean | null;

  @OneToMany(
    () => trsActivityVehicleDriver,
    (trs_activity_vehicle_driver) => trs_activity_vehicle_driver.driver
  )
  trs_activity_vehicle_drivers: trsActivityVehicleDriver[];

  @OneToMany(
    () => trsDriverFiles,
    (trs_driver_files) => trs_driver_files.trs_driver
  )
  trs_driver_files: trsDriverFiles[];

  @OneToMany(
    () => trsDriverFiles_1,
    (trs_driver_files_1) => trs_driver_files_1.trs_driver
  )
  trs_driver_files_s: trsDriverFiles_1[];

  @OneToMany(() => trsVehicle, (trs_vehicle) => trs_vehicle.main_driver)
  trs_vehicles: trsVehicle[];
}
