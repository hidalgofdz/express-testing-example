const express = require("express");
const { StatusCodes } = require("http-status-codes");
const router = express.Router();
const { Movie } = require("../models");
const movieSchema = require("../schema-requests/movie");
const { validateSchema } = require("../schema-requests");
const { generateUnprocessableEntityErrors } = require("../views/error-utils");

router.get("/", async function (req, res) {
  const movies = await Movie.findAll();
  res.status(StatusCodes.OK).json(movies);
});

router.post("/", async function (req, res) {
  const { error, value } = validateSchema(movieSchema, req.body)

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

  const { error, value } = validateSchema(movieSchema, req.body)

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
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR);
  }

  return res.json(movie);
});

module.exports = router;
