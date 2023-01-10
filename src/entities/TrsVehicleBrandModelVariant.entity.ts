import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { trsVehicle } from "./TrsVehicle.entity";

@Index("PK__trs_vehi__3213E83F0FE761D8", ["id"], { unique: true })
@Entity("trs_vehicle_brand_model_variant", { schema: "dbo" })
export class trsVehicleBrandModelVariant {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("nvarchar", { name: "name", nullable: true })
  name: string | null;

  @OneToMany(
    () => trsVehicle,
    (trs_vehicle) => trs_vehicle.vehicle_brand_model_variant
  )
  trs_vehicles: trsVehicle[];
}
