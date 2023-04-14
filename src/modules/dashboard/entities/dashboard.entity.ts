import { ViewEntity, Column } from "typeorm";

@ViewEntity({ name: 'disDash_TrsDashboard' })
@ViewEntity({ name: 'Example_Trs_GetCarAndContract' })
export class TrsDashboard {
  @Column()
  id: string;
  
}

