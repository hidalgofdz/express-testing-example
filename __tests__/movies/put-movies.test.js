const { setup, getMovieResponseSchema } = require("../../tests/movies-setup");
const { StatusCodes } = require("http-status-codes");
const MovieFactory = require("../../factories/movies");
const { Movie } = require("../../models");

describe("PUT /movies/:id", () => {
  test("Success", async () => {
    // Given
    const { testClient } = await setup();
    const movieData = MovieFactory.build({
      title: "Some movie",
      description: "Some description",
    });
    const movie = await Movie.create(movieData);
    const updatedMovieData = {
      title: "New title",
      description: "New description",
    };

    // When
    const response = await testClient.put(
      `/movies/${movie.id}`,
      updatedMovieData
    );

    // Then
    expect(response.status).toBe(StatusCodes.OK);
    expect(response.data).toStrictEqual(
      getMovieResponseSchema({
        title: "New title",
        description: "New description",
      })
    );
  });
});
