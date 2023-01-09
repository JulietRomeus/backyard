import { Column, Entity, Index, OneToMany } from "typeorm";
import { directusPermissions } from "./DirectusPermissions.entity";
import { directusPresets } from "./DirectusPresets.entity";
import { directusShares } from "./DirectusShares.entity";
import { directusUsers } from "./DirectusUsers.entity";

@Index("directus_roles_pkey", ["id"], { unique: true })
@Entity("directus_roles", { schema: "dbo" })
export class directusRoles {
  @Column("uniqueidentifier", { primary: true, name: "id" })
  id: string;

  @Column("nvarchar", { name: "name", length: 100 })
  name: string;

  @Column("nvarchar", {
    name: "icon",
    length: 30,
    default: () => "'supervised_user_circle'",
  })
  icon: string;

  @Column("nvarchar", { name: "description", nullable: true })
  description: string | null;

  @Column("nvarchar", { name: "ip_access", nullable: true })
  ip_access: string | null;

  @Column("bit", { name: "enforce_tfa", default: () => "'0'" })
  enforce_tfa: boolean;

  @Column("bit", { name: "admin_access", default: () => "'0'" })
  admin_access: boolean;

  @Column("bit", { name: "app_access", default: () => "'1'" })
  app_access: boolean;

  @OneToMany(
    () => directusPermissions,
    (directus_permissions) => directus_permissions.role
  )
  directus_permissions: directusPermissions[];

  @OneToMany(() => directusPresets, (directus_presets) => directus_presets.role)
  directus_presets: directusPresets[];

  @OneToMany(() => directusShares, (directus_shares) => directus_shares.role)
  directus_shares: directusShares[];

  @OneToMany(() => directusUsers, (directus_users) => directus_users.role)
  directus_users: directusUsers[];
}
