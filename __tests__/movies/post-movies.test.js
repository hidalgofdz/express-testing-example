const { getMovieResponseSchema } = require("../../tests/movies-setup");
const { StatusCodes } = require("http-status-codes");
const request = require("supertest");
const app = require("../../app");

describe("POST /movies", () => {
  test("Success", async () => {
    // Given
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
