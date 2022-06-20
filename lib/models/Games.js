const pool = require('../utils/pool');

module.exports = class Games {
  id;
  name;
  players;
  difficulty;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.players = row.players;
    this.difficulty = row.difficulty;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT name, players FROM games');
    return rows.map((row) => new Games(row));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM games WHERE id=$1', [id]);
    if(!rows[0]) return null;
    return new Games(rows[0]);
  }

  static async insert({ name, players, difficulty }) {
    const { rows } = await pool.query(
      'INSERT INTO games (name, players, difficulty) VALUES ($1, $2, $3) RETURNING *', [name, players, difficulty]
    );
    return new Games(rows[0]);
  }
};
