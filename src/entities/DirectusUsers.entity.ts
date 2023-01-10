import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  RelationId,
} from "typeorm";
import { directusDashboards } from "./DirectusDashboards.entity";
import { directusFiles } from "./DirectusFiles.entity";
import { directusFlows } from "./DirectusFlows.entity";
import { directusNotifications } from "./DirectusNotifications.entity";
import { directusOperations } from "./DirectusOperations.entity";
import { directusPanels } from "./DirectusPanels.entity";
import { directusPresets } from "./DirectusPresets.entity";
import { directusSessions } from "./DirectusSessions.entity";
import { directusShares } from "./DirectusShares.entity";
import { directusRoles } from "./DirectusRoles.entity";

@Index("directus_users_email_unique", ["email"], { unique: true })
@Index("directus_users_external_identifier_unique", ["external_identifier"], {
  unique: true,
})
@Index("directus_users_pkey", ["id"], { unique: true })
@Index("directus_users_token_unique", ["token"], { unique: true })
@Entity("directus_users", { schema: "dbo" })
export class directusUsers {
  @Column("uniqueidentifier", { primary: true, name: "id" })
  id: string;

  @Column("nvarchar", { name: "first_name", nullable: true, length: 50 })
  first_name: string | null;

  @Column("nvarchar", { name: "last_name", nullable: true, length: 50 })
  last_name: string | null;

  @Column("nvarchar", { name: "email", nullable: true, length: 128 })
  email: string | null;

  @Column("nvarchar", { name: "password", nullable: true, length: 255 })
  password: string | null;

  @Column("nvarchar", { name: "location", nullable: true, length: 255 })
  location: string | null;

  @Column("nvarchar", { name: "title", nullable: true, length: 50 })
  title: string | null;

  @Column("nvarchar", { name: "description", nullable: true })
  description: string | null;

  @Column("nvarchar", { name: "tags", nullable: true })
  tags: string | null;

  @Column("uniqueidentifier", { name: "avatar", nullable: true })
  avatar: string | null;

  @Column("nvarchar", {
    name: "language",
    nullable: true,
    length: 255,
    default: () => "NULL",
  })
  language: string | null;

  @Column("nvarchar", {
    name: "theme",
    nullable: true,
    length: 20,
    default: () => "'auto'",
  })
  theme: string | null;

  @Column("nvarchar", { name: "tfa_secret", nullable: true, length: 255 })
  tfa_secret: string | null;

  @Column("nvarchar", { name: "status", length: 16, default: () => "'active'" })
  status: string;

  @Column("nvarchar", { name: "token", nullable: true, length: 255 })
  token: string | null;

  @Column("datetime2", { name: "last_access", nullable: true })
  last_access: Date | null;

  @Column("nvarchar", { name: "last_page", nullable: true, length: 255 })
  last_page: string | null;

  @Column("nvarchar", {
    name: "provider",
    length: 128,
    default: () => "'default'",
  })
  provider: string;

  @Column("nvarchar", {
    name: "external_identifier",
    nullable: true,
    length: 255,
  })
  external_identifier: string | null;

  @Column("nvarchar", { name: "auth_data", nullable: true })
  auth_data: string | null;

  @Column("bit", {
    name: "email_notifications",
    nullable: true,
    default: () => "'1'",
  })
  email_notifications: boolean | null;

  @OneToMany(
    () => directusDashboards,
    (directus_dashboards) => directus_dashboards.user_created
  )
  directus_dashboards: directusDashboards[];

  @OneToMany(
    () => directusFiles,
    (directus_files) => directus_files.uploaded_by
  )
  directus_files: directusFiles[];

  @OneToMany(
    () => directusFiles,
    (directus_files) => directus_files.modified_by
  )
  directus_files2: directusFiles[];

  @OneToMany(
    () => directusFlows,
    (directus_flows) => directus_flows.user_created
  )
  directus_flows: directusFlows[];

  @OneToMany(
    () => directusNotifications,
    (directus_notifications) => directus_notifications.recipient
  )
  directus_notifications: directusNotifications[];

  @OneToMany(
    () => directusNotifications,
    (directus_notifications) => directus_notifications.sender
  )
  directus_notifications2: directusNotifications[];

  @OneToMany(
    () => directusOperations,
    (directus_operations) => directus_operations.user_created
  )
  directus_operations: directusOperations[];

  @OneToMany(
    () => directusPanels,
    (directus_panels) => directus_panels.user_created
  )
  directus_panels: directusPanels[];

  @OneToMany(() => directusPresets, (directus_presets) => directus_presets.user)
  directus_presets: directusPresets[];

  @OneToMany(
    () => directusSessions,
    (directus_sessions) => directus_sessions.user
  )
  directus_sessions: directusSessions[];

  @OneToMany(
    () => directusShares,
    (directus_shares) => directus_shares.user_created
  )
  directus_shares: directusShares[];

  @ManyToOne(
    () => directusRoles,
    (directus_roles) => directus_roles.directus_users,
    { onDelete: "SET NULL" }
  )
  @JoinColumn([{ name: "role", referencedColumnName: "id" }])
  role: directusRoles;

  @RelationId((directus_users: directusUsers) => directus_users.role)
  role2: string | null;
}
