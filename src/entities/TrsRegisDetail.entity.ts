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
import { trsSubRegis } from "./TrsSubRegis.entity";

@Index("PK__trs_regi__3213E83FD869F9F9", ["id"], { unique: true })
@Entity("trs_regis_detail", { schema: "dbo" })
export class trsRegisDetail {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("bit", { name: "is_active", nullable: true, default: () => "'1'" })
  is_active: boolean | null;

  @Column("int", { name: "vehicle_type", nullable: true })
  vehicle_type: number | null;

  @Column("int", { name: "vehicle_brand", nullable: true })
  vehicle_brand: number | null;

  @Column("int", { name: "vehicle_brand_model", nullable: true })
  vehicle_brand_model: number | null;

  @Column("varchar", {
    name: "type_fuel_consumption",
    nullable: true,
    length: 100,
  })
  type_fuel_consumption: string | null;

  @Column("varchar", { name: "purchased_method", nullable: true, length: 300 })
  purchased_method: string | null;

  @Column("varchar", { name: "purchased_from", nullable: true, length: 300 })
  purchased_from: string | null;

  @Column("int", { name: "purchased_price", nullable: true })
  purchased_price: number | null;

  @Column("varchar", { name: "purpose", nullable: true, length: 300 })
  purpose: string | null;

  @Column("datetime", { name: "deliver_datetime", nullable: true })
  deliver_datetime: Date | null;

  @Column("varchar", { name: "deliver_location", nullable: true, length: 300 })
  deliver_location: string | null;

  @Column("int", { name: "approved_budget", nullable: true })
  approved_budget: number | null;

  @Column("varchar", { name: "remark", nullable: true, length: 300 })
  remark: string | null;

  @Column("varchar", {
    name: "defined_mil_vehicle_type",
    nullable: true,
    length: 100,
  })
  defined_mil_vehicle_type: string | null;

  @Column("int", { name: "sub_registry_vehicle", nullable: true })
  sub_registry_vehicle: number | null;

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

  @ManyToOne(() => trsRegis, (trs_regis) => trs_regis.trs_regis_details, {
    onDelete: "SET NULL",
  })
  @JoinColumn([{ name: "trs_regis_no", referencedColumnName: "id" }])
  trs_regis_no: trsRegis;

  @OneToMany(
    () => trsSubRegis,
    (trs_sub_regis) => trs_sub_regis.trs_regis_detail_no
  )
  trs_sub_regis: trsSubRegis[];

  @RelationId(
    (trs_regis_detail: trsRegisDetail) => trs_regis_detail.trs_regis_no
  )
  trs_regis_no2: number | null;
}
