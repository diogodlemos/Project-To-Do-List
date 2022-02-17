const frisby = require('frisby');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const urlMongoDb = `mongodb://${process.env.HOST || 'mongodb'}:27017/TaskManager`;
const url = 'http://localhost:3001';

describe('POST /task - Create an endpoint for task register ', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(urlMongoDb, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = connection.db('TaskManager');
    await db.collection('tasks').deleteMany({});
  });

  beforeEach(async () => {
    await db.collection('tasks').deleteMany({});
    const entrie = { task: 'Estudar' };
    await db.collection('tasks').insertOne(entrie);
  });

  afterEach(async () => {
    await db.collection('tasks').deleteMany({});
  });

  afterAll(async () => {
    await connection.close();
  });
  
  it('Checks that non-string task is not allowed', async () => {
    await frisby
      .post(`${url}/task/`, { task: 1 })
      .expect('status', 422)
      .then((res) => {
        let { body } = res;
        body = JSON.parse(body);
        const { message } = body;
        expect(message).toEqual('\"task\" must be a string');
      });
  });

  it('Checks that the task field in request is required', async () => {
    await frisby
      .post(`${url}/task/`, {})
      .expect('status', 422)
      .then((res) => {
        let { body } = res;
        body = JSON.parse(body);
        const { message } = body;
        expect(message).toEqual('\"task\" is required');
      });
  });

  it('Check if task are registered', async () => {
    await frisby
      .post(`${url}/task/`, { task: 'Fazer compras' })
      .expect('status', 201)
      .then((res) => {
        let { body } = res;
        body = JSON.parse(body);
        expect(body.task).toEqual('Fazer compras');
        expect(body).toHaveProperty('id');
      });
  });
});

describe('GET /task - Create endpoint for list all tasks', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(urlMongoDb, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = connection.db('TaskManager');
    await db.collection('tasks').deleteMany({});
  });

  beforeEach(async () => {
    await db.collection('tasks').deleteMany({});
    const entries = [{ task: 'Estudar' },
      { task: 'Trabalhar' },
      { task: 'Malhar' },
      { task: 'Comer' }];
    await db.collection('tasks').insertMany(entries);
  });

  afterEach(async () => {
    await db.collection('tasks').deleteMany({});
  });

  afterAll(async () => {
    await connection.close();
  });
  
  it('Check if all tasks are listed', async () => {
    await frisby
      .get(`${url}/task`)
      .expect('status', 200)
      .then((res) => {
        let { body } = res;
        body = JSON.parse(body);
        const [
          firstTask,
          secondTask,
          thirdTask,
          fourthTask,
        ] = body;
        
        expect(firstTask.task).toEqual('Estudar');
        expect(secondTask.task).toEqual('Trabalhar');
        expect(thirdTask.task).toEqual('Malhar');
        expect(fourthTask.task).toEqual('Comer');
      });
  });

  it('Check if is posible list specific task by id', async () => {
    let taskId;
    await frisby
      .post(`${url}/task`, { task: "Programar" })
      .expect('status', 201)
      .then((res) => {
        let { body } = res;
        body = JSON.parse(body);
        taskId = body.id;
      });
      await frisby
        .get(`${url}/task/${taskId.id}`)
        .expect('status', 200)
        .then((res) => {
          const { json } = res;
          
          expect(json.task).toEqual("Programar");
        });
  });

  it('Check if is not posible list specific task by invalid id', async () => {
    await frisby
      .get(`${url}/task/1234`)
      .expect('status', 401)
      .then((res) => {
        const { json } = res;
      
        expect(json.message).toEqual("Id should be hexadecimal");
      });
  })
});