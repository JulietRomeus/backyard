import create from './create';
import update from './update';
import deleteTask from './deleteTask';

const task = {
  create: create,
  update: update,
  delete: deleteTask,
};

export default task;
