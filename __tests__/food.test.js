const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Foods = require('../lib/models/Foods');

describe('food routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('/foods returns an array of foods', async () => {
    const res = await request(app).get('/foods');
    const foodData = Foods.getAll();
    const expected = (await foodData).map((food) => { return { name: food.name, country: food.country, type:food.type };
    });
    expect(res.body).toEqual(expected);
  });
 
  afterAll(() => {
    pool.end();
  });
});
