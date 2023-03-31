import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { slcMasterAttributeKeyword } from "./SlcMasterAttributeKeyword.entity";
import { slcRefsSupplySubDetail } from "./SlcRefsSupplySubDetail.entity";
import { slcRefsSupplySubType } from "./SlcRefsSupplySubType.entity";
import { slcMasterAttributeTypeDetail } from "./SlcMasterAttributeTypeDetail.entity";
// import { slcMasterSupplyAttribute } from "./SlcMasterSupplyAttribute.entity";
import { slcSupplyItemAttribute } from "./SlcSupplyItemAttribute.entity";
// import { slcSupplySpecAttribute } from "./SlcSupplySpecAttribute.entity";

@Index("PK__slc_mast__3213E83F69E54695", ["id"], { unique: true })
@Entity("slc_master_attribute_type", { schema: "dbo" })
export class slcMasterAttributeType {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("nvarchar", { name: "type", nullable: true, length: 50 })
  type: string | null;

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

  @Column("int", { name: "spec_or_item", nullable: true })
  spec_or_item: number | null;

  @Column("int", { name: "supply_sub_detail_key", nullable: true })
  supply_sub_detail_key: number | null;

  @ManyToOne(
    () => slcMasterAttributeKeyword,
    (slc_master_attribute_keyword) =>
      slc_master_attribute_keyword.slc_master_attribute_types,
    { onDelete: "SET NULL" }
  )
  @JoinColumn([{ name: "attribute_keyword_id", referencedColumnName: "id" }])
  attribute_keyword: slcMasterAttributeKeyword;

  @ManyToOne(
    () => slcMasterAttributeType,
    (slc_master_attribute_type) =>
      slc_master_attribute_type.slc_master_attribute_types
  )
  @JoinColumn([{ name: "parent_id", referencedColumnName: "id" }])
  parent: slcMasterAttributeType;

  @OneToMany(
    () => slcMasterAttributeType,
    (slc_master_attribute_type) => slc_master_attribute_type.parent
  )
  slc_master_attribute_types: slcMasterAttributeType[];

  @ManyToOne(
    () => slcRefsSupplySubDetail,
    (slc_refs_supply_sub_detail) =>
      slc_refs_supply_sub_detail.slc_master_attribute_types,
    { onDelete: "SET NULL" }
  )
  @JoinColumn([{ name: "supply_sub_detail_id", referencedColumnName: "id" }])
  supply_sub_detail: slcRefsSupplySubDetail;

  @ManyToOne(
    () => slcRefsSupplySubType,
    (slc_refs_supply_sub_type) =>
      slc_refs_supply_sub_type.slc_master_attribute_types,
    { onDelete: "SET NULL" }
  )
  @JoinColumn([{ name: "supply_sub_type_id", referencedColumnName: "id" }])
  supply_sub_type: slcRefsSupplySubType;

  @OneToMany(
    () => slcMasterAttributeTypeDetail,
    (slc_master_attribute_type_detail) =>
      slc_master_attribute_type_detail.master_attribute_type
  )
  slc_master_attribute_type_details: slcMasterAttributeTypeDetail[];

  // @OneToMany(
  //   () => slcMasterSupplyAttribute,
  //   (slc_master_supply_attribute) =>
  //     slc_master_supply_attribute.master_attribute_type
  // )
  // slc_master_supply_attributes: slcMasterSupplyAttribute[];

  // @OneToMany(
  //   () => slcSupplyItemAttribute,
  //   (slc_supply_item_attribute) =>
  //     slc_supply_item_attribute.master_attribute_type
  // )
  // slc_supply_item_attributes: slcSupplyItemAttribute[];

  // @OneToMany(
  //   () => slcSupplySpecAttribute,
  //   (slc_supply_spec_attribute) =>
  //     slc_supply_spec_attribute.master_attribute_type
  // )
  // slc_supply_spec_attributes: slcSupplySpecAttribute[];
}
