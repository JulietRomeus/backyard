import {
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from "typeorm";
import { trsDriver } from "./TrsDriver.entity";
import { directusFiles } from "./DirectusFiles.entity";

@Index("PK__trs_driv__3213E83F39E9F3E4", ["id"], { unique: true })
@Entity("trs_driver_files", { schema: "dbo" })
export class trsDriverFiles {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @ManyToOne(() => trsDriver, (trs_driver) => trs_driver.trs_driver_files, {
    onDelete: "SET NULL",
  })
  @JoinColumn([{ name: "trs_driver_id", referencedColumnName: "id" }])
  trs_driver: trsDriver;

  @ManyToOne(
    () => directusFiles,
    (directus_files) => directus_files.trs_driver_files,
    { onDelete: "SET NULL" }
  )
  @JoinColumn([{ name: "directus_files_id", referencedColumnName: "id" }])
  directus_files: directusFiles;


}
