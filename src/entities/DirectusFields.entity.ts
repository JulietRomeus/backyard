import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK__directus__3213E83F220FD8E9", ["id"], { unique: true })
@Entity("directus_fields", { schema: "dbo" })
export class directusFields {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("nvarchar", { name: "collection", length: 64 })
  collection: string;

  @Column("nvarchar", { name: "field", length: 64 })
  field: string;

  @Column("nvarchar", { name: "special", nullable: true, length: 64 })
  special: string | null;

  @Column("nvarchar", { name: "interface", nullable: true, length: 64 })
  interface: string | null;

  @Column("nvarchar", { name: "options", nullable: true })
  options: string | null;

  @Column("nvarchar", { name: "display", nullable: true, length: 64 })
  display: string | null;

  @Column("nvarchar", { name: "display_options", nullable: true })
  display_options: string | null;

  @Column("bit", { name: "readonly", default: () => "'0'" })
  readonly: boolean;

  @Column("bit", { name: "hidden", default: () => "'0'" })
  hidden: boolean;

  @Column("int", { name: "sort", nullable: true })
  sort: number | null;

  @Column("nvarchar", {
    name: "width",
    nullable: true,
    length: 30,
    default: () => "'full'",
  })
  width: string | null;

  @Column("nvarchar", { name: "translations", nullable: true })
  translations: string | null;

  @Column("nvarchar", { name: "note", nullable: true })
  note: string | null;

  @Column("nvarchar", { name: "conditions", nullable: true })
  conditions: string | null;

  @Column("bit", { name: "required", nullable: true, default: () => "'0'" })
  required: boolean | null;

  @Column("nvarchar", { name: "group", nullable: true, length: 64 })
  group: string | null;

  @Column("nvarchar", { name: "validation", nullable: true })
  validation: string | null;

  @Column("nvarchar", { name: "validation_message", nullable: true })
  validation_message: string | null;
}
