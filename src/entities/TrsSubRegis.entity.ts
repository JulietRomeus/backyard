import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from "typeorm";
import { trsRegisDetail } from "./TrsRegisDetail.entity";

@Index("PK__trs_sub___3213E83FCFB8ADDA", ["id"], { unique: true })
@Entity("trs_sub_regis", { schema: "dbo" })
export class trsSubRegis {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("bit", { name: "is_active", nullable: true, default: () => "'1'" })
  is_active: boolean | null;

  @Column("varchar", { name: "engine_no", nullable: true, length: 100 })
  engine_no: string | null;

  @Column("varchar", { name: "fuel_capacity_no", nullable: true, length: 100 })
  fuel_capacity_no: string | null;

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

  @ManyToOne(
    () => trsRegisDetail,
    (trs_regis_detail) => trs_regis_detail.trs_sub_regis,
    { onDelete: "SET NULL" }
  )
  @JoinColumn([{ name: "trs_regis_detail_no", referencedColumnName: "id" }])
  trs_regis_detail_no: trsRegisDetail;

  @RelationId((trs_sub_regis: trsSubRegis) => trs_sub_regis.trs_regis_detail_no)
  trs_regis_detail_no2: number | null;
}
