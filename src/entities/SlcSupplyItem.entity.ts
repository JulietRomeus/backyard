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
// import { slcOilSupplyControlBookItem } from "./SlcOilSupplyControlBookItem.entity";
// import { slcOilTankControlBookItem } from "./SlcOilTankControlBookItem.entity";
// import { slcProcurementItem } from "./SlcProcurementItem.entity";
// import { slcSupplyControlBookItem } from "./SlcSupplyControlBookItem.entity";
// import { slcSupplyControlSupplyItem } from "./SlcSupplyControlSupplyItem.entity";
// import { slcSupplyDistributionItem } from "./SlcSupplyDistributionItem.entity";
// import { slcRefsSupplyItemStatus } from "./SlcRefsSupplyItemStatus.entity";
// import { slcRefsSupplyUseType } from "./SlcRefsSupplyUseType.entity";
import { slcSupplySpec } from "./SlcSupplySpec.entity";
import { slcSupplyItemAttributeValue } from "./SlcSupplyItemAttributeValue.entity";
// import { slcSupplyItemFiles } from "./SlcSupplyItemFiles.entity";
// import { slcSupplyItemFiles_1 } from "./SlcSupplyItemFiles_1.entity";
// import { slcSupplyOrderItem } from "./SlcSupplyOrderItem.entity";
// import { slcWarehouseControlItem } from "./SlcWarehouseControlItem.entity";
import { trsTransaction } from "./TrsTransaction.entity";
import { trsActivityVehicleDriver } from "./TrsActivityVehicleDriver.entity";

@Index("PK__slc_supp__3213E83F933F7065", ["id"], { unique: true })
@Entity("slc_supply_item", { schema: "dbo" })
export class slcSupplyItem {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("nvarchar", { name: "name", nullable: true, length: 255 })
  name: string | null;

  // @Column("nvarchar", { name: "detail", nullable: true, length: 255 })
  // detail: string | null;

  // @Column("nvarchar", { name: "main_code", nullable: true, length: 255 })
  // main_code: string | null;

  // @Column("decimal", {
  //   name: "unit_price",
  //   nullable: true,
  //   precision: 10,
  //   scale: 5,
  // })
  // unit_price: number | null;

  // @Column("decimal", {
  //   name: "total_price",
  //   nullable: true,
  //   precision: 10,
  //   scale: 5,
  // })
  // total_price: number | null;

  // @Column("int", { name: "quantity", nullable: true })
  // quantity: number | null;

  // @Column("datetime2", { name: "added_date", nullable: true })
  // added_date: Date | null;

  // @Column("bit", { name: "is_active", nullable: true })
  // is_active: boolean | null;

  // @Column("nvarchar", { name: "create_by_id", nullable: true, length: 255 })
  // create_by_id: string | null;

  // @Column("nvarchar", { name: "create_by", nullable: true, length: 255 })
  // create_by: string | null;

  // @Column("datetime2", { name: "create_date", nullable: true })
  // create_date: Date | null;

  // @Column("nvarchar", { name: "update_by_id", nullable: true, length: 255 })
  // update_by_id: string | null;

  // @Column("nvarchar", { name: "update_by", nullable: true, length: 255 })
  // update_by: string | null;

  // @Column("datetime2", { name: "update_date", nullable: true })
  // update_date: Date | null;

  // @Column("nvarchar", { name: "delete_by_id", nullable: true, length: 255 })
  // delete_by_id: string | null;

  // @Column("nvarchar", { name: "delete_by", nullable: true, length: 255 })
  // delete_by: string | null;

  // @Column("datetime2", { name: "delete_date", nullable: true })
  // delete_date: Date | null;

  // @OneToMany(
  //   () => fmsProcurementItem,
  //   (fms_procurement_item) => fms_procurement_item.supply_item
  // )
  // fms_procurement_items: fmsProcurementItem[];

  // @OneToMany(
  //   () => fmsProcurementItemGtog,
  //   (fms_procurement_item_gtog) => fms_procurement_item_gtog.supply_item
  // )
  // fms_procurement_item_gtogs: fmsProcurementItemGtog[];

  // @OneToMany(
  //   () => slcContractItem,
  //   (slc_contract_item) => slc_contract_item.supply_item
  // )
  // slc_contract_items: slcContractItem[];

  // @OneToMany(
  //   () => slcContractPeriodItem,
  //   (slc_contract_period_item) => slc_contract_period_item.supply_item
  // )
  // slc_contract_period_items: slcContractPeriodItem[];

