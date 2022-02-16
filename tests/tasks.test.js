const frisby = require('frisby');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const urlMongoDb = `mongodb://${process.env.HOST || 'mongodb'}:27017/TaskManager`;
const url = 'http://localhost:3000';

describe('POST /task: Create an endpoint for task register ', () => {
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
});