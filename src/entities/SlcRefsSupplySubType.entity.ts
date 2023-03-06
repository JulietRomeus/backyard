import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
// import { slcMasterAttributeType } from "./SlcMasterAttributeType.entity";
// import { slcMasterAttributeTypeDetail } from "./SlcMasterAttributeTypeDetail.entity";
// import { slcMasterSupplyAttribute } from "./SlcMasterSupplyAttribute.entity";
// import { slcRefsWithdrawType } from "./SlcRefsWithdrawType.entity";
// import { slcSupplyControlAble } from "./SlcSupplyControlAble.entity";
import { slcToa } from "./SlcToa.entity";

@Index("PK__slc_refs__3213E83FB03BF39E", ["id"], { unique: true })
@Entity("slc_refs_supply_sub_type", { schema: "dbo" })
export class slcRefsSupplySubType {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  // @Column("nvarchar", { name: "type", nullable: true, length: 50 })
  // type: string | null;

  // @Column("bit", { name: "is_active", nullable: true })
  // is_active: boolean | null;

  // @Column("nvarchar", { name: "create_by_id", nullable: true, length: 100 })
  // create_by_id: string | null;

  // @Column("nvarchar", { name: "create_by", nullable: true, length: 300 })
  // create_by: string | null;

  // @Column("datetime", { name: "create_date", nullable: true })
  // create_date: Date | null;

  // @Column("nvarchar", { name: "update_by_id", nullable: true, length: 300 })
  // update_by_id: string | null;

  // @Column("nvarchar", { name: "update_by", nullable: true, length: 300 })
  // update_by: string | null;

  // @Column("datetime", { name: "update_date", nullable: true })
  // update_date: Date | null;

  // @Column("nvarchar", { name: "delete_by_id", nullable: true, length: 100 })
  // delete_by_id: string | null;

  // @Column("nvarchar", { name: "delete_by", nullable: true, length: 300 })
  // delete_by: string | null;

  // @Column("datetime", { name: "delete_date", nullable: true })
  // delete_date: Date | null;

  // @OneToMany(
  //   () => slcMasterAttributeType,
  //   (slc_master_attribute_type) => slc_master_attribute_type.supply_sub_type
  // )
  // slc_master_attribute_types: slcMasterAttributeType[];

  // @OneToMany(
  //   () => slcMasterAttributeTypeDetail,
  //   (slc_master_attribute_type_detail) =>
  //     slc_master_attribute_type_detail.supply_sub_type
  // )
  // slc_master_attribute_type_details: slcMasterAttributeTypeDetail[];

  // @OneToMany(
  //   () => slcMasterSupplyAttribute,
  //   (slc_master_supply_attribute) => slc_master_supply_attribute.supply_sub_type
  // )
  // slc_master_supply_attributes: slcMasterSupplyAttribute[];

  // @OneToMany(
  //   () => slcRefsWithdrawType,
  //   (slc_refs_withdraw_type) => slc_refs_withdraw_type.supply_sub_type
  // )
  // slc_refs_withdraw_types: slcRefsWithdrawType[];

  // @OneToMany(
  //   () => slcSupplyControlAble,
  //   (slc_supply_control_able) => slc_supply_control_able.supply_sub_type
  // )
  // slc_supply_control_ables: slcSupplyControlAble[];

  @OneToMany(() => slcToa, (slc_toa) => slc_toa.supply_sub_type)
  slc_toas: slcToa[];
}
