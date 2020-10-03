const { Factory } = require("fishery");
const faker = require("faker");

const NewsletterSubscriptionFactory = Factory.define(() => ({
  email: faker.internet.email(),
  active: true,
}));

module.exports = NewsletterSubscriptionFactory;
