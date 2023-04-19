import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { trsActivityType } from "./TrsActivityType.entity";
import { trsActivityStatus } from "./TrsActivityStatus.entity";
import { trsActivityConvoy } from "./TrsActivityConvoy.entity";
import { trsActivityFiles } from "./TrsActivityFiles.entity";
import { trsActivityRoute } from "./TrsActivityRoute.entity";
import { trsActivityUnitResponse } from "./TrsActivityUnitResponse.entity";
import { trsActivityVehicleDriver } from "./TrsActivityVehicleDriver.entity";
import { trsHelpChat } from "./TrsHelpChat.entity";
import { trsVehicle } from "./TrsVehicle.entity";

@Index("PK__trs_acti__3213E83FE09C4E05", ["id"], { unique: true })
@Entity("trs_activity", { schema: "dbo" })
export class trsActivity {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("bit", { name: "is_delete", nullable: true, default: () => "'0'" })
  is_delete: boolean | null;

  @Column("nvarchar", { name: "name", nullable: true })
  name: string | null;

  @Column("nvarchar", { name: "detail", nullable: true })
  detail: string | null;

  @Column("nvarchar", { name: "unit_request_code", nullable: true })
  unit_request_code: string | null;

  @Column("nvarchar", { name: "unit_response_code", nullable: true })
  unit_response_code: string | null;

  @Column("int", { name: "round", nullable: true })
  round: number | null;

  @Column("datetime2", { name: "req_create_date", nullable: true })
  req_create_date: Date | null;

  @Column("nvarchar", { name: "req_create_by", nullable: true })
  req_create_by: string | null;

  @Column("nvarchar", { name: "req_create_by_name", nullable: true })
  req_create_by_name: string | null;

  @Column("datetime2", { name: "req_update_date", nullable: true })
  req_update_date: Date | null;

  @Column("nvarchar", { name: "req_update_by", nullable: true })
  req_update_by: string | null;

  @Column("nvarchar", { name: "req_update_by_name", nullable: true })
  req_update_by_name: string | null;

  @Column("datetime2", { name: "req_review_date", nullable: true })
  req_review_date: Date | null;

  @Column("nvarchar", { name: "req_review_by", nullable: true })
  req_review_by: string | null;

  @Column("nvarchar", { name: "req_review_by_name", nullable: true })
  req_review_by_name: string | null;

  @Column("datetime2", { name: "req_approve_date", nullable: true })
  req_approve_date: Date | null;

  @Column("nvarchar", { name: "req_approve_by", nullable: true })
  req_approve_by: string | null;

  @Column("nvarchar", { name: "req_approve_by_name", nullable: true })
  req_approve_by_name: string | null;

  @Column("datetime2", { name: "resp_update_date", nullable: true })
  resp_update_date: Date | null;

  @Column("nvarchar", { name: "resp_update_by", nullable: true })
  resp_update_by: string | null;

  @Column("nvarchar", { name: "resp_update_by_name", nullable: true })
  resp_update_by_name: string | null;

  @Column("datetime2", { name: "resp_review_date", nullable: true })
  resp_review_date: Date | null;

  @Column("nvarchar", { name: "resp_review_by", nullable: true })
  resp_review_by: string | null;

  @Column("nvarchar", { name: "resp_review_by_name", nullable: true })
  resp_review_by_name: string | null;

  @Column("datetime2", { name: "resp_approve_date", nullable: true })
  resp_approve_date: Date | null;

  @Column("nvarchar", { name: "resp_approve_by", nullable: true })
  resp_approve_by: string | null;

  @Column("nvarchar", { name: "resp_approve_by_name", nullable: true })
  resp_approve_by_name: string | null;

  @Column("datetime2", { name: "sendback_date", nullable: true })
  sendback_date: Date | null;

  @Column("nvarchar", { name: "sendback_by", nullable: true })
  sendback_by: string | null;

  @Column("nvarchar", { name: "sendback_by_name", nullable: true })
  sendback_by_name: string | null;

  @Column("nvarchar", { name: "sendback_comment", nullable: true })
  sendback_comment: string | null;

  @Column("datetime2", { name: "delete_date", nullable: true })
  delete_date: Date | null;

  @Column("nvarchar", { name: "delete_by", nullable: true })
  delete_by: string | null;

