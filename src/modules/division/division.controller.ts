import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { DivisionService } from './division.service';
import { CreateDivisionDto } from './interfaces/dtos/create-division.dto';
import { DeleteDivisionDto } from './interfaces/dtos/delete-division.dto';
import { UpdateDivisionDto } from './interfaces/dtos/update-division.dto';

@Controller()
export class DivisionController {
  constructor(private readonly divisionService: DivisionService) {}

  @MessagePattern('CREATE_DIVISON')
  async createDivison(@Payload() payload: CreateDivisionDto) {
    await this.divisionService.createDivision(payload);
    return {
      status: HttpStatus.CREATED,
      message: 'CREATED_DIVISION_OK',
      data: null,
      errors: null,
      timestamp: new Date().toISOString(),
    };
  }

  @MessagePattern('UPDATE_DIVISON')
  async updateDivision(@Payload() payload: UpdateDivisionDto) {
    await this.divisionService.updateDivision(payload);
    return {
      status: HttpStatus.OK,
      message: 'UPDATE_DIVISION_OK',
      data: null,
      errors: null,
      timestamp: new Date().toISOString(),
    };
  }

  @MessagePattern('DELETE_DIVISION')
  async removeDivision(@Payload() payload: DeleteDivisionDto) {
    await this.divisionService.deleteDivision(payload);
    return {
      status: HttpStatus.OK,
      message: 'REMOVE_DIVISIONS_OK',
      data: null,
      errors: null,
      timestamp: new Date().toISOString(),
    };
  }

  @MessagePattern('GET_DIVISIONS')
  async getDivisions() {
    const result = await this.divisionService.getDivisions();
    return {
      status: HttpStatus.OK,
      message: 'GET_DIVISIONS_OK',
      data: result,
      errors: null,
      timestamp: new Date().toISOString(),
    };
  }

  @MessagePattern('GET_DIVISION_BY_ID')
  async getDivision(@Payload() payload) {
    const result = await this.divisionService.getDivision({
      where: { id: payload.id },
    });
    return {
      status: HttpStatus.OK,
      message: 'GET_DIVISION_BY_ID_OK',
      data: result,
      errors: null,
      timestamp: new Date().toISOString(),
    };
  }
}
