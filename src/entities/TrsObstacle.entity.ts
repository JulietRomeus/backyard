import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK__obstacle__3213E83F9325EF5C", ["id"], { unique: true })
@Entity("trs_obstacle", { schema: "dbo" })
export class trsObstacle {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("bit", { name: "is_active", nullable: true, default: () => "'1'" })
  is_active: boolean | null;

  @Column("nvarchar", { name: "title", nullable: true, length: 255 })
  title: string | null;

  @Column("date", { name: "start_date", nullable: true })
  start_date: Date | null;

  @Column("date", { name: "end_date", nullable: true })
  end_date: Date | null;

  @Column("nvarchar", { name: "province_code", nullable: true, length: 255 })
  province_code: string | null;

  @Column("nvarchar", { name: "province_name", nullable: true, length: 255 })
  province_name: string | null;

  @Column("nvarchar", { name: "amphoe_code", nullable: true, length: 255 })
  amphoe_code: string | null;

  @Column("nvarchar", { name: "amphoe_name", nullable: true, length: 255 })
  amphoe_name: string | null;

  @Column("nvarchar", { name: "tambon_code", nullable: true, length: 255 })
  tambon_code: string | null;

  @Column("nvarchar", { name: "tambon_name", nullable: true, length: 255 })
  tambon_name: string | null;

  @Column("float", { name: "lat", nullable: true, precision: 53 })
  lat: number | null;

  @Column("float", { name: "long", nullable: true, precision: 53 })
  long: number | null;

  @Column("nvarchar", { name: "obstacle_status", nullable: true, length: 255 })
  obstacle_status: string | null;

  @Column("nvarchar", { name: "detail", nullable: true, length: 255 })
  detail: string | null;
}
