import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { trsVehicle } from "./TrsVehicle.entity";

@Index("PK__trs_meth__3213E83F771AE3FA", ["id"], { unique: true })
@Entity("trs_method_use", { schema: "dbo" })
export class trsMethodUse {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("nvarchar", { name: "name", nullable: true })
  name: string | null;

  @OneToMany(() => trsVehicle, (trs_vehicle) => trs_vehicle.method_use)
  trs_vehicles: trsVehicle[];
}
