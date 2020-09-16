const { getMovieResponseSchema } = require("../../tests/movies-setup");
const { StatusCodes } = require("http-status-codes");
const MovieFactory = require("../../factories/movies");
const { Movie } = require("../../models");
const request = require("supertest");
const app = require("../../app");

describe("GET /movies/:id", () => {
  test("Success", async () => {
    // Given
    const movieData = MovieFactory.build({
      title: "Some movie",
      description: "Some description",
    });
    const movie = await Movie.create(movieData);
    // When
    const response = await request(app).get(`/movies/${movie.id}`);
    // Then
    expect(response.status).toBe(StatusCodes.OK);
    expect(response.body).toStrictEqual(
      getMovieResponseSchema({
        title: "Some movie",
        description: "Some description",
      })
    );
  });

  test("Not Found", async () => {
    // Given
    // When
    const response = await request(app).get(`/movies/12`);
    // Then
    expect(response.status).toBe(StatusCodes.NOT_FOUND);
    expect(response.body).toStrictEqual({
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
