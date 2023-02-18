import {
  Column,
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

  @Column("int", { name: "driver_id", nullable: true  })
  driver_id: string | null;

  @Column("int", { name: "license_id", nullable: false })
  license_id: string | null;

  @Column("bit", { name: "is_delete", nullable: true, default: () => "'0'" })
  is_delete: boolean | null;

  @Column("bit", { name: "is_active", nullable: true, default: () => "'0'" })
  is_active: boolean | null;

  @Column("nvarchar", { name: "create_by_id", nullable: true, length: 255 })
  create_by_id: string | null;

  @Column("nvarchar", { name: "create_by", nullable: true, length: 255 })
  create_by: string | null;


  @Column("datetime2", { name: "create_date", nullable: true })
  create_date: Date | null;
  @Column("datetime2", { name: "update_date", nullable: true })
  update_date: Date | null;


  @Column("nvarchar", { name: "update_by_id", nullable: true, length: 255 })
  update_by_id: string | null;

  @Column("nvarchar", { name: "update_by", nullable: true, length: 255 })
  update_by: string | null;



  @Column("nvarchar", { name: "delete_by_id", nullable: true, length: 255 })
  delete_by_id: string | null;

  @Column("nvarchar", { name: "delete_by", nullable: true, length: 255 })
  delete_by: string | null;

  @Column("nvarchar", { name: "delete_date", nullable: true, length: 255 })
  delete_date: string | null;

  @Column("datetime2", { name: "issue_date", nullable: true })
  issue_date: Date | null;

  @Column("datetime2", { name: "expire_date", nullable: true })
  expire_date: Date | null;


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
    { onDelete: "SET NULL", }
  )
  @JoinColumn([{ name: "driver_id", referencedColumnName: "id" }])
  driver: trsDriver;

  // @RelationId(
  //   (trs_driver_license_list: trsDriverLicenseList) =>
  //     trs_driver_license_list.license
  // )
  // license_id: number | null;

  // @RelationId(
  //   (trs_driver_license_list: trsDriverLicenseList) =>
  //     trs_driver_license_list.driver
  // )
  // driver_ids: number | null;
}
