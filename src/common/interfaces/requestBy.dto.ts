import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class RequestByDto {
  request_by: {
    id: string;
    displayname: string;
    email: Array<string>;
    roles: Array<string>;
    units: Array<string>;
    token: string;
  };
}
