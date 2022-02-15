const express = require('express');
const app = express();
const port = 3000;

const {
  insertTaskController,
  getAllTasksController,
  getTaskByIdController,
  deleteTaskByIdController,
} = require('./controllers/taskController');
const { middlewareError } = require('./utils/middlewareError');

app.use(express.json());

app.post('/task', insertTaskController);
app.get('/task', getAllTasksController);
app.get('/task/:id', getTaskByIdController);
app.delete('/task/:id', deleteTaskByIdController);

app.use(middlewareError);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});