import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  RelationId,
} from "typeorm";
import { directusDashboards } from "./DirectusDashboards.entity";
import { directusUsers } from "./DirectusUsers.entity";

@Index("directus_panels_pkey", ["id"], { unique: true })
@Entity("directus_panels", { schema: "dbo" })
export class directusPanels {
  @Column("uniqueidentifier", { primary: true, name: "id" })
  id: string;

  @Column("nvarchar", { name: "name", nullable: true, length: 255 })
  name: string | null;

  @Column("nvarchar", {
    name: "icon",
    nullable: true,
    length: 30,
    default: () => "NULL",
  })
  icon: string | null;

  @Column("nvarchar", { name: "color", nullable: true, length: 10 })
  color: string | null;

  @Column("bit", { name: "show_header", default: () => "'0'" })
  show_header: boolean;

  @Column("nvarchar", { name: "note", nullable: true })
  note: string | null;

  @Column("nvarchar", { name: "type", length: 255 })
  type: string;

  @Column("int", { name: "position_x" })
  position_x: number;

  @Column("int", { name: "position_y" })
  position_y: number;

  @Column("int", { name: "width" })
  width: number;

  @Column("int", { name: "height" })
  height: number;

  @Column("nvarchar", { name: "options", nullable: true })
  options: string | null;

  @Column("datetime2", {
    name: "date_created",
    nullable: true,
    default: () => "getdate()",
  })
  date_created: Date | null;

  @ManyToOne(
    () => directusDashboards,
    (directus_dashboards) => directus_dashboards.directus_panels,
    { onDelete: "CASCADE" }
  )
  @JoinColumn([{ name: "dashboard", referencedColumnName: "id" }])
  dashboard: directusDashboards;

  @ManyToOne(
    () => directusUsers,
    (directus_users) => directus_users.directus_panels,
    { onDelete: "SET NULL" }
  )
  @JoinColumn([{ name: "user_created", referencedColumnName: "id" }])
  user_created: directusUsers;

  @RelationId((directus_panels: directusPanels) => directus_panels.dashboard)
  dashboard2: string;

  @RelationId((directus_panels: directusPanels) => directus_panels.user_created)
  user_created2: string | null;
}
