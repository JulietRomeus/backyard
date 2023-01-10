import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK__trs_sub___3213E83F4AB3D416", ["id"], { unique: true })
@Entity("trs_sub_regis_vehicle", { schema: "dbo" })
export class trsSubRegisVehicle {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("bit", { name: "is_active", nullable: true, default: () => "'1'" })
  is_active: boolean | null;

  @Column("nvarchar", { name: "engine_no", nullable: true, length: 255 })
  engine_no: string | null;

  @Column("nvarchar", { name: "fuel_capacity_no", nullable: true, length: 255 })
  fuel_capacity_no: string | null;
}
