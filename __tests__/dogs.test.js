const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Dogs = require('../lib/models/Dogs');

describe('dog routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('/dogs should return a list of dogs', async () => {
    const res = await request(app).get('/dogs');
    const dogsData = Dogs.getAll();
    const expected = (await dogsData).map((dog) => {
      return { name: dog.name, age: dog.age, iq: dog.iq, energy: dog.energy };
    });
    expect(res.body).toEqual(expected);
  });

  it('/dogs/:id should return dog details', async () => {
    const res = await request(app).get('/dogs/2');
    const expected = { 
      id: '2',
      name: 'Tate', 
      age: 2, 
      iq: 115, 
      energy: 'medium',
    };
    expect(res.body).toEqual(expected);
  });

  it('POST /dogs should create a new dog', async () => {
    const res = await request(app).post('/dogs').send({
      name: 'French', 
      age: 4, 
      iq: 114, 
      energy: 'low',
    });
    expect(res.status).toEqual(200);
    expect(res.body.name).toEqual('French');
    expect(res.body.age).toEqual(4);
    expect(res.body.iq).toEqual(114);
    expect(res.body.energy).toEqual('low');
  });

  it('PATCH /dogs/:id should update dog', async () => {
    const res = await request(app)
      .patch('/dogs/3')
      .send({ age: 3 });
    expect(res.status).toEqual(200);
    expect(res.body.age).toEqual(3);
  });

  afterAll(() => {
    pool.end();
  });
});