  @Column("nvarchar", { name: "delete_by_name", nullable: true })
  delete_by_name: string | null;

  @Column("datetime2", { name: "start_date", nullable: true })
  start_date: Date | null;

  @Column("datetime2", { name: "finish_date", nullable: true })
  finish_date: Date | null;

  @Column("bit", { name: "is_back", nullable: true })
  is_back: boolean | null;

  @Column("nvarchar", { name: "comment", nullable: true })
  comment: string | null;

  @Column("nvarchar", { name: "action_type", nullable: true, length: 255 })
  action_type: string | null;

  @Column("bit", { name: "is_test", nullable: true, default: () => "'0'" })
  is_test: boolean | null;

  @Column("datetime2", { name: "activity_start_date", nullable: true })
  activity_start_date: Date | null;

  @Column("datetime2", { name: "activity_end_date", nullable: true })
  activity_end_date: Date | null;

  @Column("bit", { name: "cmd_focus", nullable: true, default: () => "'0'" })
  cmd_focus: boolean | null;

  @Column("int", { name: "priority", nullable: true, default: () => "'1'" })
  priority: number | null;

  @Column("nvarchar", { name: "req_type", nullable: true, length: 255 })
  req_type: string | null;

  @Column("nvarchar", { name: "gov_order", nullable: true, length: 100 })
  gov_order: string | null;

  @Column("nvarchar", { name: "p_name", nullable: true, length: 400 })
  p_name: string | null;

  @Column("int", { name: "staff_carry", nullable: true })
  staff_carry: number | null;

  @Column("nvarchar", { name: "thing_carry", nullable: true, length: 500 })
  thing_carry: string | null;

  @Column("int", { name: "total_carry", nullable: true })
  total_carry: number | null;

  @Column("float", { name: "weight", nullable: true, precision: 53 })
  weight: number | null;

  @Column("nvarchar", { name: "driver_rep_to", nullable: true, length: 500 })
  driver_rep_to: string | null;

  @Column("nvarchar", { name: "purpose", nullable: true, length: 3000 })
  purpose: string | null;

  @Column("nvarchar", { name: "note", nullable: true, length: 3000 })
  note: string | null;

  @Column("nvarchar", { name: "p_unit", nullable: true, length: 255 })
  p_unit: string | null;

  @Column("nvarchar", { name: "p_pos", nullable: true, length: 300 })
  p_pos: string | null;

  @Column("nvarchar", { name: "unit_no", nullable: true, length: 255 })
  unit_no: string | null;

  @ManyToOne(
    () => trsActivityType,
    (trs_activity_type) => trs_activity_type.trs_activities,
    { onDelete: "SET NULL" }
  )
  @JoinColumn([{ name: "activity_type", referencedColumnName: "id" }])
  activity_type: trsActivityType;

  @ManyToOne(
    () => trsActivityStatus,
    (trs_activity_status) => trs_activity_status.trs_activities,
    { onDelete: "SET NULL" }
  )
  @JoinColumn([{ name: "activity_status", referencedColumnName: "id" }])
  activity_status: trsActivityStatus;

  @OneToMany(
    () => trsActivityConvoy,
    (trs_activity_convoy) => trs_activity_convoy.activity
  )
  trs_activity_convoys: trsActivityConvoy[];

  @OneToMany(
    () => trsActivityFiles,
    (trs_activity_files) => trs_activity_files.activity
  )
  trs_activity_files: trsActivityFiles[];

  @OneToMany(
    () => trsActivityRoute,
    (trs_activity_route) => trs_activity_route.activity
  )
  trs_activity_routes: trsActivityRoute[];

  @OneToMany(
    () => trsActivityUnitResponse,
    (trs_activity_unit_response) => trs_activity_unit_response.activity
  )
  trs_activity_unit_responses: trsActivityUnitResponse[];

  @OneToMany(
    () => trsActivityVehicleDriver,
    (trs_activity_vehicle_driver) => trs_activity_vehicle_driver.activity
  )
  trs_activity_vehicle_drivers: trsActivityVehicleDriver[];

  @OneToMany(() => trsHelpChat, (trs_help_chat) => trs_help_chat.activity)
  trs_help_chats: trsHelpChat[];

  @OneToMany(() => trsVehicle, (trs_vehicle) => trs_vehicle.activity)
  trs_vehicles: trsVehicle[];
}
