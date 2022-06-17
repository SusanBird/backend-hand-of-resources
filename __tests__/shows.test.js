const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Shows = require('../lib/models/Shows');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('/shows returns an array of shows', async () => {
    const res = await request(app).get('/shows');
    const showsData = Shows.getAll();
    const expected = (await showsData).map((show) => {
      return { title: show.title, seasons: show.seasons, rating: show.rating };
    });
    expect(res.body).toEqual(expected);
  });

  afterAll(() => {
    pool.end();
  });
});
