import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { trsMaintenanceVehicle } from "./TrsMaintenanceVehicle.entity";

@Index("PK__trs_main__3213E83F0514DC1B", ["id"], { unique: true })
@Entity("trs_maintenance_vehicle_type", { schema: "dbo" })
export class trsMaintenanceVehicleType {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("nvarchar", { name: "name", nullable: true })
  name: string | null;

  @OneToMany(
    () => trsMaintenanceVehicle,
    (trs_maintenance_vehicle) => trs_maintenance_vehicle.maintenance_type
  )
  trs_maintenance_vehicles: trsMaintenanceVehicle[];
}
