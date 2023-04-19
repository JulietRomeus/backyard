import {
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { trsRegis } from "./TrsRegis.entity";
import { directusFiles } from "./DirectusFiles.entity";

@Index("PK__trs_regi__3213E83F4371BF9F", ["id"], { unique: true })
@Entity("trs_regis_files", { schema: "dbo" })
export class trsRegisFiles {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @ManyToOne(() => trsRegis, (trs_regis) => trs_regis.trs_regis_files, {
    onDelete: "SET NULL",
  })
  @JoinColumn([{ name: "trs_regis_id", referencedColumnName: "id" }])
  trs_regis: trsRegis;

  @ManyToOne(
    () => directusFiles,
    (directus_files) => directus_files.trs_regis_files,
    { onDelete: "SET NULL" },
  )
  @JoinColumn([{ name: "directus_files_id", referencedColumnName: "id" }])
  directus_files_id: directusFiles;
}
