import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  RelationId,
} from "typeorm";
import { directusShares } from "./DirectusShares.entity";

@Index("directus_collections_pkey", ["collection"], { unique: true })
@Entity("directus_collections", { schema: "dbo" })
export class directusCollections {
  @Column("nvarchar", { primary: true, name: "collection", length: 64 })
  collection: string;

  @Column("nvarchar", { name: "icon", nullable: true, length: 30 })
  icon: string | null;

  @Column("nvarchar", { name: "note", nullable: true })
  note: string | null;

  @Column("nvarchar", { name: "display_template", nullable: true, length: 255 })
  display_template: string | null;

  @Column("bit", { name: "hidden", default: () => "'0'" })
  hidden: boolean;

  @Column("bit", { name: "singleton", default: () => "'0'" })
  singleton: boolean;

  @Column("nvarchar", { name: "translations", nullable: true })
  translations: string | null;

  @Column("nvarchar", { name: "archive_field", nullable: true, length: 64 })
  archive_field: string | null;

  @Column("bit", { name: "archive_app_filter", default: () => "'1'" })
  archive_app_filter: boolean;

  @Column("nvarchar", { name: "archive_value", nullable: true, length: 255 })
  archive_value: string | null;

  @Column("nvarchar", { name: "unarchive_value", nullable: true, length: 255 })
  unarchive_value: string | null;

  @Column("nvarchar", { name: "sort_field", nullable: true, length: 64 })
  sort_field: string | null;

  @Column("nvarchar", {
    name: "accountability",
    nullable: true,
    length: 255,
    default: () => "'all'",
  })
  accountability: string | null;

  @Column("nvarchar", { name: "color", nullable: true, length: 255 })
  color: string | null;

  @Column("nvarchar", { name: "item_duplication_fields", nullable: true })
  item_duplication_fields: string | null;

  @Column("int", { name: "sort", nullable: true })
  sort: number | null;

  @Column("nvarchar", {
    name: "collapse",
    length: 255,
    default: () => "'open'",
  })
  collapse: string;

  @ManyToOne(
    () => directusCollections,
    (directus_collections) => directus_collections.directus_collections
  )
  @JoinColumn([{ name: "group", referencedColumnName: "collection" }])
  group: directusCollections;

  @OneToMany(
    () => directusCollections,
    (directus_collections) => directus_collections.group
  )
  directus_collections: directusCollections[];

  @OneToMany(
    () => directusShares,
    (directus_shares) => directus_shares.collection
  )
  directus_shares: directusShares[];

  @RelationId(
    (directus_collections: directusCollections) => directus_collections.group
  )
  group2: string | null;
}
