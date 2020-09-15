const { truncate } = require("../db-utils");
const models = require("../../models");

module.exports = async function () {
  console.log("Global teardown");
  await global.server.close();
  await truncate();
  await models.sequelize.close();
  console.log("Global Teardown Done!");
};
