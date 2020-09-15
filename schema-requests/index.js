function validateSchema(schema, values, options = {}) {
  const defaultOptions = { allowUnknown: true, stripUnknown: true, ...options };
  return schema.validate(values, defaultOptions);
}

module.exports = {
  validateSchema,
};
