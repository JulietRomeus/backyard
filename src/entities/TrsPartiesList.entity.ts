import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from "typeorm";
import { trsPartiesType } from "./TrsPartiesType.entity";

@Index("PK__trs_part__3213E83F5514EE79", ["id"], { unique: true })
@Entity("trs_parties_list", { schema: "dbo" })
export class trsPartiesList {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("bit", { name: "is_delete", nullable: true })
  is_delete: boolean | null;

  @Column("nvarchar", { name: "parties_name", nullable: true })
  parties_name: string | null;

  @Column("nvarchar", { name: "parties_surname", nullable: true })
  parties_surname: string | null;

  @Column("nvarchar", { name: "parties_address", nullable: true })
  parties_address: string | null;

  @Column("nvarchar", { name: "parties_destination", nullable: true })
  parties_destination: string | null;

  @Column("datetime2", { name: "create_date", nullable: true })
  create_date: Date | null;

  @Column("nvarchar", { name: "create_by", nullable: true })
  create_by: string | null;

  @Column("nvarchar", { name: "create_by_name", nullable: true })
  create_by_name: string | null;

  @Column("datetime2", { name: "update_date", nullable: true })
  update_date: Date | null;

  @Column("nvarchar", { name: "update_by", nullable: true })
  update_by: string | null;

  @Column("nvarchar", { name: "update_by_name", nullable: true })
  update_by_name: string | null;

  @ManyToOne(
    () => trsPartiesType,
    (trs_parties_type) => trs_parties_type.trs_parties_lists
  )
  @JoinColumn([{ name: "parties_type", referencedColumnName: "id" }])
  parties_type: trsPartiesType;

  @RelationId(
    (trs_parties_list: trsPartiesList) => trs_parties_list.parties_type
  )
  parties_type2: number | null;
}
