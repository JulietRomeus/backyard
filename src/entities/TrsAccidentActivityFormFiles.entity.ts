import {
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { directusFiles } from "./DirectusFiles.entity";
import { trsAccidentActivityForm } from "./TrsAccidentActivityForm.entity";

@Index("PK__trs_acci__3213E83F0BF7A57B", ["id"], { unique: true })
@Entity("trs_accident_activity_form_files", { schema: "dbo" })
export class trsAccidentActivityFormFiles {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  // @ManyToOne(
  //   () => directusFiles,
  //   (directus_files) => directus_files.trs_accident_activity_form_files,
  //   { onDelete: "SET NULL" }
  // )
  // @JoinColumn([{ name: "directus_files_id", referencedColumnName: "id" }])
  // directus_files: directusFiles;

  // @ManyToOne(
  //   () => trsAccidentActivityForm,
  //   (trs_accident_activity_form) =>
  //     trs_accident_activity_form.trs_accident_activity_form_files,
  //   { onDelete: "SET NULL" }
  // )
  // @JoinColumn([
  //   { name: "trs_accident_activity_form_id", referencedColumnName: "id" },
  // ])
  // trs_accident_activity_form: trsAccidentActivityForm;
}
