import {Column,Entity,Index,JoinColumn,ManyToOne,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {trsMaintenanceVehicleType} from './TrsMaintenanceVehicleType.entity'
import {trsMaintenanceVehicleStatus} from './TrsMaintenanceVehicleStatus.entity'


@Index("PK__trs_main__3213E83F96206892",["id",],{ unique:true })
@Entity("trs_maintenance_vehicle" ,{schema:"dbo" } )
export  class trsMaintenanceVehicle {

@PrimaryGeneratedColumn({ type:"int", name:"id" })
id:number;

@Column("nvarchar",{ name:"vehicle",nullable:true })
vehicle:string | null;

@Column("nvarchar",{ name:"detail",nullable:true })
detail:string | null;

@Column("datetime2",{ name:"maintenance_date",nullable:true })
maintenance_date:Date | null;

@Column("bit",{ name:"is_put_off",nullable:true })
is_put_off:boolean | null;

@Column("datetime2",{ name:"put_off_date",nullable:true })
put_off_date:Date | null;

@Column("datetime2",{ name:"start_date",nullable:true })
start_date:Date | null;

@Column("datetime2",{ name:"end_date",nullable:true })
end_date:Date | null;

@Column("nvarchar",{ name:"create_by",nullable:true })
create_by:string | null;

@Column("int",{ name:"3_month_form",nullable:true })
three_month_form:number | null;

@Column("int",{ name:"6_month_form",nullable:true })
six_month_form:number | null;

@ManyToOne(()=>trsMaintenanceVehicleType,trs_maintenance_vehicle_type=>trs_maintenance_vehicle_type.trs_maintenance_vehicles)
@JoinColumn([{ name: "maintenance_type", referencedColumnName: "id" },
])

maintenance_type:trsMaintenanceVehicleType;

@ManyToOne(()=>trsMaintenanceVehicleStatus,trs_maintenance_vehicle_status=>trs_maintenance_vehicle_status.trs_maintenance_vehicles)
@JoinColumn([{ name: "maintenance_status", referencedColumnName: "id" },
])

maintenance_status:trsMaintenanceVehicleStatus;

@RelationId((trs_maintenance_vehicle:trsMaintenanceVehicle)=>trs_maintenance_vehicle.maintenance_type)
maintenance_type2:number | null;

@RelationId((trs_maintenance_vehicle:trsMaintenanceVehicle)=>trs_maintenance_vehicle.maintenance_status)
maintenance_status2:number | null;

}
