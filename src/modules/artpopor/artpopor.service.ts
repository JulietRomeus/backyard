import { Injectable } from '@nestjs/common';
import { CreateArtpoporDto } from './dto/create-artpopor.dto';
import { UpdateArtpoporDto } from './dto/update-artpopor.dto';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
const formFields = `*.*,vehicle_driver.vehicle.*,vehicle_driver.driver.*`;
const listFields = `*,route.*`;
@Injectable()
export class ArtpoporService {
  constructor(private readonly httpService: HttpService) {}

  create(createArtpoporDto: CreateArtpoporDto) {
    return 'This action adds a new artpopor';
  }

  async findAll() {
    try {
      let filterObj = {
        is_delete:{_neq:true}
      }
      const filterString = JSON.stringify(filterObj)
      const getQuery = `trs_activity?fields=${listFields}&filter=${filterString}`
      const result = await firstValueFrom(
        this.httpService.get(`/items/${getQuery}`),
      );
      // console.log(result.data);
      return result?.data?.data || [];
    } catch (error) {
      console.log('error get menupage');
      return [];
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} artpopor`;
  }

  update(id: number, updateArtpoporDto: UpdateArtpoporDto) {
    return `This action updates a #${id} artpopor`;
  }

  remove(id: number) {
    return `This action removes a #${id} artpopor`;
  }
}
