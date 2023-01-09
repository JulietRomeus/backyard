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
import { directusActivity } from "./DirectusActivity.entity";

@Index("PK__directus__3213E83FF37089BD", ["id"], { unique: true })
@Entity("directus_revisions", { schema: "dbo" })
export class directusRevisions {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("nvarchar", { name: "collection", length: 64 })
  collection: string;

  @Column("nvarchar", { name: "item", length: 255 })
  item: string;

  @Column("nvarchar", { name: "data", nullable: true })
  data: string | null;

  @Column("nvarchar", { name: "delta", nullable: true })
  delta: string | null;

  @ManyToOne(
    () => directusActivity,
    (directus_activity) => directus_activity.directus_revisions,
    { onDelete: "CASCADE" }
  )
  @JoinColumn([{ name: "activity", referencedColumnName: "id" }])
  activity: directusActivity;

  @ManyToOne(
    () => directusRevisions,
    (directus_revisions) => directus_revisions.directus_revisions
  )
  @JoinColumn([{ name: "parent", referencedColumnName: "id" }])
  parent: directusRevisions;

  @OneToMany(
    () => directusRevisions,
    (directus_revisions) => directus_revisions.parent
  )
  directus_revisions: directusRevisions[];

  @RelationId(
    (directus_revisions: directusRevisions) => directus_revisions.activity
  )
  activity2: number;

  @RelationId(
    (directus_revisions: directusRevisions) => directus_revisions.parent
  )
  parent2: number | null;
}
