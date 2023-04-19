import {
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from "typeorm";
import { directusFiles } from "./DirectusFiles.entity";
import { trsActivityFiles } from "./TrsActivityFiles.entity";

@Index("PK__trs_acti__3213E83FC6C338B7", ["id"], { unique: true })
@Entity("trs_activity_files_files", { schema: "dbo" })
export class trsActivityFilesFiles {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @ManyToOne(
    () => directusFiles,
    (directus_files) => directus_files.trs_activity_files_files,
    { onDelete: "SET NULL" }
  )
  @JoinColumn([{ name: "directus_files_id", referencedColumnName: "id" }])
  directus_files: directusFiles;

  @ManyToOne(
    () => trsActivityFiles,
    (trs_activity_files) => trs_activity_files.trs_activity_files_files,
    { onDelete: "SET NULL" }
  )
  @JoinColumn([{ name: "trs_activity_files_id", referencedColumnName: "id" }])
  trs_activity_files: trsActivityFiles;

  // @RelationId(
  //   (trs_activity_files_files: trsActivityFilesFiles) =>
  //     trs_activity_files_files.directus_files
  // )
  // directus_files_id: string | null;

  // @RelationId(
  //   (trs_activity_files_files: trsActivityFilesFiles) =>
  //     trs_activity_files_files.trs_activity_files
  // )
  // trs_activity_files_id: number | null;
}
