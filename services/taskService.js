const {
  insertTaskModel,
  getAllTasksModel,
  getTaskByIdModel,
  deleteTaskByIdModel,
} = require('../models/taskModel');
const { errorMessage } = require('../utils/errorMessage');
const { taskSchema, idSchema } = require('../schemas/taskSchema');
const conn = require('../models/taskModel');



const insertTaskService = async (task) => {
  const { error } = taskSchema.validate({ task });
  if (error) throw  errorMessage(401, error.message);
  const id = await insertTaskModel(task);
  return { id, task };
};

const getAllTasksService = async () => {
  const tasks = await getAllTasksModel();
  return tasks;
};

const getTaskByIdService = async (id) => {
  const { error } = idSchema.validate({ id });
  if (error) throw errorMessage(401, error.message); 
  const task = await getTaskByIdModel(id);
  if (!task) throw errorMessage(403, 'Task does not exist');
  return task;
};

const deleteTaskByIdService = async (id) => {
  const { error } = idSchema.validate({ id });
  if (error) throw errorMessage(401, error.message);
  const task = await getTaskByIdModel(id); 
  await deleteTaskByIdModel(id);
  if (!task) throw errorMessage(403, 'Task does not exist');
  return task;
}

module.exports = {
  insertTaskService,
  getAllTasksService,
  getTaskByIdService,
  deleteTaskByIdService,
}