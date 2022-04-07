import { User } from '../../entitys/user.entity';
export interface GetUserResponse {
  status: number;
  message: string;
  data: User | User[] | null;
  errors: Record<string, any>[] | null;
  timestamp?: string;
}
