import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class RequestByDto {
  request_by: {
    id: string;
    displayname: string;
    email: Array<string>;
    roles: { id: string }[];
    activeUnit: { id: string; code: string };
    units: { id: string; code: string }[];
    token: string;
    filter: any;
    data_permission: any;
  };
}
