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
// import { slcSupplyControlBook } from "./SlcSupplyControlBook.entity";
import { slcRefsSupplySubDetail } from "./SlcRefsSupplySubDetail.entity";
// import { slcConsiderRate } from "./SlcConsiderRate.entity";
import { slcRefsSupplySubType } from "./SlcRefsSupplySubType.entity";
// import { slcRefsSupplyGroup } from "./SlcRefsSupplyGroup.entity";
// import { slcRefsSupplySubGroup } from "./SlcRefsSupplySubGroup.entity";
// import { slcRefsSupplyMainType } from "./SlcRefsSupplyMainType.entity";
// import { slcRefsSupplyUse } from "./SlcRefsSupplyUse.entity";
// import { slcToaGroup } from "./SlcToaGroup.entity";
// import { slcUnitToaItem } from "./SlcUnitToaItem.entity";

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

  // @Column("int", { name: "budget_year", nullable: true })
  // budget_year: number | null;

  // @Column("nvarchar", { name: "detail", nullable: true, length: 2000 })
  // detail: string | null;

  // @Column("int", { name: "lifetime_year", nullable: true })
  // lifetime_year: number | null;

  @Column("int", { name: "supply_sub_detail_key", nullable: true })
  supply_sub_detail_key: number | null;

  @OneToMany(() => slcSupply, (slc_supply) => slc_supply.toa)
  slc_supplies: slcSupply[];

  // @OneToMany(
  //   () => slcSupplyControlBook,
  //   (slc_supply_control_book) => slc_supply_control_book.toa
  // )
  // slc_supply_control_books: slcSupplyControlBook[];

  @ManyToOne(
    () => slcRefsSupplySubDetail,
    (slc_refs_supply_sub_detail) => slc_refs_supply_sub_detail.slc_toas,
    { onDelete: "SET NULL" }
  )
  @JoinColumn([{ name: "supply_sub_detail_id", referencedColumnName: "id" }])
  supply_sub_detail: slcRefsSupplySubDetail;

  // @ManyToOne(
  //   () => slcConsiderRate,
  //   (slc_consider_rate) => slc_consider_rate.slc_toas
  // )
  // @JoinColumn([{ name: "consider_rate_id", referencedColumnName: "id" }])
  // consider_rate: slcConsiderRate;

  @ManyToOne(
    () => slcRefsSupplySubType,
    (slc_refs_supply_sub_type) => slc_refs_supply_sub_type.slc_toas,
    { onDelete: "SET NULL" }
  )
  @JoinColumn([{ name: "supply_sub_type_id", referencedColumnName: "id" }])
  supply_sub_type: slcRefsSupplySubType;

  // @ManyToOne(
  //   () => slcRefsSupplyGroup,
  //   (slc_refs_supply_group) => slc_refs_supply_group.slc_toas,
  //   { onDelete: "SET NULL" }
  // )
  // @JoinColumn([{ name: "supply_group_id", referencedColumnName: "id" }])
  // supply_group: slcRefsSupplyGroup;

  @ManyToOne(() => slcToa, (slc_toa) => slc_toa.slc_toas)
  @JoinColumn([{ name: "parent_id", referencedColumnName: "id" }])
  parent: slcToa;

  @OneToMany(() => slcToa, (slc_toa) => slc_toa.parent)
  slc_toas: slcToa[];

  // @ManyToOne(
  //   () => slcRefsSupplySubGroup,
  //   (slc_refs_supply_sub_group) => slc_refs_supply_sub_group.slc_toas,
  //   { onDelete: "SET NULL" }
  // )
  // @JoinColumn([{ name: "supply_sub_group_id", referencedColumnName: "id" }])
  // supply_sub_group: slcRefsSupplySubGroup;

  // @ManyToOne(
  //   () => slcRefsSupplyMainType,
  //   (slc_refs_supply_main_type) => slc_refs_supply_main_type.slc_toas,
  //   { onDelete: "SET NULL" }
  // )
  // @JoinColumn([{ name: "supply_main_type_id", referencedColumnName: "id" }])
  // supply_main_type: slcRefsSupplyMainType;

  // @ManyToOne(
  //   () => slcRefsSupplyUse,
  //   (slc_refs_supply_use) => slc_refs_supply_use.slc_toas,
  //   { onDelete: "SET NULL" }
  // )
  // @JoinColumn([{ name: "supply_use_id", referencedColumnName: "id" }])
  // supply_use: slcRefsSupplyUse;

  // @ManyToOne(() => slcToaGroup, (slc_toa_group) => slc_toa_group.slc_toas, {
  //   onDelete: "SET NULL",
  // })
  // @JoinColumn([{ name: "toa_group_id", referencedColumnName: "id" }])
  // toa_group: slcToaGroup;

  // @OneToMany(() => slcUnitToaItem, (slc_unit_toa_item) => slc_unit_toa_item.toa)
  // slc_unit_toa_items: slcUnitToaItem[];
}
