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

  static async insert({ name, age, iq, energy }) {
    const { rows } = await pool.query(
      'INSERT INTO dogs (name, age, iq, energy) VALUES ($1, $2, $3, $4) RETURNING * ', [name, age, iq, energy]
    );
    return new Dogs(rows[0]);
  }

  static async updateById(id, attrs) {
    const dog = await Dogs.getById(id);
    if (!dog) return null;
    const { name, age, iq, energy } = { ...dog, ...attrs };
    const { rows } = await pool.query(
      `
        UPDATE dogs
        SET name=$2, age=$3, iq=$4, energy=$5
        WHERE id=$1 RETURNING *`,
      [id, name, age, iq, energy]
    );
    return new Dogs(rows[0]);
  }
};
