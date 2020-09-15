const { setup, getMovieResponseSchema } = require("../../tests/movies-setup");
const { resolve } = require("../../tests/request-client-utils");
const { StatusCodes } = require("http-status-codes");
const MovieFactory = require("../../factories/movies");
const { Movie } = require("../../models");

describe("GET /movies/:id", () => {
  test("Success", async () => {
    // Given
    const { testClient } = await setup();
    const movieData = MovieFactory.build({
      title: "Some movie",
      description: "Some description",
    });
    const movie = await Movie.create(movieData);
    // When
    const response = await testClient.get(`/movies/${movie.id}`);
    // Then
    expect(response.status).toBe(StatusCodes.OK);
    expect(response.data).toStrictEqual(
      getMovieResponseSchema({
        title: "Some movie",
        description: "Some description",
      })
    );
  });

  test("Not Found", async () => {
    // Given
    const { testClient } = await setup();
    // When
    const response = await testClient.get("/movies/12").catch(resolve);
    // Then
    expect(response.status).toBe(StatusCodes.NOT_FOUND);
    expect(response.data).toStrictEqual({
      errors: [
        {
          status: StatusCodes.NOT_FOUND,
          code: "not-found",
          title: "Not Found",
          detail: "/movies/12 is not available on this server",
        },
      ],
    });
  });
});
