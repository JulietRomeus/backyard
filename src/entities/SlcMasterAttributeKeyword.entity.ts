import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { slcMasterAttributeType } from "./SlcMasterAttributeType.entity";
// import { slcMasterSupplyAttribute } from "./SlcMasterSupplyAttribute.entity";
import { slcSupplyItemAttribute } from "./SlcSupplyItemAttribute.entity";
// import { slcSupplySpecAttribute } from "./SlcSupplySpecAttribute.entity";

@Index("PK__slc_mast__3213E83F8A542B49", ["id"], { unique: true })
@Entity("slc_master_attribute_keyword", { schema: "dbo" })
export class slcMasterAttributeKeyword {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("nvarchar", { name: "keyword", nullable: true, length: 255 })
  keyword: string | null;

  @Column("bit", { name: "is_active", nullable: true })
  is_active: boolean | null;

  @OneToMany(
    () => slcMasterAttributeType,
    (slc_master_attribute_type) => slc_master_attribute_type.attribute_keyword
  )
  slc_master_attribute_types: slcMasterAttributeType[];

  // @OneToMany(
  //   () => slcMasterSupplyAttribute,
  //   (slc_master_supply_attribute) =>
  //     slc_master_supply_attribute.attribute_keyword
  // )
  // slc_master_supply_attributes: slcMasterSupplyAttribute[];

  // @OneToMany(
  //   () => slcSupplyItemAttribute,
  //   (slc_supply_item_attribute) => slc_supply_item_attribute.attribute_keyword
  // )
  // slc_supply_item_attributes: slcSupplyItemAttribute[];

  // @OneToMany(
  //   () => slcSupplySpecAttribute,
  //   (slc_supply_spec_attribute) => slc_supply_spec_attribute.attribute_keyword
  // )
  // slc_supply_spec_attributes: slcSupplySpecAttribute[];
}
