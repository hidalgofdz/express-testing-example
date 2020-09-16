function getMovieResponseSchema(overrides = {}) {
  return {
    id: expect.any(Number),
    title: expect.any(String),
    description: expect.any(String),
    createdAt: expect.any(String),
    updatedAt: expect.any(String),
    ...overrides,
  };
}

module.exports = { getMovieResponseSchema };
