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

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: 'GET'
};

app.post('/task', cors(corsOptions), insertTaskController);
app.get('/task', cors(corsOptions), getAllTasksController);
app.get('/task/:id', cors(corsOptions), getTaskByIdController);
app.delete('/task/:id', cors(corsOptions), deleteTaskByIdController);
app.put('/task/:id', cors(corsOptions), updateTaskController);

app.use(middlewareError);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});