import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK__trs_vehi__3213E83FC4720207", ["id"], { unique: true })
@Entity("trs_vehicle_available_status", { schema: "dbo" })
export class trsVehicleAvailableStatus {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("nvarchar", { name: "name", nullable: true })
  name: string | null;
}