  // @OneToMany(
  //   () => slcOilSupplyControlBookItem,
  //   (slc_oil_supply_control_book_item) =>
  //     slc_oil_supply_control_book_item.supply_item
  // )
  // slc_oil_supply_control_book_items: slcOilSupplyControlBookItem[];

  // @OneToMany(
  //   () => slcOilTankControlBookItem,
  //   (slc_oil_tank_control_book_item) =>
  //     slc_oil_tank_control_book_item.supply_item
  // )
  // slc_oil_tank_control_book_items: slcOilTankControlBookItem[];

  // @OneToMany(
  //   () => slcProcurementItem,
  //   (slc_procurement_item) => slc_procurement_item.supply_item
  // )
  // slc_procurement_items: slcProcurementItem[];

  // @OneToMany(
  //   () => slcSupplyControlBookItem,
  //   (slc_supply_control_book_item) => slc_supply_control_book_item.supply_item
  // )
  // slc_supply_control_book_items: slcSupplyControlBookItem[];

  // @OneToMany(
  //   () => slcSupplyControlSupplyItem,
  //   (slc_supply_control_supply_item) =>
  //     slc_supply_control_supply_item.supply_item
  // )
  // slc_supply_control_supply_items: slcSupplyControlSupplyItem[];

  // @OneToMany(
  //   () => slcSupplyDistributionItem,
  //   (slc_supply_distribution_item) => slc_supply_distribution_item.supply_item
  // )
  // slc_supply_distribution_items: slcSupplyDistributionItem[];

  // @ManyToOne(
  //   () => slcRefsSupplyItemStatus,
  //   (slc_refs_supply_item_status) =>
  //     slc_refs_supply_item_status.slc_supply_items,
  //   { onDelete: "SET NULL" }
  // )
  // @JoinColumn([{ name: "supply_item_status_id", referencedColumnName: "id" }])
  // supply_item_status: slcRefsSupplyItemStatus;

  // @ManyToOne(
  //   () => slcRefsSupplyUseType,
  //   (slc_refs_supply_use_type) => slc_refs_supply_use_type.slc_supply_items,
  //   { onDelete: "SET NULL" }
  // )
  // @JoinColumn([{ name: "supply_use_type_id", referencedColumnName: "id" }])
  // supply_use_type: slcRefsSupplyUseType;

  @ManyToOne(
    () => slcSupplySpec,
    (slc_supply_spec) => slc_supply_spec.slc_supply_items,
    { onDelete: "SET NULL" }
  )
  @JoinColumn([{ name: "supply_spec_id", referencedColumnName: "id" }])
  supply_spec: slcSupplySpec;

  @ManyToOne(
    () => slcSupplyItem,
    (slc_supply_item) => slc_supply_item.slc_supply_items
  )
  @JoinColumn([{ name: "parent_id", referencedColumnName: "id" }])
  parent: slcSupplyItem;

  @OneToMany(() => slcSupplyItem, (slc_supply_item) => slc_supply_item.parent)
  slc_supply_items: slcSupplyItem[];

  @OneToMany(
    () => slcSupplyItemAttributeValue,
    (slc_supply_item_attribute_value) =>
      slc_supply_item_attribute_value.supply_item
  )
  slc_supply_item_attribute_values: slcSupplyItemAttributeValue[];

  // @OneToMany(
  //   () => slcSupplyItemFiles,
  //   (slc_supply_item_files) => slc_supply_item_files.slc_supply_item
  // )
  // slc_supply_item_files: slcSupplyItemFiles[];

  // @OneToMany(
  //   () => slcSupplyItemFiles_1,
  //   (slc_supply_item_files_1) => slc_supply_item_files_1.slc_supply_item
  // )
  // slc_supply_item_files_s: slcSupplyItemFiles_1[];

  // @OneToMany(
  //   () => slcSupplyOrderItem,
  //   (slc_supply_order_item) => slc_supply_order_item.supply_item
  // )
  // slc_supply_order_items: slcSupplyOrderItem[];

  // @OneToMany(
  //   () => slcWarehouseControlItem,
  //   (slc_warehouse_control_item) => slc_warehouse_control_item.supply_item
  // )
  // slc_warehouse_control_items: slcWarehouseControlItem[];

  @OneToMany(
    () => trsTransaction,
    (trs_transaction) => trs_transaction.supply_item
  )
  trs_transactions: trsTransaction[];
  @OneToMany(
    () => trsActivityVehicleDriver,
    (trs_activity_vehicle_driver) => trs_activity_vehicle_driver.vehicle_item
  )
  trs_activity_vehicle_drivers: trsActivityVehicleDriver[];
  
}
