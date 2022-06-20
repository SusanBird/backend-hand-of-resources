const { Router } = require('express');
const Games = require('../models/Games');

module.exports = Router()

  .delete('/:id', async (req, res, next) => {
    try {
      const deletedGame = await Games.delete(req.params.id);
      res.json(deletedGame);
    } catch (e) {
      next(e);
    }
  })

  .patch('/:id', async (req, res, next) => {
    try {
      const updatedGame = await Games.updateById(req.params.id, req.body);
      res.json(updatedGame);
    } catch (e) {
      next(e);
    }
  })

  .post('/', async (req, res, next) => {
    try {
      const newGame = await Games.insert(req.body);
      res.json(newGame);
    } catch (e) {
      next(e);
    }
  })

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
