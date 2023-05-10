import { map } from 'rxjs/operators';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TrsDashboard } from './entities/dashboard.entity';
import { ClientGrpcProxy, RmqRecord } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import now from '../../utils/now';
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
    @InjectRepository(TrsDashboard, 'MSSQL_CONNECTION')
    private readonly trsrepository: Repository<TrsDashboard>,
    @InjectRepository(trsActivity, 'MSSQL_CONNECTION')
    private trsActivityRepo: Repository<trsActivity>,
  ) {}

  async missionAll(query: any) {
    console.log('id', query);
    // console.log('query.type', query?.type);
    // console.log(query);
    // const unit_no=body.request_by.units?.map((r:any)=>`'${r.code}'`)
    // console.log(unit_no)
    if (!query.start_date) {
      return await this.trsActivityConvoy
        .createQueryBuilder('tac')
        .leftJoinAndSelect('tac.vehicle_driver', 'tavd')
        .leftJoinAndSelect('tac.route', 'tar')
        .leftJoinAndSelect('tac.activity', 'ta')
        .leftJoinAndSelect('tavd.driver', 'td')
        .leftJoinAndSelect('tavd.help_activity_form', 'tah')

        .where(
          'CONVERT(date,ta.activity_start_date)<=CONVERT(date, GETDATE()) and  CONVERT(date,ta.activity_end_date)>=CONVERT(date, GETDATE())',
        )
        .andWhere(
          `(ta.unit_request_code  ='${query.unit_no}' or ta.unit_response_code ='${query.unit_no}')`,
          // {
          //   unit: query.unit_no,
          // },
        )
        // .getQuery()
        .getMany();
    }
    // .getMany()}
    else {
      console.log('query.start_date', query.unit_no);
      return await this.trsActivityConvoy
        .createQueryBuilder('tac')
        .leftJoinAndSelect('tac.vehicle_driver', 'tavd')
        .leftJoinAndSelect('tac.route', 'tar')
        .leftJoinAndSelect('tac.activity', 'ta')
        .leftJoinAndSelect('tavd.driver', 'td')
        .leftJoinAndSelect('tavd.help_activity_form', 'tah')

        .where(
          `(ta.unit_request_code  ='${query.unit_no}' or ta.unit_response_code ='${query.unit_no}')`,
          // {
          //   unit: query.unit_no,
          // },
        )
        .andWhere(
          `((CONVERT(date,ta.activity_start_date)<=CONVERT(date, '${query.start_date}') and  CONVERT(date,ta.activity_end_date)>=CONVERT(date,'${query.end_date}'))
          or
          (CONVERT(date,ta.activity_start_date)>=CONVERT(date, '${query.start_date}') and  CONVERT(date,ta.activity_end_date)<=CONVERT(date,'${query.end_date}')))
          `,
        )
        // .getSql()
        .getMany();
    }
  }
  //--------------------------------------------------------------------------------------
  //gettype

  async getdriver(body: any) {
    // console.log('body', body);
    const vehicle_type = `[dbo].[Db_Trs_Vehicle]
      @unit_nos= '${body.unit_no}',
      @dataset_name = N'vehicle_type'`;
    const vehicle_type_data: TrsDashboard[] = await this.trsrepository.query(
      vehicle_type,
    );
    // console.log('vehicle_type_data', vehicle_type_data);
    const type = vehicle_type_data?.map((r: any) => r.supply_id);
    const label = vehicle_type_data?.map((r: any) => r.supply_name);
    // console.log('label', label);
    //--------------------------------------------------------------------------------------
    //vehiclebytype

    const vehicle_resource = `[dbo].[Db_Trs_Vehicle]
    @unit_nos= '${body.unit_no}',
    @dataset_name = N'vehicle_resource'`;
    const vehicle_data: TrsDashboard[] = await this.trsrepository.query(
      vehicle_resource,
    );
    //available vehicle
    const tempvehicle = vehicle_data?.filter(
      (r: any) => r?.status == 'ใช้ราชการได้',
    );
    const valuefree = label?.map((num) => {
      const matchingObj: any = tempvehicle?.find(
        (obj: any) => obj.supply_name == num,
      );
      if (matchingObj) {
        return matchingObj.amount;
      } else {
        return 0;
      }
    });
    const sumfree = valuefree?.reduce((accum: any, cur: any) => accum + cur, 0);
    // console.log(sumfree)

    //inprocess vehicle
    const tempvehicleinpro = vehicle_data?.filter(
      (r: any) => r.status == 'inprogress',
    );
    const valueinpro = label.map((num) => {
      const valueinproObj: any = tempvehicleinpro?.find(
        (obj: any) => obj.supply_name == num,
      );
      if (valueinproObj) {
        return valueinproObj.amount;
      } else {
        return 0;
      }
    });

    const suminpro = valueinpro?.reduce(
      (accum: any, cur: any) => accum + cur,
      0,
    );
    // console.log(suminpro)

    //dispose vehicle
    const tempvehicledis = vehicle_data?.filter(
      (r: any) => r.status == 'ชำรุด',
    );
    const valuedis = label.map((num) => {
      const valuedisoObj: any = tempvehicledis?.find(
        (obj: any) => obj.supply_name == num,
      );
      if (valuedisoObj) {
        return valuedisoObj.amount;
      } else {
        return 0;
      }
    });
    // console.log(valuedis);
    const sumdis = valuedis?.reduce((accum: any, cur: any) => accum + cur, 0);
    // console.log(sumdis)

    const oveallfree = [
      {
        name: 'ชำรุด',
        data: valuedis,
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
    const allsum = [sumdis, suminpro, sumfree];

    //--------------------------------------------------------------------------------------
    //activity
    const vehicle_activity = `[dbo].[Db_Trs_Vehicle]
    @unit_nos= '${body.unit_no}',
    @dataset_name = N'vehicle_activity'`;
    const vehicle_activity_data: TrsDashboard[] =
      await this.trsrepository.query(vehicle_activity);
    // console.log('vehicle_activity_data', vehicle_activity_data);
    const totalactivity = vehicle_activity_data
      ?.map((r: any) => r.amount)
      .reduce((accum: any, cur: any) => accum + cur, 0);
    // console.log('totalactivity', totalactivity);
    const overall_vehicle_activity = vehicle_activity_data?.map((r: any) => ({
      title: r.name,
      image: r.img,
      percent: Math.floor((r.amount * 100) / totalactivity),
      license: r.attribute_value,
      supply_name: r.supply_name,
      amount: r.amount,
      status: r.status == 0 ? 'ว่าง' : 'ไม่ว่าง',
    }));
    // console.log('totalactivity', totalactivity);
    // console.log('vehicle_activity_data', overall_vehicle_activity);

    //--------------------------------------------------------------------------------------
    //vehicle status
    const vehicle_status = `[dbo].[Db_Trs_Vehicle]
    @unit_nos= '${body.unit_no}',
    @dataset_name = N'vehicle_status'`;
    const vehicle_status_data: TrsDashboard[] = await this.trsrepository.query(
      vehicle_status,
    );
    // console.log('vehicle_status_data', vehicle_status_data);

    const avai = vehicle_status_data?.map((r: any) => r?.free);
    const inpro = vehicle_status_data?.map((r: any) => r?.inpro);
    const totalall = inpro[0] + avai[0];
    const percentage = Math.floor((avai[0] * 100) / totalall);
    const overallvehiclestatus = [inpro[0], avai[0], totalall, [percentage]];
    // console.log('overallvehiclestatus', overallvehiclestatus);

    //--------------------------------------------------------------------------------------
    //driver resource
    const vehicle_driver_resource = `[dbo].[Db_Trs_Vehicle]
    @unit_nos= '${body.unit_no}',
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

    //--------------------------------------------------------------------------------------
    //license
    // const license = `[dbo].[Db_Trs_Vehicle]
    // @unit_nos= ${id},
    // @dataset_name = N'license'`;
    // const license_data: TrsDashboard[] = await this.trsrepository.query(
    //   license,
    // );
    // const labelpie = license_data?.map((r: any) => r.amount);
    // const datapie = license_data?.map((r: any) => r.license_name);
    // const overalllicense = [labelpie, datapie];

    // console.log('datapie', [labelpie, datapie]);
    //--------------------------------------------------------------------------------------
    //driver status
    const driver_status = `[dbo].[Db_Trs_Vehicle]
    @unit_nos= '${body.unit_no}',
    @dataset_name = N'driver_status'`;
    const driver_status_data: TrsDashboard[] = await this.trsrepository.query(
      driver_status,
    );

    const inprogress = driver_status_data?.map((r: any) => r?.inprogress);
    const available = driver_status_data?.map((r: any) => r?.available);
    const total = inprogress[0] + available[0];
    const percent = (available[0] * 100) / total;
    const overalldriverstatus = [inprogress[0], available[0], total, [percent]];
    // console.log('overalldriverstatus', overalldriverstatus);

    //--------------------------------------------------------------------------------------

    //------------------------------------------------------------------------------//
    const help = `[dbo].[Db_Trs_Vehicle]
    @unit_nos= '${body.unit_no}',
    @dataset_name = N'helplist',
    @start_date  =  '${body?.start_date}',
	  @end_date  =  '${body?.end_date}'`;
    // console.log('help',help)
    const help_data: TrsDashboard[] = await this.trsrepository.query(help);
    // console.log('help', help_data);
    const overallhelp = help_data?.map((r: any) => ({
      title: ` ${r.note} ${r.activity_name}  ${r.convoy_name}`,
      description: `พลขับ ${r.firstname} ${r.lastname} ตำแหน่ง ${r.lat} ${r.long}`,
      image: `/images/Logistic/etc/warning.png`,
      status: r.help_status,
      warning: '!',
    }));
    // console.log('overallhelp', overallhelp);
    //------------------------------------------------------------------------------//

    const oiltype = `[dbo].[Db_Trs_Vehicle]
    @unit_nos= '${body.unit_no}',
    @dataset_name = N'oiltype',
    @start_date  =  '${body.start_date}',
	  @end_date  =  '${body.end_date}'`;
    const oiltype_data: TrsDashboard[] = await this.trsrepository.query(
      oiltype,
    );
    console.log('oiltype_data', oiltype_data);
    const oiltypeoverall = [
      oiltype_data?.map((r: any) => (r.type != null ? r.type : 0)),
      oiltype_data?.map((r: any) => (r.refuel != null ? r.refuel : 0)),
    ];

    console.log('oiltypeoverall', oiltypeoverall);
    //------------------------------------------------------------------------------//
    const activitycard = `[dbo].[Db_Trs_Vehicle]
    @unit_nos= '${body.unit_no}',
    @dataset_name = N'activitycard',
    @start_date  =  '${body?.start_date}',
	  @end_date  =  '${body?.end_date}'`;
    // console.log('activitycard', activitycard);
    const activitycard_data: TrsDashboard[] = await this.trsrepository.query(
      activitycard,
    );
    // console.log(
    //   'activitycard_data',
    //   activitycard_data?.map((r: any) => [
    //     r.help,
    //     r.accident,
    //     r.all_activity,
    //   ])[0],
    // );

    //------------------------------------------------------------------------------//
    //activitybymonth
    const activitybymonth = `[dbo].[Db_Trs_Vehicle]
    @unit_nos= '${body.unit_no}',
    @dataset_name = N'activitybymonth'`;
    const activitybymonth_data: TrsDashboard[] = await this.trsrepository.query(
      activitybymonth,
    );
    // console.log('activitybymonth_data', activitybymonth_data);
    const month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    const activitybymonthall = month.map((num) => {
      const valuedisoObj: any = activitybymonth_data?.find(
        (obj: any) => obj.month == num,
      );
      if (valuedisoObj) {
        return valuedisoObj.amount;
      } else {
        return 0;
      }
    });
    // console.log(activitybymonthall);

    //fuelbymonth
    const fuelbymonth = `[dbo].[Db_Trs_Vehicle]
    @unit_nos= '${body.unit_no}',
    @dataset_name = N'fuelbymonth'`;
    const fuelbymonth_data: TrsDashboard[] = await this.trsrepository.query(
      fuelbymonth,
    );
    // console.log('activitybymonth_data', fuelbymonth_data);

    const fuelbymonthall = month.map((num) => {
      const valuedisoObj: any = fuelbymonth_data?.find(
        (obj: any) => obj.month == num,
      );
      if (valuedisoObj) {
        return valuedisoObj.amount;
      } else {
        return 0;
      }
    });
    // console.log('fuelbymonthall', fuelbymonthall);
    const overallbymonth = [
      {
        name: 'เชื้อเพลิง',

        data: [{ data: fuelbymonthall }],
      },
      {
        name: 'ภารกิจ',
        data: [{ data: activitybymonthall }],
      },
    ];

    //------------------------------------------------------------------------------//
    const fuelbytype = `[dbo].[Db_Trs_Vehicle]
    @unit_nos= '${body.unit_no}',
    @dataset_name = N'fuelbytype'`;
    const fuelbytype_data: TrsDashboard[] = await this.trsrepository.query(
      fuelbytype,
    );

    console.log('fuelbytype_data',fuelbytype_data)

    const fuelbytypelabel = fuelbytype_data?.map((r: any) =>
      r.type != null ? r.type : 0,
    );
    const fuelbytypedata = fuelbytype_data?.map((r: any) =>
      r.amount != null ? r.amount : 0,
    );

    

    console.log('activitybymonth_data', [fuelbytypelabel, fuelbytypedata]);
    //------------------------------------------------------------------------------//
    //activitytimeline
    const activitytimeline = `[dbo].[Db_Trs_Vehicle]
    @unit_nos= '${body.unit_no}',
    @dataset_name = N'activitytimeline'`;
    const activitytimeline_data: TrsDashboard[] =
      await this.trsrepository.query(activitytimeline);
    // console.log('activitytimeline_data', activitytimeline_data);

    //------------------------------------------------------------------------------//
    //dailyactivity
    const dailyactivity = `[dbo].[Db_Trs_Vehicle]
    @unit_nos= '${body.unit_no}',
    @dataset_name = N'dailyactivity'`;
    const dailyactivity_data: TrsDashboard[] = await this.trsrepository.query(
      dailyactivity,
    );
    //jan//
    const daily = [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
    ];
    const janmonthdaily = dailyactivity_data?.filter((r: any) => r.month == 1);
    const valuejan = daily?.map((num) => {
      const matchingObj: any = janmonthdaily?.find(
        (obj: any) => obj.day == num,
      );
      if (matchingObj) {
        return matchingObj.amount;
      } else {
        return 0;
      }
    });
    // console.log('valuejan', valuejan);
    //Feb//
    const febmonthdaily = dailyactivity_data?.filter((r: any) => r.month == 2);
    const valuefeb = daily?.map((num) => {
      const matchingObj: any = febmonthdaily?.find(
        (obj: any) => obj.day == num,
      );
      if (matchingObj) {
        return matchingObj.amount;
      } else {
        return 0;
      }
    });
    // console.log('valuefeb', valuefeb);
    //Mar//
    const marmonthdaily = dailyactivity_data?.filter((r: any) => r.month == 3);
    const valuemar = daily?.map((num) => {
      const matchingObj: any = marmonthdaily?.find(
        (obj: any) => obj.day == num,
      );
      if (matchingObj) {
        return matchingObj.amount;
      } else {
        return 0;
      }
    });
    // console.log('valuemar', valuemar);
    //April//
    const aprilmonthdaily = dailyactivity_data?.filter(
      (r: any) => r.month == 4,
    );
    const valueapi = daily?.map((num) => {
      const matchingObj: any = aprilmonthdaily?.find(
        (obj: any) => obj.day == num,
      );
      if (matchingObj) {
        return matchingObj.amount;
      } else {
        return 0;
      }
    });
    // console.log('valueapi', valueapi);

    //May//
    const maymonthdaily = dailyactivity_data?.filter((r: any) => r.month == 5);
    const valuemay = daily?.map((num) => {
      const matchingObj: any = maymonthdaily?.find(
        (obj: any) => obj.day == num,
      );
      if (matchingObj) {
        return matchingObj.amount;
      } else {
        return 0;
      }
    });
    // console.log('valuemay', valuemay);
    //jun//
    const junmonthdaily = dailyactivity_data?.filter((r: any) => r.month == 6);
    const valuejun = daily?.map((num) => {
      const matchingObj: any = junmonthdaily?.find(
        (obj: any) => obj.day == num,
      );
      if (matchingObj) {
        return matchingObj.amount;
      } else {
        return 0;
      }
    });
    // console.log('valuejun', valuejun);

    //july//
    const julymonthdaily = dailyactivity_data?.filter((r: any) => r.month == 7);
    const valuejuly = daily?.map((num) => {
      const matchingObj: any = julymonthdaily?.find(
        (obj: any) => obj.day == num,
      );
      if (matchingObj) {
        return matchingObj.amount;
      } else {
        return 0;
      }
    });
    // console.log('valuejuly', valuejuly);

    //aug//
    const augmonthdaily = dailyactivity_data?.filter((r: any) => r.month == 8);
    const valueaug = daily?.map((num) => {
      const matchingObj: any = augmonthdaily?.find(
        (obj: any) => obj.day == num,
      );
      if (matchingObj) {
        return matchingObj.amount;
      } else {
        return 0;
      }
    });
    // console.log('valueaug', valueaug);

    //sep//
    const sepmonthdaily = dailyactivity_data?.filter((r: any) => r.month == 9);
    const valuesep = daily?.map((num) => {
      const matchingObj: any = sepmonthdaily?.find(
        (obj: any) => obj.day == num,
      );
      if (matchingObj) {
        return matchingObj.amount;
      } else {
        return 0;
      }
    });
    // console.log('valuesep', valuesep);

    //oct//
    const octmonthdaily = dailyactivity_data?.filter((r: any) => r.month == 10);
    const valueoct = daily?.map((num) => {
      const matchingObj: any = octmonthdaily?.find(
        (obj: any) => obj.day == num,
      );
      if (matchingObj) {
        return matchingObj.amount;
      } else {
        return 0;
      }
    });
    // console.log('valueoct', valueoct);

    //nov//
    const novmonthdaily = dailyactivity_data?.filter((r: any) => r.month == 11);
    const valuenov = daily?.map((num) => {
      const matchingObj: any = novmonthdaily?.find(
        (obj: any) => obj.day == num,
      );
      if (matchingObj) {
        return matchingObj.amount;
      } else {
        return 0;
      }
    });
    // console.log('valuenov', valuenov);

    //dec//
    const decmonthdaily = dailyactivity_data?.filter((r: any) => r.month == 12);
    const valuedec = daily?.map((num) => {
      const matchingObj: any = decmonthdaily?.find(
        (obj: any) => obj.day == num,
      );
      if (matchingObj) {
        return matchingObj.amount;
      } else {
        return 0;
      }
    });
    // console.log('valuedec', valuedec);

    const datadaily = [
      {
        name: 'มค',
        data: valuejan,
      },
      {
        name: 'กพ',
        data: valuefeb,
      },
      {
        name: 'มีค',
        data: valuemar,
      },
      {
        name: 'เมย',
        data: valueapi,
      },
      {
        name: 'พค',
        data: valuemay,
      },
      {
        name: 'มย',
        data: valuejun,
      },
      {
        name: 'กค',
        data: valuejuly,
      },
      {
        name: 'สค',
        data: valueaug,
      },
      {
        name: 'กย',
        data: valuesep,
      },
      {
        name: 'ตค',
        data: valueoct,
      },
      {
        name: 'พย',
        data: valuenov,
      },
      {
        name: 'ธค',
        data: valuedec,
      },
    ];
    // console.log('datadaily',datadaily)

    return {
      datadaily: datadaily,
      vehicle_resource: [oveallfree, label, allsum, type],
      vehicle_activity: overall_vehicle_activity,
      vehicle_driver_resource: overalldriver,
      vehicle_status: overallvehiclestatus,
      overallfueltype: [fuelbytypelabel, fuelbytypedata],
      timeline: activitytimeline_data,
      // license: overalllicense,
      driver_status: overalldriverstatus,
      helplist: overallhelp,
      activitycard: activitycard_data?.map((r: any) => [
        r.help,
        r.accident,
        r.all_activity,
      ])[0],
      overallbymonth: overallbymonth,
      oiltypeoverall: oiltypeoverall,
    };
  }
}
