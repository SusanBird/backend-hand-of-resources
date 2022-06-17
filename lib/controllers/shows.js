const { Router } = require('express');
const Shows = require('../models/Shows');

module.exports = Router()
  
  .get('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const matchingShow = await Shows.getById(id);
      res.json(matchingShow);
    } catch (e) {
      next(e);
    }
  })

  .get('/', async (req, res, next) => {
    try {
      const showInfo = await Shows.getAll();
      const showList = showInfo.map(({ title, seasons }) => ({ title, seasons }));
      res.json(showList);  
    } catch (e) {
      next(e);
    }
  });
