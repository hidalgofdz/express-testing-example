const express = require('express');
const {StatusCodes} = require('http-status-codes');
const router = express.Router();
const {Movie} = require('../models');
const movieSchema = require('../schema-requests/movie');
const {generateUnprocessableEntityErrors} = require('../views/error-utils');

router.get('/', async function (req, res) {
    const movies = await Movie.findAll();
    res.status(StatusCodes.OK).json(movies);
});

router.post('/', async function (req, res) {
    const {title, description} = req.body;
    const {error, value} = movieSchema.validate({
        title, description
    })

    if (error) {
        const errors = generateUnprocessableEntityErrors(error.details)
        res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
            errors,
        })
        return
    }

    const newMovie = await Movie.create(value);
    res.status(StatusCodes.CREATED).json(newMovie);
});

module.exports = router;
