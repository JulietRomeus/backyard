import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { trsObstacle } from "./TrsObstacle.entity";

@Index("PK__trs_obst__3213E83F0D8B3053", ["id"], { unique: true })
@Entity("trs_obstacle_type", { schema: "dbo" })
export class trsObstacleType {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "no", nullable: true })
  no: number | null;

  @Column("nvarchar", { name: "obstacle_name", nullable: true, length: 127 })
  obstacle_name: string | null;

  // @OneToMany(() => trsObstacle, (trs_obstacle) => trs_obstacle.obstacle_type_id)
  
  // trs_obstacles: trsObstacle[];
}
