const pool = require('../utils/pool');

module.exports = class Foods {
  id;
  name;
  country;
  type;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.country = row.country;
    this.type = row.type;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM foods');
    return rows.map((row) => new Foods(row));
  }

};
