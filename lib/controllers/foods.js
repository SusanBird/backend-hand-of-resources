const { Router } = require('express');
const Foods = require('../models/Foods');

module.exports = Router()

  .post('/', async (req, res, next) => {
    try {
      const data = await Foods.insert(req.body);
      res.json(data);
    } catch (e) {
      next(e);
    }
  })

  .patch('/:id', async (req, res, next) => {
    try {
      const data = await Foods.updateById(req.params.id, req.body);
      res.json(data);
    } catch (e) {
      next(e);
    }
  })

  .get('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const matchingFood = await Foods.getById(id);
      res.json(matchingFood);
    } catch (e) {
      next(e);
    }
  })

  .get('/', async (req, res, next) => {
    try {
      const foodInfo = await Foods.getAll();
      const foodList = foodInfo.map(({ name, country, type }) => ({ name, country, type }));
      res.json(foodList);  
    } catch (e) {
      next(e);
    }
  });
