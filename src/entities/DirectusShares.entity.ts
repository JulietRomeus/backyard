import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  RelationId,
} from "typeorm";
import { directusSessions } from "./DirectusSessions.entity";
import { directusCollections } from "./DirectusCollections.entity";
import { directusRoles } from "./DirectusRoles.entity";
import { directusUsers } from "./DirectusUsers.entity";

@Index("directus_shares_pkey", ["id"], { unique: true })
@Entity("directus_shares", { schema: "dbo" })
export class directusShares {
  @Column("uniqueidentifier", { primary: true, name: "id" })
  id: string;

  @Column("nvarchar", { name: "name", nullable: true, length: 255 })
  name: string | null;

  @Column("nvarchar", { name: "item", nullable: true, length: 255 })
  item: string | null;

  @Column("nvarchar", { name: "password", nullable: true, length: 255 })
  password: string | null;

  @Column("datetime2", {
    name: "date_created",
    nullable: true,
    default: () => "getdate()",
  })
  date_created: Date | null;

  @Column("datetime2", {
    name: "date_start",
    nullable: true,
    default: () => "NULL",
  })
  date_start: Date | null;

  @Column("datetime2", {
    name: "date_end",
    nullable: true,
    default: () => "NULL",
  })
  date_end: Date | null;

  @Column("int", { name: "times_used", nullable: true, default: () => "'0'" })
  times_used: number | null;

  @Column("int", { name: "max_uses", nullable: true })
  max_uses: number | null;

  @OneToMany(
    () => directusSessions,
    (directus_sessions) => directus_sessions.share
  )
  directus_sessions: directusSessions[];

  @ManyToOne(
    () => directusCollections,
    (directus_collections) => directus_collections.directus_shares,
    { onDelete: "CASCADE" }
  )
  @JoinColumn([{ name: "collection", referencedColumnName: "collection" }])
  collection: directusCollections;

  @ManyToOne(
    () => directusRoles,
    (directus_roles) => directus_roles.directus_shares,
    { onDelete: "CASCADE" }
  )
  @JoinColumn([{ name: "role", referencedColumnName: "id" }])
  role: directusRoles;

  @ManyToOne(
    () => directusUsers,
    (directus_users) => directus_users.directus_shares,
    { onDelete: "SET NULL" }
  )
  @JoinColumn([{ name: "user_created", referencedColumnName: "id" }])
  user_created: directusUsers;

  @RelationId((directus_shares: directusShares) => directus_shares.collection)
  collection2: string | null;

  @RelationId((directus_shares: directusShares) => directus_shares.role)
  role2: string | null;

  @RelationId((directus_shares: directusShares) => directus_shares.user_created)
  user_created2: string | null;
}
