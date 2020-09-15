const express = require("express");
const { StatusCodes } = require("http-status-codes");
const router = express.Router();
const { Movie } = require("../models");
const movieSchema = require("../schema-requests/movie");
const {
  generateModelNotFoundError,
  generateUnprocessableEntityErrors,
} = require("../views/error-utils");
const serializeMovie = require("../views/movies");
const { validateSchema } = require("../schema-requests");

router.get("/", async function (req, res) {
  const movies = await Movie.findAll();
  const moviesSerialized = movies.map((m) => serializeMovie(m));
  res.status(StatusCodes.OK).json(moviesSerialized);
});

router.post("/", async function (req, res) {
  const { error, value } = validateSchema(movieSchema, req.body);

  if (error) {
    const errors = generateUnprocessableEntityErrors(error.details);
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      errors,
    });
    return;
  }

  const newMovie = await Movie.create(value);
  res.status(StatusCodes.CREATED).json(serializeMovie(newMovie));
});

router.put("/:id", async function (req, res) {
  const { id } = req.params;
  const movie = await Movie.findByPk(id);

  if (movie === null) {
    return res.status(StatusCodes.NOT_FOUND);
  }

  const { error, value } = validateSchema(movieSchema, req.body);

  if (error) {
    const errors = generateUnprocessableEntityErrors(error.details);
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      errors,
    });
    return;
  }

  try {
    await movie.update(value);
  } catch (error) {
    return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }

  return res.json(serializeMovie(movie));
});

router.get("/:id", async function (req, res) {
  const { id } = req.params;
  const movie = await Movie.findByPk(id);

  if (movie === null) {
    return res.status(StatusCodes.NOT_FOUND).json({
      errors: [generateModelNotFoundError(id, req.originalUrl)],
    });
  }

  return res.json(serializeMovie(movie));
});

module.exports = router;
