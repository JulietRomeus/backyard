import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { slcSupplyItemAttribute } from "./SlcSupplyItemAttribute.entity";
import { slcSupplyItem } from "./SlcSupplyItem.entity";
import { trsTransaction } from "./TrsTransaction.entity";

@Index("PK__slc_supp__3213E83F2F12C603", ["id"], { unique: true })
@Entity("slc_supply_item_attribute_value", { schema: "dbo" })
export class slcSupplyItemAttributeValue {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("nvarchar", { name: "attribute_name", nullable: true, length: 150 })
  attribute_name: string | null;

  @Column("nvarchar", { name: "attribute_value", nullable: true, length: 250 })
  attribute_value: string | null;

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

  @ManyToOne(
    () => slcSupplyItemAttribute,
    (slc_supply_item_attribute) =>
      slc_supply_item_attribute.slc_supply_item_attribute_values
  )
  @JoinColumn([
    { name: "supply_item_attribute_id", referencedColumnName: "id" },
  ])
  supply_item_attribute: slcSupplyItemAttribute;

  @ManyToOne(
    () => slcSupplyItem,
    (slc_supply_item) => slc_supply_item.slc_supply_item_attribute_values,
    { onDelete: "SET NULL" }
  )
  @JoinColumn([{ name: "supply_item_id", referencedColumnName: "id" }])
  supply_item: slcSupplyItem;

  @OneToMany(() => trsTransaction, (trs_transaction) => trs_transaction.vehicle)
  trs_transactions: trsTransaction[];
}
