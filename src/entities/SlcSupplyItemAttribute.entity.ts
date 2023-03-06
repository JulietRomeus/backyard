import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
// import { slcRefsDataType } from "./SlcRefsDataType.entity";
// import { slcMasterAttributeType } from "./SlcMasterAttributeType.entity";
import { slcSupplySpec } from "./SlcSupplySpec.entity";
import { slcSupplyItemAttributeValue } from "./SlcSupplyItemAttributeValue.entity";
// import { slcToa } from "./SlcToa.entity";

@Index("PK__slc_supp__3213E83FC52EB171", ["id"], { unique: true })
@Entity("slc_supply_item_attribute", { schema: "dbo" })
export class slcSupplyItemAttribute {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("nvarchar", { name: "attribute_name", nullable: true, length: 50 })
  attribute_name: string | null;

  // @Column("bit", { name: "can_delete", nullable: true })
  // can_delete: boolean | null;

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

  // @Column("bit", { name: "is_master", nullable: true })
  // is_master: boolean | null;

  // @Column("int", { name: "priority", nullable: true })
  // priority: number | null;

  // @Column("bit", { name: "can_edit", nullable: true })
  // can_edit: boolean | null;

  // @Column("int", { name: "tab_no", nullable: true })
  // tab_no: number | null;

  // @ManyToOne(
  //   () => slcRefsDataType,
  //   (slc_refs_data_type) => slc_refs_data_type.slc_supply_item_attributes
  // )
  // @JoinColumn([{ name: "data_type_id", referencedColumnName: "id" }])
  // data_type: slcRefsDataType;

  @ManyToOne(
    () => slcSupplyItemAttribute,
    (slc_supply_item_attribute) =>
      slc_supply_item_attribute.slc_supply_item_attributes
  )
  @JoinColumn([{ name: "parent_id", referencedColumnName: "id" }])
  parent: slcSupplyItemAttribute;

  @OneToMany(
    () => slcSupplyItemAttribute,
    (slc_supply_item_attribute) => slc_supply_item_attribute.parent
  )
  slc_supply_item_attributes: slcSupplyItemAttribute[];

  // @ManyToOne(
  //   () => slcMasterAttributeType,
  //   (slc_master_attribute_type) =>
  //     slc_master_attribute_type.slc_supply_item_attributes,
  //   { onDelete: "SET NULL" }
  // )
  // @JoinColumn([
  //   { name: "master_attribute_type_id", referencedColumnName: "id" },
  // ])
  // master_attribute_type: slcMasterAttributeType;

  // @ManyToOne(
  //   () => slcSupplySpec,
  //   (slc_supply_spec) => slc_supply_spec.slc_supply_item_attributes
  // )
  // @JoinColumn([{ name: "supply_spec_id", referencedColumnName: "id" }])
  // supply_spec: slcSupplySpec;

  @OneToMany(
    () => slcSupplyItemAttributeValue,
    (slc_supply_item_attribute_value) =>
      slc_supply_item_attribute_value.supply_item_attribute
  )
  slc_supply_item_attribute_values: slcSupplyItemAttributeValue[];

  // @OneToMany(() => slcToa, (slc_toa) => slc_toa.supply_group)
  // slc_toas: slcToa[];
}
