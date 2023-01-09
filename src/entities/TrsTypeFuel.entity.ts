import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK__trs_type__3213E83F1A11E26A", ["id"], { unique: true })
@Entity("trs_type_fuel", { schema: "dbo" })
export class trsTypeFuel {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("nvarchar", { name: "name", nullable: true })
  name: string | null;
}
