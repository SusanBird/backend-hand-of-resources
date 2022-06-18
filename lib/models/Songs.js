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
};
