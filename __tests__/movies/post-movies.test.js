const { setup, getMovieResponseSchema } = require("../../tests/movies-setup");
const { resolve } = require("../../tests/request-client-utils");
const { StatusCodes } = require("http-status-codes");
describe("POST /movies", () => {
  test("Success", async () => {
    // Given
    const { testClient } = await setup();
    const movieData = {
      title: "Some movie",
      description: "Some description",
    };
    // When
    const response = await testClient.post("/movies", movieData);
    // Then
    expect(response.status).toBe(StatusCodes.CREATED);
    expect(response.data).toStrictEqual(
      getMovieResponseSchema({
        title: "Some movie",
        description: "Some description",
      })
    );
  });

  test("Unprocessable Entity", async () => {
    // Setup
    const { testClient } = await setup();
    // Given
    const movieData = {
      title: "Some movie",
      // no description is passed
    };
    // When
    const response = await testClient.post("/movies", movieData).catch(resolve);
    // Then
    expect(response.status).toBe(StatusCodes.UNPROCESSABLE_ENTITY);
    expect(response.data).toStrictEqual({
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
