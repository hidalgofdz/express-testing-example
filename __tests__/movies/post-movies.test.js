const { getMovieResponseSchema } = require("../../tests/movies-setup");
const { StatusCodes } = require("http-status-codes");
const request = require("supertest");
const app = require("../../app");
const { sendEmail } = require("../../services/email-service");
const NewsletterSubscriptionFactory = require("../../factories/newslettersubscriptions");
jest.mock("../../services/email-service");
const { NewsletterSubscription } = require("../../models");
describe("POST /movies", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  // test("Success", async () => {
  //   // Given
  //   // the data of a new movie :title and a description (both strings)
  //   // When
  //   // I call the post /movies endpoint
  //   // Then
  //   // a 201
  //   // the movie resource structure
  //   // that the responded title and description are the same as the one on the request
  //   // A call to the news mailer mailer was called.
  // });
  test("Success", async () => {
    // Given
    // a list of the subscribers
    const subscription = NewsletterSubscriptionFactory.build();
    await NewsletterSubscription.create(subscription);
    sendEmail.mockResolvedValue(null);
    const movieData = {
      title: "Some movie",
      description: "Some description",
    };
    // When
    const response = await request(app).post("/movies").send(movieData);
    // Then
    expect(response.status).toBe(StatusCodes.CREATED);
    expect(response.body).toStrictEqual(
      getMovieResponseSchema({
        title: "Some movie",
        description: "Some description",
      })
    );
    // assert the mailer was called
    expect(sendEmail).toHaveBeenCalledTimes(1);
  });

  test("Unprocessable Entity", async () => {
    // Given
    const invalidMovieData = {
      title: "Some movie",
      // no description is passed
    };
    // When
    const response = await request(app).post("/movies").send(invalidMovieData);
    // Then
    expect(response.status).toBe(StatusCodes.UNPROCESSABLE_ENTITY);
    expect(response.body).toStrictEqual({
      errors: [
        {
          source: { pointer: "/description" },
          code: "required-attribute",
          title: "Invalid Attribute",
          description: '"description" is required',
          status: 422,
        },
      ],
    });
  });
});
