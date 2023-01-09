import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK__directus__3213E83FDC3B55FB", ["id"], { unique: true })
@Entity("directus_webhooks", { schema: "dbo" })
export class directusWebhooks {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("nvarchar", { name: "name", length: 255 })
  name: string;

  @Column("nvarchar", { name: "method", length: 10, default: () => "'POST'" })
  method: string;

  @Column("nvarchar", { name: "url", length: 255 })
  url: string;

  @Column("nvarchar", { name: "status", length: 10, default: () => "'active'" })
  status: string;

  @Column("bit", { name: "data", default: () => "'1'" })
  data: boolean;

  @Column("nvarchar", { name: "actions", length: 100 })
  actions: string;

  @Column("nvarchar", { name: "collections", length: 255 })
  collections: string;

  @Column("nvarchar", { name: "headers", nullable: true })
  headers: string | null;
}
