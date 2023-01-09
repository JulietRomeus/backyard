import { Column, Entity, Index } from "typeorm";

@Index("directus_migrations_pkey", ["version"], { unique: true })
@Entity("directus_migrations", { schema: "dbo" })
export class directusMigrations {
  @Column("nvarchar", { primary: true, name: "version", length: 255 })
  version: string;

  @Column("nvarchar", { name: "name", length: 255 })
  name: string;

  @Column("datetime2", {
    name: "timestamp",
    nullable: true,
    default: () => "getdate()",
  })
  timestamp: Date | null;
}
