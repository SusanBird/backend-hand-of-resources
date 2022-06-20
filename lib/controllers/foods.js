const { Router } = require('express');
const Foods = require('../models/Foods');

module.exports = Router()

  .get('/', async (req, res, next) => {
    try {
      const foodInfo = await Foods.getAll();
      const foodList = foodInfo.map(({ name, country, type }) => ({ name, country, type }));
      res.json(foodList);  
    } catch (e) {
      next(e);
    }
  });
