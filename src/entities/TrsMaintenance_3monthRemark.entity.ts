import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK__trs_main__3213E83F9DB8AB7C", ["id"], { unique: true })
@Entity("trs_maintenance_3month_remark", { schema: "dbo" })
export class trsMaintenance_3monthRemark {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("nvarchar", { name: "name", nullable: true })
  name: string | null;

  @Column("nvarchar", { name: "create_by", nullable: true })
  create_by: string | null;

  @Column("nvarchar", { name: "create_by_name", nullable: true })
  create_by_name: string | null;

  @Column("nvarchar", { name: "create_date", nullable: true })
  create_date: string | null;

  @Column("nvarchar", { name: "control_by", nullable: true })
  control_by: string | null;

  @Column("nvarchar", { name: "control_by_name", nullable: true })
  control_by_name: string | null;
}
