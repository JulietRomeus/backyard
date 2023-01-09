import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { trsVehicle } from "./TrsVehicle.entity";

@Index("PK__trs_vehi__3213E83FC99F845A", ["id"], { unique: true })
@Entity("trs_vehicle_active_status", { schema: "dbo" })
export class trsVehicleActiveStatus {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("nvarchar", { name: "name", nullable: true })
  name: string | null;

  @OneToMany(
    () => trsVehicle,
    (trs_vehicle) => trs_vehicle.vehicle_active_status
  )
  trs_vehicles: trsVehicle[];
}
