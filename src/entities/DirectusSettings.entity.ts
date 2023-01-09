import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from "typeorm";
import { directusFolders } from "./DirectusFolders.entity";
import { directusFiles } from "./DirectusFiles.entity";

@Index("PK__directus__3213E83FFF5AD54C", ["id"], { unique: true })
@Entity("directus_settings", { schema: "dbo" })
export class directusSettings {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("nvarchar", {
    name: "project_name",
    length: 100,
    default: () => "'Directus'",
  })
  project_name: string;

  @Column("nvarchar", { name: "project_url", nullable: true, length: 255 })
  project_url: string | null;

  @Column("nvarchar", {
    name: "project_color",
    nullable: true,
    length: 50,
    default: () => "NULL",
  })
  project_color: string | null;

  @Column("nvarchar", { name: "public_note", nullable: true })
  public_note: string | null;

  @Column("int", {
    name: "auth_login_attempts",
    nullable: true,
    default: () => "'25'",
  })
  auth_login_attempts: number | null;

  @Column("nvarchar", {
    name: "auth_password_policy",
    nullable: true,
    length: 100,
  })
  auth_password_policy: string | null;

  @Column("nvarchar", {
    name: "storage_asset_transform",
    nullable: true,
    length: 7,
    default: () => "'all'",
  })
  storage_asset_transform: string | null;

  @Column("nvarchar", { name: "storage_asset_presets", nullable: true })
  storage_asset_presets: string | null;

  @Column("nvarchar", { name: "custom_css", nullable: true })
  custom_css: string | null;

  @Column("nvarchar", { name: "basemaps", nullable: true })
  basemaps: string | null;

  @Column("nvarchar", { name: "mapbox_key", nullable: true, length: 255 })
  mapbox_key: string | null;

  @Column("nvarchar", { name: "module_bar", nullable: true })
  module_bar: string | null;

  @Column("nvarchar", {
    name: "project_descriptor",
    nullable: true,
    length: 100,
  })
  project_descriptor: string | null;

  @Column("nvarchar", { name: "translation_strings", nullable: true })
  translation_strings: string | null;

  @Column("nvarchar", {
    name: "default_language",
    length: 255,
    default: () => "'en-US'",
  })
  default_language: string;

  @Column("nvarchar", { name: "custom_aspect_ratios", nullable: true })
  custom_aspect_ratios: string | null;

  @ManyToOne(
    () => directusFolders,
    (directus_folders) => directus_folders.directus_settings,
    { onDelete: "SET NULL" }
  )
  @JoinColumn([{ name: "storage_default_folder", referencedColumnName: "id" }])
  storage_default_folder: directusFolders;

  @ManyToOne(
    () => directusFiles,
    (directus_files) => directus_files.directus_settings
  )
  @JoinColumn([{ name: "project_logo", referencedColumnName: "id" }])
  project_logo: directusFiles;

  @ManyToOne(
    () => directusFiles,
    (directus_files) => directus_files.directus_settings2
  )
  @JoinColumn([{ name: "public_foreground", referencedColumnName: "id" }])
  public_foreground: directusFiles;

  @ManyToOne(
    () => directusFiles,
    (directus_files) => directus_files.directus_settings3
  )
  @JoinColumn([{ name: "public_background", referencedColumnName: "id" }])
  public_background: directusFiles;

  @RelationId(
    (directus_settings: directusSettings) =>
      directus_settings.storage_default_folder
  )
  storage_default_folder2: string | null;

  @RelationId(
    (directus_settings: directusSettings) => directus_settings.project_logo
  )
  project_logo2: string | null;

  @RelationId(
    (directus_settings: directusSettings) => directus_settings.public_foreground
  )
  public_foreground2: string | null;

  @RelationId(
    (directus_settings: directusSettings) => directus_settings.public_background
  )
  public_background2: string | null;
}
