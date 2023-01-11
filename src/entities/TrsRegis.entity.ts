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
import { trsRegisStatusform } from "./TrsRegisStatusform.entity";
import { trsRegisStatus } from "./TrsRegisStatus.entity";
import { trsRegisDetail } from "./TrsRegisDetail.entity";

@Index("PK__trs_regi__3213E83F65252CE3", ["id"], { unique: true })
@Entity("trs_regis", { schema: "dbo" })
export class trsRegis {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("bit", { name: "is_active", nullable: true, default: () => "'1'" })
  is_active: boolean | null;

  @Column("varchar", { name: "purpose", nullable: true, length: 300 })
  purpose: string | null;

  @Column("varchar", { name: "accept_by_name", nullable: true, length: 100 })
  accept_by_name: string | null;

  @Column("varchar", {
    name: "accept_by_position",
    nullable: true,
    length: 100,
  })
  accept_by_position: string | null;

  @Column("varchar", {
    name: "named_registry_by_name",
    nullable: true,
    length: 100,
  })
  named_registry_by_name: string | null;

  @Column("varchar", { name: "house_id", nullable: true, length: 100 })
  house_id: string | null;

  @Column("varchar", { name: "moo", nullable: true, length: 100 })
  moo: string | null;

  @Column("varchar", { name: "province_code", nullable: true, length: 2 })
  province_code: string | null;

  @Column("varchar", { name: "province_name", nullable: true, length: 100 })
  province_name: string | null;

  @Column("varchar", { name: "amphoe_code", nullable: true, length: 4 })
  amphoe_code: string | null;

  @Column("varchar", { name: "amphoe_name", nullable: true, length: 100 })
  amphoe_name: string | null;

  @Column("varchar", { name: "tambon_code", nullable: true, length: 6 })
  tambon_code: string | null;

  @Column("varchar", { name: "tambon_name", nullable: true, length: 100 })
  tambon_name: string | null;

  @Column("datetime", { name: "approve_date", nullable: true })
  approve_date: Date | null;

  @Column("varchar", { name: "approve_by", nullable: true, length: 100 })
  approve_by: string | null;

  @Column("nvarchar", { name: "approve_by_id", nullable: true, length: 100 })
  approve_by_id: string | null;

  @Column("varchar", { name: "request_status", nullable: true, length: 100 })
  request_status: string | null;

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

  @Column("nvarchar", { name: "purchase_method", nullable: true, length: 255 })
  purchase_method: string | null;

  @Column("nvarchar", { name: "purchase_from", nullable: true, length: 255 })
  purchase_from: string | null;

  @Column("nvarchar", { name: "vehicle_class_name", nullable: true, length: 255 })
  vehicle_class_name: string | null;

  @Column("int", { name: "purchase_price", nullable: true})
  purchase_price: number | null;

  @Column("int", { name: "actual_price", nullable: true })
  actual_price: number | null;

  @Column("nvarchar", { name: "purchase_no", nullable: true, length: 255 })
  purchase_no: string | null;
  @Column("nvarchar", { name: "deliver_date", nullable: true, length: 255 })
  deliver_date: string | null;
  @Column("nvarchar", { name: "purchase_detail", nullable: true, length: 255 })
  purchase_detail: string | null;
  @Column("nvarchar", { name: "process_by_name", nullable: true, length: 255 })
  process_by_name: string | null;
  @Column("nvarchar", { name: "named_register", nullable: true, length: 255 })
  named_register: string | null;
  @Column("nvarchar", { name: "road", nullable: true, length: 255 })
  road: string | null;
  @Column("nvarchar", { name: "regis_detail", nullable: true, length: 255 })
  regis_detail: string | null;

  @ManyToOne(
    () => trsRegisStatusform,
    (trs_regis_statusform) => trs_regis_statusform.trs_regis,
    { onDelete: "SET NULL" }
  )
  @JoinColumn([{ name: "trs_regis_statusform_no", referencedColumnName: "id" }])
  trs_regis_statusform_no: trsRegisStatusform;

  @ManyToOne(
    () => trsRegisStatus,
    (trs_regis_status) => trs_regis_status.trs_regis,
    { onDelete: "SET NULL" }
  )
  @JoinColumn([{ name: "trs_regis_status_no", referencedColumnName: "id" }])
  trs_regis_status_no: trsRegisStatus;

  @OneToMany(
    () => trsRegisDetail,
    (trs_regis_detail) => trs_regis_detail.trs_regis_no
  )
  trs_regis_detail_no: trsRegisDetail[];

  @RelationId((trs_regis: trsRegis) => trs_regis.trs_regis_statusform_no)
  trs_regis_statusform_no2: string | null;

  @RelationId((trs_regis: trsRegis) => trs_regis.trs_regis_status_no)
  trs_regis_status_no2: number | null;
}
