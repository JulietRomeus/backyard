import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { trsVehicle } from "./TrsVehicle.entity";

@Index("PK__trs_coun__3213E83F9EDF2970", ["id"], { unique: true })
@Entity("trs_country", { schema: "dbo" })
export class trsCountry {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("nvarchar", { name: "name", nullable: true })
  name: string | null;

  @OneToMany(() => trsVehicle, (trs_vehicle) => trs_vehicle.country)
  trs_vehicles: trsVehicle[];
}
