const { StatusCodes } = require("http-status-codes");

const MovieFactory = require("../../factories/movies");
const { Movie } = require("../../models");
const { setup, getMovieResponseSchema } = require("../../tests/movies-setup");

describe("GET /Movies", () => {
  test("GET /Movies - Success", async () => {
    // Given
    const { testClient } = await setup();
    const movie = MovieFactory.build({
      title: "Some movie",
      description: "Some description",
    });
    Movie.create(movie);
    // When
    const response = await testClient.get("/movies");
    // Then
    expect(response.status).toBe(StatusCodes.OK);
    expect(response.data).toStrictEqual([
      getMovieResponseSchema({
        title: "Some movie",
        description: "Some description",
      }),
    ]);
  });
});
