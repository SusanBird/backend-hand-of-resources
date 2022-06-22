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

  static async updateById(id, attrs) {
    const song = await Songs.getById(id);
    if(!song) return null;
    const { title, artist, released } = { ...song, ...attrs };
    const { rows } = await pool.query(
      `
      UPDATE songs
        SET title=$2, artist=$3, released=$4
        WHERE id=$1 RETURNING *`,
      [id, title, artist, released]
    );
    return new Songs(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM songs WHERE id=$1 RETURNING *',
      [id]
    );
    return new Songs(rows[0]);
  }
};
