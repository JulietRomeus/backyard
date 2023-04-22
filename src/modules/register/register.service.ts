import { directusFiles } from './../../entities/DirectusFiles.entity';
import { Injectable } from '@nestjs/common';
import { CreateRegisterDto } from './dto/create-register.dto';
import { UpdateRegisterDto } from './dto/update-register.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import {
  trsRegis,
  trsRegisStatusform,
  trsRegisDetail,
  trsRegisStatus,
  trsRegisFiles,
} from '../../entities/Index';
import { Repository, Brackets, Not } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import now from '../../utils/now';
const listFields = `*,trs_regis_statusform_no.*,trs_regis_status_no.*,trs_regis_detail_no.*,files.*,files.directus_files_id.*`;
@Injectable()
export class RegisterService {
  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(trsRegis, 'MSSQL_CONNECTION')
    private trsRegisRepo: Repository<trsRegisStatus>,
    @InjectRepository(trsRegisDetail, 'MSSQL_CONNECTION')
    private trsRegisDetailRepo: Repository<trsRegisDetail>,
    @InjectRepository(trsRegisStatusform, 'MSSQL_CONNECTION')
    private trsRegisStatusformRepo: Repository<trsRegisStatusform>,
    @InjectRepository(trsRegisStatus, 'MSSQL_CONNECTION')
    private trsRegisStatusRepo: Repository<trsRegisStatus>,
    @InjectRepository(trsRegisFiles, 'MSSQL_CONNECTION')
    private trsRegisFilesRepo: Repository<trsRegisFiles>,
    @InjectRepository(directusFiles, 'MSSQL_CONNECTION')
    private directusFilesRepo: Repository<directusFiles>,
  ) {}

  async findAll(body, query) {
    console.log('body', body.request_by);
    console.log('query', query);
    const unit_no = body.request_by.units?.map((r: any) => r.code);
    console.log(unit_no);

    if (query.type == 'req') {
      let filterObj = {
        is_active: { _eq: 1 },
        trs_regis_statusform_no: {
          id: {
            _in: [
              'approved',
              'draft',
              'review',
              'pending_approve',
              'approved',
              'diapproved',
              'res_approved',
            ],
          },
        },
        unit_no: { _in: unit_no },
        // filter ข้อมูลที่ยังไม่ถูกลบ
      };

      const filterString = JSON.stringify(filterObj);
      console.log('filterObj', filterString);
      const getQuery = `trs_regis?filter=${filterString}&fields=${listFields}`;
      console.log(this.httpService.get(`/items/${getQuery}`));
      try {
        const result = await firstValueFrom(
          this.httpService.get(`/items/${getQuery}`),
        );
        console.log(result.data);
        return result?.data?.data || [];
      } catch (error) {
        console.log('error get status', error);
        return {};
      }
    } else {
      let filterObj = {
        is_active: { _eq: 1 },
        trs_regis_statusform_no: {
          id: {
            _in: [
              'res_approved',
              'approved',
              'res_review',
              'res_pending_approve',
              'res_approved',
              'res_diapproved',
            ],
          },
        },
        unit_no: { _in: unit_no },

        // filter ข้อมูลที่ยังไม่ถูกลบ
      };

      const filterString = JSON.stringify(filterObj);
      console.log('filterObj', filterString);
      const getQuery = `trs_regis?filter=${filterString}&fields=${listFields}`;
      console.log(this.httpService.get(`/items/${getQuery}`));
      try {
        const result = await firstValueFrom(
          this.httpService.get(`/items/${getQuery}`),
        );
        console.log(result.data);
        return result?.data?.data || [];
      } catch (error) {
        console.log('error get status', error);
        return {};
      }
    }
  }

  // async findAll(query) {
  //   console.log('query',query)
  //   if(query.type == "req")
  //  { return await this.trsRegisRepo
  //     .createQueryBuilder('d')
  //     .where('d.is_active = 1')
  //     .leftJoinAndSelect('d.trs_regis_detail_no', 'tdll', 'tdll.is_active = 1')
  //     .leftJoinAndSelect('d.trs_regis_status_no', 'trsn', 'trsn.is_active=1')
  //     .leftJoinAndSelect(
  //       'd.trs_regis_statusform_no',
  //       'trsfn',
  //       'trsfn.is_active=1',
  //     )
  //     .getMany()
  //   }
  //     else{
  //       return await this.trsRegisRepo
  //     .createQueryBuilder('d')
  //     .where('d.is_active = 1')
  //     .leftJoinAndSelect('d.trs_regis_detail_no', 'tdll', 'tdll.is_active = 1')
  //     .leftJoinAndSelect('d.trs_regis_status_no', 'trsn', 'trsn.is_active=1')
  //     .leftJoinAndSelect(
  //       'd.trs_regis_statusform_no',
  //       'trsfn',
  //       'trsfn.is_active=1'
  //     )
  //     .getMany()
  //     }
  // }

  // async findAllActive(): Promise<mobResourceRequirement[]> {
  //   return await this.mobResourceRequirementRepository.find(
  //     {
  //       where: {
  //         is_active: 1
  //       },
  //       // relations: ['plan', 'account_type'],
  //       // select: {
  //       //   plan: { id: true },
  //       //   account_type: { id: true }
  //       // }
  //     }
  //   )
  // }

  async findOptioncontract() {
    console.log('first');
    return await this.trsRegisRepo.query(
      `select sc.name as contract_name,sc.id as contract_id ,sc2.name as company_name ,sc2.id as contract_item_id,
      sci.total_price,sci.supply_spec_id,sss.name as spec ,sss.id as spec_id from slc_contract sc 
      left join slc_contract_item sci on sci.contact_id = sc.id 
      left join slc_company sc2 on sc2.id = sc.company_id 
      left join slc_supply_spec sss on sss.id = sci.supply_spec_id 
      where sc.is_active = 1   
      `,
    );
  }

  async findOne(id: any) {
    //console.log('body', body?.request_by || '');
    //console.log('query', query);
    let filterObj = {
      is_active: { _eq: 1 }, // filter ข้อมูลที่ยังไม่ถูกลบ
    };

    const filterString = JSON.stringify(filterObj);
    // console.log('filterObj', filterString);
    const getQuery = `trs_regis/${id}?filter=${filterString}&fields=${listFields}`;
    try {
      const result = await firstValueFrom(
        this.httpService.get(`/items/${getQuery}`),
      );
      // console.log(result.data);
      return result?.data?.data || [];
    } catch (error) {
      console.log('error get status', error);
      return {};
    }
  }

  // async findOne(id: any) {
  //   return this.trsRegisRepo
  //     .createQueryBuilder('d')
  //     .where('d.id =:id', { id: id })
  //     .leftJoinAndSelect('d.trs_regis_detail_no', 'tdll', 'tdll.is_active = 1')
  //     .leftJoinAndSelect('d.trs_regis_status_no', 'trsn', 'trsn.is_active=1')
  //     .leftJoinAndSelect(
  //       'd.trs_regis_statusform_no',
  //       'trsfn',
  //       'trsfn.is_active=1',
  //     )
  //     .getOne();
  // }

  async create(CreateRegisterDto: any) {
    console.log('CreateRegisterDto', CreateRegisterDto);
    let timeNow = now();
    let user = CreateRegisterDto.request_by;
    let dataObj = CreateRegisterDto;
    dataObj.create_by = CreateRegisterDto;
    dataObj['create_by_id'] = user.id;
    dataObj['create_by'] = user.displayname;
    dataObj['create_date'] = timeNow;
    // dataObj['update_by_id'] = user.id;
    // dataObj['update_by'] = user.displayname;
    // dataObj['update_date'] = timeNow;
    const finalItems = this.trsRegisRepo.create(dataObj);
    console.log('finalItems', finalItems);
    //------creatsubitem---------//
    let subItems = new trsRegis();
    Object.keys(dataObj)?.map((keys) => {
      subItems[keys] = dataObj[keys] || null;
    });
    console.log('subItems', subItems);
    console.log('dataObj.trs_regis_detail_no', dataObj.trs_regis_detail_no);
    const trs_regis_detail_no = dataObj.trs_regis_detail_no?.map(
      (rec: trsRegisDetail) => {
        let temDetail = new trsRegisDetail();

        Object.keys(rec)?.map((keys) => {
          temDetail[keys] = rec[keys] || null;
        });
        return temDetail;
      },
    );

    const files = dataObj.files?.map((r: any) => {
      let tempfiles = new trsRegisFiles();

      tempfiles.directus_files_id = r.directus_files_id;

      return tempfiles;
    });

    subItems.trs_regis_files = files;
    subItems.trs_regis_detail_no = trs_regis_detail_no;

    const dbRes = await this.trsRegisRepo.save(subItems);
    console.log('dbRes', dbRes);

    return await this.findOne(dbRes.id);
  }

  async update(id: number, updateRegisterDto: any): Promise<any> {
    console.log('updated');
    console.log('updateRegisterDto', updateRegisterDto);

    let timeNow = now();
    console.log('timeNow', timeNow);

    let user = updateRegisterDto.request_by;

    let dataObj = updateRegisterDto;
    dataObj['update_by_id'] = user.id;
    delete dataObj.request_by;
    delete dataObj.id;
    dataObj['update_date'] = timeNow;
    dataObj['update_by'] = user.displayname;

    let finalItems = dataObj;
    finalItems.id = id;
    finalItems.trs_regis_detail_no = dataObj.trs_regis_detail_no.map(
      (d: trsRegisDetail) => this.trsRegisDetailRepo.create({ ...d }),
    );
    console.log('finalItemssss', finalItems);

    console.log('dfff', finalItems);
    const dbRes = await this.trsRegisRepo.save(finalItems);
    console.log('dbRes', dbRes);
    return await this.findOne(id);
  }

  async send(id: number, updateRegisterDto: any, query: any): Promise<any> {
    console.log('send');
    console.log('updateRegisterDto', updateRegisterDto);
    console.log('query', query);

    let timeNow = now();
    console.log('timeNow', timeNow);

    let user = updateRegisterDto.request_by;

    let dataObj = updateRegisterDto;
    // dataObj['update_by_id'] = user.id;
    if (query.type == 'req') {
      // dataObj['review_by_id'] = user.id;
      delete dataObj.request_by;
      delete dataObj.id;
      // dataObj['review_date'] = timeNow;
      // dataObj['review_by'] = user.displayname
    } else {
      dataObj['res_update_by_id'] = user.id;
      delete dataObj.request_by;
      delete dataObj.id;
      dataObj['res_update_date'] = timeNow;
      dataObj['res_update_by'] = user.displayname;
    }

    let subItems = new trsRegis();
    subItems.id=+id
    Object.keys(dataObj)?.map((keys) => {
      subItems[keys] = dataObj[keys] || null;
    });

    const finalItems = dataObj;
    // finalItems.id = id;
    if (query.type == 'req') {
      subItems.trs_regis_statusform_no.id = 'review';
    } else {
      subItems.trs_regis_statusform_no.id = 'res_review';
    }
    console.log('finalItems', subItems);
    //---------------------------------
    subItems.trs_regis_detail_no.map((d: trsRegisDetail) =>
      this.trsRegisDetailRepo.save({ ...d, regis_no: id }),
    );
    //---------------------------------
    const files:trsRegisFiles[] = dataObj.files?.map( (r: any) => {
      let tempfiles = new trsRegisFiles();
      // let file:any =  this.directusFilesRepo.create({...r.directus_files_id})
      let file = new directusFiles()
      file.id = r.directus_files_id.id
      tempfiles.directus_files_id = file//r.directus_files_id;
      console.log('tempfiles',file)
      return tempfiles;
    });

    
    subItems.trs_regis_files = files;
    console.log('files',files)

    finalItems.trs_regis_files = files;
    
    //----------------------------------
    console.log('finalItems',subItems)

    // delete dataObj.trs_regis_detail_no;
    // delete dataObj.files;
    //---------------------------------

    //----------------------------------
    // const final = this.trsRegisRepo.create({...subItems})

    const dbRes = await this.trsRegisRepo.save(subItems);
    // console.log('dbRes', dbRes);
    return await this.findOne(id);
  }

