const {
  insertTaskModel,
  getAllTasksModel,
  getTaskByIdModel,
  deleteTaskByIdModel,
  updateTaskModel,
} = require('../models/taskModel');
const { errorMessage } = require('../utils/errorMessage');
const { taskSchema } = require('../schemas/taskSchema');
const { ObjectId } = require('mongodb');




const insertTaskService = async (task) => {
  const { error } = taskSchema.validate({ task });
  if (error) throw  errorMessage(422, error.message);
  const id = await insertTaskModel(task);
  return { id, task };
};

const getAllTasksService = async () => {
  const tasks = await getAllTasksModel();
  return tasks;
};

const getTaskByIdService = async (id) => {
  const error = ObjectId.isValid(id);
  if (!error) throw errorMessage(401, 'Id should be hexadecimal');
  const task = await getTaskByIdModel(id);
  if (!task) throw errorMessage(403, 'Task does not exist');
  return task;
};

const deleteTaskByIdService = async (id) => {
  const error = ObjectId.isValid(id);
  if(!error) throw errorMessage(401, 'Id should be hexadecimal');
  const task = await getTaskByIdModel(id); 
  await deleteTaskByIdModel(id);
  if (!task) throw errorMessage(403, 'Task does not exist');
  return task;
};

const updateTaskService = async (id, task) => {
  const idIsValid = ObjectId.isValid(id);
  if(!idIsValid) throw errorMessage(401, 'Id should be hexadecimal');
  const { error } = taskSchema.validate({ task });
  if (error) throw errorMessage(403, error.message);
  const existsTask = await getTaskByIdModel(id);
  if (!existsTask) throw errorMessage(403, 'Task does not exist');
  const updatedTask = await updateTaskModel(id, task);
  return updatedTask;
};

module.exports = {
  insertTaskService,
  getAllTasksService,
  getTaskByIdService,
  deleteTaskByIdService,
  updateTaskService,
}