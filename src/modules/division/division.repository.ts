import { EntityRepository, FindOneOptions, Repository } from 'typeorm';
import { Division } from './division.entity';
import { CreateDivisionDto } from './interfaces/dtos/create-division.dto';
import { DeleteDivisionDto } from './interfaces/dtos/delete-division.dto';

@EntityRepository(Division)
export class DivisionRepository extends Repository<Division> {
  async createDivision(payload: CreateDivisionDto | DeleteDivisionDto) {
    const division = await this.save(super.create(payload));
    return division;
  }

  async deleteDivision(payload: DeleteDivisionDto) {
    const division = new Division();
    division.id = payload.id;

    const result = await super.remove(division);
    return result;
  }

  async getDivisions() {
    const division = await this.find();
    return division;
  }

  async getDivision(condition: FindOneOptions<Division>) {
    return await this.findOne(condition);
  }
}