//------------------------------------------------------------

  async review(id: number, updateRegisterDto: any, query: any): Promise<any> {
    console.log('updateRegisterDto', updateRegisterDto);
    console.log('query', query);
    let timeNow = now();
    let user = updateRegisterDto.request_by;
    let dataObj = updateRegisterDto;
    // const finalItems = dataObj;

    let subItems = new trsRegis();
    subItems.id=+id
    Object.keys(dataObj)?.map((keys) => {
      subItems[keys] = dataObj[keys] || null;
    });

    if (query.type == 'req') {
      subItems.trs_regis_statusform_no.id = 'pending_approve';
    } else {
      subItems.trs_regis_statusform_no.id = 'res_pending_approve';
    }
    if (query.type == 'req') {
      dataObj['review_by_id'] = user.id;
      delete dataObj.request_by;
      delete dataObj.id;
      dataObj['review_date'] = timeNow;
      dataObj['review_by'] = user.displayname;
    } else {
      dataObj['res_review_by_id'] = user.id;
      delete dataObj.request_by;
      delete dataObj.id;
      dataObj['res_review_date'] = timeNow;
      dataObj['res_review_by'] = user.displayname;
    }
    console.log('subItems', subItems);

   

    dataObj.trs_regis_detail_no.map((d: trsRegisDetail) =>
      this.trsRegisDetailRepo.save({ ...d, regis_no: id }),
    );

    // delete dataObj.trs_regis_detail_no;

    //----------------------------------------------
    const files:trsRegisFiles[] = dataObj.files?.map( (r: any) => {
      let tempfiles = new trsRegisFiles();
      // let file:any =  this.directusFilesRepo.create({...r.directus_files_id})
      let file = new directusFiles()
      file.id = r.directus_files_id.id
      tempfiles.directus_files_id = file//r.directus_files_id;
      console.log('tempfiles',file)
      return tempfiles;
    });  
    // subItems.trs_regis_files = files;
    console.log('files',files)
    subItems.trs_regis_files = files;
    const dbRes = await this.trsRegisRepo.save(subItems);
    console.log('dbRes', dbRes);
    return await this.findOne(id);
  }

  //------------------------------------------------------------

  async approve(id: number, updateRegisterDto: any, query: any): Promise<any> {
    console.log('updateRegisterDto', updateRegisterDto);
    console.log('queryyyyyyy', query);
    let timeNow = now();
    let user = updateRegisterDto.request_by;
    let dataObj = updateRegisterDto;
    // dataObj['update_by_id'] = user.id;
    delete dataObj.request_by;
    delete dataObj.id;
    // dataObj['update_date'] = timeNow;
    // dataObj['update_by'] = user.displayname;
    const finalItems = dataObj;

    if (query.type == 'req') {
      finalItems.trs_regis_statusform_no.id = 'approved';
      dataObj['approve_by_id'] = user.id;
      delete dataObj.request_by;
      delete dataObj.id;
      dataObj['approve_date'] = timeNow;
      dataObj['approve_by'] = user.displayname;
    } else {
      finalItems.trs_regis_statusform_no.id = 'res_approved';
      dataObj['res_approve_by_id'] = user.id;
      delete dataObj.request_by;
      delete dataObj.id;
      dataObj['res_approve_date'] = timeNow;
      dataObj['res_approve_by'] = user.displayname;
    }

    // console.log('query.typejaa', query.type);
    dataObj.trs_regis_detail_no.map((d: trsRegisDetail) =>
      this.trsRegisDetailRepo.save({ ...d, regis_no: id }),
    );

    delete dataObj.trs_regis_detail_no;
    delete dataObj.files;
    const dbRes = await this.trsRegisRepo.update(id, finalItems);
    return await this.findOne(id);
  }

  async remove(id: number, updateRegisterDto: any, query: any): Promise<any> {
    console.log('updateRegisterDto', updateRegisterDto);
    let timeNow = now();
    let user = updateRegisterDto.request_by;
    let dataObj = updateRegisterDto;
    dataObj['delete_by_id'] = user.id;
    delete dataObj.request_by;
    delete dataObj.id;
    dataObj['delete_date'] = timeNow;
    dataObj['delete_by'] = user.displayname;
    const finalItems = dataObj;
    finalItems.is_active = 0;
    const dbRes = await this.trsRegisRepo.update(id, finalItems);
  }

  async getvehicle(id: any) {
    return await this.trsRegisRepo.query(
      `SET NOCOUNT ON;

      declare @brand_key varchar(100)
      declare @model_key varchar(100)
      set @brand_key = N'1'
      set @model_key = N'2'
        
      
    --keyword ยี่ห้อ 1 รุ่น 2 ทะเบียน ขส. 21 ทะเบียนทหาร 19
    --master attribute type ของ พาหนะ ยี่ห้อ 12 รุ่น 13
    -- toyota 
    -- ทะเบียนทหาร 19 ทะเบียน ขส. 21 หมายเลขเครื่องยนต์ 37 หมายเลขแซสซี 38
      
    declare @temps table
    (
      RowID INT IDENTITY (1,1),
      item_id bigint,
      item_name nvarchar(255),
      spec_id int,
      spec_name nvarchar(255),
      supply_id int,
      supply_name nvarchar(255),
      toa_id int,
      toa_name nvarchar(255),
      contract_id int,
      [contract_name] nvarchar(255),
      contract_type_id int,
      contract_type nvarchar(255),
      procurement_id int,
      procurement_name nvarchar(255),
      procurement_type_id int,
      procurement_type nvarchar(255),
      procedure_id int,
      [procedure_name] nvarchar(255),
      sub_procedure_id int,
      [sub_procedure_name] nvarchar(255),
      company_id int,
      company_name nvarchar(255),
      delivery_date datetime,
      engine_number nvarchar(255),
      frame_number nvarchar(255),
      spec_keyword_id int,
      spec_keyword nvarchar(255),
      spec_attribute_value_id bigint,
      spec_attribute_value nvarchar(255),
      master_attribute_id int,
      master_attribute_type nvarchar(255),
      master_attribute_detail_id int,
      master_attribute_detail nvarchar(255),
      master_attribute_detail_parentid int,
      item_status nvarchar(255),
      unit_name nvarchar(255),
      receive_type nvarchar(255),
      receive_label nvarchar(255)
    )
    
    declare @brandAndModelResult table
    (
      RowID INT IDENTITY (1,1),
      item_id bigint,
      item_name nvarchar(255),
      spec_id int,
      spec_name nvarchar(255),
      supply_id int,
      supply_name nvarchar(255),
      toa_id int,
      toa_name nvarchar(255),
      contract_id int,
      [contract_name] nvarchar(255),
      contract_type_id int,
      contract_type nvarchar(255),
      procurement_id int,
      procurement_name nvarchar(255),
      procurement_type_id int,
      procurement_type nvarchar(255),
      procedure_id int,
      [procedure_name] nvarchar(255),
      sub_procedure_id int,
      [sub_procedure_name] nvarchar(255),
      company_id int,
      company_name nvarchar(255),
      delivery_date datetime,
      engine_number nvarchar(255),
      frame_number nvarchar(255),
      spec_keyword_id int,
      spec_keyword nvarchar(255),
      spec_attribute_value_id bigint,
      spec_attribute_value nvarchar(255),
      master_attribute_id int,
      master_attribute_type nvarchar(255),
      master_attribute_detail_id int,
      master_attribute_detail nvarchar(255),
      master_attribute_detail_parentid int,
      item_status nvarchar(255),
      unit_name nvarchar(255),
      receive_type nvarchar(255),
      receive_label nvarchar(255)
    )
    declare @carNumberResult table
    (
      RowID INT IDENTITY (1,1),
      attribute_name nvarchar(255),
      item_id bigint,
      car_number nvarchar(255),
      engine_number nvarchar(255),
      frame_number nvarchar(255),
      keyword_id int
    )
    
    declare @finalResult table
    (
      RowID INT IDENTITY (1,1),
      item_id bigint,
      item_name nvarchar(255),
      spec_id bigint,
      spec_name nvarchar(255),
      brand nvarchar(255),
      model nvarchar(255),
      car_number nvarchar(255),
      army_number nvarchar(255),
      receive_type nvarchar(255),
      receive_label nvarchar(255),
      unit_name nvarchar(255),
      image_key nvarchar(255),
      item_status nvarchar(255),
      supply_id int,
      supply_name nvarchar(255),
      toa_id int,
      toa_name nvarchar(255),
      contract_id int,
      [contract_name] nvarchar(255),
      contract_type_id int,
      contract_type nvarchar(255),
      procurement_id int,
      procurement_name nvarchar(255),
      procurement_type_id int,
      procurement_type nvarchar(255),
      procedure_id int,
      [procedure_name] nvarchar(255),
      sub_procedure_id int,
      [sub_procedure_name] nvarchar(255),
      company_id int,
      company_name nvarchar(255),
      delivery_date datetime,
      engine_number nvarchar(255),
      frame_number nvarchar(255)
    )
      
    insert into @temps 
    (
      item_id,
      item_name,
      spec_id,
      spec_name,
      spec_keyword_id,
      spec_attribute_value_id,
      spec_attribute_value,
      master_attribute_id,
      master_attribute_type,
      master_attribute_detail_id,
      master_attribute_detail,
      master_attribute_detail_parentid,
      item_status,
      unit_name,
      receive_type,
      receive_label,
      supply_id,
      supply_name,
      toa_id,
      toa_name,
      contract_id,
      [contract_name],
      contract_type_id,
      contract_type,
      procurement_id,
      procurement_name,
      procurement_type_id,
      procurement_type,
      procedure_id,
      [procedure_name],
      sub_procedure_id,
      [sub_procedure_name],
      company_id,
      company_name,
      delivery_date
      
    )
      select 
     si.id as item_id,
     si.[name] as item_name,
     yandr.y_spec_id as spec_id,
     yandr.y_spec_name as spec_name,
     ssa.attribute_keyword_id as spec_keyword_id,
     ssav.id as spec_attribute_value_id,
     ssav.attribute_value as spec_attribute_value,
     mat.id as master_attribute_id,
     mat.[type] as master_attribute_type,
     matd.id as master_attribute_detail_id,
     matd.[type] as master_attribute_detail,
     matd.parent_id as master_attribute_detail_parentid,
     rsis.[status],
     rst.[type],
     u.unit_abbr,
     ss.source_label,
     su.id,
     su.supply_name,
     toa.id,
     toa.[name],
     ct.id,
     ct.[name],
     ctt.id,
     ctt.[type],
     pcm.id,
     pcm.[name],
     rpt.id,
     rpt.[type],
     rpp.id,
     rpp.[type],
     rps.id,
     rps.sub_type,
     cmp.id,
     cmp.[name],
     cp.delivery_date
    
    
    
    
    from 
    slc_supply_item si
    right outer join (
    select 
    
     a1.spec_id as y_spec_id,
     a1.spec_name as y_spec_name,
     a1.spec_val_id as y_spec_val_id,
     a1.attri_name as attribute_name,
     a1.attribute_value as y_att_val,
     a1.attribute_value_id as attribute_value_id,
     a1.master_attribute_type_id  as y_master_type_id,
     sa2.attribute_keyword_id as r_key_id,
     sa2.attribute_name as r_attribute_name,
     sa2.master_attribute_type_id  as r_m_type_id,
     sav2.attribute_value as r_att_val,
     sav2.id as r_att_id
    
    from (
      select sav.supply_spec_id as spec_id,
      sav.id as spec_val_id,
      sc.[name] as spec_name,
      sa.attribute_name as attri_name,
      sav.attribute_value,
      sav.id as attribute_value_id,
      sa.master_attribute_type_id
      from slc_supply_spec_attribute_value sav
      left join slc_supply_spec_attribute sa on sa.id = sav.supply_spec_attribute_id
      left join slc_supply_spec sc on sc.id = sav.supply_spec_id
      where sa.master_attribute_type_id = 12 and sav.attribute_value = @brand_key) a1
      
    left outer join slc_supply_spec_attribute_value sav2  on a1.spec_id = sav2.supply_spec_id
    left outer join slc_supply_spec_attribute sa2 on sa2.id = sav2.supply_spec_attribute_id
    
    where sa2.master_attribute_type_id = 13 and sav2.attribute_value = @model_key) 
    yandr on yandr.y_spec_id = si.supply_spec_id
    LEFT JOIN MasterData.dbo.organization_unit as u ON u.unit_no COLLATE SQL_Latin1_General_CP1_CI_AS = si.unit_no COLLATE SQL_Latin1_General_CP1_CI_AS
    left outer join slc_supply_spec ssp on ssp.id = si.supply_spec_id
    left outer join slc_supply su on su.id = ssp.supply_id
    left outer join slc_toa toa on toa.id = su.toa_id
    left outer join slc_contract_period_item cpi on cpi.supply_item_id = si.id
    left outer join slc_contract_period cp on cp.id = cpi.contact_peroid_id
    left outer join slc_contract ct on ct.id = cp.contract_id
    left outer join slc_refs_contract_type ctt on ctt.id = ct.contract_type_id 
    left outer join slc_procurement pcm on pcm.id = ct.procurement_id
    left outer join slc_refs_procurement_type rpt on rpt.id = pcm.procurement_type_id
    left outer join slc_refs_procurement_procedure rpp on rpp.id = pcm.procedure_id
    left outer join slc_refs_procurement_subprocedure rps on rps.id = pcm.subprocedure_id
    left outer join slc_company cmp on cmp.id = ct.company_id
    left outer join slc_supply_source ss on ss.supply_item_id = si.id
    left outer join slc_refs_source_type rst on rst.id = ss.source_type_id
    left outer join slc_refs_supply_item_status rsis on rsis.id = si.supply_item_status_id
    left outer join slc_supply_spec_attribute_value ssav on ssav.supply_spec_id = yandr.y_spec_id
    left outer join slc_supply_spec_attribute ssa on ssa.id = ssav.supply_spec_attribute_id
    left outer join slc_master_attribute_keyword mak on mak.id = ssa.attribute_keyword_id
    left outer join slc_master_attribute_type mat on mat.id = ssa.master_attribute_type_id
    left outer join slc_master_attribute_type_detail matd on matd.master_attribute_type_id = mat.id and CAST(matd.[key] as varchar(10)) = ssav.attribute_value
    
    where (mak.id = 1 or mak.id = 2) and si.is_active = 1
    order by item_id
    
    --select * from @temps 
    
    DECLARE @i as int
      DECLARE @iRow as int
      DECLARE @iParent as int
      DECLARE @iParentRow as int
      DECLARE @cRow as int
      DECLARE @itemId as bigint
      DECLARE @detailRow as nvarchar(255)
      DECLARE @rowId as int
      DECLARE @keyId as int
      SET @i = 1
      SELECT @iRow = COUNT(*) FROM @temps
      WHILE (@i <= @iRow)
        BEGIN 
          
          SELECT @iParent = master_attribute_detail_parentid FROM @temps WHERE RowID = @i
    
          IF @iParent is null
            BEGIN
              INSERT INTO @finalResult 
                  (
                    item_id,
                    item_name,
                    spec_name,
                    spec_id,
                    brand,
                    model,
                    car_number,
                    army_number,
                    receive_type,
                    receive_label,
                    unit_name,
                    image_key,
                    item_status,
                    supply_id,
                    supply_name,
                    toa_id,
                    toa_name,
                    contract_id,
                    [contract_name],
                    contract_type_id,
                    contract_type,
                    procurement_id,
                    procurement_name,
                    procurement_type_id,
                    procurement_type,
                    procedure_id,
                    [procedure_name],
                    sub_procedure_id,
                    [sub_procedure_name],
                    company_id,
                    company_name,
                    delivery_date
    
                  )select 
                    item_id,
                    item_name,
                    spec_name,spec_id,
                    master_attribute_detail,
                    null,
                    null,
                    null,
                    receive_type,
                    receive_label,
                    unit_name,
                    null,
                    item_status,
                    supply_id,
                    supply_name,
                    toa_id,
                    toa_name,
                    contract_id,
                    [contract_name],
                    contract_type_id,
                    contract_type,
                    procurement_id,
                    procurement_name,
                    procurement_type_id,
                    procurement_type,
                    procedure_id,
                    [procedure_name],
                    sub_procedure_id,
                    [sub_procedure_name],
                    company_id,
                    company_name,
                    delivery_date
                     FROM @temps WHERE RowID = @i
              INSERT INTO @brandAndModelResult (
                item_id,
                item_name,
                spec_id,
                spec_name,
                spec_keyword_id,
                spec_attribute_value_id,
                spec_attribute_value,
                master_attribute_id,
                master_attribute_type,
                master_attribute_detail_id,
                master_attribute_detail,
                master_attribute_detail_parentid,
                unit_name,
                receive_type,
                receive_label,
                item_status,
                supply_id,
                supply_name,
                toa_id,
                toa_name,
                contract_id,
                [contract_name],
                contract_type_id,
                contract_type,
                procurement_id,
                procurement_name,
                procurement_type_id,
                procurement_type,
                procedure_id,
                [procedure_name],
                sub_procedure_id,
                [sub_procedure_name],
                company_id,
                company_name,
                delivery_date
              ) select item_id,
                item_name,
                spec_id,
                spec_name,
                spec_keyword_id,
                spec_attribute_value_id,
                spec_attribute_value,
                master_attribute_id,
                master_attribute_type,
                master_attribute_detail_id,
                master_attribute_detail,
                master_attribute_detail_parentid,
                unit_name,
                receive_type,
                receive_label,
                item_status,
                supply_id,
                supply_name,
                toa_id,
                toa_name,
                contract_id,
                [contract_name],
                contract_type_id,
                contract_type,
                procurement_id,
                procurement_name,
                procurement_type_id,
                procurement_type,
                procedure_id,
                [procedure_name],
                sub_procedure_id,
                [sub_procedure_name],
                company_id,
                company_name,
                delivery_date
                
                FROM @temps WHERE RowID = @i
            END
            
          
          
             
        SET @i = @i + 1 
        END -- WHILE
    
      --select * from @finalResult 
      --select * from @brandAndModelResult
    
      SET @i = 1
      WHILE (@i <= @iRow)
        BEGIN 
          -- Select from table
          SELECT @iParent = master_attribute_detail_parentid,@detailRow = master_attribute_detail , @itemId = item_id FROM @temps WHERE RowID = @i
    
          IF @iParent is not null
            BEGIN
              --PRINT ' iParent : ' + CONVERT(VARCHAR,@iParent)
              SELECT  @cRow = COUNT(RowID) FROM @temps WHERE master_attribute_detail_id = @iParent
              
              --PRINT ' cRow = ' + CONVERT(VARCHAR,@cRow) + ' detailRow = ' + @detailRow + ' itemId = ' + CONVERT(VARCHAR,@itemId)
              IF @cRow > 0
                BEGIN
                  update @finalResult set model = @detailRow where item_id = @itemId
    
                  INSERT INTO @brandAndModelResult (
                    item_id,
                    item_name,
                    spec_id,
                    spec_name,
                    spec_keyword_id,
                    spec_attribute_value_id,
                    spec_attribute_value,
                    master_attribute_id,
                    master_attribute_type,
                    master_attribute_detail_id,
                    master_attribute_detail,
                    master_attribute_detail_parentid,
                    unit_name,
                    receive_type,
                    receive_label,
                    item_status
                  ) select item_id,
                    item_name,
                    spec_id,
                    spec_name,
                    spec_keyword_id,
                    spec_attribute_value_id,
                    spec_attribute_value,
                    master_attribute_id,
                    master_attribute_type,
                    master_attribute_detail_id,
                    master_attribute_detail,
                    master_attribute_detail_parentid ,
                    unit_name,
                    receive_type,
                    receive_label,
                    item_status
                    
                    FROM @temps WHERE RowID = @i
                END
            END
          
          
             
        SET @i = @i + 1 
        END -- WHILE
        
      
      insert into @carNumberResult
      (
        item_id,
        attribute_name,
        car_number,
        keyword_id
      )
      select fr.item_id,
        sia.attribute_name,
        siav.attribute_value,
        sia.attribute_keyword_id
        
      from @finalResult fr
      left outer join slc_supply_item_attribute_value siav on siav.supply_item_id = fr.item_id
      left outer join slc_supply_item_attribute sia on sia.id = siav.supply_item_attribute_id
      where sia.attribute_keyword_id = 19 or sia.attribute_keyword_id = 21 or sia.attribute_keyword_id = 37 or sia.attribute_keyword_id = 38 
      order by item_id
    
      --select * from @carNumberResult where keyword_id is not null
    
      SET @i = 1
      SELECT @iRow = COUNT(*) FROM @carNumberResult
      print 'iRow = ' + CONVERT(VARCHAR,@iRow)
      WHILE (@i <= @iRow)
        BEGIN
          print 'i = ' + CONVERT(VARCHAR,@i)
          SELECT @keyId = keyword_id, @detailRow = car_number , @itemId = item_id FROM @carNumberResult WHERE RowID = @i
          --SELECT * FROM @carNumberResult WHERE RowID = @i
          print 'keyId = ' + CONVERT(VARCHAR,@keyId) + ' detailRow = ' + CONVERT(VARCHAR,@detailRow) + ' itemId = ' + CONVERT(VARCHAR,@itemId)
          IF(@keyId = 19)
            BEGIN
              update @finalResult set car_number = @detailRow where item_id = @itemId
            END
          IF(@keyId = 21)
            BEGIN
              update @finalResult set army_number = @detailRow where item_id = @itemId
            END
          IF(@keyId = 37)
            BEGIN
              update @finalResult set engine_number = @detailRow where item_id = @itemId
            END
          IF(@keyId = 38)
            BEGIN
              update @finalResult set frame_number = @detailRow where item_id = @itemId
            END
          SET @i = @i + 1 
        END
    
      --	select 
      --item_id,
      --item_name,
      --spec_name,
      --brand,
      --model,
      --car_number,
      --army_number,
      --engine_number,
      --frame_number,
      --item_status,
      --unit_name,
      --receive_type,
      --receive_label
      --from 
      --@finalResult
      select 
      fr.item_id,
      fr.item_name,
      fr.spec_name,
      fr.brand,
      fr.model,
      fr.car_number,
      fr.army_number,
      fr.item_status,
      fr.unit_name,
      fr.receive_type,
      fr.receive_label,
      sif1.directus_files_id as image_token,
      fr.supply_id,
      fr.supply_name,
      fr.toa_id,
      fr.toa_name,
      fr.contract_id,
      fr.[contract_name],
      fr.contract_type_id,
      fr.contract_type,
      fr.procurement_id,
      fr.procurement_name,
      fr.procurement_type_id,
      fr.procurement_type,
      fr.procedure_id,
      fr.[procedure_name],
      fr.sub_procedure_id,
      fr.sub_procedure_name,
      fr.company_id,
      fr.company_name,
      fr.delivery_date,
      fr.engine_number,
      fr.frame_number,
      fr.spec_id
      from 
      @finalResult fr
      left outer join slc_supply_item_files_1 sif1 on sif1.slc_supply_item_id = fr.item_id    
      where fr.contract_id = ${id}`,
    );
  }
}
