import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { trsAccidentActivityFormFiles } from "./TrsAccidentActivityFormFiles.entity";
import { trsAccidentPersonGov } from "./TrsAccidentPersonGov.entity";
import { trsAccidentPersonHelper } from "./TrsAccidentPersonHelper.entity";
import { trsAccidentPersonOther } from "./TrsAccidentPersonOther.entity";
import { trsAccidentPersonWitness } from "./TrsAccidentPersonWitness.entity";
import { trsAccidentPersonWounded } from "./TrsAccidentPersonWounded.entity";
import { trsActivityVehicleDriver } from "./TrsActivityVehicleDriver.entity";

@Index("PK__trs_acci__3213E83F1B3CCCF5", ["id"], { unique: true })
@Entity("trs_accident_activity_form", { schema: "dbo" })
export class trsAccidentActivityForm {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("bit", { name: "is_delete", nullable: true })
  is_delete: boolean | null;

  @Column("datetime2", { name: "accident_date", nullable: true })
  accident_date: Date | null;

  @Column("nvarchar", { name: "accident_location", nullable: true })
  accident_location: string | null;

  @Column("nvarchar", { name: "accident_location_from", nullable: true })
  accident_location_from: string | null;

  @Column("nvarchar", { name: "accident_location_to", nullable: true })
  accident_location_to: string | null;

  @Column("nvarchar", { name: "use_for", nullable: true })
  use_for: string | null;

  @Column("nvarchar", { name: "vehicle_damage", nullable: true })
  vehicle_damage: string | null;

  @Column("nvarchar", { name: "parties_vehicle_brand", nullable: true })
  parties_vehicle_brand: string | null;

  @Column("nvarchar", { name: "parties_vehicle_type", nullable: true })
  parties_vehicle_type: string | null;

  @Column("nvarchar", { name: "parties_vehicle_year", nullable: true })
  parties_vehicle_year: string | null;

  @Column("nvarchar", { name: "parties_vehicle_int", nullable: true })
  parties_vehicle_int: string | null;

  @Column("nvarchar", { name: "parties_vehicle_license_int", nullable: true })
  parties_vehicle_license_int: string | null;

  @Column("nvarchar", { name: "parties_driver_name", nullable: true })
  parties_driver_name: string | null;

  @Column("nvarchar", { name: "parties_owncar_name", nullable: true })
  parties_owncar_name: string | null;

  @Column("nvarchar", { name: "parties_address", nullable: true })
  parties_address: string | null;

  @Column("nvarchar", { name: "parties_tel", nullable: true })
  parties_tel: string | null;

  @Column("nvarchar", { name: "parties_damage", nullable: true })
  parties_damage: string | null;

  @Column("nvarchar", { name: "thirdparties_damage", nullable: true })
  thirdparties_damage: string | null;

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

  @Column("nvarchar", { name: "driver_name", nullable: true, length: 255 })
  driver_name: string | null;

  @Column("float", {
    name: "parties_vehicle_speed",
    nullable: true,
    precision: 53,
  })
  parties_vehicle_speed: number | null;

  @Column("float", { name: "gov_vehicle_speed", nullable: true, precision: 53 })
  gov_vehicle_speed: number | null;

  @Column("nvarchar", { name: "road_conditions", nullable: true, length: 255 })
  road_conditions: string | null;

  @Column("nvarchar", { name: "weather", nullable: true, length: 255 })
  weather: string | null;

  @Column("nvarchar", { name: "road_type", nullable: true, length: 255 })
  road_type: string | null;

  @Column("nvarchar", { name: "environment", nullable: true, length: 255 })
  environment: string | null;

  @Column("nvarchar", { name: "accident_detail", nullable: true })
  accident_detail: string | null;

  @Column("float", { name: "lat", nullable: true, precision: 53 })
  lat: number | null;

  @Column("float", { name: "long", nullable: true, precision: 53 })
  long: number | null;

  @Column("int", { name: "status", nullable: true })
  status: number | null;

  // @OneToMany(
  //   () => trsAccidentActivityFormFiles,
  //   (trs_accident_activity_form_files) =>
  //     trs_accident_activity_form_files.trs_accident_activity_form
  // )
  // trs_accident_activity_form_files: trsAccidentActivityFormFiles[];

  // @OneToMany(
  //   () => trsAccidentPersonGov,
  //   (trs_accident_person_gov) => trs_accident_person_gov.accident_form
  // )
  // trs_accident_person_govs: trsAccidentPersonGov[];

  // @OneToMany(
  //   () => trsAccidentPersonHelper,
  //   (trs_accident_person_helper) => trs_accident_person_helper.accident_form
  // )
  // trs_accident_person_helpers: trsAccidentPersonHelper[];

  // @OneToMany(
  //   () => trsAccidentPersonOther,
  //   (trs_accident_person_other) => trs_accident_person_other.accident_form
  // )
  // trs_accident_person_others: trsAccidentPersonOther[];

  // @OneToMany(
  //   () => trsAccidentPersonWitness,
  //   (trs_accident_person_witness) => trs_accident_person_witness.accident_form
  // )
  // trs_accident_person_witnesses: trsAccidentPersonWitness[];

  // @OneToMany(
  //   () => trsAccidentPersonWounded,
  //   (trs_accident_person_wounded) => trs_accident_person_wounded.accident_form
  // )
  // trs_accident_person_woundeds: trsAccidentPersonWounded[];

  @OneToMany(
    () => trsActivityVehicleDriver,
    (trs_activity_vehicle_driver) =>
      trs_activity_vehicle_driver.accident_activity_form
  )
  trs_activity_vehicle_drivers: trsActivityVehicleDriver[];
}
