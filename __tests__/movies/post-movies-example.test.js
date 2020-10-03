const request = require("supertest");
const app = require("../../app");
const NewsletterSubscriptionFactory = require("../../factories/newslettersubscriptions");
const { StatusCodes } = require("http-status-codes");
const { NewsletterSubscription } = require("../../models");
describe("POST /movies", () => {
  test("success", async () => {
    // Given
    const subscription = NewsletterSubscriptionFactory.build();
    await NewsletterSubscription.create(subscription);
    // create a user subscription
    const movieData = {
      title: "some title",
      description: "some description",
    };
    // When
    const response = await request(app).post("/movies").send(movieData);
    // Then
    expect(response.status).toBe(StatusCodes.CREATED);
    expect(response.body).toStrictEqual({
      id: expect.any(Number),
      title: "some title",
      description: "some description",
    });
    // expect an email was send
  });

  test("Unprocessable entity", async () => {});
});
