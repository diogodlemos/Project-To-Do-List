const { connection } = require('./connection');
const { ObjectId } = require('mongodb');

const insertTaskModel = async (task) => {
  const conn = await connection();
  const { insertedId } = await conn.collection('tasks').insertOne({ task });
  return { id: insertedId };
};

const getAllTasksModel = async () => {
  const conn = await connection();
  const tasks = await conn.collection('tasks').find({}).toArray();
  return tasks;
};

const getTaskByIdModel = async (id) => {
  const conn = await connection();
  const task = await conn.collection('tasks').findOne({ _id: ObjectId(id) });
  return task;
}

module.exports = {
  insertTaskModel,
  getAllTasksModel,
  getTaskByIdModel,
}