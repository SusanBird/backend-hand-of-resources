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

};
