import { Position } from '../../entitys/position.entity';

export interface IGetPositionResponse {
  status: number;
  message: string;
  data: Position | Position[] | null;
  errors: Record<string, any>[] | null;
  timestamp?: string;
}
