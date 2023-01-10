import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK__trs_reso__3213E83FE5AE7143", ["id"], { unique: true })
@Entity("trs_resource_report", { schema: "dbo" })
export class trsResourceReport {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("nvarchar", { name: "name", nullable: true })
  name: string | null;

  @Column("nvarchar", { name: "create_by", nullable: true })
  create_by: string | null;

  @Column("nvarchar", { name: "create_by_name", nullable: true })
  create_by_name: string | null;

  @Column("datetime2", { name: "create_date", nullable: true })
  create_date: Date | null;

  @Column("nvarchar", { name: "vehicle_type", nullable: true })
  vehicle_type: string | null;

  @Column("int", { name: "files", nullable: true })
  files: number | null;

  @Column("nvarchar", { name: "unit_code", nullable: true })
  unit_code: string | null;

  @Column("nvarchar", { name: "unit_name", nullable: true })
  unit_name: string | null;

  @Column("nvarchar", { name: "unit_report_code", nullable: true })
  unit_report_code: string | null;

  @Column("nvarchar", { name: "unit_report_name", nullable: true })
  unit_report_name: string | null;
}
