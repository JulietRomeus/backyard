import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK__directus__3213E83F6D5404F3", ["id"], { unique: true })
@Entity("directus_relations", { schema: "dbo" })
export class directusRelations {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("nvarchar", { name: "many_collection", length: 64 })
  many_collection: string;

  @Column("nvarchar", { name: "many_field", length: 64 })
  many_field: string;

  @Column("nvarchar", { name: "one_collection", nullable: true, length: 64 })
  one_collection: string | null;

  @Column("nvarchar", { name: "one_field", nullable: true, length: 64 })
  one_field: string | null;

  @Column("nvarchar", {
    name: "one_collection_field",
    nullable: true,
    length: 64,
  })
  one_collection_field: string | null;

  @Column("nvarchar", { name: "one_allowed_collections", nullable: true })
  one_allowed_collections: string | null;

  @Column("nvarchar", { name: "junction_field", nullable: true, length: 64 })
  junction_field: string | null;

  @Column("nvarchar", { name: "sort_field", nullable: true, length: 64 })
  sort_field: string | null;

  @Column("nvarchar", {
    name: "one_deselect_action",
    length: 255,
    default: () => "'nullify'",
  })
  one_deselect_action: string;
}
