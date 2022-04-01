// https://github.com/nestjs/typeorm/issues/33#issuecomment-493662636

import { DataSource } from 'typeorm';
import { TypeOrmConfigService } from './typeorm-config.service';
const config = new TypeOrmConfigService().createTypeOrmOptions();
const dataSource = new DataSource(config);
export default dataSource;
