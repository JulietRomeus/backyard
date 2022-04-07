import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { IGetPositionResponse } from './interfaces/response/get-position-response.interface.ts';
import { PositionService } from './position.services';

@Controller('position')
export class PositionController {
  constructor(private readonly positionService: PositionService) {}

  /* ------------------------------ Get Positions ----------------------------- */
  @MessagePattern('GET_POSITIONS')
  public async getPositions(): Promise<IGetPositionResponse> {
    try {
      const result = await this.positionService.getPositions();
      return {
        status: HttpStatus.OK,
        message: 'GET_POSITIONS_OK',
        data: result,
        errors: null,
        timestamp: new Date().toISOString(),
      };
    } catch (e) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'GET_POSITIONS_INTERNAL_SERVER_ERROR',
        data: null,
        errors: [
          { code: HttpStatus.INTERNAL_SERVER_ERROR, message: e.message || '' },
        ],
        timestamp: new Date().toISOString(),
      };
    }
  }
}
