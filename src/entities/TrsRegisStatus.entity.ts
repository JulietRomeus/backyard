import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { trsRegis } from "./TrsRegis.entity";

@Index("PK__trs_regi__3213E83FA6FB9ED6", ["id"], { unique: true })
@Entity("trs_regis_status", { schema: "dbo" })
export class trsRegisStatus {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("nvarchar", { name: "name", nullable: true, length: 255 })
  name: string | null;

  @Column("nvarchar", { name: "description", nullable: true })
  description: string | null;

  @Column("bit", { name: "is_active", nullable: true, default: () => "'1'" })
  is_active: boolean | null;

  @OneToMany(() => trsRegis, (trs_regis) => trs_regis.trs_regis_status_no)
  trs_regis: trsRegis[];
}
