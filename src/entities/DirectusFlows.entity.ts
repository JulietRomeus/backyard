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
import { directusOperations } from "./DirectusOperations.entity";

@Index("directus_flows_operation_unique", ["operation"], { unique: true })
@Index("directus_flows_pkey", ["id"], { unique: true })
@Entity("directus_flows", { schema: "dbo" })
export class directusFlows {
  @Column("uniqueidentifier", { primary: true, name: "id" })
  id: string;

  @Column("nvarchar", { name: "name", length: 255 })
  name: string;

  @Column("nvarchar", { name: "icon", nullable: true, length: 30 })
  icon: string | null;

  @Column("nvarchar", { name: "color", nullable: true, length: 255 })
  color: string | null;

  @Column("nvarchar", { name: "description", nullable: true })
  description: string | null;

  @Column("nvarchar", {
    name: "status",
    length: 255,
    default: () => "'active'",
  })
  status: string;

  @Column("nvarchar", { name: "trigger", nullable: true, length: 255 })
  trigger: string | null;

  @Column("nvarchar", {
    name: "accountability",
    nullable: true,
    length: 255,
    default: () => "'all'",
  })
  accountability: string | null;

  @Column("nvarchar", { name: "options", nullable: true })
  options: string | null;

  @Column("uniqueidentifier", { name: "operation", nullable: true })
  operation: string | null;

  @Column("datetime2", {
    name: "date_created",
    nullable: true,
    default: () => "getdate()",
  })
  date_created: Date | null;

  @ManyToOne(
    () => directusUsers,
    (directus_users) => directus_users.directus_flows,
    { onDelete: "SET NULL" }
  )
  @JoinColumn([{ name: "user_created", referencedColumnName: "id" }])
  user_created: directusUsers;

  @OneToMany(
    () => directusOperations,
    (directus_operations) => directus_operations.flow
  )
  directus_operations: directusOperations[];

  @RelationId((directus_flows: directusFlows) => directus_flows.user_created)
  user_created2: string | null;
}
