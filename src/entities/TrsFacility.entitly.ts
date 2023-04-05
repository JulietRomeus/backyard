import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK__trs_faci__3213E83F30DE1ADB", ["id"], { unique: true })
@Entity("trs_facility", { schema: "dbo" })
export class trsFacility {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("nvarchar", { name: "facility_name", nullable: true, length: 100 })
  facility_name: string | null;

  @Column("int", { name: "facility_type" })
  facility_type: string | null;

  @Column("float", { name: "lat", nullable: true, precision: 53 })
  lat: number | null;

  @Column("float", { name: "long", nullable: true, precision: 53 })
  long: number | null;

  @Column("nvarchar", { name: "detail", nullable: true, length: 300 })
  detail: string | null;

  @Column("nvarchar", { name: "create_by_id", nullable: true, length: 100 })
  create_by_id: string | null;

  @Column("nvarchar", { name: "create_by", nullable: true, length: 300 })
  create_by: string | null;

  @Column("datetime", { name: "create_date", nullable: true })
  create_date: Date | null;

  @Column("nvarchar", { name: "update_by_id", nullable: true, length: 100 })
  update_by_id: string | null;

  @Column("nvarchar", { name: "update_by", nullable: true, length: 300 })
  update_by: string | null;

  @Column("datetime", { name: "update_date", nullable: true })
  update_date: Date | null;

  @Column("nvarchar", { name: "delete_by_id", nullable: true, length: 100 })
  delete_by_id: string | null;

  @Column("nvarchar", { name: "delete_by", nullable: true, length: 300 })
  delete_by: string | null;

  @Column("datetime", { name: "delete_date", nullable: true })
  delete_date: Date | null;

  @Column("bit", { name: "is_active", nullable: true, default: () => "'1'" })
  is_active: boolean | null;

  @Column("nvarchar", { name: "facility_type_name", nullable: true, length: 100 })
  facility_type_name: string | null;
}