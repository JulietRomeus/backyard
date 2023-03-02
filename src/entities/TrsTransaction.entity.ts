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

  @ManyToOne(
    () => trsTransactionType,
    (trs_transaction_type) => trs_transaction_type.trs_transactions,
    { onDelete: "SET NULL" }
  )
  @JoinColumn([{ name: "transaction_type", referencedColumnName: "id" }])
  transaction_type: trsTransactionType;

  @ManyToOne(() => trsVehicle, (trs_vehicle) => trs_vehicle.trs_transactions, {
    onDelete: "SET NULL",
  })
  @JoinColumn([{ name: "vehicle", referencedColumnName: "id" }])
  vehicle: trsVehicle;
}
