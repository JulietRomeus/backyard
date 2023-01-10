import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  RelationId,
} from "typeorm";
import { directusUsers } from "./DirectusUsers.entity";
import { directusPanels } from "./DirectusPanels.entity";

@Index("directus_dashboards_pkey", ["id"], { unique: true })
@Entity("directus_dashboards", { schema: "dbo" })
export class directusDashboards {
  @Column("uniqueidentifier", { primary: true, name: "id" })
  id: string;

  @Column("nvarchar", { name: "name", length: 255 })
  name: string;

  @Column("nvarchar", {
    name: "icon",
    length: 30,
    default: () => "'dashboard'",
  })
  icon: string;

  @Column("nvarchar", { name: "note", nullable: true })
  note: string | null;

  @Column("datetime2", {
    name: "date_created",
    nullable: true,
    default: () => "getdate()",
  })
  date_created: Date | null;

  @Column("nvarchar", { name: "color", nullable: true, length: 255 })
  color: string | null;

  @ManyToOne(
    () => directusUsers,
    (directus_users) => directus_users.directus_dashboards,
    { onDelete: "SET NULL" }
  )
  @JoinColumn([{ name: "user_created", referencedColumnName: "id" }])
  user_created: directusUsers;

  @OneToMany(
    () => directusPanels,
    (directus_panels) => directus_panels.dashboard
  )
  directus_panels: directusPanels[];

  @RelationId(
    (directus_dashboards: directusDashboards) =>
      directus_dashboards.user_created
  )
  user_created2: string | null;
}
