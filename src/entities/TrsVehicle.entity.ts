import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
} from "typeorm";
import { trsActivityVehicleDriver } from "./TrsActivityVehicleDriver.entity";
import { trsTypeTyre } from "./TrsTypeTyre.entity";
import { trsCountry } from "./TrsCountry.entity";
import { trsIntPiston } from "./TrsIntPiston.entity";
import { trsDriver } from "./TrsDriver.entity";
import { trsActivity } from "./TrsActivity.entity";
import { trsVehicleActiveStatus } from "./TrsVehicleActiveStatus.entity";
import { trsMethodUse } from "./TrsMethodUse.entity";
import { trsTypeWarehouse } from "./TrsTypeWarehouse.entity";
import { trsVehicleBrandModelVariant } from "./TrsVehicleBrandModelVariant.entity";
import { trsVehicleBrandModel } from "./TrsVehicleBrandModel.entity";
import { trsVehicleType } from "./TrsVehicleType.entity";
import { trsVehicleStatus } from "./TrsVehicleStatus.entity";
import { trsVehicleBrand } from "./TrsVehicleBrand.entity";

@Index("PK__trs_vehi__3213E83F6F83C31C", ["id"], { unique: true })
@Entity("trs_vehicle", { schema: "dbo" })
export class trsVehicle {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("nvarchar", { name: "vehicle_id", nullable: true })
  vehicle_id: string | null;

  @Column("nvarchar", { name: "license_plate", nullable: true })
  license_plate: string | null;

  @Column("nvarchar", { name: "millitary_license_int", nullable: true })
  millitary_license_int: string | null;

  @Column("nvarchar", { name: "old_user_unit", nullable: true })
  old_user_unit: string | null;

  @Column("nvarchar", { name: "main_user_unit", nullable: true })
  main_user_unit: string | null;

  @Column("nvarchar", { name: "sub_user_unit", nullable: true })
  sub_user_unit: string | null;

  @Column("int", { name: "horsepower", nullable: true })
  horsepower: number | null;

  @Column("nvarchar", { name: "engine_int", nullable: true })
  engine_int: string | null;

  @Column("nvarchar", { name: "chassis_int", nullable: true })
  chassis_int: string | null;

  @Column("nvarchar", { name: "power_battery", nullable: true })
  power_battery: string | null;

  @Column("nvarchar", { name: "wheel_base", nullable: true })
  wheel_base: string | null;

  @Column("nvarchar", { name: "front_tyre_size", nullable: true })
  front_tyre_size: string | null;

  @Column("nvarchar", { name: "rear_tyre_size", nullable: true })
  rear_tyre_size: string | null;

  @Column("nvarchar", { name: "width_length_body", nullable: true })
  width_length_body: string | null;

  @Column("nvarchar", { name: "cubic_centimetres", nullable: true })
  cubic_centimetres: string | null;

  @Column("nvarchar", { name: "cargo_capacity", nullable: true })
  cargo_capacity: string | null;

  @Column("int", { name: "type_fuel", nullable: true })
  type_fuel: number | null;

  @Column("nvarchar", { name: "vehicle_weight", nullable: true })
  vehicle_weight: string | null;

  @Column("nvarchar", { name: "type_fuel_consumption", nullable: true })
  type_fuel_consumption: string | null;

  @Column("nvarchar", { name: "fuel_consumption", nullable: true })
  fuel_consumption: string | null;

  @Column("int", { name: "year", nullable: true })
  year: number | null;

  @Column("nvarchar", { name: "transport_registration_date", nullable: true })
  transport_registration_date: string | null;

  @Column("nvarchar", { name: "millitary_registration_date", nullable: true })
  millitary_registration_date: string | null;

  @Column("nvarchar", { name: "tax_renewal_date", nullable: true })
  tax_renewal_date: string | null;

  @Column("nvarchar", { name: "type_tax", nullable: true })
  type_tax: string | null;

  @Column("nvarchar", { name: "budget_code", nullable: true })
  budget_code: string | null;

  @Column("nvarchar", { name: "price", nullable: true })
  price: string | null;

  @Column("nvarchar", { name: "examine_date", nullable: true })
  examine_date: string | null;

  @Column("nvarchar", { name: "buy_donate", nullable: true })
  buy_donate: string | null;

  @Column("nvarchar", { name: "note", nullable: true })
  note: string | null;

  @Column("int", { name: "trs_mil_vehicle_regis", nullable: true })
  trs_mil_vehicle_regis: number | null;

  @Column("bit", { name: "is_available", nullable: true, default: () => "'1'" })
  is_available: boolean | null;

  @Column("float", { name: "lat", nullable: true, precision: 53 })
  lat: number | null;

  @Column("float", { name: "long", nullable: true, precision: 53 })
  long: number | null;

  @Column("nvarchar", { name: "unit_code", nullable: true, length: 255 })
  unit_code: string | null;

  @Column("bit", { name: "is_delete", nullable: true, default: () => "'0'" })
  is_delete: boolean | null;

  @OneToMany(
    () => trsActivityVehicleDriver,
    (trs_activity_vehicle_driver) => trs_activity_vehicle_driver.vehicle
  )
  trs_activity_vehicle_drivers: trsActivityVehicleDriver[];

