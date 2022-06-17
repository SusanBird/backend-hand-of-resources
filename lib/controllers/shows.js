const { Router } = require('express');
const Shows = require('../models/Shows');

module.exports = Router()
  
  .get('/', async (req, res, next) => {
    try {
      const showInfo = await Shows.getAll();
      const showList = showInfo.map(({ title, seasons }) => ({ title, seasons }));
      res.json(showList);  
    } catch (e) {
      next(e);
    }
  });
