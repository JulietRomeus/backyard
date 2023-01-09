import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { directusRevisions } from "./DirectusRevisions.entity";

@Index("PK__directus__3213E83F9F441772", ["id"], { unique: true })
@Entity("directus_activity", { schema: "dbo" })
export class directusActivity {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("nvarchar", { name: "action", length: 45 })
  action: string;

  @Column("uniqueidentifier", { name: "user", nullable: true })
  user: string | null;

  @Column("datetime2", { name: "timestamp", default: () => "getdate()" })
  timestamp: Date;

  @Column("nvarchar", { name: "ip", nullable: true, length: 50 })
  ip: string | null;

  @Column("nvarchar", { name: "user_agent", nullable: true, length: 255 })
  user_agent: string | null;

  @Column("nvarchar", { name: "collection", length: 64 })
  collection: string;

  @Column("nvarchar", { name: "item", length: 255 })
  item: string;

  @Column("nvarchar", { name: "comment", nullable: true })
  comment: string | null;

  @Column("nvarchar", { name: "origin", nullable: true, length: 255 })
  origin: string | null;

  @OneToMany(
    () => directusRevisions,
    (directus_revisions) => directus_revisions.activity
  )
  directus_revisions: directusRevisions[];
}
