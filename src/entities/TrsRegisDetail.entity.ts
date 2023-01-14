import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
} from "typeorm";
import { trsRegis } from "./TrsRegis.entity";


@Index("PK__trs_regi__3213E83FD869F9F9", ["id"], { unique: true })
@Entity("trs_regis_detail", { schema: "dbo" })
export class trsRegisDetail {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "amount", nullable: true })
  amount: number | null;

  @Column("varchar", { name: "create_by_id", nullable: true, length: 100 })
  create_by_id: string | null;

  @Column("varchar", { name: "create_by", nullable: true, length: 300 })
  create_by: string | null;

  @Column("datetime", { name: "create_date", nullable: true })
  create_date: Date | null;

  @Column("varchar", { name: "update_by_id", nullable: true, length: 100 })
  update_by_id: string | null;

  @Column("varchar", { name: "update_by", nullable: true, length: 300 })
  update_by: string | null;

  @Column("datetime", { name: "update_date", nullable: true })
  update_date: Date | null;

  @Column("varchar", { name: "delete_by_id", nullable: true, length: 100 })
  delete_by_id: string | null;

  @Column("varchar", { name: "delete_by", nullable: true, length: 300 })
  delete_by: string | null;

  @Column("datetime", { name: "delete_date", nullable: true })
  delete_date: Date | null;

  @Column("nvarchar", { name: "engine_no", nullable: true, length: 255 })
  engine_no: string | null;

  @Column("nvarchar", { name: "fuel_capacity_no", nullable: true, length: 255 })
  fuel_capacity_no: string | null;

  @Column("nvarchar", { name: "mil_regis_no", nullable: true, length: 255 })
  mil_regis_no: string | null;

  @Column("nvarchar", { name: "car_regis_no", nullable: true, length: 255 })
  car_regis_no: string | null;

  @ManyToOne(() => trsRegis, (trs_regis) => trs_regis.trs_regis_details, {
    onDelete: "SET NULL",
  })
  @JoinColumn([{ name: "trs_regis_no", referencedColumnName: "id" }])
  trs_regis_no: trsRegis;
}
