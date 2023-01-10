import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { trsVehicle } from "./TrsVehicle.entity";

@Index("PK__trs_type__3213E83F0FBCC34E", ["id"], { unique: true })
@Entity("trs_type_warehouse", { schema: "dbo" })
export class trsTypeWarehouse {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("nvarchar", { name: "name", nullable: true })
  name: string | null;

  @OneToMany(() => trsVehicle, (trs_vehicle) => trs_vehicle.type_warehouse)
  trs_vehicles: trsVehicle[];
}
