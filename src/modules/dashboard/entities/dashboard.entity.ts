import { ViewEntity, Column } from "typeorm";

@ViewEntity({ name: 'disDash_TrsDashboard' })
export class TrsDashboard {
  @Column()
  id: string;
  
}