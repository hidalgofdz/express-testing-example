const { truncate } = require("../db-utils");

module.exports = async function () {
  console.log("Global teardown");
  await truncate();
  console.log("Global Teardown Done!");
};
