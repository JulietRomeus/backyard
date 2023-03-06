import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { slcSupply } from "./SlcSupply.entity";
// import { slcConsiderRate } from "./SlcConsiderRate.entity";
import { slcSupplyItemAttribute } from "./SlcSupplyItemAttribute.entity";
import { slcRefsSupplySubType } from "./SlcRefsSupplySubType.entity";


@Index("PK__slc_toa__3213E83F76E37C1E", ["id"], { unique: true })
@Entity("slc_toa", { schema: "dbo" })
export class slcToa {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("nvarchar", { name: "name", nullable: true, length: 500 })
  name: string | null;

  // @Column("int", { name: "unit_count_id", nullable: true })
  // unit_count_id: number | null;

  // @Column("int", { name: "status", nullable: true })
  // status: number | null;

  // @Column("bit", { name: "is_active", nullable: true })
  // is_active: boolean | null;

  // @Column("nvarchar", { name: "create_by_id", nullable: true, length: 100 })
  // create_by_id: string | null;

  // @Column("nvarchar", { name: "create_by", nullable: true, length: 300 })
  // create_by: string | null;

  // @Column("datetime", { name: "create_date", nullable: true })
  // create_date: Date | null;

  // @Column("nvarchar", { name: "update_by_id", nullable: true, length: 300 })
  // update_by_id: string | null;

  // @Column("nvarchar", { name: "update_by", nullable: true, length: 300 })
  // update_by: string | null;

  // @Column("datetime", { name: "update_date", nullable: true })
  // update_date: Date | null;

  // @Column("nvarchar", { name: "delete_by_id", nullable: true, length: 100 })
  // delete_by_id: string | null;

  // @Column("nvarchar", { name: "delete_by", nullable: true, length: 300 })
  // delete_by: string | null;

  // @Column("datetime", { name: "delete_date", nullable: true })
  // delete_date: Date | null;

  // @Column("int", { name: "edit_type_id", nullable: true })
  // edit_type_id: number | null;

  @OneToMany(() => slcSupply, (slc_supply) => slc_supply.toa)
  slc_supplies: slcSupply[];

  @ManyToOne(() => slcToa, (slc_toa) => slc_toa.slc_toas)
  @JoinColumn([{ name: "parent_id", referencedColumnName: "id" }])
  parent: slcToa;

  @OneToMany(() => slcToa, (slc_toa) => slc_toa.parent)
  slc_toas: slcToa[];

  @ManyToOne(
    () => slcRefsSupplySubType,
    (slc_refs_supply_sub_type) => slc_refs_supply_sub_type.slc_toas,
    { onDelete: "SET NULL" }
  )
  @JoinColumn([{ name: "supply_sub_type_id", referencedColumnName: "id" }])
  supply_sub_type: slcRefsSupplySubType;

  // @ManyToOne(
  //   () => slcConsiderRate,
  //   (slc_consider_rate) => slc_consider_rate.slc_toas
  // )
  // @JoinColumn([{ name: "consider_rate_id", referencedColumnName: "id" }])
  // consider_rate: slcConsiderRate;

  // @ManyToOne(
  //   () => slcSupplyItemAttribute,
  //   (slc_supply_item_attribute) => slc_supply_item_attribute.slc_toas
  // )
  // @JoinColumn([{ name: "supply_group_id", referencedColumnName: "id" }])
  // supply_group: slcSupplyItemAttribute;
}
