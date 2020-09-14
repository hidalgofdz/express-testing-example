const { Factory } = require("fishery");
const faker = require("faker");

const MovieFactory = Factory.define(() => ({
  title: faker.random.word(),
  description: faker.random.words(),
}));

module.exports = MovieFactory;
