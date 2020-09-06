const { truncate } = require("../db-utils");
module.exports = async function () {
  console.log("global teardown");
  await truncate();
  await global.server.close();
};
