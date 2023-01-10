import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  RelationId,
} from "typeorm";
import { directusFolders } from "./DirectusFolders.entity";
import { directusUsers } from "./DirectusUsers.entity";
import { directusSettings } from "./DirectusSettings.entity";
import { trsActivityFilesFiles } from "./TrsActivityFilesFiles.entity";
import { trsDriverFiles } from "./TrsDriverFiles.entity";
import { trsDriverFiles_1 } from "./TrsDriverFiles_1.entity";

@Index("directus_files_pkey", ["id"], { unique: true })
@Entity("directus_files", { schema: "dbo" })
export class directusFiles {
  @Column("uniqueidentifier", { primary: true, name: "id" })
  id: string;

  @Column("nvarchar", { name: "storage", length: 255 })
  storage: string;

  @Column("nvarchar", { name: "filename_disk", nullable: true, length: 255 })
  filename_disk: string | null;

  @Column("nvarchar", { name: "filename_download", length: 255 })
  filename_download: string;

  @Column("nvarchar", { name: "title", nullable: true, length: 255 })
  title: string | null;

  @Column("nvarchar", { name: "type", nullable: true, length: 255 })
  type: string | null;

  @Column("datetime2", { name: "uploaded_on", default: () => "getdate()" })
  uploaded_on: Date;

  @Column("datetime2", { name: "modified_on", default: () => "getdate()" })
  modified_on: Date;

  @Column("nvarchar", { name: "charset", nullable: true, length: 50 })
  charset: string | null;

  @Column("bigint", { name: "filesize", nullable: true, default: () => "NULL" })
  filesize: string | null;

  @Column("int", { name: "width", nullable: true })
  width: number | null;

  @Column("int", { name: "height", nullable: true })
  height: number | null;

  @Column("int", { name: "duration", nullable: true })
  duration: number | null;

  @Column("nvarchar", { name: "embed", nullable: true, length: 200 })
  embed: string | null;

  @Column("nvarchar", { name: "description", nullable: true })
  description: string | null;

  @Column("nvarchar", { name: "location", nullable: true })
  location: string | null;

  @Column("nvarchar", { name: "tags", nullable: true })
  tags: string | null;

  @Column("nvarchar", { name: "metadata", nullable: true })
  metadata: string | null;

  @ManyToOne(
    () => directusFolders,
    (directus_folders) => directus_folders.directus_files,
    { onDelete: "SET NULL" }
  )
  @JoinColumn([{ name: "folder", referencedColumnName: "id" }])
  folder: directusFolders;

  @ManyToOne(
    () => directusUsers,
    (directus_users) => directus_users.directus_files
  )
  @JoinColumn([{ name: "uploaded_by", referencedColumnName: "id" }])
  uploaded_by: directusUsers;

  @ManyToOne(
    () => directusUsers,
    (directus_users) => directus_users.directus_files2
  )
  @JoinColumn([{ name: "modified_by", referencedColumnName: "id" }])
  modified_by: directusUsers;

  @OneToMany(
    () => directusSettings,
    (directus_settings) => directus_settings.project_logo
  )
  directus_settings: directusSettings[];

  @OneToMany(
    () => directusSettings,
    (directus_settings) => directus_settings.public_foreground
  )
  directus_settings2: directusSettings[];

  @OneToMany(
    () => directusSettings,
    (directus_settings) => directus_settings.public_background
  )
  directus_settings3: directusSettings[];

  @OneToMany(
    () => trsActivityFilesFiles,
    (trs_activity_files_files) => trs_activity_files_files.directus_files
  )
  trs_activity_files_files: trsActivityFilesFiles[];

  @OneToMany(
    () => trsDriverFiles,
    (trs_driver_files) => trs_driver_files.directus_files
  )
  trs_driver_files: trsDriverFiles[];

  @OneToMany(
    () => trsDriverFiles_1,
    (trs_driver_files_1) => trs_driver_files_1.directus_files
  )
  trs_driver_files_s: trsDriverFiles_1[];

  @RelationId((directus_files: directusFiles) => directus_files.folder)
  folder2: string | null;

  @RelationId((directus_files: directusFiles) => directus_files.uploaded_by)
  uploaded_by2: string | null;

  @RelationId((directus_files: directusFiles) => directus_files.modified_by)
  modified_by2: string | null;
}
