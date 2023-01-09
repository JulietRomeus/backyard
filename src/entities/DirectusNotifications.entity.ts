import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from "typeorm";
import { directusUsers } from "./DirectusUsers.entity";

@Index("PK__directus__3213E83F4CD1D11A", ["id"], { unique: true })
@Entity("directus_notifications", { schema: "dbo" })
export class directusNotifications {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("datetime2", {
    name: "timestamp",
    nullable: true,
    default: () => "getdate()",
  })
  timestamp: Date | null;

  @Column("nvarchar", {
    name: "status",
    nullable: true,
    length: 255,
    default: () => "'inbox'",
  })
  status: string | null;

  @Column("nvarchar", { name: "subject", length: 255 })
  subject: string;

  @Column("nvarchar", { name: "message", nullable: true })
  message: string | null;

  @Column("nvarchar", { name: "collection", nullable: true, length: 64 })
  collection: string | null;

  @Column("nvarchar", { name: "item", nullable: true, length: 255 })
  item: string | null;

  @ManyToOne(
    () => directusUsers,
    (directus_users) => directus_users.directus_notifications,
    { onDelete: "CASCADE" }
  )
  @JoinColumn([{ name: "recipient", referencedColumnName: "id" }])
  recipient: directusUsers;

  @ManyToOne(
    () => directusUsers,
    (directus_users) => directus_users.directus_notifications2
  )
  @JoinColumn([{ name: "sender", referencedColumnName: "id" }])
  sender: directusUsers;

  @RelationId(
    (directus_notifications: directusNotifications) =>
      directus_notifications.recipient
  )
  recipient2: string;

  @RelationId(
    (directus_notifications: directusNotifications) =>
      directus_notifications.sender
  )
  sender2: string | null;
}
