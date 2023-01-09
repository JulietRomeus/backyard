import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { trsActivity } from "./TrsActivity.entity";

@Index("PK__trs_acci__3213E83F1B3CCCF5", ["id"], { unique: true })
@Entity("trs_accident_activity_form", { schema: "dbo" })
export class trsAccidentActivityForm {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("bit", { name: "is_delete", nullable: true })
  is_delete: boolean | null;

  @Column("int", { name: "driver_name", nullable: true })
  driver_name: number | null;

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

  @Column("int", { name: "vehicle_detail", nullable: true })
  vehicle_detail: number | null;

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

  @Column("int", { name: "parties_list", nullable: true })
  parties_list: number | null;

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

  @OneToMany(
    () => trsActivity,
    (trs_activity) => trs_activity.accident_activity_form
  )
  trs_activities: trsActivity[];
}
