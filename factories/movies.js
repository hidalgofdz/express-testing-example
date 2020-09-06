const {Factory} = require('fishery');
const faker = require('faker');

const MovieFactory = Factory.define(({sequence}) => ({
  id: sequence,
  title: faker.random.word(),
  description: faker.random.words()
}));

module.exports = MovieFactory;
