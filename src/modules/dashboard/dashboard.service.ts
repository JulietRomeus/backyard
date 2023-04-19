import { map } from 'rxjs/operators';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TrsDashboard } from './entities/dashboard.entity';
import { RmqRecord } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import {
  trsActivity,
  trsActivityConvoy,
  trsActivityType,
  trsVehicleType,
  trsVehicleStatus,
  trsDriver,
  trsVehicle,
} from '../../entities/Index';

@Injectable()
export class DashboardService {
  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(trsActivityConvoy, 'MSSQL_CONNECTION')
    private trsActivityConvoy: Repository<trsActivityConvoy>,
    @InjectRepository(TrsDashboard, 'MSSQL_CONNECTION_HOST')
    private readonly trsrepository: Repository<TrsDashboard>,
    @InjectRepository(trsActivity, 'MSSQL_CONNECTION')
    private trsActivityRepo: Repository<trsActivity>,
  ) {}

  
  async getdriver(id: any, request_by: any) {
    const vehicle_resource = `[dbo].[Db_Trs_Vehicle]
        @unit_nos= ${id},
        @dataset_name = N'vehicle_resource'`;
    const vehicle_data: TrsDashboard[] = await this.trsrepository.query(
      vehicle_resource,
    );
console.log('vehicle_data',vehicle_data)
    const label = vehicle_data?.map((r: any) => r.supply_name);
    console.log('label', label);
    const tempvehicle = vehicle_data?.filter(
      (r: any) => r?.status == 'ใช้ราชการได้'
    );
    console.log('tempvehicle',tempvehicle)
    const valuefree = tempvehicle?.map((r: any) => r.amount);
console.log('valuefree',valuefree)

    const tempvehicleinpro = vehicle_data?.filter(
      (r: any) => r.status == 'inprogress',
    );
    const valueinpro= tempvehicleinpro?.map((r: any) => r.amount);

    const oveallfree = [
    
      {
        name: 'ชำรุด',
        data: [],
       
      },
      {
        name: 'ปฏิบัติภารกิจ',
        data: valueinpro,
       
      },
      {
        name: 'ใช้ราชการได้',
        data: valuefree,
      
      },
    ];

    console.log('tempvehicle', oveallfree);

    const vehicle_activity = `[dbo].[Db_Trs_Vehicle]
    @unit_nos= ${id},
    @dataset_name = N'vehicle_activity'`;
    const vehicle_activity_data: TrsDashboard[] =
      await this.trsrepository.query(vehicle_activity);

    const totalactivity = vehicle_activity_data
      ?.map((r: any) => r.amount)
      .reduce((accum: any, cur: any) => accum + cur, 0);
    const overall_vehicle_activity = vehicle_activity_data?.map((r: any) => ({
      title: r.name,
      image: r.img,
      amount: Math.floor(((totalactivity - r.amount) * 100) / totalactivity),
    }));
    // console.log('totalactivity', totalactivity);
    // console.log('vehicle_activity_data', overall_vehicle_activity);

    const vehicle_driver_resource = `[dbo].[Db_Trs_Vehicle]
    @unit_nos= ${id},
    @dataset_name = N'vehicle_driver_resource'`;
    const vehicle_driver_resource_data: TrsDashboard[] =
      await this.trsrepository.query(vehicle_driver_resource);
    // console.log('vehicle_driver_resource_data', vehicle_driver_resource_data);

    const overalldriver = vehicle_driver_resource_data?.map(
      (r: any, i: number) => ({
        img: r.img,
        name: `${r.firstname}  ${r.lastname}`,
        status: r.status == '1' ? 'ว่าง' : 'ไม่ว่าง',
        rating: 5 - i,
        activity: r.amount,
      }),
    );
    // console.log(overalldriver);

    const license = `[dbo].[Db_Trs_Vehicle]
    @unit_nos= ${id},
    @dataset_name = N'license'`;
    const license_data: TrsDashboard[] = await this.trsrepository.query(
      license,
    );
    const labelpie = license_data?.map((r: any) => r.amount);
    const datapie = license_data?.map((r: any) => r.license_name);
    const overalllicense = [labelpie, datapie];
    // console.log('datapie', [labelpie, datapie]);

    const driver_status = `[dbo].[Db_Trs_Vehicle]
    @unit_nos= ${id},
    @dataset_name = N'driver_status'`;
    const driver_status_data: TrsDashboard[] = await this.trsrepository.query(
      driver_status,
    );

    const inprogress = driver_status_data?.map((r: any) => r?.inprogress);
    const available = driver_status_data?.map((r: any) => r?.available);
    const total = inprogress[0] + available[0];
    const percent = ((available[0]) * 100) / total;
    const overalldriverstatus = [inprogress[0], available[0], total, [percent]];
    // console.log('overalldriverstatus', overalldriverstatus);


    const amount_vehicle = `[dbo].[Db_Trs_Vehicle]
    @unit_nos= ${id},
    @dataset_name = N'amount_vehicle'`;
    const amount_vehicle_data: TrsDashboard[] = await this.trsrepository.query(
      amount_vehicle,
    );
    const overallvehicle = 


    console.log('overall',amount_vehicle_data)
    // const driverstarus = `[dbo].[disDash_TrsDashboard]
    //     @unit_nos= ${id},
    //     @dataset_name = N'DriverStauts'`;
    // const driverstatus_data: TrsDashboard[] = await this.trsrepository.query(
    //   driverstarus,
    // );
    // let x = [];
    // const neeew = {
    //   inprogress: (driverstatus_data?.map((r: any) => r.count_status))[0],
    //   available: (driverstatus_data?.map((r: any) => r.count_status))[1],
    //   total:
    //     (driverstatus_data?.map((r: any) => r.count_status))[0] +
    //     (driverstatus_data?.map((r: any) => r.count_status))[1],
    //   progressdata:
    //     [100 * (driverstatus_data?.map((r: any) => r.count_status))[1] /
    //       ((driverstatus_data?.map((r: any) => r.count_status))[0] +
    //         (driverstatus_data?.map((r: any) => r.count_status))[1])],

    // };

    // console.log(neeew);

    // const vehicle = `[dbo].[disDash_TrsDashboard]
    // @unit_nos= ${id},
    // @dataset_name = N'Vehicle'`;
    // const vehicle_data: TrsDashboard[] = await this.trsrepository.query(
    //   vehicle,
    // );
    // console.log(vehicle_data);

    // const vehicleTop5 = `[dbo].[disDash_TrsDashboard]
    // @unit_nos= ${id},
    // @dataset_name = N'VehicleTop5'`;
    // const vehicleTop5_data: TrsDashboard[] = await this.trsrepository.query(
    //   vehicleTop5,
    // );

    // const newvehicle = vehicleTop5_data?.map((r:any)=>r.countt)
    // const newlabel = vehicleTop5_data?.map((r:any)=>r.name)

    // console.log({newvehicel:newvehicle,label:newlabel});

    return {
      vehicle_resource: [oveallfree, label],
      vehicle_activity: overall_vehicle_activity,
      vehicle_driver_resource: overalldriver,
      license: overalllicense,
      amount_vehicle:amount_vehicle_data,
      driver_status:overalldriverstatus

      // driver_data: driver_rank,
      // driverstatus_data: neeew,
      // vehicle_data: vehicle_data,
      // vehicletop5_data:({newvehicel:newvehicle,label:newlabel})
    };
  }

  async missionAll(body:any) {
    console.log('body',body)
    // const unit_no=body.request_by.units?.map((r:any)=>`'${r.code}'`)
    // console.log(unit_no)
    return await this.trsActivityConvoy
      .createQueryBuilder('tac')
      .leftJoinAndSelect(
        'tac.trs_activity_vehicle_drivers',
        'tavd',
      )
      .leftJoinAndSelect(
        'tac.trs_activity_routes',
        'tar',
      )
      .leftJoinAndSelect(
        'tac.activity',
        'ta',
      )

      .getMany();
  }


}
