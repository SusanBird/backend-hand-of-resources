const { Router } = require('express');
const Dogs = require('../models/Dogs');

module.exports = Router()
  .get('/', async (req, res) => {
    const dogInfo = await Dogs.getAll();
    const dogData = dogInfo.map(({ name, age }) => ({ name, age }));
    res.json(dogData);
  });
