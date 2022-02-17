const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

const {
  insertTaskController,
  getAllTasksController,
  getTaskByIdController,
  deleteTaskByIdController,
  updateTaskController,
} = require('./controllers/taskController');
const { middlewareError } = require('./utils/middlewareError');

app.use(express.json());
app.use(cors());

app.post('/task', insertTaskController);
app.get('/task', getAllTasksController);
app.get('/task/:id', getTaskByIdController);
app.delete('/task/:id', deleteTaskByIdController);
app.put('/task/:id', updateTaskController);

app.use(middlewareError);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});