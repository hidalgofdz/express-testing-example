const cases = require("jest-in-case");
const movieSchema = require("./movie");
const { validateSchema } = require("./index");

describe("Movie Schema Request", () => {
  const validMovieData = {
    title: "Some title",
    description: "Some description",
  };

  cases(
    "Movie Schema Request error validation",
    ({ overrides = {}, removeAttributes = [] }) => {
      const movieData = {
        ...validMovieData,
        ...overrides,
      };

      removeAttributes.forEach((attribute) => {
        delete movieData[attribute];
      });

      const { error } = validateSchema(movieSchema, movieData);
      expect(error).toBeTruthy();
    },
    [
      { name: "without description", removeAttributes: ["description"] },
      { name: "without title", removeAttributes: ["title"] },
      { name: "with an invalid title", overrides: { title: 321 } },
      { name: "with an invalid title", overrides: { description: 321 } },
    ]
  );

  test("valid schema", () => {
    const { error } = validateSchema(movieSchema, validMovieData);
    expect(error).toBeFalsy();
  });
});
