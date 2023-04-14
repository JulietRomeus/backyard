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
    () => slcSupplyItem,
    (slc_supply_item) => slc_supply_item.trs_transactions,
    { onDelete: "SET NULL" }
  )
  @JoinColumn([{ name: "supply_item", referencedColumnName: "id" }])
  supply_item: slcSupplyItem;


  @Column("nvarchar", { name: "company_name", nullable: true, length: 255 })
  company_name: string | null;

  @Column("nvarchar", { name: "policy_no", nullable: true, length: 255 })
  policy_no: string | null;

  
  @Column("nvarchar", { name: "unit_no", nullable: true, length: 255 })
  unit_no: string | null;


 

}


