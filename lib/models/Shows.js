const pool = require('../utils/pool');

module.exports = class Shows {
  id;
  title;
  seasons;
  rating;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.seasons = row.seasons;
    this.rating = row.rating;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT title, seasons FROM shows');
    return rows.map((row) => new Shows(row));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM shows WHERE id=$1', [id]);
    if(!rows[0]) return null;

    return new Shows(rows[0]);
  }



};