  @ManyToOne(() => trsTypeTyre, (trs_type_tyre) => trs_type_tyre.trs_vehicles)
  @JoinColumn([{ name: "type_tyre", referencedColumnName: "id" }])
  type_tyre: trsTypeTyre;

  @ManyToOne(() => trsCountry, (trs_country) => trs_country.trs_vehicles)
  @JoinColumn([{ name: "country", referencedColumnName: "id" }])
  country: trsCountry;

  @ManyToOne(
    () => trsIntPiston,
    (trs_int_piston) => trs_int_piston.trs_vehicles
  )
  @JoinColumn([{ name: "int_piston", referencedColumnName: "id" }])
  int_piston: trsIntPiston;

  @ManyToOne(() => trsDriver, (trs_driver) => trs_driver.trs_vehicles, {
    onDelete: "SET NULL",
  })
  @JoinColumn([{ name: "main_driver", referencedColumnName: "id" }])
  main_driver: trsDriver;

  @ManyToOne(() => trsActivity, (trs_activity) => trs_activity.trs_vehicles, {
    onDelete: "SET NULL",
  })
  @JoinColumn([{ name: "activity", referencedColumnName: "id" }])
  activity: trsActivity;

  @ManyToOne(
    () => trsVehicleActiveStatus,
    (trs_vehicle_active_status) => trs_vehicle_active_status.trs_vehicles
  )
  @JoinColumn([{ name: "vehicle_active_status", referencedColumnName: "id" }])
  vehicle_active_status: trsVehicleActiveStatus;

  @ManyToOne(
    () => trsMethodUse,
    (trs_method_use) => trs_method_use.trs_vehicles
  )
  @JoinColumn([{ name: "method_use", referencedColumnName: "id" }])
  method_use: trsMethodUse;

  @ManyToOne(
    () => trsTypeWarehouse,
    (trs_type_warehouse) => trs_type_warehouse.trs_vehicles
  )
  @JoinColumn([{ name: "type_warehouse", referencedColumnName: "id" }])
  type_warehouse: trsTypeWarehouse;

  @ManyToOne(
    () => trsVehicleBrandModelVariant,
    (trs_vehicle_brand_model_variant) =>
      trs_vehicle_brand_model_variant.trs_vehicles
  )
  @JoinColumn([
    { name: "vehicle_brand_model_variant", referencedColumnName: "id" },
  ])
  vehicle_brand_model_variant: trsVehicleBrandModelVariant;

  @ManyToOne(
    () => trsVehicleBrandModel,
    (trs_vehicle_brand_model) => trs_vehicle_brand_model.trs_vehicles
  )
  @JoinColumn([{ name: "vehicle_brand_model", referencedColumnName: "id" }])
  vehicle_brand_model: trsVehicleBrandModel;

  @ManyToOne(
    () => trsVehicleType,
    (trs_vehicle_type) => trs_vehicle_type.trs_vehicles
  )
  @JoinColumn([{ name: "vehicle_type", referencedColumnName: "id" }])
  vehicle_type: trsVehicleType;

  @ManyToOne(
    () => trsVehicleStatus,
    (trs_vehicle_status) => trs_vehicle_status.trs_vehicles
  )
  @JoinColumn([{ name: "vehicle_status", referencedColumnName: "id" }])
  vehicle_status: trsVehicleStatus;

  @ManyToOne(
    () => trsVehicleBrand,
    (trs_vehicle_brand) => trs_vehicle_brand.trs_vehicles
  )
  @JoinColumn([{ name: "vehicle_brand", referencedColumnName: "id" }])
  vehicle_brand: trsVehicleBrand;

  @RelationId((trs_vehicle: trsVehicle) => trs_vehicle.type_tyre)
  type_tyre2: number | null;

  @RelationId((trs_vehicle: trsVehicle) => trs_vehicle.country)
  country2: number | null;

  @RelationId((trs_vehicle: trsVehicle) => trs_vehicle.int_piston)
  int_piston2: number | null;

  @RelationId((trs_vehicle: trsVehicle) => trs_vehicle.main_driver)
  main_driver2: number | null;

  @RelationId((trs_vehicle: trsVehicle) => trs_vehicle.activity)
  activity2: number | null;

  @RelationId((trs_vehicle: trsVehicle) => trs_vehicle.vehicle_active_status)
  vehicle_active_status2: number | null;

  @RelationId((trs_vehicle: trsVehicle) => trs_vehicle.method_use)
  method_use2: number | null;

  @RelationId((trs_vehicle: trsVehicle) => trs_vehicle.type_warehouse)
  type_warehouse2: number | null;

  @RelationId(
    (trs_vehicle: trsVehicle) => trs_vehicle.vehicle_brand_model_variant
  )
  vehicle_brand_model_variant2: number | null;

  @RelationId((trs_vehicle: trsVehicle) => trs_vehicle.vehicle_brand_model)
  vehicle_brand_model2: number | null;

  @RelationId((trs_vehicle: trsVehicle) => trs_vehicle.vehicle_type)
  vehicle_type2: number | null;

  @RelationId((trs_vehicle: trsVehicle) => trs_vehicle.vehicle_status)
  vehicle_status2: number | null;

  @RelationId((trs_vehicle: trsVehicle) => trs_vehicle.vehicle_brand)
  vehicle_brand2: number | null;
}
