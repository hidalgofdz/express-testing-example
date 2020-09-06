var express = require('express');
var router = express.Router();
const {Movie} = require('../models');
/* GET users listing. */
router.get('/', async function (req, res, next) {
  const movies = await Movie.findAll();
  res.status(200).json(movies);
});

router.post('/', async function (req, res, next) {
  const {title, description} = req.body;
  const newMovie = await Movie.create({title, description});
  res.status(201).json(newMovie);
});

module.exports = router;
