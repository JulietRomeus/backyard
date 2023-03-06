import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { trsTransactionType } from "./TrsTransactionType.entity";
import { trsVehicle } from "./TrsVehicle.entity";
import { slcSupplyItem } from "./SlcSupplyItem.entity";
import { slcSupplyItemAttributeValue } from "./SlcSupplyItemAttributeValue.entity";

@Index("PK__trs_tran__3213E83F22D6E768", ["id"], { unique: true })
@Entity("trs_transaction", { schema: "dbo" })
export class trsTransaction {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("nvarchar", {
    name: "status",
    nullable: true,
    length: 255,
    default: () => "'1'",
  })
  status: string | null;

  @Column("date", { name: "renewal_date", nullable: true })
  renewal_date: Date | null;

  @Column("nvarchar", { name: "update_date", nullable: true, length: 255 })
  update_date: string | null;

  @Column("nvarchar", { name: "update_by", nullable: true, length: 255 })
  update_by: string | null;

  @Column("nvarchar", { name: "update_by_id", nullable: true, length: 255 })
  update_by_id: string | null;

  @Column("nvarchar", {
    name: "transaction_status",
    nullable: true,
    length: 255,
  })
  transaction_status: string | null;

  @ManyToOne(
    () => trsTransactionType,
    (trs_transaction_type) => trs_transaction_type.trs_transactions,
    { onDelete: "SET NULL" }
  )
  @JoinColumn([{ name: "transaction_type", referencedColumnName: "id" }])
  transaction_type: trsTransactionType;

  @ManyToOne(
    () => slcSupplyItemAttributeValue,
    (slc_supply_item_attribute_value) =>
      slc_supply_item_attribute_value.trs_transactions,
    { onDelete: "SET NULL" }
  )
  @JoinColumn([{ name: "vehicle", referencedColumnName: "id" }])
  vehicle: slcSupplyItemAttributeValue;
}
