import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from "typeorm";
import { directusUsers } from "./DirectusUsers.entity";
import { directusRoles } from "./DirectusRoles.entity";

@Index("PK__directus__3213E83FCBF27FED", ["id"], { unique: true })
@Entity("directus_presets", { schema: "dbo" })
export class directusPresets {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("nvarchar", { name: "bookmark", nullable: true, length: 255 })
  bookmark: string | null;

  @Column("nvarchar", { name: "collection", nullable: true, length: 64 })
  collection: string | null;

  @Column("nvarchar", { name: "search", nullable: true, length: 100 })
  search: string | null;

  @Column("nvarchar", {
    name: "layout",
    nullable: true,
    length: 100,
    default: () => "'tabular'",
  })
  layout: string | null;

  @Column("nvarchar", { name: "layout_query", nullable: true })
  layout_query: string | null;

  @Column("nvarchar", { name: "layout_options", nullable: true })
  layout_options: string | null;

  @Column("int", { name: "refresh_interval", nullable: true })
  refresh_interval: number | null;

  @Column("nvarchar", { name: "filter", nullable: true })
  filter: string | null;

  @Column("nvarchar", {
    name: "icon",
    length: 30,
    default: () => "'bookmark_outline'",
  })
  icon: string;

  @Column("nvarchar", { name: "color", nullable: true, length: 255 })
  color: string | null;

  @ManyToOne(
    () => directusUsers,
    (directus_users) => directus_users.directus_presets,
    { onDelete: "CASCADE" }
  )
  @JoinColumn([{ name: "user", referencedColumnName: "id" }])
  user: directusUsers;

  @ManyToOne(
    () => directusRoles,
    (directus_roles) => directus_roles.directus_presets,
    { onDelete: "CASCADE" }
  )
  @JoinColumn([{ name: "role", referencedColumnName: "id" }])
  role: directusRoles;

  @RelationId((directus_presets: directusPresets) => directus_presets.user)
  user2: string | null;

  @RelationId((directus_presets: directusPresets) => directus_presets.role)
  role2: string | null;
}
