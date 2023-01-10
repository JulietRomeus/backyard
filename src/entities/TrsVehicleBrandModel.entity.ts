import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { trsVehicle } from "./TrsVehicle.entity";

@Index("PK__trs_vehi__3213E83F38F26571", ["id"], { unique: true })
@Entity("trs_vehicle_brand_model", { schema: "dbo" })
export class trsVehicleBrandModel {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("nvarchar", { name: "name", nullable: true })
  name: string | null;

  @OneToMany(() => trsVehicle, (trs_vehicle) => trs_vehicle.vehicle_brand_model)
  trs_vehicles: trsVehicle[];
}
