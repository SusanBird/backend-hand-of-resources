const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Foods = require('../lib/models/Foods');

describe('food routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('/POST /foods should create a new food', async () => {
    const res = await request(app).post('/foods').send({
      name: 'Twinkies',
      country: 'USA', 
      type: 'dessert',
    });
    expect(res.status).toEqual(200);
    expect(res.body.name).toEqual('Twinkies');
    expect(res.body.country).toEqual('USA');
    expect(res.body.type).toEqual('dessert');
  });

  it('PATCH /foods/:id should update food', async () => {
    const res = await request(app)
      .patch('/foods/2')
      .send({ country: 'Chile' });
    expect(res.status).toEqual(200);
    expect(res.body.country).toEqual('Chile');
  });

  it('/foods/:id returns a single food detail', async () => {
    const res = await request(app).get('/foods/2');
    const expected = {
      id: '2',
      name: 'tacos',
      country: 'Mexico',
      type: 'meat',
    };
    expect(res.body).toEqual(expected);
  });

  it('/foods returns an array of foods', async () => {
    const res = await request(app).get('/foods');
    const foodData = Foods.getAll();
    const expected = (await foodData).map((food) => { 
      return { name: food.name, country: food.country, type:food.type };
    });
    expect(res.body).toEqual(expected);
  });
 
  afterAll(() => {
    pool.end();
  });
});
