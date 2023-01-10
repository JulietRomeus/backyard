import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { trsVehicle } from "./TrsVehicle.entity";

@Index("PK__trs_type__3213E83FB82CFFA8", ["id"], { unique: true })
@Entity("trs_type_tyre", { schema: "dbo" })
export class trsTypeTyre {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("nvarchar", { name: "name", nullable: true })
  name: string | null;

  @OneToMany(() => trsVehicle, (trs_vehicle) => trs_vehicle.type_tyre)
  trs_vehicles: trsVehicle[];
}
