import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { trsVehicle } from "./TrsVehicle.entity";

@Index("PK__trs_int___3213E83F24E945A0", ["id"], { unique: true })
@Entity("trs_int_piston", { schema: "dbo" })
export class trsIntPiston {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("nvarchar", { name: "name", nullable: true })
  name: string | null;

  @OneToMany(() => trsVehicle, (trs_vehicle) => trs_vehicle.int_piston)
  trs_vehicles: trsVehicle[];
}
