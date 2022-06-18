const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Games = require('../lib/models/Games');

describe('games routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('/games returns an array of games', async () => {
    const res = await request(app).get('/games');
    const gamesData = Games.getAll();
    const expected = (await gamesData).map((game) => {
      return { name: game.name, players: game.players, difficulty: game.difficulty };
    });
    expect(res.body).toEqual(expected);
  });

  afterAll(() => {
    pool.end();
  }); 
});
