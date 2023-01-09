import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  RelationId,
} from "typeorm";
import { directusUsers } from "./DirectusUsers.entity";
import { directusShares } from "./DirectusShares.entity";

@Index("directus_sessions_pkey", ["token"], { unique: true })
@Entity("directus_sessions", { schema: "dbo" })
export class directusSessions {
  @Column("nvarchar", { primary: true, name: "token", length: 64 })
  token: string;

  @Column("datetime2", { name: "expires" })
  expires: Date;

  @Column("nvarchar", { name: "ip", nullable: true, length: 255 })
  ip: string | null;

  @Column("nvarchar", { name: "user_agent", nullable: true, length: 255 })
  user_agent: string | null;

  @Column("nvarchar", { name: "origin", nullable: true, length: 255 })
  origin: string | null;

  @ManyToOne(
    () => directusUsers,
    (directus_users) => directus_users.directus_sessions,
    { onDelete: "CASCADE" }
  )
  @JoinColumn([{ name: "user", referencedColumnName: "id" }])
  user: directusUsers;

  @ManyToOne(
    () => directusShares,
    (directus_shares) => directus_shares.directus_sessions,
    { onDelete: "CASCADE" }
  )
  @JoinColumn([{ name: "share", referencedColumnName: "id" }])
  share: directusShares;

  @RelationId((directus_sessions: directusSessions) => directus_sessions.user)
  user2: string | null;

  @RelationId((directus_sessions: directusSessions) => directus_sessions.share)
  share2: string | null;
}
