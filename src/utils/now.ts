import { add } from 'date-fns';
export default () => {
  return add(new Date(), { hours: 7 });
};
