const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Games = require('../lib/models/Games');

describe('games routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('/patch /games/:id updates a game', async () => {
    const res = await request(app).patch('/games/3').send({ players: 4 });
    expect(res.body.players).toEqual(4);
  });

  it('/POST /games creates a new game', async () => {
    const res = await request(app).post('/games').send({
      name: 'Mafia',
      players: 7, 
      difficulty: 8,
    });
    expect(res.body.name).toEqual('Mafia');
    expect(res.body.players).toEqual(7);
    expect(res.body.difficulty).toEqual(8);
  });

  it('/games/:id returns a single game with details', async () => {
    const res = await request(app).get('/games/2');
    const expected = {
      id: '2',
      name: 'Monopoly',
      players: 4, 
      difficulty: 6,
    };
    expect(res.body).toEqual(expected);
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
