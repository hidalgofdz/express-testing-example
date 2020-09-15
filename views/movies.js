function serialize(movie) {
  const { id, title, description, createdAt, updatedAt } = movie;

  return {
    id,
    title,
    description,
    createdAt,
    updatedAt,
  };
}

module.exports = serialize;
