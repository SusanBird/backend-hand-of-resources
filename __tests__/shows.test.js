const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Shows = require('../lib/models/Shows');

describe('shows routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('shows/:id returns a single show detail', async () => {
    const res = await request(app).get('/shows/2');
    const expected = {
      id: '2',
      title: 'Tayo',
      seasons: 7,
      rating: 3,
    };
    expect(res.body).toEqual(expected); 
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
