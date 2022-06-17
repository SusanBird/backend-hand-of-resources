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




};
