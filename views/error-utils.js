function generateUnprocessableEntityErrors(errors) {
  return errors.map((validationError) => {
    return {
      status: StatusCodes.UNPROCESSABLE_ENTITY,
      source: { pointer: "/" + validationError.path.join("/") },
      title: "Invalid Attribute",
      description: validationError.message,
      code: validationError.type === "any.required" ? "001" : "002",
    };
  });
}

module.exports = {
  generateUnprocessableEntityErrors,
};
