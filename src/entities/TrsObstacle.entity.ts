import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { trsObstacleType } from "./TrsObstacleType.entity";

@Index("PK__obstacle__3213E83F9325EF5C", ["id"], { unique: true })
@Entity("trs_obstacle", { schema: "dbo" })
export class trsObstacle {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("bit", { name: "is_active", nullable: true, default: () => "'1'" })
  is_active: boolean | null;

  @Column("nvarchar", { name: "title", nullable: true, length: 127 })
  title: string | null;

  @Column("date", { name: "start_date", nullable: true })
  start_date: Date | null;

  @Column("date", { name: "end_date", nullable: true })
  end_date: Date | null;

  @Column("nvarchar", { name: "province_code", nullable: true, length: 127 })
  province_code: string | null;

  @Column("nvarchar", { name: "province_name", nullable: true, length: 127 })
  province_name: string | null;

  @Column("nvarchar", { name: "amphoe_code", nullable: true, length: 127 })
  amphoe_code: string | null;

  @Column("nvarchar", { name: "amphoe_name", nullable: true, length: 127 })
  amphoe_name: string | null;

  @Column("nvarchar", { name: "tambon_code", nullable: true, length: 127 })
  tambon_code: string | null;

  @Column("nvarchar", { name: "tambon_name", nullable: true, length: 127 })
  tambon_name: string | null;

  @Column("float", { name: "lat", nullable: true, precision: 53 })
  lat: number | null;

  @Column("float", { name: "long", nullable: true, precision: 53 })
  long: number | null;

  @Column("nvarchar", { name: "detail", nullable: true, length: 127 })
  detail: string | null;

  @Column("datetime2", { name: "create_date", nullable: true })
  create_date: Date | null;

  @Column("nvarchar", { name: "create_by", nullable: true, length: 255 })
  create_by: string | null;

  @Column("datetime2", { name: "update_date", nullable: true })
  update_date: Date | null;

  @Column("nvarchar", { name: "update_by", nullable: true, length: 255 })
  update_by: string | null;

  @Column("datetime2", { name: "delete_date", nullable: true })
  delete_date: Date | null;

  @Column("nvarchar", { name: "delete_by", nullable: true, length: 255 })
  delete_by: string | null;

  @Column("nvarchar", { name: "create_by_id", nullable: true, length: 255 })
  create_by_id: string | null;

  @Column("int", { name: "obstacle_status", nullable: true })
  obstacle_status: number | null;

  @Column("nvarchar", {
    name: "obstacle_type_name",
    nullable: true,
    length: 255,
  })
  obstacle_type_name: string | null;

  @Column("int", { name: "obstacle_type_id", nullable: true })
  obstacle_type_id: number | null;


  @Column("nvarchar", { name: "mooban_code", nullable: true, length: 255 })
  mooban_code: string | null;
  
  // @ManyToOne(
  //   () => trsObstacleType,
  //   (trs_obstacle_type) => trs_obstacle_type.trs_obstacles,
  //   { onDelete: "SET NULL" }
  // )
  // @JoinColumn([{ name: "obstacle_type_id", referencedColumnName: "id" }])
  // obstacle_type_id: trsObstacleType;
}
