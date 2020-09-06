const Joi = require('joi');

const movieSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required()
})

module.exports = movieSchema;
