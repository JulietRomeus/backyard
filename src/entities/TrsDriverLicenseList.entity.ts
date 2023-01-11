import {
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from "typeorm";
import { trsDrivingLicenseType } from "./TrsDrivingLicenseType.entity";
import { trsDriver } from "./TrsDriver.entity";

@Index("PK__trs_driv__3213E83F263AA370", ["id"], { unique: true })
@Entity("trs_driver_license_list", { schema: "dbo" })
export class trsDriverLicenseList {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @ManyToOne(
    () => trsDrivingLicenseType,
    (trs_driving_license_type) =>
      trs_driving_license_type.trs_driver_license_lists,
    { onDelete: "SET NULL" }
  )
  @JoinColumn([{ name: "license_id", referencedColumnName: "id" }])
  license: trsDrivingLicenseType;

  @ManyToOne(
    () => trsDriver,
    (trs_driver) => trs_driver.trs_driver_license_lists,
    { onDelete: "SET NULL" }
  )
  @JoinColumn([{ name: "driver_id", referencedColumnName: "id" }])
  driver: trsDriver;

  @RelationId(
    (trs_driver_license_list: trsDriverLicenseList) =>
      trs_driver_license_list.license
  )
  license_id: number | null;

  @RelationId(
    (trs_driver_license_list: trsDriverLicenseList) =>
      trs_driver_license_list.driver
  )
  driver_id: number | null;
}
