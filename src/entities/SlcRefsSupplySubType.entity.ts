import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { slcMasterAttributeType } from "./SlcMasterAttributeType.entity";
import { slcMasterAttributeTypeDetail } from "./SlcMasterAttributeTypeDetail.entity";
// import { slcMasterImageType } from "./SlcMasterImageType.entity";
// import { slcMasterSupplyAttribute } from "./SlcMasterSupplyAttribute.entity";
import { slcRefsSupplySubDetail } from "./SlcRefsSupplySubDetail.entity";
// import { slcRefsWithdrawType } from "./SlcRefsWithdrawType.entity";
// import { slcSupplyControlAble } from "./SlcSupplyControlAble.entity";
// import { slcSupplyItemUserRequest } from "./SlcSupplyItemUserRequest.entity";
// import { slcSupplyTab } from "./SlcSupplyTab.entity";
import { slcToa } from "./SlcToa.entity";

@Index("PK__slc_refs__3213E83FB03BF39E", ["id"], { unique: true })
@Entity("slc_refs_supply_sub_type", { schema: "dbo" })
export class slcRefsSupplySubType {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("nvarchar", { name: "type", nullable: true, length: 50 })
  type: string | null;

  @Column("bit", { name: "is_active", nullable: true })
  is_active: boolean | null;

  @OneToMany(
    () => slcMasterAttributeType,
    (slc_master_attribute_type) => slc_master_attribute_type.supply_sub_type
  )
  slc_master_attribute_types: slcMasterAttributeType[];

  @OneToMany(
    () => slcMasterAttributeTypeDetail,
    (slc_master_attribute_type_detail) =>
      slc_master_attribute_type_detail.supply_sub_type
  )
  slc_master_attribute_type_details: slcMasterAttributeTypeDetail[];

  // @OneToMany(
  //   () => slcMasterImageType,
  //   (slc_master_image_type) => slc_master_image_type.supply_sub_type
  // )
  // slc_master_image_types: slcMasterImageType[];

  // @OneToMany(
  //   () => slcMasterSupplyAttribute,
  //   (slc_master_supply_attribute) => slc_master_supply_attribute.supply_sub_type
  // )
  // slc_master_supply_attributes: slcMasterSupplyAttribute[];

  @OneToMany(
    () => slcRefsSupplySubDetail,
    (slc_refs_supply_sub_detail) => slc_refs_supply_sub_detail.sub_type
  )
  slc_refs_supply_sub_details: slcRefsSupplySubDetail[];

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

  // @OneToMany(
  //   () => slcSupplyItemUserRequest,
  //   (slc_supply_item_user_request) => slc_supply_item_user_request.sub_type
  // )
  // slc_supply_item_user_requests: slcSupplyItemUserRequest[];

  // @OneToMany(
  //   () => slcSupplyTab,
  //   (slc_supply_tab) => slc_supply_tab.supply_sub_type
  // )
  // slc_supply_tabs: slcSupplyTab[];

  @OneToMany(() => slcToa, (slc_toa) => slc_toa.supply_sub_type)
  slc_toas: slcToa[];
}
