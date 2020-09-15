const { StatusCodes } = require("http-status-codes");

function generateUnprocessableEntityErrors(errors) {
  return errors.map((validationError) => {
    return {
      status: StatusCodes.UNPROCESSABLE_ENTITY,
      source: { pointer: "/" + validationError.path.join("/") },
      title: "Invalid Attribute",
      description: validationError.message,
      code:
        validationError.type === "any.required"
          ? "required-attribute"
          : "invalid-attribute",
    };
  });
}

function generateModelNotFoundError(
  id,
  resourceIdentifier,
  status = StatusCodes.NOT_FOUND
) {
  return {
    status,
    code: "not-found",
    title: `Not Found`,
    detail: `${resourceIdentifier} is not available on this server`,
  };
}

module.exports = {
  generateUnprocessableEntityErrors,
  generateModelNotFoundError,
};
