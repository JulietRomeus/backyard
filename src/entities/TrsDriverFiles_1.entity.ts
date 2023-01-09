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

@Index("PK__trs_driv__3213E83F841F00AF", ["id"], { unique: true })
@Entity("trs_driver_files_1", { schema: "dbo" })
export class trsDriverFiles_1 {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @ManyToOne(() => trsDriver, (trs_driver) => trs_driver.trs_driver_files_s, {
    onDelete: "SET NULL",
  })
  @JoinColumn([{ name: "trs_driver_id", referencedColumnName: "id" }])
  trs_driver: trsDriver;

  @ManyToOne(
    () => directusFiles,
    (directus_files) => directus_files.trs_driver_files_s,
    { onDelete: "SET NULL" }
  )
  @JoinColumn([{ name: "directus_files_id", referencedColumnName: "id" }])
  directus_files: directusFiles;

  @RelationId(
    (trs_driver_files_1: trsDriverFiles_1) => trs_driver_files_1.trs_driver
  )
  trs_driver_id: number | null;

  @RelationId(
    (trs_driver_files_1: trsDriverFiles_1) => trs_driver_files_1.directus_files
  )
  directus_files_id: string | null;
}
