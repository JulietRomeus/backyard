import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { trsActivity } from "./TrsActivity.entity";
import { trsActivityRoute } from "./TrsActivityRoute.entity";
import { trsActivityVehicleDriver } from "./TrsActivityVehicleDriver.entity";

@Index("PK__trs_acti__3213E83F0D6DA0CD", ["id"], { unique: true })
@Entity("trs_activity_convoy", { schema: "dbo" })
export class trsActivityConvoy {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "order", nullable: true })
  order: number | null;

  @Column("nvarchar", { name: "name", nullable: true, length: 255 })
  name: string | null;

  @Column("nvarchar", { name: "controller", nullable: true, length: 255 })
  controller: string | null;

  @Column("nvarchar", { name: "color", nullable: true, length: 255 })
  color: string | null;

  @Column("nvarchar", { name: "detail", nullable: true })
  detail: string | null;

  @ManyToOne(
    () => trsActivity,
    (trs_activity) => trs_activity.trs_activity_convoys,
    { onDelete: "SET NULL" }
  )
  @JoinColumn([{ name: "activity", referencedColumnName: "id" }])
  activity: trsActivity;

  @OneToMany(
    () => trsActivityRoute,
    (trs_activity_route) => trs_activity_route.convoy
  )
  trs_activity_routes: trsActivityRoute[];

  @OneToMany(
    () => trsActivityVehicleDriver,
    (trs_activity_vehicle_driver) => trs_activity_vehicle_driver.convoy
  )
  trs_activity_vehicle_drivers: trsActivityVehicleDriver[];
}
