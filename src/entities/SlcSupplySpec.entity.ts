import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
// import { fmsProcurementItem } from "./FmsProcurementItem.entity";
// import { fmsProcurementItemGtog } from "./FmsProcurementItemGtog.entity";
// import { slcContractItem } from "./SlcContractItem.entity";
// import { slcContractPeriodItem } from "./SlcContractPeriodItem.entity";
// import { slcItemPrice } from "./SlcItemPrice.entity";
// import { slcProcurementItem } from "./SlcProcurementItem.entity";
// import { slcRequirementItem } from "./SlcRequirementItem.entity";
// import { slcSupplyControlSupplySpec } from "./SlcSupplyControlSupplySpec.entity";
// import { slcSupplyDistributionItem } from "./SlcSupplyDistributionItem.entity";
import { slcSupplyItem } from "./SlcSupplyItem.entity";
// import { slcSupplyItemAttribute } from "./SlcSupplyItemAttribute.entity";
// import { slcSupplyOrderItem } from "./SlcSupplyOrderItem.entity";
// import { slcRefsMainPriceSource } from "./SlcRefsMainPriceSource.entity";
// import { slcStandardSpec } from "./SlcStandardSpec.entity";
import { slcSupply } from "./SlcSupply.entity";
// import { slcRefsSupplySpecStatus } from "./SlcRefsSupplySpecStatus.entity";
// import { slcSupplySpecAttributeValue } from "./SlcSupplySpecAttributeValue.entity";
// import { slcSupplySpecFiles } from "./SlcSupplySpecFiles.entity";

@Index("PK__slc_supp__3213E83F4D5124F3", ["id"], { unique: true })
@Entity("slc_supply_spec", { schema: "dbo" })
export class slcSupplySpec {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("nvarchar", { name: "name", nullable: true, length: 250 })
  name: string | null;

  @Column("nvarchar", { name: "detail", nullable: true, length: 1000 })
  detail: string | null;

  // @Column("int", { name: "file_type_id", nullable: true })
  // file_type_id: number | null;

  // @Column("int", { name: "file_url", nullable: true })
  // file_url: number | null;

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

  // @Column("nvarchar", { name: "nsn_code", nullable: true, length: 255 })
  // nsn_code: string | null;

  // @Column("decimal", {
  //   name: "main_price",
  //   nullable: true,
  //   precision: 10,
  //   scale: 5,
  // })
  // main_price: number | null;

  // @OneToMany(
  //   () => fmsProcurementItem,
  //   (fms_procurement_item) => fms_procurement_item.supply_spec
  // )
  // fms_procurement_items: fmsProcurementItem[];

  // @OneToMany(
  //   () => fmsProcurementItemGtog,
  //   (fms_procurement_item_gtog) => fms_procurement_item_gtog.supply_spec
  // )
  // fms_procurement_item_gtogs: fmsProcurementItemGtog[];

  // @OneToMany(
  //   () => slcContractItem,
  //   (slc_contract_item) => slc_contract_item.supply_spec
  // )
  // slc_contract_items: slcContractItem[];

  // @OneToMany(
  //   () => slcContractPeriodItem,
  //   (slc_contract_period_item) => slc_contract_period_item.supply_spec
  // )
  // slc_contract_period_items: slcContractPeriodItem[];

  // @OneToMany(() => slcItemPrice, (slc_item_price) => slc_item_price.supply_spec)
  // slc_item_prices: slcItemPrice[];

  // @OneToMany(
  //   () => slcProcurementItem,
  //   (slc_procurement_item) => slc_procurement_item.supply_spec
  // )
  // slc_procurement_items: slcProcurementItem[];

  // @OneToMany(
  //   () => slcRequirementItem,
  //   (slc_requirement_item) => slc_requirement_item.supply_spec
  // )
  // slc_requirement_items: slcRequirementItem[];

  // @OneToMany(
  //   () => slcSupplyControlSupplySpec,
  //   (slc_supply_control_supply_spec) =>
  //     slc_supply_control_supply_spec.supply_spec
  // )
  // slc_supply_control_supply_specs: slcSupplyControlSupplySpec[];

  // @OneToMany(
  //   () => slcSupplyDistributionItem,
  //   (slc_supply_distribution_item) => slc_supply_distribution_item.supply_spec
  // )
  // slc_supply_distribution_items: slcSupplyDistributionItem[];

  @OneToMany(
    () => slcSupplyItem,
    (slc_supply_item) => slc_supply_item.supply_spec
  )
  slc_supply_items: slcSupplyItem[];

  // @OneToMany(
  //   () => slcSupplyItemAttribute,
  //   (slc_supply_item_attribute) => slc_supply_item_attribute.supply_spec
  // )
  // slc_supply_item_attributes: slcSupplyItemAttribute[];

  // @OneToMany(
  //   () => slcSupplyOrderItem,
  //   (slc_supply_order_item) => slc_supply_order_item.supply_spec
  // )
  // slc_supply_order_items: slcSupplyOrderItem[];

  // @ManyToOne(
  //   () => slcRefsMainPriceSource,
  //   (slc_refs_main_price_source) => slc_refs_main_price_source.slc_supply_specs,
  //   { onDelete: "SET NULL" }
  // )
  // @JoinColumn([{ name: "main_price_source_id", referencedColumnName: "id" }])
  // main_price_source: slcRefsMainPriceSource;

  // @ManyToOne(
  //   () => slcStandardSpec,
  //   (slc_standard_spec) => slc_standard_spec.slc_supply_specs
  // )
  // @JoinColumn([{ name: "standard_spec_id", referencedColumnName: "id" }])
  // standard_spec: slcStandardSpec;

  @ManyToOne(() => slcSupply, (slc_supply) => slc_supply.slc_supply_specs)
  @JoinColumn([{ name: "supply_id", referencedColumnName: "id" }])
  supply: slcSupply;

  // @ManyToOne(
  //   () => slcRefsSupplySpecStatus,
  //   (slc_refs_supply_spec_status) =>
  //     slc_refs_supply_spec_status.slc_supply_specs
  // )
  // @JoinColumn([{ name: "status_id", referencedColumnName: "id" }])
  // status: slcRefsSupplySpecStatus;

  @ManyToOne(
    () => slcSupplySpec,
    (slc_supply_spec) => slc_supply_spec.slc_supply_specs
  )
  @JoinColumn([{ name: "parent_id", referencedColumnName: "id" }])
  parent: slcSupplySpec;

  @OneToMany(() => slcSupplySpec, (slc_supply_spec) => slc_supply_spec.parent)
  slc_supply_specs: slcSupplySpec[];

  // @OneToMany(
  //   () => slcSupplySpecAttributeValue,
  //   (slc_supply_spec_attribute_value) =>
  //     slc_supply_spec_attribute_value.supply_spec
  // )
  // slc_supply_spec_attribute_values: slcSupplySpecAttributeValue[];

  // @OneToMany(
  //   () => slcSupplySpecFiles,
  //   (slc_supply_spec_files) => slc_supply_spec_files.slc_supply_spec
  // )
  // slc_supply_spec_files: slcSupplySpecFiles[];
}
