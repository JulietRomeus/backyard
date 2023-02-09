import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { trsDriver } from "./TrsDriver.entity";

@Index("PK__trs_driv__3213E83FFB26757B", ["id"], { unique: true })
@Entity("trs_driver_status", { schema: "dbo" })
export class trsDriverStatus {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("nvarchar", { name: "driver_status", nullable: true, length: 255 })
  driver_status: string | null;

  @OneToMany(() => trsDriver, (trs_driver) => trs_driver.driver_status)
  trs_drivers: trsDriver[];
}
