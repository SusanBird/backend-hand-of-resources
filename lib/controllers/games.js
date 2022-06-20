const { Router } = require('express');
const Games = require('../models/Games');

module.exports = Router()

  .get('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const matchingGame = await Games.getById(id);
      res.json(matchingGame);
    } catch (e) {
      next(e);
    }
  })

  .get('/', async (req, res, next) => {
    try {
      const gameInfo = await Games.getAll();
      const gameList = gameInfo.map(({ name, players }) => ({ name, players }));
      res.json(gameList);  
    } catch (e) {
      next(e);
    }
  });
