import { RequestByDto } from '../common/interfaces/requestBy.dto';
import now from './now';

export default (body: RequestByDto, key: string) => {
  return {
    [`${key}_by`]: body.request_by.displayname,
    [`${key}_by_id`]: body.request_by.id,
    [`${key}_date`]: now(),
  };
};
