const express = require("express");
const { StatusCodes } = require("http-status-codes");
const router = express.Router();
const { Movie } = require("../models");
const movieSchema = require("../schema-requests/movie");
const { generateUnprocessableEntityErrors } = require("../views/error-utils");

router.get("/", async function (req, res) {
  const movies = await Movie.findAll();
  res.status(StatusCodes.OK).json(movies);
});

router.post("/", async function (req, res) {
  const { title, description } = req.body;
  const { error, value } = movieSchema.validate({
    title,
    description,
  });

  if (error) {
    const errors = generateUnprocessableEntityErrors(error.details);
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      errors,
    });
    return;
  }

  const newMovie = await Movie.create(value);
  res.status(StatusCodes.CREATED).json(newMovie);
});

router.put("/:id", async function (req, res) {
  const { id } = req.params;
  const movie = await Movie.findByPk(id);

  if (movie === null) {
    return res.status(StatusCodes.NOT_FOUND);
  }

  const { title, description } = req.body;
  const { error, value } = movieSchema.validate({
    title,
    description,
  });

  if (error) {
    const errors = generateUnprocessableEntityErrors(error.detail);
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      errors,
    });
    return;
  }

  movie.title = title;
  movie.description = description;
  try {
    await movie.save();
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR);
  }

  return res.json(movie);
});

module.exports = router;
