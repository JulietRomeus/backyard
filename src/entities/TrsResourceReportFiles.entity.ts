import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK__trs_reso__3213E83F834427AF", ["id"], { unique: true })
@Entity("trs_resource_report_files", { schema: "dbo" })
export class trsResourceReportFiles {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("nvarchar", { name: "name", nullable: true })
  name: string | null;

  @Column("nvarchar", { name: "file", nullable: true })
  file: string | null;

  @Column("datetime2", { name: "create_date", nullable: true })
  create_date: Date | null;

  @Column("datetime2", { name: "create_by", nullable: true })
  create_by: Date | null;

  @Column("datetime2", { name: "create_by_name", nullable: true })
  create_by_name: Date | null;
}
