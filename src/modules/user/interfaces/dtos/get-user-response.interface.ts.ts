import { User } from '../../user.entity';
export interface GetUserResponse {
  status: number;
  message: string;
  data: Promise<any>;
  errors: Record<string, any>[] | null;
  timestamp?: string;
}
