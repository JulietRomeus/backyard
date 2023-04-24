import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
  } from "typeorm";
  import { directusFiles } from "./DirectusFiles.entity";
  
  @Index("PK__trs_driv__3213E83FACE07F64", ["id"], { unique: true })
  @Entity("trs_driver_template", { schema: "dbo" })
  export class trsDriverTemplate {
    @PrimaryGeneratedColumn({ type: "int", name: "id" })
    id: number;
  
    @Column("bit", { name: "is_active", nullable: true })
    is_active: boolean | null;
  
    @Column("nvarchar", { name: "create_by", nullable: true, length: 255 })
    create_by: string | null;
  
    @Column("nvarchar", { name: "create_by_id", nullable: true, length: 255 })
    create_by_id: string | null;
  
    @Column("date", { name: "create_date", nullable: true })
    create_date: Date | null;
  
    @Column("datetime2", { name: "update_date", nullable: true })
    update_date: Date | null;
  
    @Column("nvarchar", { name: "update_by", nullable: true, length: 255 })
    update_by: string | null;
  
    @Column("nvarchar", { name: "update_by_id", nullable: true, length: 255 })
    update_by_id: string | null;
  
    @Column("nvarchar", { name: "delete_by", nullable: true, length: 255 })
    delete_by: string | null;
  
    @Column("nvarchar", { name: "delete_by_id", nullable: true, length: 255 })
    delete_by_id: string | null;
  
    @Column("datetime2", { name: "delete_date", nullable: true })
    delete_date: Date | null;
  
    // @ManyToOne(
    //   () => directusFiles,
    //   (directus_files) => directus_files.trs_driver_templates,
    //   { onDelete: "SET NULL" }
    // )
    // @JoinColumn([{ name: "file", referencedColumnName: "id" }])
    // file: directusFiles;


    @Column("nvarchar", { name: "file", nullable: true })
    file: string | null;
  
  }
  