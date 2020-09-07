const { StatusCodes } = require("http-status-codes");

const MovieFactory = require("../factories/movies");
const { Movie } = require("../models");
const { getTestClient, resolve } = require("../tests/request-client-utils");

describe("Movies CRUD", () => {
  async function setup() {
    return { testClient: getTestClient() };
  }

  describe("POST /movies", () => {
    test("Success", async () => {
      // Setup
      const { testClient } = await setup();
      // Given
      const movieData = {
        title: "Some movie",
        description: "Some description",
      };
      // When
      const response = await testClient.post("/movies", movieData);

      // Then
      expect(response.status).toBe(StatusCodes.CREATED);
      expect(response.data).toStrictEqual({
        id: expect.any(Number),
        title: "Some movie",
        description: "Some description",
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      });
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
      const response = await testClient
        .post("/movies", movieData)
        .catch(resolve);
      // Then
      expect(response.status).toBe(StatusCodes.UNPROCESSABLE_ENTITY);
      expect(response.data).toStrictEqual({
        errors: [
          {
            source: { pointer: "/description" },
            code: "001",
            title: "Invalid Attribute",
            description: '"description" is required',
            status: 422,
          },
        ],
      });
    });
  });

  test("GET /Movies - Success", async () => {
    // Setup
    const { testClient } = await setup();
    const movie = MovieFactory.build({
      title: "Some movie",
      description: "Some description",
    });
    Movie.create(movie);
    // Give
    // When
    const response = await testClient.get("/movies");
    // Then
    expect(response.status).toBe(StatusCodes.OK);
    expect(response.data).toStrictEqual([
      {
        id: expect.any(Number),
        title: "Some movie",
        description: "Some description",
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      },
    ]);
  });
});
