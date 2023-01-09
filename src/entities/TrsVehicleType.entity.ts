import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { trsVehicle } from "./TrsVehicle.entity";

@Index("PK__trs_vehi__3213E83F1DEB597E", ["id"], { unique: true })
@Entity("trs_vehicle_type", { schema: "dbo" })
export class trsVehicleType {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("nvarchar", { name: "name", nullable: true })
  name: string | null;

  @Column("int", { name: "order", nullable: true })
  order: number | null;

  @Column("bit", { name: "is_delete", nullable: true, default: () => "'0'" })
  is_delete: boolean | null;

  @OneToMany(() => trsVehicle, (trs_vehicle) => trs_vehicle.vehicle_type)
  trs_vehicles: trsVehicle[];
}
