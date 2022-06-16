const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('dog routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('dogs should return a list of dogs', async () => {
    const res = await request(app).get('/dogs');
    const dogsData = Dogs.getAll();
    const expected = (await dogsData).map((dog) => {
      return { name: dog.name, age: dog.age, iq: dog.iq, energy: dog.energy };
    });
    expect(res.body).toEqual(expected);
  });

  afterAll(() => {
    pool.end();
  });
});
