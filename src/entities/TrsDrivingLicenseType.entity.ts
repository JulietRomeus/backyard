import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { trsDriverLicenseList } from "./TrsDriverLicenseList.entity";

@Index("PK__trs_driv__3213E83F13E6501E", ["id"], { unique: true })
@Entity("trs_driving_license_type", { schema: "dbo" })
export class trsDrivingLicenseType {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("nvarchar", { name: "license_name", nullable: true, length: 255 })
  license_name: string | null;

  @OneToMany(
    () => trsDriverLicenseList,
    (trs_driver_license_list) => trs_driver_license_list.license
  )
  trs_driver_license_lists: trsDriverLicenseList[];
}
