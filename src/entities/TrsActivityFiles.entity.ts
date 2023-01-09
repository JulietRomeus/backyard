import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
} from "typeorm";
import { trsActivity } from "./TrsActivity.entity";
import { trsActivityFilesFiles } from "./TrsActivityFilesFiles.entity";

@Index("PK__trs_acti__3213E83FBD3BDC10", ["id"], { unique: true })
@Entity("trs_activity_files", { schema: "dbo" })
export class trsActivityFiles {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("nvarchar", { name: "name", nullable: true })
  name: string | null;

  @Column("datetime2", { name: "create_date", nullable: true })
  create_date: Date | null;

  @Column("nvarchar", { name: "create_by", nullable: true, length: 255 })
  create_by: string | null;

  @Column("nvarchar", { name: "create_by_name", nullable: true, length: 255 })
  create_by_name: string | null;

  @Column("int", { name: "order", nullable: true })
  order: number | null;

  @ManyToOne(
    () => trsActivity,
    (trs_activity) => trs_activity.files,
    { onDelete: "SET NULL" }
  )
  @JoinColumn([{ name: "activity", referencedColumnName: "id" }])
  activity: trsActivity;

  @OneToMany(
    () => trsActivityFilesFiles,
    (trs_activity_files_files) => trs_activity_files_files.trs_activity_files
  )
  trs_activity_files_files: trsActivityFilesFiles[];

  @RelationId(
    (trs_activity_files: trsActivityFiles) => trs_activity_files.activity
  )
  activity2: number | null;
}
