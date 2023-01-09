import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK__trs_vehi__3213E83FCDFAA9C8", ["id"], { unique: true })
@Entity("trs_vehicle_files", { schema: "dbo" })
export class trsVehicleFiles {
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

  @Column("int", { name: "order", nullable: true })
  order: number | null;
}
