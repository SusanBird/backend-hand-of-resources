const { Router } = require('express');
const Dogs = require('../models/Dogs');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      res.json({});
    } catch (e) {
      next(e);
    }
  })

  .get('/:id', async (req, res, next) => {
    try{ 
      const id = req.params.id;
      const matchingDog = await Dogs.getById(id);
      res.json(matchingDog);
    } catch (e) {
      next(e);
    }
  })
  
  .get('/', async (req, res) => {
    const dogInfo = await Dogs.getAll();
    const dogData = dogInfo.map(({ name, age }) => ({ name, age }));
    res.json(dogData);
  });
