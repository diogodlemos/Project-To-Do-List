const {
  insertTaskService,
  getAllTasksService,
  getTaskByIdService,
  deleteTaskByIdService,
  updateTaskService,
} = require('../services/taskService');

const insertTaskController = async (req, res, next) => {
  try {
    const { task } = req.body;
    const tasks = await insertTaskService(task);
    return res.status(200).json(tasks);
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

const getAllTasksController = async (req, res, next) => {
  try {
    const tasks = await getAllTasksService();
    return res.status(200).json(tasks);
  } catch (error) {
    console.log(error.message);
    next(error)
  }
};

const getTaskByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await getTaskByIdService(id);
    return res.status(200).json(task);
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

const deleteTaskByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const taskDeleted = await deleteTaskByIdService(id);
    return res.status(200).json(taskDeleted);
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

const updateTaskController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { task } = req.body;
    const updatedTask = await updateTaskService(id, task);
    return res.status(200).json(updatedTask);
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

module.exports = {
  insertTaskController,
  getAllTasksController,
  getTaskByIdController,
  deleteTaskByIdController,
  updateTaskController,
}