import { map } from 'rxjs/operators';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TrsDashboard } from './entities/dashboard.entity';
import { RmqRecord } from '@nestjs/microservices';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(TrsDashboard, 'MSSQL_CONNECTION_HOST')
    private readonly trsrepository: Repository<TrsDashboard>,
  ) {}
  async getdriver(id: any, request_by: any) {
    const driverrate = `[dbo].[disDash_TrsDashboard]
        @unit_nos= ${id},
        @dataset_name = N'Driver'`;
    const driver_data: TrsDashboard[] = await this.trsrepository.query(
      driverrate,
    );
    const driver_rank = driver_data.map((r: any, i: any) => ({
      ...r,
      no: `Top${i + 1}`,
    }));
    console.log(driver_rank);

    const driverstarus = `[dbo].[disDash_TrsDashboard]
        @unit_nos= ${id},
        @dataset_name = N'DriverStauts'`;
    const driverstatus_data: TrsDashboard[] = await this.trsrepository.query(
      driverstarus,
    );
    let x = [];
    const neeew = {
      inprogress: (driverstatus_data?.map((r: any) => r.count_status))[0],
      available: (driverstatus_data?.map((r: any) => r.count_status))[1],
      total:
        (driverstatus_data?.map((r: any) => r.count_status))[0] +
        (driverstatus_data?.map((r: any) => r.count_status))[1],
      progressdata: 
        [100 * (driverstatus_data?.map((r: any) => r.count_status))[1] /
          ((driverstatus_data?.map((r: any) => r.count_status))[0] +
            (driverstatus_data?.map((r: any) => r.count_status))[1])],
      
    };

    console.log(neeew);

    const vehicle = `[dbo].[disDash_TrsDashboard]
    @unit_nos= ${id},
    @dataset_name = N'Vehicle'`;
    const vehicle_data: TrsDashboard[] = await this.trsrepository.query(
      vehicle,
    );
    console.log(driver_data);

    return {
      driver_data: driver_rank,
      driverstatus_data: neeew,
      vehicle_data: vehicle_data,
    };
  }
}
