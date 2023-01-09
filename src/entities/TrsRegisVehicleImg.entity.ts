import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK__trs_regi__3213E83F5378DE81", ["id"], { unique: true })
@Entity("trs_regis_vehicle_img", { schema: "dbo" })
export class trsRegisVehicleImg {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("bit", { name: "is_delete", nullable: true })
  is_delete: boolean | null;

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

  @Column("datetime2", { name: "update_date", nullable: true })
  update_date: Date | null;

  @Column("nvarchar", { name: "update_by", nullable: true })
  update_by: string | null;

  @Column("nvarchar", { name: "update_by_name", nullable: true })
  update_by_name: string | null;
}
