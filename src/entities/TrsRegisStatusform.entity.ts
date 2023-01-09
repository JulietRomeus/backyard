import { Column, Entity, Index, OneToMany } from "typeorm";
import { trsRegis } from "./TrsRegis.entity";

@Index("trs_regis_statusform_pkey", ["id"], { unique: true })
@Entity("trs_regis_statusform", { schema: "dbo" })
export class trsRegisStatusform {
  @Column("nvarchar", { primary: true, name: "id", length: 255 })
  id: string;

  @Column("nvarchar", { name: "name", nullable: true, length: 255 })
  name: string | null;

  @Column("int", { name: "sort", nullable: true })
  sort: number | null;

  @Column("nvarchar", { name: "description", nullable: true })
  description: string | null;

  @Column("bit", { name: "is_active", nullable: true, default: () => "'1'" })
  is_active: boolean | null;

  @Column("nvarchar", { name: "color", nullable: true, length: 255 })
  color: string | null;

  @OneToMany(() => trsRegis, (trs_regis) => trs_regis.trs_regis_statusform_no)
  trs_regis: trsRegis[];
}
