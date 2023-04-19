import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { trsAccidentActivityForm } from "./TrsAccidentActivityForm.entity";

@Index("PK__trs_acci__3213E83FA60A42DE", ["id"], { unique: true })
@Entity("trs_accident_person_other", { schema: "dbo" })
export class trsAccidentPersonOther {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("nvarchar", { name: "firstname", nullable: true, length: 255 })
  firstname: string | null;

  @Column("nvarchar", { name: "lastname", nullable: true, length: 255 })
  lastname: string | null;

  @Column("int", { name: "tel", nullable: true })
  tel: number | null;

  @Column("nvarchar", { name: "address", nullable: true, length: 255 })
  address: string | null;

  @Column("nvarchar", { name: "detail", nullable: true })
  detail: string | null;

  // @ManyToOne(
  //   () => trsAccidentActivityForm,
  //   (trs_accident_activity_form) =>
  //     trs_accident_activity_form.trs_accident_person_others,
  //   { onDelete: "SET NULL" }
  // )
  // @JoinColumn([{ name: "accident_form", referencedColumnName: "id" }])
  // accident_form: trsAccidentActivityForm;
}
