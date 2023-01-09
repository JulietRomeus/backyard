import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from "typeorm";
import { directusRoles } from "./DirectusRoles.entity";

@Index("PK__directus__3213E83F3CFD9C49", ["id"], { unique: true })
@Entity("directus_permissions", { schema: "dbo" })
export class directusPermissions {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("nvarchar", { name: "collection", length: 64 })
  collection: string;

  @Column("nvarchar", { name: "action", length: 10 })
  action: string;

  @Column("nvarchar", { name: "permissions", nullable: true })
  permissions: string | null;

  @Column("nvarchar", { name: "validation", nullable: true })
  validation: string | null;

  @Column("nvarchar", { name: "presets", nullable: true })
  presets: string | null;

  @Column("nvarchar", { name: "fields", nullable: true })
  fields: string | null;

  @ManyToOne(
    () => directusRoles,
    (directus_roles) => directus_roles.directus_permissions,
    { onDelete: "CASCADE" }
  )
  @JoinColumn([{ name: "role", referencedColumnName: "id" }])
  role: directusRoles;

  @RelationId(
    (directus_permissions: directusPermissions) => directus_permissions.role
  )
  role2: string | null;
}
