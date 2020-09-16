const { StatusCodes } = require("http-status-codes");

const MovieFactory = require("../../factories/movies");
const { Movie } = require("../../models");
const { getMovieResponseSchema } = require("../../tests/movies-setup");
const request = require("supertest");
const app = require("../../app");

describe("GET /Movies", () => {
  test("GET /Movies - Success", async () => {
    // Given
    const movie = MovieFactory.build({
      title: "Some movie",
      description: "Some description",
    });
    Movie.create(movie);
    // When
    const response = await request(app).get("/movies");
    // Then
    expect(response.status).toBe(StatusCodes.OK);
    expect(response.body).toStrictEqual([
      getMovieResponseSchema({
        title: "Some movie",
        description: "Some description",
      }),
    ]);
  });
});
