const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Songs = require('../lib/models/Songs');

describe('song routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('/songs/:id should return details of a song', async () => {
    const res = await request(app).get('/songs/3');
    const expected = {
      id: '3',
      title: 'Baby Shark',
      artist: 'Someone Without A Soul',
      released: 2020,
    };
    expect(res.body).toEqual(expected);
  });

  it('/songs should return a list of songs', async () => {
    const res = await request(app).get('/songs');
    const songsData = Songs.getAll();
    const expected = (await songsData).map((song) => {
      return { title: song.title, artist: song.artist, released: song.released };
    });
    expect(res.body).toEqual(expected);
  });

  afterAll(() => {
    pool.end();
  });
});
