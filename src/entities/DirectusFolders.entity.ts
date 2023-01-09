import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  RelationId,
} from "typeorm";
import { directusFiles } from "./DirectusFiles.entity";
import { directusSettings } from "./DirectusSettings.entity";

@Index("directus_folders_pkey", ["id"], { unique: true })
@Entity("directus_folders", { schema: "dbo" })
export class directusFolders {
  @Column("uniqueidentifier", { primary: true, name: "id" })
  id: string;

  @Column("nvarchar", { name: "name", length: 255 })
  name: string;

  @OneToMany(() => directusFiles, (directus_files) => directus_files.folder)
  directus_files: directusFiles[];

  @ManyToOne(
    () => directusFolders,
    (directus_folders) => directus_folders.directus_folders
  )
  @JoinColumn([{ name: "parent", referencedColumnName: "id" }])
  parent: directusFolders;

  @OneToMany(
    () => directusFolders,
    (directus_folders) => directus_folders.parent
  )
  directus_folders: directusFolders[];

  @OneToMany(
    () => directusSettings,
    (directus_settings) => directus_settings.storage_default_folder
  )
  directus_settings: directusSettings[];

  @RelationId((directus_folders: directusFolders) => directus_folders.parent)
  parent2: string | null;
}
