import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
// import { slcOilSupplyControlBook } from "./SlcOilSupplyControlBook.entity";
// import { slcOilTankControlBook } from "./SlcOilTankControlBook.entity";
import { slcToa } from "./SlcToa.entity";
// import { slcRefsSupplyStatus } from "./SlcRefsSupplyStatus.entity";
// import { slcSupplyControlBook } from "./SlcSupplyControlBook.entity";
// import { slcSupplyControlSupply } from "./SlcSupplyControlSupply.entity";
import { slcSupplySpec } from "./SlcSupplySpec.entity";
// import { slcSupplySpecAttribute } from "./SlcSupplySpecAttribute.entity";
// import { slcWarehouseControlBook } from "./SlcWarehouseControlBook.entity";

@Index("PK__slc_supp__3213E83F83589509", ["id"], { unique: true })
@Entity("slc_supply", { schema: "dbo" })
export class slcSupply {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("nvarchar", { name: "supply_name", nullable: true, length: 250 })
  supply_name: string | null;

  @Column("nvarchar", { name: "supply_code", nullable: true, length: 200 })
  supply_code: string | null;

  // @Column("nvarchar", { name: "detail", nullable: true, length: 1000 })
  // detail: string | null;

  // @Column("int", { name: "file_type_id", nullable: true })
  // file_type_id: number | null;

  // @Column("nvarchar", { name: "file_url", nullable: true, length: 2000 })
  // file_url: string | null;

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

  // @Column("nvarchar", { name: "supply_eng_name", nullable: true, length: 255 })
  // supply_eng_name: string | null;

  // @Column("int", { name: "budget_year", nullable: true })
  // budget_year: number | null;

  // @OneToMany(
  //   () => slcOilSupplyControlBook,
  //   (slc_oil_supply_control_book) => slc_oil_supply_control_book.supply
  // )
  // slc_oil_supply_control_books: slcOilSupplyControlBook[];

  // @OneToMany(
  //   () => slcOilTankControlBook,
  //   (slc_oil_tank_control_book) => slc_oil_tank_control_book.supply
  // )
  // slc_oil_tank_control_books: slcOilTankControlBook[];

  @ManyToOne(() => slcToa, (slc_toa) => slc_toa.slc_supplies, {
    onDelete: "SET NULL",
  })
  @JoinColumn([{ name: "toa_id", referencedColumnName: "id" }])
  toa: slcToa;

  // @ManyToOne(
  //   () => slcRefsSupplyStatus,
  //   (slc_refs_supply_status) => slc_refs_supply_status.slc_supplies
  // )
  // @JoinColumn([{ name: "status_id", referencedColumnName: "id" }])
  // status: slcRefsSupplyStatus;

  @ManyToOne(() => slcSupply, (slc_supply) => slc_supply.slc_supplies)
  @JoinColumn([{ name: "parent_id", referencedColumnName: "id" }])
  parent: slcSupply;

  @OneToMany(() => slcSupply, (slc_supply) => slc_supply.parent)
  slc_supplies: slcSupply[];

  // @OneToMany(
  //   () => slcSupplyControlBook,
  //   (slc_supply_control_book) => slc_supply_control_book.supply
  // )
  // slc_supply_control_books: slcSupplyControlBook[];

  // @OneToMany(
  //   () => slcSupplyControlSupply,
  //   (slc_supply_control_supply) => slc_supply_control_supply.supply
  // )
  // slc_supply_control_supplies: slcSupplyControlSupply[];

  @OneToMany(() => slcSupplySpec, (slc_supply_spec) => slc_supply_spec.supply)
  slc_supply_specs: slcSupplySpec[];

  // @OneToMany(
  //   () => slcSupplySpecAttribute,
  //   (slc_supply_spec_attribute) => slc_supply_spec_attribute.supply
  // )
  // slc_supply_spec_attributes: slcSupplySpecAttribute[];

  // @OneToMany(
  //   () => slcWarehouseControlBook,
  //   (slc_warehouse_control_book) => slc_warehouse_control_book.supply
  // )
  // slc_warehouse_control_books: slcWarehouseControlBook[];
}
