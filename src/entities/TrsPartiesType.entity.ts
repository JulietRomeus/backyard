import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { trsPartiesList } from "./TrsPartiesList.entity";

@Index("PK__trs_part__3213E83F87291D4F", ["id"], { unique: true })
@Entity("trs_parties_type", { schema: "dbo" })
export class trsPartiesType {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("bit", { name: "is_delete", nullable: true })
  is_delete: boolean | null;

  @Column("nvarchar", { name: "parties_type_name", nullable: true })
  parties_type_name: string | null;

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

  @OneToMany(
    () => trsPartiesList,
    (trs_parties_list) => trs_parties_list.parties_type
  )
  trs_parties_lists: trsPartiesList[];
}
