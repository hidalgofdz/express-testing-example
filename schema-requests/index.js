function validateSchema(schema, values, options = {}) {
  const defaultOptions = {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true,
    ...options,
  };
  return schema.validate(values, defaultOptions);
}

module.exports = {
  validateSchema,
};
