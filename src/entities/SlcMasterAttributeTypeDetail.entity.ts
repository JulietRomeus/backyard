import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
// import { enrReserve } from "./EnrReserve.entity";
// import { enrSubPlan } from "./EnrSubPlan.entity";
// import { enrTransportPlan } from "./EnrTransportPlan.entity";
import { slcRefsSupplySubDetail } from "./SlcRefsSupplySubDetail.entity";
import { slcMasterAttributeType } from "./SlcMasterAttributeType.entity";
import { slcRefsSupplySubType } from "./SlcRefsSupplySubType.entity";
// import { slcOilTank } from "./SlcOilTank.entity";

@Index("PK__slc_mast__3213E83FB63EB33B", ["id"], { unique: true })
@Entity("slc_master_attribute_type_detail", { schema: "dbo" })
export class slcMasterAttributeTypeDetail {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("nvarchar", { name: "type", nullable: true, length: 50 })
  type: string | null;

  @Column("int", { name: "key", nullable: true })
  key: number | null;

  @Column("int", { name: "spec_or_item", nullable: true })
  spec_or_item: number | null;

  @Column("bit", { name: "is_active", nullable: true })
  is_active: boolean | null;

  @Column("nvarchar", { name: "create_by_id", nullable: true, length: 100 })
  create_by_id: string | null;

  @Column("nvarchar", { name: "create_by", nullable: true, length: 300 })
  create_by: string | null;

  @Column("nvarchar", { name: "update_by_id", nullable: true, length: 300 })
  update_by_id: string | null;

  @Column("nvarchar", { name: "update_by", nullable: true, length: 300 })
  update_by: string | null;

  @Column("datetime", { name: "update_date", nullable: true })
  update_date: Date | null;

  @Column("nvarchar", { name: "delete_by_id", nullable: true, length: 100 })
  delete_by_id: string | null;

  @Column("nvarchar", { name: "delete_by", nullable: true, length: 300 })
  delete_by: string | null;

  @Column("datetime", { name: "delete_date", nullable: true })
  delete_date: Date | null;

  @Column("datetime2", { name: "create_date", nullable: true })
  create_date: Date | null;

  @Column("int", { name: "line_order", nullable: true })
  line_order: number | null;

  @Column("bit", { name: "has_childred", nullable: true })
  has_childred: boolean | null;

  // @OneToMany(() => enrReserve, (enr_reserve) => enr_reserve.company)
  // enr_reserves: enrReserve[];

  // @OneToMany(
  //   () => enrReserve,
  //   (enr_reserve) => enr_reserve.slc_master_attribute_type_detail
  // )
  // enr_reserves2: enrReserve[];

  // @OneToMany(
  //   () => enrSubPlan,
  //   (enr_sub_plan) => enr_sub_plan.slc_master_attribute_type_detail
  // )
  // enr_sub_plans: enrSubPlan[];

  // @OneToMany(
  //   () => enrTransportPlan,
  //   (enr_transport_plan) => enr_transport_plan.slc_master_attribute_type_detail
  // )
  // enr_transport_plans: enrTransportPlan[];

  @ManyToOne(
    () => slcRefsSupplySubDetail,
    (slc_refs_supply_sub_detail) =>
      slc_refs_supply_sub_detail.slc_master_attribute_type_details,
    { onDelete: "SET NULL" }
  )
  @JoinColumn([{ name: "supply_sub_detail_id", referencedColumnName: "id" }])
  supply_sub_detail: slcRefsSupplySubDetail;

  @ManyToOne(
    () => slcMasterAttributeType,
    (slc_master_attribute_type) =>
      slc_master_attribute_type.slc_master_attribute_type_details,
    { onDelete: "SET NULL" }
  )
  @JoinColumn([
    { name: "master_attribute_type_id", referencedColumnName: "id" },
  ])
  master_attribute_type: slcMasterAttributeType;

  @ManyToOne(
    () => slcMasterAttributeTypeDetail,
    (slc_master_attribute_type_detail) =>
      slc_master_attribute_type_detail.slc_master_attribute_type_details
  )
  @JoinColumn([{ name: "parent_id", referencedColumnName: "id" }])
  parent: slcMasterAttributeTypeDetail;

  @OneToMany(
    () => slcMasterAttributeTypeDetail,
    (slc_master_attribute_type_detail) =>
      slc_master_attribute_type_detail.parent
  )
  slc_master_attribute_type_details: slcMasterAttributeTypeDetail[];

  @ManyToOne(
    () => slcRefsSupplySubType,
    (slc_refs_supply_sub_type) =>
      slc_refs_supply_sub_type.slc_master_attribute_type_details,
    { onDelete: "SET NULL" }
  )
  @JoinColumn([{ name: "supply_sub_type_id", referencedColumnName: "id" }])
  supply_sub_type: slcRefsSupplySubType;

  // @OneToMany(
  //   () => slcOilTank,
  //   (slc_oil_tank) => slc_oil_tank.master_attribute_type_detail
  // )
  // slc_oil_tanks: slcOilTank[];
}
