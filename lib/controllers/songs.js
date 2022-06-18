const { Router } = require('express');
const Songs = require('../models/Songs');

module.exports = Router()

  .get('/', async (req, res, next) => {
    try {
      const songInfo = await Songs.getAll();
      const songList = songInfo.map(({ title, artist }) => ({ title, artist }));
      res.json(songList);
    } catch (e) {
      next(e);
    }
  });
