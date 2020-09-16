const { getMovieResponseSchema } = require("../../tests/movies-setup");
const { StatusCodes } = require("http-status-codes");
const MovieFactory = require("../../factories/movies");
const { Movie } = require("../../models");
const request = require("supertest");
const app = require("../../app");

describe("PUT /movies/:id", () => {
  test("Success", async () => {
    // Given
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
    const response = await request(app)
      .put(`/movies/${movie.id}`)
      .send(updatedMovieData);

    // Then
    expect(response.status).toBe(StatusCodes.OK);
    expect(response.body).toStrictEqual(
      getMovieResponseSchema({
        title: "New title",
        description: "New description",
      })
    );
  });

  test("Unprocessable Entity", async () => {
    // Given
    const movieData = MovieFactory.build({
      title: "Some movie",
      description: "Some description",
    });
    const movie = await Movie.create(movieData);
    const updateInvalidMovieData = {
      title: "Some movie",
      // no description is passed
    };
    // When
    const response = await request(app)
      .put(`/movies/${movie.id}`)
      .send(updateInvalidMovieData);
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

  test("Not Found", async () => {
    // Given
    const updatedMovieData = {
      title: "New title",
      description: "New description",
    };
    // When
    const response = await request(app)
      .put(`/movies/12`)
      .send(updatedMovieData);
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
