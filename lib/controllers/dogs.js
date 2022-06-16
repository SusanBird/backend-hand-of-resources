const { Router } = require('express');
const Dogs = require('../models/Dogs');

module.exports = Router()
  .get('/:id', async (req, res) => {
    const id = req.params.id;
    const matchingDog = await Dogs.getById(id);
    res.json(matchingDog);
  })
  
  .get('/', async (req, res) => {
    const dogInfo = await Dogs.getAll();
    const dogData = dogInfo.map(({ name, age }) => ({ name, age }));
    res.json(dogData);
  });
