import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { trsActivityHelp } from "./TrsActivityHelp.entity";
import { trsActivityStopover } from "./TrsActivityStopover.entity";
import { trsDriver } from "./TrsDriver.entity";
import { trsVehicle } from "./TrsVehicle.entity";
import { trsActivityConvoy } from "./TrsActivityConvoy.entity";
// import { slcSupplySpecOilType } from "./SlcSupplySpecOilType.entity";
import { trsActivity } from "./TrsActivity.entity";
import { slcSupplyItem } from "./SlcSupplyItem.entity";
import { trsAccidentActivityForm } from "./TrsAccidentActivityForm.entity";
import { trsWhileActivityForm } from "./TrsWhileActivityForm.entity";
import { trsAfterActivityForm } from "./TrsAfterActivityForm.entity";
import { trsBeforeActivityForm } from "./TrsBeforeActivityForm.entity";

@Index("PK__trs_acti__3213E83F631C2C19", ["id"], { unique: true })
@Entity("trs_activity_vehicle_driver", { schema: "dbo" })
export class trsActivityVehicleDriver {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "sort", nullable: true })
  sort: number | null;

  @Column("nvarchar", { name: "controller", nullable: true, length: 255 })
  controller: string | null;

  @Column("nvarchar", { name: "unit_code", nullable: true, length: 255 })
  unit_code: string | null;

  @Column("nvarchar", { name: "unit_name", nullable: true, length: 255 })
  unit_name: string | null;

  @Column("nvarchar", {
    name: "vehicle_supply_id",
    nullable: true,
    length: 255,
  })
  vehicle_supply_id: string | null;

  @Column("nvarchar", { name: "vehicle_license", nullable: true, length: 255 })
  vehicle_license: string | null;

  @Column("int", { name: "oil_coupon", nullable: true })
  oil_coupon: number | null;

  @Column("float", { name: "lat", nullable: true, precision: 53 })
  lat: number | null;

  @Column("float", { name: "long", nullable: true, precision: 53 })
  long: number | null;

  @Column("bit", { name: "is_online", nullable: true, default: () => "'0'" })
  is_online: boolean | null;

  @Column("nvarchar", { name: "client_id", nullable: true, length: 255 })
  client_id: string | null;

  @Column("datetime2", { name: "last_location_date", nullable: true })
  last_location_date: Date | null;

  @OneToMany(
    () => trsActivityHelp,
    (trs_activity_help) => trs_activity_help.mission_form
  )
  trs_activity_helps: trsActivityHelp[];

  // @OneToMany(
  //   () => trsActivityStopover,
  //   (trs_activity_stopover) => trs_activity_stopover.mission_form
  // )
  // trs_activity_stopovers: trsActivityStopover[];

  @ManyToOne(
    () => trsDriver,
    (trs_driver) => trs_driver.trs_activity_vehicle_drivers,
    { onDelete: "SET NULL" }
  )
  @JoinColumn([{ name: "driver", referencedColumnName: "id" }])
  driver: trsDriver;

  @ManyToOne(
    () => trsVehicle,
    (trs_vehicle) => trs_vehicle.trs_activity_vehicle_drivers,
    { onDelete: "SET NULL" }
  )
  @JoinColumn([{ name: "vehicle", referencedColumnName: "id" }])
  vehicle: trsVehicle;

  @ManyToOne(
    () => trsActivityConvoy,
    (trs_activity_convoy) => trs_activity_convoy.vehicle_driver,
    { onDelete: "SET NULL" }
  )
  @JoinColumn([{ name: "convoy", referencedColumnName: "id" }])
  convoy: trsActivityConvoy;

  // @ManyToOne(
  //   () => slcSupplySpecOilType,
  //   (slc_supply_spec_oil_type) =>
  //     slc_supply_spec_oil_type.trs_activity_vehicle_drivers,
  //   { onDelete: "SET NULL" }
  // )
  // @JoinColumn([{ name: "oil_type", referencedColumnName: "id" }])
  // oil_type: slcSupplySpecOilType;

  @ManyToOne(
    () => trsActivity,
    (trs_activity) => trs_activity.trs_activity_vehicle_drivers,
    { onDelete: "SET NULL" }
  )
  @JoinColumn([{ name: "activity", referencedColumnName: "id" }])
  activity: trsActivity;

  @ManyToOne(
    () => slcSupplyItem,
    (slc_supply_item) => slc_supply_item.trs_activity_vehicle_drivers,
    { onDelete: "SET NULL" }
  )
  @JoinColumn([{ name: "vehicle_item_id", referencedColumnName: "id" }])
  vehicle_item: slcSupplyItem;

  @ManyToOne(
    () => trsAccidentActivityForm,
    (trs_accident_activity_form) =>
      trs_accident_activity_form.trs_activity_vehicle_drivers,
    { onDelete: "SET NULL" }
  )
  @JoinColumn([{ name: "accident_activity_form", referencedColumnName: "id" }])
  accident_activity_form: trsAccidentActivityForm;

  @ManyToOne(
    () => trsWhileActivityForm,
    (trs_while_activity_form) =>
      trs_while_activity_form.trs_activity_vehicle_drivers,
    { onDelete: "SET NULL" }
  )
  @JoinColumn([{ name: "while_activity_form", referencedColumnName: "id" }])
  while_activity_form: trsWhileActivityForm;

  @ManyToOne(
    () => trsAfterActivityForm,
    (trs_after_activity_form) =>
      trs_after_activity_form.trs_activity_vehicle_drivers,
    { onDelete: "SET NULL" }
  )
  @JoinColumn([{ name: "after_activity_form", referencedColumnName: "id" }])
  after_activity_form: trsAfterActivityForm;

  @ManyToOne(
    () => trsBeforeActivityForm,
    (trs_before_activity_form) =>
      trs_before_activity_form.trs_activity_vehicle_drivers,
    { onDelete: "SET NULL" }
  )
  @JoinColumn([{ name: "before_activity_form", referencedColumnName: "id" }])
  before_activity_form: trsBeforeActivityForm;
}
