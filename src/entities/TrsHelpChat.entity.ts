import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from "typeorm";
import { trsActivity } from "./TrsActivity.entity";

@Index("PK__trs_help__3213E83F5CBEF5B1", ["id"], { unique: true })
@Entity("trs_help_chat", { schema: "dbo" })
export class trsHelpChat {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("nvarchar", { name: "chat_id", nullable: true })
  chat_id: string | null;

  @Column("nvarchar", { name: "message", nullable: true })
  message: string | null;

  @Column("datetime2", { name: "create_date", nullable: true })
  create_date: Date | null;

  @Column("nvarchar", { name: "create_by", nullable: true })
  create_by: string | null;

  @Column("nvarchar", { name: "create_by_name", nullable: true })
  create_by_name: string | null;

  @ManyToOne(() => trsActivity, (trs_activity) => trs_activity.trs_help_chats)
  @JoinColumn([{ name: "activity", referencedColumnName: "id" }])
  activity: trsActivity;

  @RelationId((trs_help_chat: trsHelpChat) => trs_help_chat.activity)
  activity2: number | null;
}
