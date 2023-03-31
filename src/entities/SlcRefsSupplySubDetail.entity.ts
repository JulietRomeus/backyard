import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { slcMasterAttributeType } from "./SlcMasterAttributeType.entity";
import { slcMasterAttributeTypeDetail } from "./SlcMasterAttributeTypeDetail.entity";
// import { slcMasterSupplyAttribute } from "./SlcMasterSupplyAttribute.entity";
// import { slcRefsAnimalBreed } from "./SlcRefsAnimalBreed.entity";
import { slcRefsSupplySubType } from "./SlcRefsSupplySubType.entity";
// import { slcSupplyItemUserRequest } from "./SlcSupplyItemUserRequest.entity";
import { slcToa } from "./SlcToa.entity";

@Index("PK__slc_refs__3213E83FD58F1A5E", ["id"], { unique: true })
@Entity("slc_refs_supply_sub_detail", { schema: "dbo" })
export class slcRefsSupplySubDetail {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("nvarchar", { name: "detail", nullable: true, length: 255 })
  detail: string | null;

  @Column("int", { name: "key", nullable: true })
  key: number | null;

  @Column("bit", { name: "ia_active", nullable: true, default: () => "'1'" })
  ia_active: boolean | null;

  @OneToMany(
    () => slcMasterAttributeType,
    (slc_master_attribute_type) => slc_master_attribute_type.supply_sub_detail
  )
  slc_master_attribute_types: slcMasterAttributeType[];

  @OneToMany(
    () => slcMasterAttributeTypeDetail,
    (slc_master_attribute_type_detail) =>
      slc_master_attribute_type_detail.supply_sub_detail
  )
  slc_master_attribute_type_details: slcMasterAttributeTypeDetail[];

  // @OneToMany(
  //   () => slcMasterSupplyAttribute,
  //   (slc_master_supply_attribute) =>
  //     slc_master_supply_attribute.supply_sub_detail
  // )
  // slc_master_supply_attributes: slcMasterSupplyAttribute[];

  // @OneToMany(
  //   () => slcRefsAnimalBreed,
  //   (slc_refs_animal_breed) => slc_refs_animal_breed.sub_detail
  // )
  // slc_refs_animal_breeds: slcRefsAnimalBreed[];

  @ManyToOne(
    () => slcRefsSupplySubType,
    (slc_refs_supply_sub_type) =>
      slc_refs_supply_sub_type.slc_refs_supply_sub_details
  )
  @JoinColumn([{ name: "sub_type_id", referencedColumnName: "id" }])
  sub_type: slcRefsSupplySubType;

  // @OneToMany(
  //   () => slcSupplyItemUserRequest,
  //   (slc_supply_item_user_request) => slc_supply_item_user_request.sub_detail
  // )
  // slc_supply_item_user_requests: slcSupplyItemUserRequest[];

  @OneToMany(() => slcToa, (slc_toa) => slc_toa.supply_sub_detail)
  slc_toas: slcToa[];
}
