const pool = require('../utils/pool');

module.exports = class Songs {
  id;
  title;
  artist;
  released;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.artist = row.artist;
    this.released = row.released;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT title, artist FROM songs');
    return rows.map((row) => new Songs(row));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM songs WHERE id=$1', [id]);
    if(!rows[0]) return null;
    
    return new Songs(rows[0]);
  }

  static async insert({ title, artist, released }) {
    const { rows } = await pool.query(
      'INSERT INTO songs (title, artist, released) VALUES ($1, $2, $3) RETURNING * ', [title, artist, released]
    );
    return new Songs(rows[0]);
  }
};
