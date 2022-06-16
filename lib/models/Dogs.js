const pool = require('../utils/pool');

module.exports = class Dogs {
  id;
  name;
  age;
  iq;
  energy;
  
  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.age = row.age;
    this.iq = row.iq;
    this.energy = row.energy;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT name, age FROM dogs;');
    return rows.map((row) => new Dogs(row));
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM dogs WHERE id=$1', [id]);
    if(!rows[0]) return null;

    return new Dogs(rows[0]);
  }
};
