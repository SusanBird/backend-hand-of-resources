const { Router } = require('express');
const Songs = require('../models/Songs');

module.exports = Router()

  .patch('/:id', async (req, res, next) => {
    try {
      const data = await Songs.updateById(req.params.id, req.body);
      res.json(data);
    } catch (e) {
      next(e);
    }
  })

  .post('/', async (req, res, next) => {
    try {
      const data = await Songs.insert(req.body);
      res.json(data);
    } catch (e) {
      next(e);
    }
  })

  .get('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const matchingSong = await Songs.getById(id);
      res.json(matchingSong);
    } catch (e) {
      next(e);
    }
  })

  .get('/', async (req, res, next) => {
    try {
      const songInfo = await Songs.getAll();
      const songList = songInfo.map(({ title, artist }) => ({ title, artist }));
      res.json(songList);
    } catch (e) {
      next(e);
    }
  });
