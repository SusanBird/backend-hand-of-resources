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

  static async getById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM foods WHERE id=$1', [id]);
    if(!rows[0]) return null;
    return new Foods(rows[0]);
  }

  static async updateById(id, attrs) {
    const food = await Foods.getById(id);
    if(!food) return null;
    const { name, country, type } = { ...food, ...attrs };
    const { rows } = await pool.query(
      `
      UPDATE foods
        SET name=$2, country=$3, type=$4
        WHERE id=$1 RETURNING *`,
      [id, name, country, type]
    );
    return new Foods(rows[0]);
  }

  static async insert({ name, country, type }) {
    const { rows } = await pool.query(
      'INSERT INTO foods (name, country, type) VALUES ($1, $2, $3)RETURNING * ', [name, country, type]
    );
    return new Foods(rows[0]);
  }

};
