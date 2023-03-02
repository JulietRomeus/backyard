import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { trsTransaction } from "./TrsTransaction.entity";

@Index("PK__trs_tran__3213E83FAAEC7816", ["id"], { unique: true })
@Entity("trs_transaction_type", { schema: "dbo" })
export class trsTransactionType {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("nvarchar", {
    name: "status",
    nullable: true,
    length: 255,
    default: () => "'1'",
  })
  status: string | null;

  @Column("nvarchar", { name: "name", nullable: true, length: 255 })
  name: string | null;

  @OneToMany(
    () => trsTransaction,
    (trs_transaction) => trs_transaction.transaction_type
  )
  trs_transactions: trsTransaction[];
}
