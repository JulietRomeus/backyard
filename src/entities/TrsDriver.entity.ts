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
import { trsDriverLicenseList } from "./TrsDriverLicenseList.entity";

@Index("PK__trs_driv__3213E83FE61B5A1A", ["id"], { unique: true })
@Entity("trs_driver", { schema: "dbo" })
export class trsDriver {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  // @Column("int", { name: "sort", nullable: true })
  // sort: number | null;

  @Column("int", { name: "sort", nullable: true })
  sort: number | null;

  @Column("nvarchar", { name: "driver_id", nullable: true, length: 255 })
  driver_id: string | null;

  @Column("nvarchar", { name: "driver_license", nullable: true })
  driver_license: string | null;

  @Column("nvarchar", { name: "unit_code", nullable: true, length: 255 })
  unit_code: string | null;

  @Column("nvarchar", { name: "unit_name", nullable: true, length: 255 })
  unit_name: string | null;

  @Column("bit", { name: "is_delete", nullable: true, default: () => "'0'" })
  is_delete: boolean | null;

  @Column("bit", { name: "is_available", nullable: true, default: () => "'1'" })
  is_available: boolean | null;

  @Column("bit", { name: "is_active", nullable: true, default: () => "'1'" })
  is_active: boolean | null;

  @Column("datetime", { name: "create_date", nullable: true })
  create_date: Date | null;

  @Column("datetime", { name: "update_date", nullable: true })
  update_date: Date | null;

  // @Column("nvarchar", { name: "ooo", nullable: true, length: 3000 })
  // ooo: string | null;

  @Column("nvarchar", { name: "firstname", nullable: true, length: 255 })
  firstname: string | null;

  @Column("nvarchar", { name: "lastname", nullable: true, length: 255 })
  lastname: string | null;

  @Column("int", { name: "age", nullable: true })
  age: number | null;

  @Column("nvarchar", { name: "religion", nullable: true, length: 255 })
  religion: string | null;

  @Column("nvarchar", { name: "nationality", nullable: true, length: 255 })
  nationality: string | null;

  @Column("nvarchar", { name: "race", nullable: true, length: 255 })
  race: string | null;

  @Column("nvarchar", { name: "organization", nullable: true, length: 255 })
  organization: string | null;

  @Column("nvarchar", { name: "unit_no", nullable: true, length: 255 })
  unit_no: string | null;

  @Column("nvarchar", { name: "position", nullable: true, length: 255 })
  position: string | null;

  @Column("nvarchar", { name: "email", nullable: true, length: 255 })
  email: string | null;

  @Column("nvarchar", { name: "tel", nullable: true, length: 255 })
  tel: string | null;

  @Column("nvarchar", { name: "current_province", nullable: true, length: 255 })
  current_province: string | null;

  @Column("nvarchar", { name: "current_amphoe", nullable: true, length: 255 })
  current_amphoe: string | null;

  @Column("nvarchar", { name: "current_tambon", nullable: true, length: 255 })
  current_tambon: string | null;

  @Column("nvarchar", { name: "current_mooban", nullable: true, length: 255 })
  current_mooban: string | null;

  @Column("nvarchar", {
    name: "domicile_province",
    nullable: true,
    length: 255,
  })
  domicile_province: string | null;

  @Column("nvarchar", { name: "domicile_amphoe", nullable: true, length: 255 })
  domicile_amphoe: string | null;

  @Column("nvarchar", { name: "domicile_tambon", nullable: true, length: 255 })
  domicile_tambon: string | null;

  @Column("nvarchar", { name: "domicile_mooban", nullable: true, length: 255 })
  domicile_mooban: string | null;

  @Column("nvarchar", { name: "driver_name", nullable: true, length: 255 })
  driver_name: string | null;

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

  @OneToMany(
    () => trsDriverLicenseList,
    (trs_driver_license_list) => trs_driver_license_list.driver,
    {cascade:true}
  )
  trs_driver_license_lists: trsDriverLicenseList[];

  @OneToMany(() => trsVehicle, (trs_vehicle) => trs_vehicle.main_driver)
  trs_vehicles: trsVehicle[];
}
