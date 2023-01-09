import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
  RelationId,
} from "typeorm";
import { directusFlows } from "./DirectusFlows.entity";
import { directusUsers } from "./DirectusUsers.entity";

@Index("directus_operations_pkey", ["id"], { unique: true })
@Index("directus_operations_reject_unique", ["reject"], { unique: true })
@Index("directus_operations_resolve_unique", ["resolve"], { unique: true })
@Entity("directus_operations", { schema: "dbo" })
export class directusOperations {
  @Column("uniqueidentifier", { primary: true, name: "id" })
  id: string;

  @Column("nvarchar", { name: "name", nullable: true, length: 255 })
  name: string | null;

  @Column("nvarchar", { name: "key", length: 255 })
  key: string;

  @Column("nvarchar", { name: "type", length: 255 })
  type: string;

  @Column("int", { name: "position_x" })
  position_x: number;

  @Column("int", { name: "position_y" })
  position_y: number;

  @Column("nvarchar", { name: "options", nullable: true })
  options: string | null;

  @Column("uniqueidentifier", { name: "resolve", nullable: true })
  resolve: string | null;

  @Column("uniqueidentifier", { name: "reject", nullable: true })
  reject: string | null;

  @Column("datetime2", {
    name: "date_created",
    nullable: true,
    default: () => "getdate()",
  })
  date_created: Date | null;

  @OneToOne(
    () => directusOperations,
    (directus_operations) => directus_operations.directus_operations
  )
  @JoinColumn([{ name: "resolve", referencedColumnName: "id" }])
  resolve2: directusOperations;

  @OneToOne(
    () => directusOperations,
    (directus_operations) => directus_operations.resolve2
  )
  directus_operations: directusOperations;

  @OneToOne(
    () => directusOperations,
    (directus_operations) => directus_operations.directus_operations2
  )
  @JoinColumn([{ name: "reject", referencedColumnName: "id" }])
  reject2: directusOperations;

  @OneToOne(
    () => directusOperations,
    (directus_operations) => directus_operations.reject2
  )
  directus_operations2: directusOperations;

  @ManyToOne(
    () => directusFlows,
    (directus_flows) => directus_flows.directus_operations,
    { onDelete: "CASCADE" }
  )
  @JoinColumn([{ name: "flow", referencedColumnName: "id" }])
  flow: directusFlows;

  @ManyToOne(
    () => directusUsers,
    (directus_users) => directus_users.directus_operations,
    { onDelete: "SET NULL" }
  )
  @JoinColumn([{ name: "user_created", referencedColumnName: "id" }])
  user_created: directusUsers;

  @RelationId(
    (directus_operations: directusOperations) => directus_operations.resolve2
  )
  resolve3: string | null;

  @RelationId(
    (directus_operations: directusOperations) => directus_operations.reject2
  )
  reject3: string | null;

  @RelationId(
    (directus_operations: directusOperations) => directus_operations.flow
  )
  flow2: string;

  @RelationId(
    (directus_operations: directusOperations) =>
      directus_operations.user_created
  )
  user_created2: string | null;
}
