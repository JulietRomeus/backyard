import { Injectable } from '@nestjs/common';
import { CreateRegisterDto } from './dto/create-register.dto';
import { UpdateRegisterDto } from './dto/update-register.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

const listFields = `*,trs_regis_statusform_no.*,trs_regis_status_no.*`;
@Injectable()
export class RegisterService {
  constructor(private readonly httpService: HttpService) {}

  async findAll(query: any) {
    //console.log('body', body?.request_by || '');
    console.log('query', query);
    let filterObj = {
      is_active: { _neq: true }, // filter ข้อมูลที่ยังไม่ถูกลบ
    };

    const filterString = JSON.stringify(filterObj);
    console.log('filterObj', filterString);
    const getQuery = `trs_regis?filter${filterString}&fields=${listFields}`;
    console.log( this.httpService.get(`/items/${getQuery}`))
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
  

  async findOne(id: any) {
    //console.log('body', body?.request_by || '');
    //console.log('query', query);
    let filterObj = {
      is_active: { _neq: true }, // filter ข้อมูลที่ยังไม่ถูกลบ
    };

    const filterString = JSON.stringify(filterObj);
    console.log('filterObj', filterString);
    const getQuery = `trs_regis/${id}?filter${filterString}&fields=${listFields}`;
    console.log( this.httpService.get(`/items/${getQuery}`))
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


  create(createRegisterDto: CreateRegisterDto) {
    return 'This action adds a new register';
  }


  update(id: number, updateRegisterDto: UpdateRegisterDto) {
    return `This action updates a #${id} register`;
  }

  remove(id: number) {
    return `This action removes a #${id} register`;
  }
}
